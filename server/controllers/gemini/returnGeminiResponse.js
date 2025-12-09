const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const returnGeminiResponseTuned = require("./returnGeminiResponseTuned");

const cleanMarkdown = (text) => {
  return text
    .replace(/[*`]+/g, '')                      // Remove *, **, `
    .replace(/(\.)(\s)([A-Z])/g, '$1\n$3')      // Add line break after sentence
    .replace(/\s{2,}/g, ' ')                    // Optional: normalize excessive spaces
    .replace(/(\d+\.)\s+/g, '\n$1 ')            // Add newline before numbered points
    .replace(/([-–•])\s+/g, '\n$1 ')            // Add newline before bullets
    .replace(/undefined/g, '')                  // Remove any undefined text
    .trim();
};

const returnGeminiResponse = async (prompt) => {
  try {
    // Get the general response from Gemini with point format instruction
    const formattedPrompt = `
      ${prompt}
      
      Please respond in clear, concise bullet points covering all necessary information:
      - Use exactly 5 main points
      - Each point should be 2-3 sentences maximum
      - Cover all key aspects without being too brief or too verbose
      - Ensure the points flow logically from one to the next
    `;
    
    const result = await model.generateContent(formattedPrompt);
    const responseText = await result.response.text();
    
    try {
      // Get detailed legal information from the tuned model
      const legalPrompt = `
        For the following scenario: "${responseText}"
        Relevant IPC sections (with numbers), Definition of each offense
      `;
      
      const tunedInfo = await returnGeminiResponseTuned(legalPrompt);
      
      // Combine responses only if tunedInfo is valid
      if (tunedInfo && !tunedInfo.includes("Error") && !tunedInfo.includes("expired")) {
        
        const combinedResponse = cleanMarkdown(`
          ## Summary
          ${responseText}
          


          ## Legal Details
          ${tunedInfo}
        `);
        console.log("Combined response:", combinedResponse);
        return combinedResponse;
      }
    } catch (tunedError) {
      console.log("Tuned model error, returning base response only:", tunedError);
    }
    
    // Return just the original response if tuned model fails
    return cleanMarkdown(responseText);
    
  } catch (error) {
    console.error("Error in returnGeminiResponse:", error);
    return "An error occurred while processing your request. Please try again later.";
  }
};

module.exports = returnGeminiResponse;