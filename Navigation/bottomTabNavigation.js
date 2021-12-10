import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHomepage from './stackHomepage';
import StackNotification from './stackPost';
import StackManageCV from './StackManageCV';
import StackIndividual from './stackIndividual';
import {HomeIcon, ProfileIcon, Email, CV} from '../svg/icon';
import {View} from 'react-native';
import StackPost from './stackPost';

const Tab = createBottomTabNavigator();

const BottomTabNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? (
              <HomeIcon color="rgb(254,193,13)" />
            ) : (
              <HomeIcon color="#C7C7C7" />
            );
          } else if (route.name === 'Tin đăng') {
            iconName = focused ? (
              <Email color="rgb(254,193,13)" />
            ) : (
              <Email color="#C7C7C7" />
            );
          } else if (route.name === 'Quản lý CV') {
            iconName = focused ? (
              <CV color="rgb(254,193,13)" />
            ) : (
              <CV color="#C7C7C7" />
            );
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? (
              <ProfileIcon color="rgb(254,193,13)" />
            ) : (
              <ProfileIcon color="#C7C7C7" />
            );
          }
          return <View>{iconName}</View>;
        },
        // tabBarVisible: false,
      })}
      tabBarOptions={{
        labelStyle: {fontSize: 15},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          height: 65,
        },
      }}>
      <Tab.Screen name="Trang chủ" component={StackHomepage} />
      <Tab.Screen name="Tin đăng" component={StackPost} />
      <Tab.Screen name="Quản lý CV" component={StackManageCV} />
      <Tab.Screen name="Cá nhân" component={StackIndividual} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigations;
