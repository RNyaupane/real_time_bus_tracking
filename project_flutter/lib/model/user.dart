import 'package:json_annotation/json_annotation.dart';
import 'package:project_flutter/model/user_model.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  UserModel? user;

  User({
    this.user,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
