package com.example.ReactiveKafka.Producer;

import com.example.ReactiveKafka.Model.BusLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;

@Service
public class JsonKafkaProducer {
    @Autowired
    private KafkaTemplate<String, BusLocation> kafkaTemplate;

    private static final String TOPIC = "location";
    public void sendMessage(Flux<String> busLocation){
        Message<Flux<String>> message= MessageBuilder
                .withPayload(busLocation)
                .setHeader(KafkaHeaders.TOPIC,"location")
                .build();

          kafkaTemplate.send(message);

    }
}
