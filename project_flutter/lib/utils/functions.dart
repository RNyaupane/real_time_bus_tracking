import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';

Future<LatLng> getLocation() async {
  bool serviceEnabled;
  LocationPermission permissionGranted;
  Position currentLocation;
  LatLng currentPosition;

  // Check if location services are enabled
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    return Future.error('Location services are disabled');
  }

  // Check permission
  permissionGranted = await Geolocator.checkPermission();
  if (permissionGranted == LocationPermission.denied) {
    // Request permission
    permissionGranted = await Geolocator.requestPermission();
    // Request is denied
    if (permissionGranted == LocationPermission.denied) {
      return Future.error("Location Permission Request are denied");
    }

    // Check if the permission is denied forever
    if (permissionGranted == LocationPermission.deniedForever) {
      return Future.error("Location Permissions are permanently denied");
    }
  }

  // Get current location
  currentLocation = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high);
  currentPosition = LatLng(currentLocation.latitude, currentLocation.longitude);

  // Return the current location
  return currentPosition;
}
