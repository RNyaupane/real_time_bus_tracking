import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:project_flutter/utils/color.dart';

//-----------Success Toast----------
void displaySuccessToast(BuildContext context, String toastMessage) {
  MotionToast toast = MotionToast.success(
    title: Text(
      toastMessage,
      style: const TextStyle(fontWeight: FontWeight.bold),
    ),
    description: const Text("Success Toast"),
    animationType: AnimationType.fromTop,
    position: MotionToastPosition.top,
    width: 300,
    height: 80,
  );
  toast.show(context);
  // Future.delayed(const Duration(seconds: 4)).then((value) {
  //   toast.dismiss();
  // });
}

//-----------Warning Toast----------
void displayWarningToast(BuildContext context, String toastMessage) {
  MotionToast toast = MotionToast.warning(
    title: Text(
      toastMessage,
      style: const TextStyle(fontWeight: FontWeight.bold),
    ),
    description: const Text("Warning Toast"),
    animationType: AnimationType.fromTop,
    position: MotionToastPosition.top,
    width: 300,
    height: 80,
  );
  toast.show(context);
  // Future.delayed(const Duration(seconds: 4)).then((value) {
  //   toast.dismiss();
  // });
}

//-----------Error Toast----------
void displayErrorToast(BuildContext context, String toastMessage) {
  MotionToast toast = MotionToast.error(
    title: Text(
      toastMessage,
      style: const TextStyle(fontWeight: FontWeight.bold),
    ),
    description: const Text("Error Toast"),
    animationType: AnimationType.fromTop,
    position: MotionToastPosition.top,
    width: 300,
    height: 80,
  );
  toast.show(context);
  // Future.delayed(const Duration(seconds: 4)).then((value) {
  //   toast.dismiss();
  // });
}

//-----------Information Toast----------
void displayInformationToast(BuildContext context, String toastMessage) {
  MotionToast toast = MotionToast.info(
    title: Text(
      toastMessage,
      style: const TextStyle(fontWeight: FontWeight.bold),
    ),
    description: const Text("Information Toast"),
    animationType: AnimationType.fromTop,
    position: MotionToastPosition.top,
    width: 300,
    height: 80,
  );
  toast.show(context);
  // Future.delayed(const Duration(seconds: 4)).then((value) {
  //   toast.dismiss();
  // });
}

//-------------------------Custom Toast----------------------------------
void displayCustomToast(
    BuildContext context, String toastMessage, String type) {
  Color color;
  if (type == "error") {
    color = Colors.red;
  } else if (type == "warning") {
    color = Colors.yellow;
  } else if (type == "success") {
    color = Colors.green;
  } else {
    color = Colors.blue;
  }
  MotionToast(
          title: Text(
            toastMessage,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          description: const Text(""),
          animationType: AnimationType.fromTop,
          position: MotionToastPosition.top,
          width: 300,
          height: 50,
          primaryColor: cWhite,
          secondaryColor: color)
      .show(context);
  // Future.delayed(const Duration(seconds: 4)).then((value) {
  //   toast.dismiss();
  // });
}
