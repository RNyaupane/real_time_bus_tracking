import 'package:flutter/material.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('WebSocket Demo'),
      ),
      // body: Stack(
      //   children: <Widget>[
      //     OSMFlutter(
      //       controller: mapController,
      //       trackMyPosition: true,
      //       initZoom: 15,
      //       stepZoom: 1.0,
      //       userLocationMarker: UserLocationMaker(
      //         personMarker: const MarkerIcon(
      //           icon: Icon(
      //             Icons.location_history_rounded,
      //             color: Colors.red,
      //             size: 48,
      //           ),
      //         ),
      //         directionArrowMarker: const MarkerIcon(
      //           icon: Icon(
      //             Icons.double_arrow,
      //             size: 48,
      //           ),
      //         ),
      //       ),
      //       roadConfiguration: RoadConfiguration(
      //         startIcon: const MarkerIcon(
      //           icon: Icon(
      //             Icons.person,
      //             size: 64,
      //             color: Colors.brown,
      //           ),
      //         ),
      //         roadColor: Colors.yellowAccent,
      //       ),
      //       markerOption: MarkerOption(
      //           defaultMarker: const MarkerIcon(
      //         icon: Icon(
      //           Icons.person_pin_circle,
      //           color: Colors.blue,
      //           size: 56,
      //         ),
      //       )),
      //     )
      //   ],
      // ),
    );
  }
}
