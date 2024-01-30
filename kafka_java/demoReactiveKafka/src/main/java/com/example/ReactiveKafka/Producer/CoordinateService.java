package com.example.ReactiveKafka.Producer;

import com.example.ReactiveKafka.Model.CoordinatesRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

@Service
public class CoordinateService {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public CoordinateService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public Flux<String> handleCoordinatesAndSendToKafka(CoordinatesRequest coordinatesRequest) {
        return Flux.fromIterable(coordinatesRequest.getCoordinates())
                .delayElements(Duration.ofSeconds(2))
                .flatMap(coordinate -> sendCoordinateToKafka(coordinatesRequest.getId(), coordinate));
    }

    private Mono<String> sendCoordinateToKafka(String id,List<Double> coordinate) {
        String topic = "location"; // Replace with your Kafka topic
        String message = convertCoordinateToString(id,coordinate);

        // Send message to Kafka
        kafkaTemplate.send(topic, message);

        // For demonstration, just return a Mono with a success message
        return Mono.just("Sent coordinate to Kafka: " +"id:"+id+ coordinate);
    }

    private String convertCoordinateToString(String id,List<Double> coordinate) {
        // Convert coordinate to string as needed for your application
        return id+","+coordinate.get(0) + "," + coordinate.get(1);
    }
}
