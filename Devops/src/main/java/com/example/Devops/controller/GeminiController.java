package com.example.Devops.controller;

import com.example.Devops.dto.GeminiRequest;
import com.example.Devops.dto.GeminiResponse;
import com.example.Devops.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "*")
public class GeminiController {
    
    @Autowired
    private GeminiService geminiService;
    
    @PostMapping("/generate")
    public ResponseEntity<GeminiResponse> generateContent(@RequestBody GeminiRequest request) {
        if (request.getPrompt() == null || request.getPrompt().trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new GeminiResponse(null, false, "Prompt cannot be empty"));
        }
        
        GeminiResponse response = geminiService.generateContent(request.getPrompt());
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    @PostMapping("/chat")
    public ResponseEntity<GeminiResponse> chat(@RequestBody GeminiRequest request) {
        return generateContent(request);
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Gemini API endpoint is working!");
    }
}
