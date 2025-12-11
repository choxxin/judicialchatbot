package com.example.Devops.service;

import com.example.Devops.config.GeminiConfig;
import com.example.Devops.dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {
    
    @Autowired
    private GeminiConfig geminiConfig;
    
    @Autowired
    private RestTemplate restTemplate;
    
    public GeminiResponse generateContent(String prompt) {
        try {
            String url = geminiConfig.getApiUrl() + "?key=" + geminiConfig.getApiKey();
            
            // Build request body according to Gemini API format
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", prompt);
            
            content.put("parts", List.of(part));
            requestBody.put("contents", List.of(content));
            
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            // Make API call
            ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                
                // Extract text from response
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) contentResponse.get("parts");
                    
                    if (parts != null && !parts.isEmpty()) {
                        String text = (String) parts.get(0).get("text");
                        return new GeminiResponse(text);
                    }
                }
            }
            
            return new GeminiResponse(null, false, "No response from Gemini API");
            
        } catch (Exception e) {
            return new GeminiResponse(null, false, "Error: " + e.getMessage());
        }
    }
}
