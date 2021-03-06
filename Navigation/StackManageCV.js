import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';
import {BackIcon, CheckMenu} from '../svg/icon';
import ManageCV from '../src/manageCV/Main';
import Profile from '../src/manageCV/Profile';

const Stack = createStackNavigator();

function StackManageCV() {
  function LogoTitle(props) {
    const {text} = props;
    return (
      <View>
        <Text style={styles.topTittle}>{text}</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          height: scale(50),
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="ManageCV"
        component={ManageCV}
        options={{
          headerTitle: (props) => <LogoTitle text="Hồ sơ ứng viên" />,
          // headerLeft: () => <BackIcon color={'black'} />,
          // headerRight: () => <CheckMenu color={'black'} />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: (props) => <LogoTitle text="Hồ sơ ứng viên" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
    </Stack.Navigator>
  );
}
export default StackManageCV;
const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(40),
    color: 'black',
    alignItems: 'center',
  },
});
