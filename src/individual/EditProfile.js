import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  Alert,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {CameraIcon, CheckIcon} from '../../svg/icon';
import * as ImagePicker from 'react-native-image-picker';
import TitleBar from '../components/TitleBar';
import LinearGradient from 'react-native-linear-gradient';
import {getEndpoint} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(
    route.params.birthday
      ? Number(new Date(route.params.birthday))
      : Date.now(),
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(route.params.gender);
  const [email, setEmail] = useState(route.params.email);
  const [phone, setPhone] = useState(route.params.phone);
  const [companyName, setCompanyName] = useState(route.params.company);
  const [name, setName] = useState(route.params.name);
  const [website, setWebsite] = useState(route.params.website);
  const [avatar, setAvatar] = useState(route.params.avatar);
  const [modalVisible, setModalVisible] = useState(false);

  const sendUpdateData = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    console.log(user);
    await axios
      .put(`${getEndpoint(Platform.OS)}/hr/${user.email}`, {
        email,
        gender,
        phone,
        companyName,
        name,
        website,
      })
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      // maxWidth: 256,
      // maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        let source = {uri: response.uri};
        // UploadAvatar(response.base64);
        // ADD THIS
        // setUrlAvatar(source.uri);
      }
    });
  }
  return (
    <View style={styles.container}>
      <TitleBar title1={'Cập nhật thông tin cá nhân'} />
      <View style={styles.Avatar}>
        <ImageBackground
          blurRadius={2}
          style={styles.bigAvatar}
          // source={{
          //   uri: UrlAvatar,
          // }}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.circle}>
              <ImageBackground
                style={styles.logo}
                // source={{
                //   uri: UrlAvatar,
                // }}
              >
                <TouchableOpacity
                  style={styles.changeAvatarBut}
                  onPress={() => {
                    selectImage();
                  }}>
                  <CameraIcon />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.nameInput}>
            <TextInput
              value={name}
              onChangeText={nameinput => setName(nameinput)}
              placeholderTextColor={'#cecece'}
              placeholder={name}
              style={styles.inputText}>
              Nguyễn Văn A
            </TextInput>
          </View>
        </ImageBackground>
      </View>
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.InforContainer}>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Giới tính</Text>
                <View style={styles.GenderBox}>
                  <Picker
                    itemStyle={styles.textInput}
                    selectedValue={gender}
                    onValueChange={itemValue => setGender(itemValue)}
                    style={styles.GenderChoice}>
                    <Picker.Item label="Nam" value="Nam" />
                    <Picker.Item label="Nữ" value="Nữ" />
                  </Picker>
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>E-mail</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={email}
                    onChangeText={emailinput => setEmail(emailinput)}
                    placeholder={email}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>Số điện thoại</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={phone}
                    onChangeText={phoneinput => setPhone(phoneinput)}
                    placeholder={phone}
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.EmailInput}>
                <Text style={styles.title}>Công ty</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={companyName}
                    onChangeText={companyinput => setCompanyName(companyinput)}
                    placeholder={companyName}
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.EmailInput}>
                <Text style={styles.title}>Website</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={website}
                    onChangeText={degreeinput => setWebsite(degreeinput)}
                    placeholder={website}
                    style={styles.textInput}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            sendUpdateData();
            setModalVisible(true);
          }}>
          <LinearGradient
            colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
            style={styles.signIn}>
            <Text style={styles.Button1Text}>Cập nhật thông tin</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            style={styles.smallCenteredView}
            onPress={() => {
              setModalVisible(false);
            }}>
            <View style={styles.smallModalView}>
              <View style={styles.modalCenter}>
                <CheckIcon />
                <Text style={styles.smallModalText}>
                  Cập nhật thông tin thành công
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  Scroll: {
    flex: 1,
  },
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
    marginTop: scale(40),
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
  },
  circle: {
    height: scale(120),
    width: scale(120),
  },
  signIn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  logo: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button1: {
    marginTop: scale(20),
    width: scale(250),
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
  nameInput: {
    marginTop: scale(10),
    justifyContent: 'flex-end',
    width: '50%',
    height: scale(40),
    alignItems: 'center',
    borderBottomWidth: scale(1 / 2),
    borderColor: 'white',
    alignSelf: 'center',
  },
  inputText: {
    color: 'white',
    fontSize: scale(18),
    height: '100%',
  },
  InforContainer: {
    width: '90%',
  },
  title: {
    color: 'black',
    fontSize: scale(16),
  },
  EmailInput: {
    height: scale(70),
    justifyContent: 'space-between',
  },
  emailBox: {
    height: scale(40),
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
  },
  textInput: {
    fontSize: scale(16),
  },
  DateInput: {
    height: scale(70),
    justifyContent: 'space-between',
    width: '50%',
  },
  GenderInput: {
    height: scale(70),
    marginLeft: scale(30),
    width: '50%',
    justifyContent: 'space-between',
  },
  DateBox: {
    height: scale(40),
    width: '100%',
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GenderBox: {
    height: scale(40),
    width: '80%',
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GenderChoice: {
    height: scale(50),
    width: scale(120),
    fontSize: scale(100),
  },
  TwoInforContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  changeAvatarBut: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 54, 54, 0.3)',
    justifyContent: 'center',
  },
  smallCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.9)',
  },
  smallModalView: {
    height: scale(300),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'center',
    padding: scale(8),
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
    textAlign: 'center',
  },
  modalCenter: {
    justifyContent: 'space-between',
    height: scale(150),
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: scale(1 / 2),
  },
});
