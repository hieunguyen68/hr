import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {BackIcon, CheckMenu} from '../svg/icon';
import Recruitment from '../src/post/Recruitment';
import EditRecruitment from '../src/post/EditRecruitment';
import Post from '../src/post/Main';

const Stack = createStackNavigator();

function StackPost({navigation, route}) {
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
        name="Post"
        component={Post}
        options={{
          headerTitle: (props) => <LogoTitle text="Tin đã đăng" />,
        }}
      />
       <Stack.Screen
        name="Recruitment"
        component={Recruitment}
        options={{
          headerTitle: (props) => <LogoTitle text="Tin tuyển dụng" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
       <Stack.Screen
        name="EditRecruitment"
        component={EditRecruitment}
        options={{
          headerTitle: (props) => <LogoTitle text="Sửa tin" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackPost;
const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(40),
    color: 'black',
    alignItems: 'center',
  },
});
