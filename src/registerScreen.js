import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {getEndpoint} from './utils';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [companyName, setCompanyName] = useState('');

  const onSubmit = async () => {
    try {
      if (password !== password1)
        return Alert.alert('Mật khẩu nhập lại không chính xác');
      await axios.post(`${getEndpoint(Platform.OS)}/auth/register`, {
        name,
        email,
        password,
        companyName,
      });
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Email đã tồn tại');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logocontainerRegister}>
        <ImageBackground
          style={styles.logo}
          source={require('../img/logohvktmm.png')}
        />
      </View>
      <View style={styles.textInputContainerRegister}>
        <Text style={styles.titleText}>Đăng ký tài khoản</Text>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.InforContainer}>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Email</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={nameinput => setEmail(nameinput)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Họ và tên</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={input => setName(input)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Mật khẩu</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={passinput => setPassword(passinput)}
                    style={styles.textInput}
                    placeholder={''}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Nhập lại mật khẩu</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={passinput1 => setPassword1(passinput1)}
                    style={styles.textInput}
                    placeholder={''}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Tên công ty</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={nameinput => setCompanyName(nameinput)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        style={[
          styles.signIn,
          {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 30,
          },
        ]}>
        <Text
          style={[
            styles.textSign,
            {
              color: '#009387',
            },
          ]}>
          Đăng Ký
        </Text>
      </TouchableOpacity>
      <View style={styles.centerText}>
        <Text>Đã Có Tài Khoản ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linktext}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassScreen')}>
        <Text style={styles.linktext}>Quên Mật Khẩu ?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: scale(230),
    width: scale(375),
  },
  titleText: {
    alignSelf: 'center',
    fontSize: scale(20),
    color: 'rgb(238,49,40)',
    marginBottom: scale(20),
  },
  textInputContainerRegister: {
    height: scale(400),
    width: scale(350),
  },
  logocontainerRegister: {
    marginTop: scale(30),
    height: scale(100),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: scale(100),
    width: scale(100),
    alignSelf: 'center',
  },
  textInputContainer: {
    height: scale(150),
    width: scale(350),
  },
  textInputArea: {
    backgroundColor: '#F6F4F5',
    width: scale(300),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(10),
  },
  textInput: {
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    fontSize: scale(18),
    marginLeft: scale(30),
  },
  button: {
    backgroundColor: 'rgb(238,49,40)',
    width: scale(150),
    height: scale(40),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: scale(18),
    color: 'white',
  },
  centerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(5),
    marginBottom: scale(5),
  },
  linktext: {
    fontSize: scale(12),
    color: '#2787CD',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  EmailInput: {
    marginTop: scale(10),
    height: scale(70),
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontSize: scale(16),
  },
  emailBox: {
    height: scale(40),
    borderWidth: scale(1 / 2),
    borderRadius: scale(10),
  },
  textInput: {
    fontSize: scale(16),
  },
  InforContainer: {
    width: '90%',
  },
  signIn: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
