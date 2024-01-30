import 'package:json_annotation/json_annotation.dart';
import 'package:project_flutter/model/user.dart';

part 'sign_up_response.g.dart';

@JsonSerializable()
class SignUpResponse {
  String? status;
  String? token;
  User? data;

  SignUpResponse({
    this.status,
    this.token,
    this.data,
  });

  factory SignUpResponse.fromJson(Map<String, dynamic> json) =>
      _$SignUpResponseFromJson(json);

  Map<String, dynamic> toJson() => _$SignUpResponseToJson(this);
}
