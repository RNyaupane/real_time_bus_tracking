import 'package:flutter/material.dart';
import 'package:project_flutter/utils/color.dart';
import 'package:project_flutter/utils/font.dart';

class CardClass extends StatefulWidget {
  final String id;
  final String route_name;
  final String estimated_time;
  final Function(String) loadStationsCallback;
  const CardClass({
    super.key,
    required this.route_name,
    required this.estimated_time,
    required this.id,
    required this.loadStationsCallback,
  });

  @override
  State<CardClass> createState() => _CardClassState();
}

class _CardClassState extends State<CardClass> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GestureDetector(
        onTap: () async {
          await widget.loadStationsCallback(widget.id);
        },
        child: Container(
          height: kToolbarHeight,
          width: 200,
          decoration: const BoxDecoration(color: cWhite),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                Row(
                  children: [
                    const Icon(Icons.location_pin),
                    Text(
                      widget.route_name,
                      style: fBlackSemiBold12,
                    )
                  ],
                ),
                const SizedBox(
                  height: 5,
                ),
                Row(
                  children: [
                    const Icon(Icons.route),
                    Text(
                      "Estimated Time : ${widget.estimated_time}",
                      style: fBlackRegular10,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
