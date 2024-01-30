import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:project_flutter/API/http_services.dart';
import 'package:project_flutter/model/sign_up_model.dart';
import 'package:project_flutter/response/sign_up_response.dart';
import 'package:project_flutter/utils/url.dart';

class SignUpAPI {
  Future<bool> signUp(SignUpModel signUpModel) async {
    bool isSignUp = false;
    Response response;
    var dio = HttpServices().getDioInstance();
    String? url = baseUrl + signUpUrl;
    try {
      response = await dio.post(
        url,
        data: signUpModel.toJson(),
      );
      if (response.statusCode == 201) {
        SignUpResponse signUpResponse = SignUpResponse.fromJson(response.data);
        var token = signUpResponse.token;
        var status = signUpResponse.status;
        //await setStringData('token', '$token');
        if (status == "success") {
          isSignUp = true;
        } else {
          isSignUp = false;
        }
      } else {
        isSignUp = false;
      }
    } catch (e) {
      debugPrint(e.toString());
    }
    return isSignUp;
  }
}
