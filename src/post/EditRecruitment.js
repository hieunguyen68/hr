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
  console.log(route.params);
  const [salary, setSalary] = useState(route.params.salary);
  const [title, setTitle] = useState(route.params.title);
  const [expireDate, setExpireDate] = useState(route.params.expireDate);
  const [type, setType] = useState(route.params.type);
  const [quantity, setQuantity] = useState(route.params.quantity);
  const [exp, setExp] = useState(route.params.exp);
  const [description, setDescription] = useState(route.params.description);
  const [requirement, setRequirement] = useState(route.params.requirement);
  const [companyAddress, setCompanyAddress] = useState(
    route.params.companyAddress,
  );
  const [companyLocation, setCompanyLocation] = useState(
    route.params.companyLocation,
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(route.params.gender);
  const [benefit, setBenefit] = useState(route.params.benefit);

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

  const onSubmit = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const res = await axios.put(`${getEndpoint(Platform.OS)}/hr/post`, {
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
        id: route.params.id,
        _id: route.params._id,
      });
      Alert.alert('C???p nh???t th??nh c??ng');
      navigation.push('Post');
    } catch (error) {
      console.log(error);
      Alert.alert('C???p nh???t th???t b???i');
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
                    Ti??u ?????{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    value={title}
                    onChangeText={nameinput => setTitle(nameinput)}
                    style={styles.textInput}
                    placeholder={'VD: Business Analyst L????ng Upto 25M'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    ?????a ch??? l??m vi???c{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>

                <View style={styles.emailBox}>
                  <TextInput
                    value={companyAddress}
                    onChangeText={input => setCompanyAddress(input)}
                    style={styles.textInput}
                    placeholder={'VD: T???ng 7 s??? 58 T??? H???u , Trung V??n, H?? N???i'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Khu v???c l??m vi???c{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>

                <View style={styles.emailBox}>
                  <TextInput
                    value={companyLocation}
                    onChangeText={passinput => setCompanyLocation(passinput)}
                    style={styles.textInput}
                    placeholder={'VD: H?? N???i'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Gi???i t??nh{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  {/* <TextInput
                    onChangeText={passinput1 => setPass1(passinput1)}
                    style={styles.textInput}
                    placeholder={'Ch???n gi???i t??nh'}
                  /> */}

                  <Picker
                    itemStyle={styles.textInput}
                    selectedValue={gender}
                    onValueChange={itemValue => setGender(itemValue)}
                    style={styles.GenderChoice}>
                    <Picker.Item label="Kh??ng y??u c???u" value="3" />
                    <Picker.Item label="Nam" value="Nam" />
                    <Picker.Item label="N???" value="N???" />
                  </Picker>
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    M???c l????ng{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    value={salary}
                    onChangeText={nameinput => setSalary(nameinput)}
                    style={styles.textInput}
                    placeholder={'Ch???n m???c l????ng'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    S??? l?????ng c???n tuy???n{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    value={quantity}
                    onChangeText={nameinput => setQuantity(nameinput)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Lo???i h??nh l??m vi???c{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  {/* <TextInput
                    onChangeText={nameinput => setName(nameinput)}
                    style={styles.textInput}
                    placeholder={'Ch???n lo???i h??nh'}
                  /> */}
                  <Picker
                    itemStyle={styles.textInput}
                    selectedValue={type}
                    onValueChange={itemValue => setType(itemValue)}
                    style={styles.GenderChoice}>
                    <Picker.Item
                      label="To??n th???i gian"
                      value="To??n th???i gian"
                    />
                    <Picker.Item label="B??n th???i gian" value="B??n th???i gian" />
                    <Picker.Item label="Th???c t???p" value="Th???c t???p" />
                    <Picker.Item
                      label="Remote - L??m vi???c t??? xa"
                      value="Remote - L??m vi???c t??? xa"
                    />
                  </Picker>
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Kinh nghi???m{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  <TextInput
                    value={exp}
                    onChangeText={nameinput => setExp(nameinput)}
                    style={styles.textInput}
                    placeholder={''}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    H???n n???p h??? s??{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox}>
                  {/* <TextInput
                    onChangeText={nameinput => setName(nameinput)}
                    style={styles.textInput}
                    placeholder={'Ch???n th???i gian'}
                  /> */}
                  <View>
                    <TouchableOpacity
                      style={styles.textInput}
                      onPress={() => showDatepicker()}>
                      <Text style={styles.textInput}>
                        {(expireDate)
                          .toLocaleString('en-GB')
                          .substring(0, 10)}
                      </Text>
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        // value={expireDate}
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
                    M?? t??? c??ng vi???c{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox1}>
                  <TextInput
                    value={description}
                    onChangeText={nameinput => setDescription(nameinput)}
                    style={styles.textInput}
                    placeholder={'M?? t??? c??ng vi???c ph???i l??m d???a theo v??? tr??'}
                  />
                </View>
              </View>
              <View style={styles.EmailInput1}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Y??u c???u ???ng vi??n{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>
                <View style={styles.emailBox1}>
                  <TextInput
                    value={requirement}
                    onChangeText={nameinput => setRequirement(nameinput)}
                    style={styles.textInput}
                    placeholder={
                      'C??c k??? n??ng chuy??n m??n c???a ???ng vi??n ????? ????p ???ng nhu c???u c??ng vi???c, k??? n??ng ???????c ??u ti??n c???a nh??n vi??n...vv'
                    }
                  />
                </View>
              </View>
              <View style={styles.EmailInput1}>
                <View style={styles.title}>
                  <Text style={{color: 'black', fontSize: scale(16)}}>
                    Quy???n l???i ???ng vi??n{' '}
                  </Text>
                  <Text style={{color: 'red', fontSize: scale(16)}}>*</Text>
                </View>

                <View style={styles.emailBox1}>
                  <TextInput
                    value={benefit}
                    onChangeText={nameinput => setBenefit(nameinput)}
                    style={styles.textInput}
                    placeholder={
                      'C??c quy???n l???i c???a ???ng vi??n ???????c h?????ng khi ???????c nh???n v??o c??ng ty'
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
              C???p nh???t tin
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
