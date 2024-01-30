import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable()
class UserModel {
  String? id;
  String? fullname;
  String? phone;
  String? role;
  bool? active;
  String? createdAt;
  String? updatedAt;

  UserModel({
    this.id,
    this.fullname,
    this.phone,
    this.role,
    this.active,
    this.createdAt,
    this.updatedAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  Map<String, dynamic> toJson() => _$UserModelToJson(this);
}
