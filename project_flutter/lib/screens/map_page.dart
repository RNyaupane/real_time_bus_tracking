import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:iconify_flutter/iconify_flutter.dart';
import 'package:iconify_flutter/icons/bx.dart';
import 'package:latlong2/latlong.dart';
import 'package:project_flutter/API/bus_route_api.dart';
import 'package:project_flutter/API/bus_stop_api.dart';
import 'package:project_flutter/utils/card.dart';
import 'package:project_flutter/utils/color.dart';
import 'package:project_flutter/utils/drawer.dart';
import 'package:web_socket_channel/io.dart';

class MapPage extends StatefulWidget {
  // final LatLng currentPosition;
  const MapPage({super.key});

  @override
  _MapPageState createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  LatLng sourceLocation = const LatLng(27.693344786093274, 85.32112185634554);
  LatLng destinationLocation =
      const LatLng(27.69851428723056, 85.32395806742527);
  List<LatLng> polylinePoints = [];
  late LatLng currentPosition;
  final TextEditingController _searchController = TextEditingController();
  List<LatLng> busStations = [];
  List<dynamic> busStationAll = [];
  final channel = IOWebSocketChannel.connect('ws://10.0.130.34:8081/ws');
  LatLng movingLocationRoute1 = const LatLng(0, 0);
  LatLng movingLocationRoute2 = const LatLng(0, 0);

  late int id;

  @override
  void initState() {
    super.initState();

    channel.stream.listen(
      (data) {
        // Event: onMessage
        print('Received: $data');
        List<String> coordinates = data.split(',');
        double latitude = double.parse(coordinates[2]);
        double longitude = double.parse(coordinates[1]);
        int coordinateId = int.parse(coordinates[0]);

        setState(() {
          if (coordinateId == 1) {
            movingLocationRoute1 = LatLng(latitude, longitude);
          } else if (coordinateId == 2) {
            movingLocationRoute2 = LatLng(latitude, longitude);
          }
          // Set the id for other use cases if needed
          id = coordinateId;
        });
      },
      onDone: () {
        // Event: onClose
        print('WebSocket channel is closed.');
      },
      onError: (error) {
        // Event: onError
        print('Error: $error');
      },
    );

    loadCurrentPositionAndBusStations();
  }

  @override
  void dispose() {
    // Event: onDispose
    channel.sink.close();
    super.dispose();
  }

