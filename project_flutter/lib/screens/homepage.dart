import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:project_flutter/utils/color.dart';
import 'package:project_flutter/utils/font.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  LatLng sourceLocation =
      const LatLng(37.7749, -122.4194); // Static source location
  LatLng destinationLocation =
      const LatLng(37.7836, -122.4320); // Static destination location
  List<LatLng> polylinePoints = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      key: _scaffoldKey,
      drawer: Drawer(
        backgroundColor: const Color(0xff0EB9EF),
        child: ListView(
          children: [
            ListTile(
              leading: const Icon(
                Icons.settings,
                color: cWhite,
              ),
              title: const Text(
                "Settings",
                style: fSmall_white,
              ),
              onTap: () {},
            ),
            ListTile(
              leading: const Icon(
                Icons.settings,
                color: cWhite,
              ),
              title: const Text(
                "Settings",
                style: fSmall_white,
              ),
              onTap: () {},
            ),
            ListTile(
              leading: const Icon(
                Icons.settings,
                color: cWhite,
              ),
              title: const Text(
                "Settings",
                style: fSmall_white,
              ),
              onTap: () {},
            ),
            ListTile(
              leading: const Icon(
                Icons.settings,
                color: cWhite,
              ),
              title: const Text(
                "Settings",
                style: fSmall_white,
              ),
              onTap: () {},
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(18.0),
            child: Column(
              children: [
                Row(
                  children: [
                    Container(
                        decoration: BoxDecoration(
                            color: cWhite,
                            borderRadius: BorderRadius.circular(15)),
                        child: IconButton(
                          icon: const Icon(Icons.view_headline_rounded),
                          onPressed: () {
                            _scaffoldKey.currentState?.openDrawer();
                          },
                        )),
                    const Spacer(),
                    const Text(
                      "Welcome!",
                      style: fBlackSemiBold24,
                    ),
                    const Spacer(),
                    Container(
                        decoration: BoxDecoration(
                            color: cWhite,
                            borderRadius: BorderRadius.circular(15)),
                        child: IconButton(
                            onPressed: () {}, icon: const Icon(Icons.person)))
                  ],
                ),
                Container(
                  child: FlutterMap(
                    options: MapOptions(
                      center: const LatLng(37.78, -122.42), // Center of the map
                      zoom: 15.0,
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
                            builder: (ctx) =>
                                Container(child: const Icon(Icons.person)),
                          ),
                          Marker(
                            width: 35.0,
                            height: 35.0,
                            point: destinationLocation,
                            builder: (ctx) => Container(
                              child: const Icon(Icons.car_rental),
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}
