package com.berry_comment.service;

import com.berry_comment.property.LastFmProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class LastFmService {
    private final LastFmProperty lastFmProperty;
    public int getSongPlayTime(String track, String artist) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String apiKey = lastFmProperty.getApiKey();
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=%s&artist=%s&track=%s&format=json", apiKey, artist, track);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(response);
        if(rootNode.has("error")) {
            //에러가 있으면 0을 반환
            return 0;
        }
        else {
            JsonNode data = rootNode.get("track");
            return data.get("duration").asInt();
        }
    }
}
