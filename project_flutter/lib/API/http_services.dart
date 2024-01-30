import 'package:dio/dio.dart';
import 'package:project_flutter/utils/url.dart';

class HttpServices {
  static final HttpServices _instance = HttpServices._internal();
  factory HttpServices() => _instance;
  HttpServices._internal();

  static Dio? _dio;

  Dio getDioInstance() {
    if (_dio == null) {
      return _dio = Dio(
        BaseOptions(
          baseUrl: baseUrl,
          connectTimeout: const Duration(milliseconds: 5000),
        ),
      );
    } else {
      return _dio!;
    }
  }
}
