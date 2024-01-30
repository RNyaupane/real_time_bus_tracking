import 'package:project_flutter/API/login_api.dart';
import 'package:project_flutter/model/login_model.dart';

class LoginRepository {
  Future<bool> login(LoginModel loginModel) async {
    return LoginAPI().login(loginModel);
  }
}
