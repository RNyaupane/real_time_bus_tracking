import 'package:flutter/material.dart';
import 'package:iconify_flutter/iconify_flutter.dart';
import 'package:iconify_flutter/icons/ion.dart';
import 'package:project_flutter/screens/login.dart';
import 'package:project_flutter/utils/color.dart';
import 'package:project_flutter/utils/font.dart';
import 'package:project_flutter/utils/toast_helper.dart';

class DrawerClass extends StatelessWidget {
  const DrawerClass({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      child: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 14, 14, 14),
            child: ListTile(
              horizontalTitleGap: 10,
              leading: const Padding(
                padding: EdgeInsets.all(8.0),
                child: Iconify(
                  Ion.person_sharp,
                  size: 24,
                ),
              ),
              title: const Text(
                "My Profile",
                style: fBlackSemiBold16,
              ),
              onTap: () {},
            ),
          ),
          const Divider(
            height: 1,
          ),
          ListTile(
            leading: const Iconify(
              Ion.location,
              size: 20,
              color: Colors.red,
            ),
            title: const Text(
              "Near By Bus Stops",
              style: fBlackSemiBold14,
            ),
            onTap: () {},
          ),
          ListTile(
            leading: const Iconify(
              Ion.bus,
              size: 20,
              color: Colors.green,
            ),
            title: const Text(
              "Search Bus",
              style: fBlackSemiBold14,
            ),
            onTap: () {},
          ),
          ListTile(
            leading: const Iconify(
              Ion.notifcations,
              size: 20,
              color: cBlue,
            ),
            title: const Text(
              "Set Notification",
              style: fBlackSemiBold14,
            ),
            onTap: () {},
          ),
          ListTile(
            leading: const Iconify(
              Ion.power,
              size: 20,
              color: Colors.red,
            ),
            title: const Text(
              "Logout",
              style: fBlackSemiBold14,
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const LoginPage()),
              );
              displayInformationToast(context, "Logged Out Successfully");
            },
          ),
        ],
      ),
    );
  }
}
