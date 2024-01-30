import 'package:json_annotation/json_annotation.dart';
import 'package:project_flutter/model/user.dart';

part 'login_response.g.dart';

@JsonSerializable()
class LoginResponse {
  String? status;
  String? token;
  User? data;

  LoginResponse({
    this.status,
    this.token,
    this.data,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) =>
      _$LoginResponseFromJson(json);

  Map<String, dynamic> toJson() => _$LoginResponseToJson(this);
}
