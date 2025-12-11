package com.example.Devops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeminiResponse {
    private String response;
    private boolean success;
    private String error;
    
    public GeminiResponse(String response) {
        this.response = response;
        this.success = true;
    }
}
