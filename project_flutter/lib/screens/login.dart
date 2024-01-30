import 'package:flutter/material.dart';
import 'package:project_flutter/model/login_model.dart';
import 'package:project_flutter/repository/login_repository.dart';
import 'package:project_flutter/screens/map_page.dart';
import 'package:project_flutter/screens/sign_up.dart';
import 'package:project_flutter/utils/color.dart';
import 'package:project_flutter/utils/font.dart';
import 'package:project_flutter/utils/toast_helper.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  bool isChecked = true;
  late bool isLogin;
  final bool _obscureText = true;

  _login(BuildContext context, LoginModel loginModel) async {
    try {
      LoginRepository loginRepository = LoginRepository();
      isLogin = await loginRepository.login(loginModel);
      //print("LOGINFORM BATA AKO : $isLogin");
      if (isLogin) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const MapPage()),
        );
        displaySuccessToast(context, "Welcome to Smart Move");
      } else {
        if (loginModel.phone!.isEmpty || loginModel.password!.isEmpty) {
          displayErrorToast(context, "Username and password are required");
          return;
        } else {
          displayErrorToast(
            context,
            "Either username or password is not correct",
          );
          return;
        }
      }
    } catch (e) {
      displayCustomToast(context, e.toString(), "error");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Center(
        child: Container(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const Center(
                  child: Text(
                    "Login",
                    style: TextStyle(
                      fontFamily: "Poppins-Bold",
                      fontWeight: FontWeight.bold,
                      fontSize: 30,
                      color: cBlue,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0, 14, 0, 14),
                          child: SizedBox(
                            height: 32,
                            child: TextFormField(
                              key: const ValueKey("phone"),
                              controller: _phoneController,
                              keyboardType: TextInputType.text,
                              cursorColor: cBlue,
                              style: const TextStyle(
                                color: cBlue,
                                fontFamily: 'Poppins-Regular',
                              ),
                              decoration: const InputDecoration(
                                icon: Icon(
                                  Icons.phone,
                                  color: cBlue,
                                ),
                                hintText: 'Enter Your Phone Number',
                                hintStyle: fSmall_blue,
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                    color: cBlue, // Focused border color
                                    width: 1.5,
                                  ),
                                ),
                              ),
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return 'Phone Number Cannot Be Empty';
                                }
                                return null;
                              },
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0, 14, 0, 10),
                          child: SizedBox(
                            height: 32,
                            child: TextFormField(
                              key: const ValueKey("password"),
                              controller: _passwordController,
                              obscureText: _obscureText,
                              keyboardType: TextInputType.text,
                              cursorColor: cBlue,
                              style: const TextStyle(
                                color: cBlue,
                                fontFamily: 'Poppins-Regular',
                              ),
                              decoration: const InputDecoration(
                                icon: Icon(
                                  Icons.security,
                                  color: cBlue,
                                ),
                                hintText: 'Enter Your Password',
                                hintStyle: fSmall_blue,
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                    color: cBlue, // Focused border color
                                    width: 1.5,
                                  ),
                                ),
                              ),
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return 'Password Cannot Be Empty';
                                }
                                return null;
                              },
                            ),
                          ),
                        ),

                        const SizedBox(height: 20), // 10% space
                        Row(
                          children: [
                            Expanded(
                              flex: 7,
                              child: ElevatedButton(
                                key: const ValueKey("loginBtn"),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: cBlue,
                                  shape: const RoundedRectangleBorder(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(8)),
                                  ),
                                ),
                                onPressed: () async {
                                  // setState(() {
                                  //   if (_formKey.currentState!.validate()) {
                                  //     LoginModel loginModel = LoginModel(
                                  //       phone: _phoneController.text,
                                  //       password: _passwordController.text,
                                  //     );
                                  //     _login(context, loginModel);
                                  //   }
                                  // });
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => const MapPage()),
                                  );
                                },
                                child: const Text(
                                  'Login',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontFamily: 'Poppins-SemiBold',
                                    color: cWhite,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 10), // 10% space
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: const EdgeInsets.all(4.0),
                          child: Row(
                            children: [
                              const Text(
                                "Don't have an Account?",
                                style: fBlackRegular12,
                              ),
                              const Spacer(),
                              TextButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const SignUpPage()),
                                  );
                                },
                                child: const Text(
                                  "Sign Up",
                                  style: fRegular_blue_bold,
                                ),
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
