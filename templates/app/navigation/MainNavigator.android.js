import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import DashboardScreen from '../screens/DashboardScreen';
import InfectionsScreen from '../screens/InfectionsScreen';
import TreatmentsScreen from '../screens/TreatmentsScreen';
import TreatmentScreen from '../screens/TreatmentScreen';
import AccountScreen from '../screens/AccountScreen';
import InfectionScreen from '../screens/InfectionScreen';
import NotificationScreen from '../screens/NotificationScreen';

export default DrawerNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
    },
    Account: {
      screen: AccountScreen,
    },
    Notification: {
      screen: NotificationScreen
    },
  },
  {

  }
);
