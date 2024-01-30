import 'package:flutter/material.dart';
import 'package:project_flutter/model/sign_up_model.dart';
import 'package:project_flutter/repository/sign_up_repository.dart';
import 'package:project_flutter/screens/homepage.dart';
import 'package:project_flutter/screens/login.dart';
import 'package:project_flutter/utils/color.dart';
import 'package:project_flutter/utils/font.dart';
import 'package:project_flutter/utils/toast_helper.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _formKey = GlobalKey<FormState>();
  final _fullNameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  bool isChecked = true;
  late bool isSignUp;
  final bool _obscureText = true;

  _signUp(BuildContext context, SignUpModel signUpModel) async {
    try {
      SignUpRepository signUpRepository = SignUpRepository();
      isSignUp = await signUpRepository.signUp(signUpModel);
      if (isSignUp) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
        );
        displaySuccessToast(context, "Welcome to Smart Route");
      } else {
        if (signUpModel.phone!.isEmpty ||
            signUpModel.password!.isEmpty ||
            signUpModel.fullname!.isEmpty) {
          displayErrorToast(
              context, "Full Name, Phone Number and password are required");
          return;
        } else {
          displayErrorToast(
            context,
            "Error While Signing Up",
          );
          return;
        }
      }
    } catch (e) {
      displayErrorToast(context, e.toString());
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
                    "Sign Up",
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
                              key: const ValueKey("Full Name"),
                              controller: _fullNameController,
                              keyboardType: TextInputType.text,
                              cursorColor: cBlue,
                              style: const TextStyle(
                                color: cBlue,
                                fontFamily: 'Poppins-Regular',
                              ),
                              decoration: const InputDecoration(
                                icon: Icon(
                                  Icons.person,
                                  color: cBlue,
                                ),
                                hintText: 'Enter Your Full Name',
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
                                  return 'Name Cannot Be Empty';
                                }
                                return null;
                              },
                            ),
                          ),
                        ),
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
                                key: const ValueKey("signUpBtn"),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: cBlue,
                                  shape: const RoundedRectangleBorder(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(8)),
                                  ),
                                ),
                                onPressed: () async {
                                  setState(() {
                                    if (_formKey.currentState!.validate()) {
                                      SignUpModel signUpModel = SignUpModel(
                                        fullname: _fullNameController.text,
                                        phone: _phoneController.text,
                                        password: _passwordController.text,
                                      );
                                      _signUp(context, signUpModel);
                                    }
                                  });
                                },
                                child: const Text(
                                  'SignUp',
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
                                "Already have an Account?",
                                style: fBlackRegular12,
                              ),
                              const Spacer(),
                              TextButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const LoginPage()),
                                  );
                                },
                                child: const Text(
                                  "Login",
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

  Widget checkbox() {
    return InkWell(
      onTap: () {
        setState(() {
          isChecked = !isChecked;
        });
      },
      child: Container(
        padding: const EdgeInsets.all(8.0),
        child: Container(
          width: 20.0,
          height: 20.0,
          decoration: BoxDecoration(
            color: isChecked
                ? cBlue
                : cWhite, // Change background color when ticked
            borderRadius: BorderRadius.circular(4.0),
            border: Border.all(
              color: isChecked
                  ? cBlue
                  : cBlue, // Change inner border color when ticked
              width: 2.0,
            ),
          ),
          child: isChecked
              ? const Icon(
                  Icons.check,
                  size: 16.0,
                  color: cWhite, // Change checkmark color when ticked
                )
              : null,
        ),
      ),
    );
  }
}
