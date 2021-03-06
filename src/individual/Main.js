import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import TitleBar from '../components/TitleBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const MainIndividual = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user));
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <TitleBar title1={'Thông tin cá nhân'} />
      <View style={styles.Avatar}>
        <ImageBackground
          blurRadius={2}
          style={styles.bigAvatar}
          source={{
            uri: `http://${
              Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
            }:4000/uploads/avatar/${user.avatar}`,
          }}>
          <View style={styles.avatarContainer}>
            <View style={styles.circle}>
              <Image
                style={styles.logo}
                source={{
                  uri: `http://${
                    Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
                  }:4000/uploads/avatar/${user.avatar}`,
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.line} />
      <View>
        <ScrollView>
          <View style={styles.InforContainer}>
            <View style={styles.LeftTable}>
              <Text style={styles.textLeft}>Họ Tên</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Ngày Sinh</Text>
              <View style={styles.leftLine} />

              {/* <Text style={styles.textLeft}>Giới Tính</Text>
              <View style={styles.leftLine} /> */}

              <Text style={styles.textLeft}>E-mail</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Số Điện Thoại</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Công Ty</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Website</Text>
              <View style={styles.leftLine} />
            </View>
            <View style={styles.RightTable}>
              <Text style={styles.textLeft}>{user.name}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>
                {user.birthday ? (
                  <>
                    {user.birthday.slice(0, 2)}/{user.birthday.slice(2, 4)}/
                    {user.birthday.slice(4)}
                  </>
                ) : (
                  <></>
                )}
              </Text>
              <View style={styles.rightLine} />
              {/* 
              <Text style={styles.textLeft}>{user.gender}</Text>
              <View style={styles.rightLine} /> */}

              <Text style={styles.textLeft}>{user.email}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{user.phone}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{user.companyName}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{user.website}</Text>
              <View style={styles.rightLine} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('EditProfile', user)}>
          <LinearGradient
            colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
            style={styles.signIn}>
            <Text style={styles.Button1Text}>Chỉnh sửa thông tin</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Avatar: {
    height: scale(220),
    width: '150%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatar: {
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: scale(30),
    height: scale(120),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: scale(1),
    elevation: scale(5),
    borderRadius: scale(60),
    overflow: 'hidden',
    borderColor: 'white',
    marginBottom: scale(30),
  },
  circle: {
    height: scale(120),
    width: scale(120),
  },
  logo: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  LeftTable: {
    width: '30%',
    marginLeft: scale(10),
  },
  RightTable: {
    width: '70%',
  },
  InforContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  textLeft: {
    fontSize: scale(15),
    marginVertical: scale(10),
  },
  leftLine: {
    width: '100%',
    height: scale(1 / 2),
  },
  rightLine: {
    width: '90%',
    height: scale(1 / 2),
    backgroundColor: 'black',
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: scale(1 / 2),
  },
  button1: {
    marginTop: scale(10),
    width: scale(200),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(280),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button1Text: {
    fontSize: scale(18),
    color: '#fff',
  },
  signIn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
