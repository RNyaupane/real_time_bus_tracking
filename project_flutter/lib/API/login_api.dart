import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:project_flutter/API/http_services.dart';
import 'package:project_flutter/model/login_model.dart';
import 'package:project_flutter/response/sign_up_response.dart';
import 'package:project_flutter/utils/url.dart';

class LoginAPI {
  Future<bool> login(LoginModel loginModel) async {
    bool isLogin = false;
    Response response;
    var dio = HttpServices().getDioInstance();
    String? url = baseUrl + loginUrl;
    try {
      response = await dio.post(
        url,
        data: loginModel.toJson(),
      );
      if (response.statusCode == 200) {
        SignUpResponse signUpResponse = SignUpResponse.fromJson(response.data);
        var token = signUpResponse.token;
        var status = signUpResponse.status;
        //await setStringData('token', '$token');
        if (token != null) {
          isLogin = true;
        } else {
          isLogin = false;
        }
      } else {
        isLogin = false;
      }
    } catch (e) {
      debugPrint(e.toString());
    }
    return isLogin;
  }
}
