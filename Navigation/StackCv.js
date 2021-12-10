// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationList from '../src/manageCV/LocationList';
import CandidateProfile from '../src/manageCV/CandidateProfile';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function StackCv(props) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'rgb(238,49,40)',
        inactiveTintColor: 'rgb(127,127,127)',
        style: {
          backgroundColor: 'white',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: 'rgb(238,49,40)',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="CandidateProfile"
        component={CandidateProfile}
        initialParams={{data: props.data}}
        options={{
          tabBarLabel: 'HỒ SƠ ỨNG VIÊN',
          tabBarIcon: ({color, size, fontWeight}) => (
            <MaterialCommunityIcons
              name="Thông tin"
              color={rgb(238, 49, 40)}
              size={16}
              fontWeight={'bold'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LocationList"
        component={LocationList}
        initialParams={{data: props.data}}
        options={{
          tabBarLabel: 'DANH SÁCH SINH VIÊN',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="Công ty"
              color={rgb(238, 49, 40)}
              size={16}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default StackCv;
