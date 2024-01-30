package com.example.ReactiveKafka.Controller;

import com.example.ReactiveKafka.Model.BusLocation;
import com.example.ReactiveKafka.Model.CoordinatesRequest;
import com.example.ReactiveKafka.Producer.CoordinateService;
import com.example.ReactiveKafka.Producer.JsonKafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
@RequestMapping("/kafka")
public class KafkaController {
    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    @Autowired
    private JsonKafkaProducer jsonKafkaProducer;
    private final CoordinateService coordinateService;

    public KafkaController(CoordinateService coordinateService) {
        this.coordinateService = coordinateService;
    }
    private static final String TOPIC = "location";

    @PostMapping("/publish")
    public Flux<String> publishMessage(@RequestBody CoordinatesRequest coordinatesRequest)
    {
        return coordinateService.handleCoordinatesAndSendToKafka(coordinatesRequest);
//       return coordinates.flatMap(this::processJsonObject);
    }

//    private Flux<String> processJsonObject(String coordinates){
//        return Flux.just(coordinates)
//                .delayElements(Duration.ofSeconds(5))
//                .flatMap(this::sendToKafka);
//    }
//
////    @PostMapping("/publish")
////    public ResponseEntity<String> publishMessage(@RequestBody Flux<BusLocation> buslocation)
////    {
////        Flux<BusLocation> busLocationFlux=Flux.just(buslocation);
////        jsonKafkaProducer.sendMessage(busLocationFlux.delayElements(Duration.ofSeconds(2)));
////        return new ResponseEntity<>("Location Updated", HttpStatus.OK);
////    }
//
//    private Flux<String> sendToKafka(String coordinates) {
//        // Send the bus location details to a Kafka topic
//        kafkaTemplate.send("location",coordinates );
//
//        // Return a Flux with a single element indicating successful processing
//        return Flux.just("Processed: " + coordinates);
//    }

}
