import 'package:http/http.dart';
import 'package:latlong2/latlong.dart';
import 'package:project_flutter/API/http_services.dart';
import 'package:project_flutter/utils/url.dart';

Future<List<Map<String, dynamic>>> fetchBusStationData() async {
  Response response;
  var dio = HttpServices().getDioInstance();
  String? url = baseUrl + busStopUrl; // Replace with your actual API endpoint

  try {
    final response = await dio.get(url);

    if (response.statusCode == 200) {
      final List<Map<String, dynamic>> busStations = List.from(
        response.data['data']['data']['data'],
      );

      List<LatLng> coordinates = busStations.map((station) {
        List<dynamic> rawCoordinates = station['location']['coordinates'];
        double latitude = rawCoordinates[0].toDouble();
        double longitude = rawCoordinates[1].toDouble();
        return LatLng(latitude, longitude);
      }).toList();

      return busStations;
    } else {
      throw Exception('Failed to load bus station data');
    }
  } catch (e) {
    throw Exception('Error fetching bus station data: $e');
  }
}
