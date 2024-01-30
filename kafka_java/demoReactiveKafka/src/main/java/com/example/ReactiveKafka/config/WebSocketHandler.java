package com.example.ReactiveKafka.config;

import com.example.ReactiveKafka.Model.BusLocation;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private  static final Set<WebSocketSession> sessions = new HashSet<>();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        sessions.add(session);

    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        sessions.remove(session);
    }
    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session,@NonNull TextMessage message) throws IOException {
        // Handle incoming messages from clients (if needed)
        System.out.println(message);
    }

    // Method to send messages to all connected WebSocket clients
    public static void sendToAll(String busLocation) throws IOException {
        TextMessage textMessage = new TextMessage(busLocation);
        for (WebSocketSession session : sessions) {
            session.sendMessage(textMessage);
        }
    }
}
