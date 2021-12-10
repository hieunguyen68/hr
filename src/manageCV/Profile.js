import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
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
import {Can, Check} from '../../svg/icon';

const Profile = () => {
  const route = useRoute();
  const [dataHistory, setDataHistory] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [token, setToken] = useState('');
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.circle}>
          {/* <Image
            style={styles.logo}
            source={{
              uri: 'http://elearning.tmgs.vn' + route.params.avatar,
            }}
          /> */}
          <Image
            style={styles.logo}
            source={require('../../img/logohvktmm.png')}
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
            </View>
            <View style={styles.RightTable}>
              <Text style={styles.textLeft}>{dataUser.fullname}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>
                {new Date(dataUser.birth).toLocaleDateString('en-GB')}
              </Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>
                {dataUser.gender === 1 ? 'Nam' : 'Nữ'}
              </Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.email}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.place}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.phone}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.company}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.skill}</Text>
              
            </View>
          </View>
        </ScrollView>
        <View style={styles.line} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.navigate('MainMessenger')}>
            <Can/>
            <Text style={styles.buttonBackText}>    Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonNext}
            onPress={() => navigation.navigate('SendCv')}>
            <Check/>
            <Text style={styles.buttonNextText}>    Đồng ý</Text>
          </TouchableOpacity>
        </View>
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
    height: scale(100),
    width: scale(100),
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
    height: scale(45),
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
    height: scale(45),
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
