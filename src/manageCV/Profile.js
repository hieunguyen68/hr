import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import TitleBar from '../components/TitleBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {Can, Check} from '../../svg/icon';
import {getEndpoint} from '../utils';
import WebView from 'react-native-webview';

const Profile = () => {
  const route = useRoute();
  const [user, setUser] = useState();
  const {name, birthday, gender, email, address, phone, degree, avatar, cv} =
    route.params.user;
  const navigation = useNavigation();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };

  const approve = async () => {
    try {
      await axios.post(`${getEndpoint(Platform.OS)}/hr/approve`, {
        userId: route.params.user.id,
        postId: route.params.post._id,
      });
      await axios.post(`${getEndpoint(Platform.OS)}/message`, {
        hrEmail: user.email,
        userId: route.params.user.id,
        content: 'Chúc mừng, CV của bạn đã được duyệt',
        to: route.params.user.id,
        from: user.email,
      });
      navigation.navigate('DirectMessenger', {userId: route.params.user.id});
    } catch (error) {
      console.log(error);
      Alert.alert('Có lỗi xảy ra');
    }
  };

  const reject = async () => {
    try {
      await axios.post(`${getEndpoint(Platform.OS)}/hr/reject`, {
        userId: route.params.user.id,
        postId: route.params.post._id,
      });
      navigation.navigate('CandidateProfile');
    } catch (error) {
      Alert.alert('Có lỗi xảy ra');
    }
  };
  function DownloadCv() {
    return (
      <WebView
        source={{
          uri: `http://${
            Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
          }:4000/uploads/cv/${cv}`,
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.circle}>
          <Image
            style={styles.logo}
            source={{
              uri: `http://${
                Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
              }:4000/uploads/avatar/${avatar}`,
            }}
          />
        </View>
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

              <Text style={styles.textLeft}>Giới Tính</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>E-mail</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Địa Chỉ</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Số Điện Thoại</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Học Vấn</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>CV</Text>
              <View style={styles.leftLine} />
            </View>
            <View style={styles.RightTable}>
              <Text style={styles.textLeft}>{name}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{`${birthday.slice(
                0,
                2,
              )}/${birthday.slice(2, 4)}/${birthday.slice(4)}`}</Text>
              <View style={styles.rightLine} />
              <Text style={styles.textLeft}>{gender}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{email}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{address}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{phone}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{degree}</Text>
              <View style={styles.rightLine} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textLeft}>{cv}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={DownloadCv}>
                  {/* <WebView
                    source={{
                      uri: `http://${
                        Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
                      }:4000/uploads/cv/${cv}`,
                    }}
                  /> */}
                  <Text style={styles.download}>Tải về</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </ScrollView>
        <View style={styles.line} />
        {route.params.profileType !== 'student' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonBack} onPress={reject}>
              <Can />
              <Text style={styles.buttonBackText}> Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNext} onPress={approve}>
              <Check />
              <Text style={styles.buttonNextText}> Đồng ý</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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
  buttonContainer: {
    marginbottom: scale(100),
    height: scale(50),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scale(15),
  },
  buttonBackText: {
    fontSize: scale(14),
    color: 'rgb(238,49,40)',
  },
  buttonBack: {
    width: scale(120),
    height: scale(40),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: scale(1),
    borderColor: 'rgb(238,49,40)',
  },
  buttonNext: {
    marginLeft: scale(50),
    width: scale(120),
    height: scale(40),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: scale(1),
    borderColor: 'rgb(16,224,16)',
  },
  buttonNextText: {
    fontSize: scale(14),
    color: 'rgb(16,224,16)',
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
  download: {
    fontSize: scale(15),
    marginVertical: scale(10),
    color: 'rgb(0,190,90)',
    marginLeft: scale(15),
    textDecorationLine: 'underline',
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
