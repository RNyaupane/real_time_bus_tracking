package com.example.ReactiveKafka.Consumer;

import com.example.ReactiveKafka.Model.BusLocation;
import com.example.ReactiveKafka.Model.CoordinatesRequest;
import com.example.ReactiveKafka.config.WebSocketHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.serializer.DeserializationException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.Duration;

@Service
public class KafkaConsumer {
    @KafkaListener(topics = "location",groupId = "group-1",concurrency = "3")
    public void consumeMsg(String coordinatesRequest) throws DeserializationException {
//        int num=Integer.parseInt(msg)*2;
//        System.out.println("Msg from topic: Live Location: " + coordinatesRequest);
//        WebSocketHandler.sendToAll(String.valueOf(busLocation));
//        simpMessagingTemplate.convertAndSend("/topic/location", msg);

        try {
            // Process the received JSON message
            System.out.println("Msg from topic: Live Location: " +coordinatesRequest);
//            System.out.println("Received Bus Location: " + busLocation.toString());
            WebSocketHandler.sendToAll(coordinatesRequest);
//            simpMessagingTemplate.convertAndSend("/topic/location", busLocation.toString());
            // Add your logic to handle the BusLocation object
        } catch (DeserializationException e) {
            // Handle deserialization exception
            System.err.println("Error during deserialization: " + e.getMessage());
            // Add your error handling logic
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
