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
import {useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {getEndpoint} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recruitment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [salary, setSalary] = useState();
  const [title, setTitle] = useState();
  const [expireDate, setExpireDate] = useState(1640970000000);
  const [type, setType] = useState('Toàn thời gian');
  const [quantity, setQuantity] = useState();
  const [exp, setExp] = useState();
  const [description, setDescription] = useState();
  const [requirement, setRequirement] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [companyLocation, setCompanyLocation] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('Nam');
  const [benefit, setBenefit] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setExpireDate(currentDate);
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

  const onSubmit = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const res = await axios.post(`${getEndpoint(Platform.OS)}/hr/post`, {
        hrEmail: user.email,
        salary,
        title,
        expireDate: new Date(expireDate).toLocaleDateString(),
        type,
        quantity,
        gender,
        exp,
        description,
        requirement,
        companyAddress,
        companyLocation,
        benefit,
        id: Math.floor(100000 * Math.random()),
      });
      Alert.alert('Đăng tin thành công');
      navigation.push('Post');
    } catch (error) {
      console.log(error);
      Alert.alert('Đăng tin thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainerRegister}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.InforContainer}>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Tiêu đề{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={nameinput => setTitle(nameinput)}
                    style={styles.textInput}
                    placeholder={'VD: Business Analyst Lương Upto 25M'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Địa chỉ làm việc{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>

                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={input => setCompanyAddress(input)}
                    style={styles.textInput}
                    placeholder={'VD: Tầng 7 số 58 Tố Hữu , Trung Văn, Hà Nội'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Khu vực làm việc{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>

                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={passinput => setCompanyLocation(passinput)}
                    style={styles.textInput}
                    placeholder={'VD: Hà Nội'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Giới tính{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  {/* <TextInput
                    onChangeText={passinput1 => setPass1(passinput1)}
                    style={styles.textInput}
                    placeholder={'Chọn giới tính'}
                  /> */}

                  <Picker
                    itemStyle={styles.textInput}
                    selectedValue={gender}
                    onValueChange={itemValue => setGender(itemValue)}
                    style={styles.GenderChoice}>
                    <Picker.Item label="Không yêu cầu" value="3" />
                    <Picker.Item label="Nam" value="Nam" />
                    <Picker.Item label="Nữ" value="Nữ" />
                  </Picker>
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Mức lương{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={nameinput => setSalary(nameinput)}
                    style={styles.textInput}
                    placeholder={'Chọn mức lương'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Số lượng cần tuyển{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={nameinput => setQuantity(nameinput)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Loại hình làm việc{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  {/* <TextInput
                    onChangeText={nameinput => setName(nameinput)}
                    style={styles.textInput}
                    placeholder={'Chọn loại hình'}
                  /> */}
                  <Picker
                    itemStyle={styles.textInput}
                    selectedValue={type}
                    onValueChange={itemValue => setType(itemValue)}
                    style={styles.GenderChoice}>
                    <Picker.Item
                      label="Toàn thời gian"
                      value="Toàn thời gian"
                    />
                    <Picker.Item label="Bán thời gian" value="Bán thời gian" />
                    <Picker.Item label="Thực tập" value="Thực tập" />
                    <Picker.Item
                      label="Remote - Làm việc từ xa"
                      value="Remote - Làm việc từ xa"
                    />
                  </Picker>
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Kinh nghiệm{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    onChangeText={nameinput => setExp(nameinput)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Hạn nộp hồ sơ{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  {/* <TextInput
                    onChangeText={nameinput => setName(nameinput)}
                    style={styles.textInput}
                    placeholder={'Chọn thời gian'}
                  /> */}
                  <View>
                    <TouchableOpacity
                      style={styles.textInput}
                      onPress={() => showDatepicker()}>
                      <Text style={styles.textInput}>
                        {new Date(expireDate)
                          .toLocaleString('en-GB')
                          .substring(0, 10)}
                      </Text>
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={expireDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.EmailInput1}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Mô tả công việc{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox1}>
                  <TextInput
                    onChangeText={nameinput => setDescription(nameinput)}
                    style={styles.textInput}
                    placeholder={'Mô tả công việc phải làm dựa theo vị trí'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput1}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Yêu cầu ứng viên{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox1}>
                  <TextInput
                    onChangeText={nameinput => setRequirement(nameinput)}
                    style={styles.textInput}
                    placeholder={
                      'Các kỹ năng chuyên môn của ứng viên để đáp ứng nhu cầu công việc, kỹ năng được ưu tiên của nhân viên...vv'
                    }
                  />
                </View>
              </View>
              <View style={styles.EmailInput1}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Quyền lợi ứng viên{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>

                <View style={styles.emailBox1}>
                  <TextInput
                    onChangeText={nameinput => setBenefit(nameinput)}
                    style={styles.textInput}
                    placeholder={
                      'Các quyền lợi của ứng viên được hưởng khi được nhận vào công ty'
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            style={[
              styles.button,
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
              Đăng Tin
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default Recruitment;

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
    height: '100%',
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
    width: scale(150),
    height: scale(40),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginBottom: scale(10),
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
  EmailInput1: {
    marginTop: scale(10),
    height: scale(170),
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
  },
  emailBox: {
    height: scale(50),
    borderWidth: scale(1 / 2),
    borderRadius: scale(10),
  },
  emailBox1: {
    height: scale(150),
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
