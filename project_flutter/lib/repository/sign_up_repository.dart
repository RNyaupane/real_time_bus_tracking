import 'package:project_flutter/API/sign_up_api.dart';
import 'package:project_flutter/model/sign_up_model.dart';

class SignUpRepository {
  Future<bool> signUp(SignUpModel signUpModel) async {
    return SignUpAPI().signUp(signUpModel);
  }
}
