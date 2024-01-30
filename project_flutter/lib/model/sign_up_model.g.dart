// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sign_up_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SignUpModel _$SignUpModelFromJson(Map<String, dynamic> json) => SignUpModel(
      phone: json['phone'] as String?,
      fullname: json['fullname'] as String?,
      password: json['password'] as String?,
    );

Map<String, dynamic> _$SignUpModelToJson(SignUpModel instance) =>
    <String, dynamic>{
      'phone': instance.phone,
      'fullname': instance.fullname,
      'password': instance.password,
    };