  void showBusStopDetails(Map<String, dynamic> busStopData) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        String stopName = busStopData['stopName'];
        return AlertDialog(
          title: const Text('Bus Stop Details'),
          content: Text('Stop Name: $stopName'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  Future<void> loadCurrentPositionAndBusStations() async {
    try {
      //currentPosition = await getLocation();
      List<Map<String, dynamic>> busStationData = await fetchBusStationData();

      List<LatLng> newBusStations = busStationData.map((station) {
        List<dynamic> coordinates = station['location']['coordinates'];
        return LatLng(coordinates[0].toDouble(), coordinates[1].toDouble());
      }).toList();

      List<dynamic> coordinates = busStationData.map((station) {
        return station;
      }).toList();

      setState(() {
        // sourceLocation = currentPosition;
        busStationAll = coordinates;
        busStations = newBusStations;
      });
    } catch (e) {
      // Handle any errors that occurred during the asynchronous work
      print('Error loading current position and bus stations: $e');
    }
  }

  Future<void> loadRoute(String id) async {
    try {
      //currentPosition = await getLocation();
      List<Map<String, dynamic>> busRoute = await fetchRoute(id);

      List<LatLng> newRoute = busRoute.map((station) {
        List<dynamic> coordinates = station['location']['coordinates'];
        return LatLng(coordinates[0].toDouble(), coordinates[1].toDouble());
      }).toList();

      setState(() {
        // sourceLocation = currentPosition;

        busStations = newRoute;
      });
    } catch (e) {
      // Handle any errors that occurred during the asynchronous work
      print('Error loading current position and bus stations: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      drawer: const DrawerClass(),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    SizedBox(
                      width: 50, // Set a specific width
                      child: Container(
                        decoration: BoxDecoration(
                          color: cWhite,
                          borderRadius: BorderRadius.circular(15),
                        ),
                        child: IconButton(
                          icon: const Icon(Icons.view_headline_rounded),
                          onPressed: () {
                            _scaffoldKey.currentState?.openDrawer();
                          },
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 5,
                    ),
                    Expanded(
                      child: SizedBox(
                        //height: kToolbarHeight,
                        child: TextFormField(
                          controller: _searchController,
                          decoration: InputDecoration(
                            suffixIcon: const Icon(Icons.search),
                            hintText: "    Search",
                            contentPadding: const EdgeInsets.all(0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide.none,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            fillColor: const Color.fromARGB(255, 241, 237, 237),
                            filled: true,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Stack(
                children: [
                  SizedBox(
                    height: MediaQuery.of(context).size.height - kToolbarHeight,
                    child: FlutterMap(
                      options: MapOptions(
                        center: sourceLocation,
                        zoom: 12.5,
                      ),
                      children: [
                        TileLayer(
                          urlTemplate:
                              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                          subdomains: const ['a', 'b', 'c'],
                        ),
                        MarkerLayer(
                          markers: [
                            Marker(
                              width: 30.0,
                              height: 30.0,
                              point: sourceLocation,
                              builder: (ctx) => Container(
                                child: const Icon(
                                  Icons.location_pin,
                                  color: Colors.blue,
                                  size: 40,
                                ),
                              ),
                            ),
                            Marker(
                              width: 35.0,
                              height: 35.0,
                              point: movingLocationRoute1,
                              builder: (ctx) => Container(
                                child: Image.asset('assets/icons/bus-lane.png'),
                              ),
                            ),
                            Marker(
                              width: 35.0,
                              height: 35.0,
                              point: movingLocationRoute2,
                              builder: (ctx) => Container(
                                child: Image.asset('assets/icons/bus-lane.png'),
                              ),
                            ),
                            // for (LatLng busStation in busStations)
                            //   Marker(
                            //     width: 30.0,
                            //     height: 30.0,
                            //     point: busStation,
                            //     builder: (ctx) => GestureDetector(
                            //       onTap: () {
                            //         showBusStopDetails(
                            //             busStationAll); // Pass the entire bus stop data
                            //       },
                            //       child: Container(
                            //         child: Image.asset(
                            //             'assets/icons/bus_stop2.png'),
                            //       ),
                            //     ),
                            //   ),
                            for (LatLng busStation in busStations)
                              Marker(
                                width: 30.0,
                                height: 30.0,
                                point: busStation,
                                builder: (ctx) => Container(
                                  child:
                                      Image.asset('assets/icons/bus_stop2.png'),
                                ),
                              ),
                          ],
                        ),
                        PolylineLayer(
                          polylines: [
                            Polyline(
                              points: polylinePoints,
                              strokeWidth: 4.0,
                              color: Colors.blue,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Positioned(
                    bottom: 35,
                    left: 0,
                    right: 0,
                    child: SizedBox(
                      height: 90, // Adjust the height as needed
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: 2, // Change this to 2 for two cards
                        itemBuilder: (context, index) {
                          if (index == 0) {
                            return CardClass(
                              route_name: "Chakrapath Parikrama",
                              estimated_time: "60 min",
                              id: '/65b4bcedbc3fc572ff06a31e',
                              loadStationsCallback: loadRoute,
                            );
                          } else if (index == 1) {
                            return CardClass(
                              route_name: "Kalanki-Koteshwor",
                              estimated_time: "50 min",
                              id: '/65b4d09cbbe8fa5d183d0f4a',
                              loadStationsCallback: loadRoute,
                            );
                          }
                          // Return a default widget or null for other indices
                          return Container();
                        },
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 130, // Adjust top position as needed
                    right: 16.0, // Adjust left position as needed
                    child: FloatingActionButton(
                      backgroundColor: cWhite,
                      onPressed: () {},
                      child: const Iconify(
                        Bx.target_lock,
                        size: 35,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
