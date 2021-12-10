import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthorIcon,
  MoneyIcon,
  MenuIcon,
  BellIcon,
  SearchIcon,
  CancelIcon,
  DateAndTimeIcon,
  ClockIcon,
  Clock,
  Search,
  Edit,
  Can,
  Plus,
} from '../../svg/icon';
import HTML from 'react-native-render-html';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {getEndpoint} from '../utils';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Post = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [newsID, setNewsID] = useState('');
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user));
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${getEndpoint(Platform.OS)}/hr/post/${user.email}`,
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async id => {
    try {
      Alert.alert('Cảnh báo', 'Bạn chắc chắn muốn xoá?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deletePostById(id)},
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Có lỗi xảy ra');
    }
  };

  const deletePostById = async id => {
    console.log(id);
    const res = await axios.delete(`${getEndpoint(Platform.OS)}/hr/post`, {
      data: {
        _id: id,
      },
    });
    Alert.alert('Xoá tin thành công');
    getData();
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <View style={styles.container}>
        <View style={[styles.itemNew, {backgroundColor}]}>
          <View style={styles.layer}>
            <View style={styles.text}>
              <View style={styles.viewNew}>
                <Text style={styles.timeText1} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.iconAndText}>
                  <MoneyIcon />
                  <Text style={styles.timeText}>{item.salary}</Text>
                </View>
                <View style={styles.iconAndText}>
                  <Clock />
                  <Text style={styles.timeText}>
                    Hạn nhận hồ sơ: {item.expireDate}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.Edit}
                    onPress={() =>
                      navigation.navigate('EditRecruitment', item)
                    }>
                    <Edit />
                    <Text style={styles.timeText}> Sửa tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.can}>
            <TouchableOpacity onPress={() => deletePost(item._id)}>
              <Can />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const clearInput = () => {
    setSearchValue('');
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.body}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            style={styles.FlatList}
            data={data}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          />
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Recruitment')}
        style={styles.touchableOpacityStyle}>
        <Plus />
      </TouchableOpacity>
    </View>
  );
};
export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    // backgroundColor:'black'
  },
  itemNew: {
    marginHorizontal: scale(5),
    borderRadius: scale(10),
    marginVertical: scale(5),
    borderRightColor: '#d3d4d4',
    width: '96%',
    height: scale(140),
    elevation: scale(5),
    overflow: 'hidden',
  },
  imageNew: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginLeft: scale(10),
    resizeMode: 'stretch',
  },
  viewNew: {
    backgroundColor: '#fff',
    height: scale(100),
    width: '100%',
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#f6821f',
  },
  iconAndText: {
    marginLeft: scale(10),
    marginTop: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconday: {
    marginTop: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    marginLeft: scale(10),
    color: '#17a2b8',
    fontSize: scale(14),
  },
  timeText: {
    color: '#000',
    fontSize: scale(14),
    marginLeft: scale(5),
  },
  timeText1: {
    color: '#000',
    fontSize: scale(16),
    marginLeft: scale(10),
    marginRight: scale(30),
  },
  text: {
    marginRight: scale(10),
    marginTop: scale(5),
  },
  searchBar: {
    height: scale(56),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconPosition: {
    marginLeft: scale(8),
    marginRight: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(5),
    color: 'black',
  },
  SearchArea: {
    height: scale(40),
    width: '75%',
    backgroundColor: 'white',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#000',
  },
  Edit: {
    height: scale(30),
    width: '45%',
    backgroundColor: 'rgb(225,225,225)',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#000',
    marginTop: scale(10),
    marginLeft: '30%',
  },
  can: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(1),
    right: 0,
    top: 5,
  },
  SearchIconArea: {
    width: '10%',
    alignItems: 'center',
  },
  CancelIconArea: {
    width: '10%',
  },
  TextInputArea: {
    width: '80%',
    height: '100%',
  },
  inputText: {
    fontSize: scale(15),
  },
  smallCenteredView: {
    flex: 1,
  },
  smallModalView: {
    height: scale(280),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(8),
    marginTop: scale(58),
    marginLeft: scale(20),
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
  },
  modalIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: scale(30),
    alignItems: 'center',
  },
  itemCategory: {
    backgroundColor: '#f0f0f0',
    marginBottom: scale(10),
    paddingLeft: scale(5),
  },
  titleLesson: {
    justifyContent: 'center',
    marginLeft: scale(20),
    width: scale(300),
    height: scale(40),
  },
  body: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  layer: {
    flexDirection: 'row',
  },
  FlatList: {
    padding: scale(10),
    width: '100%',
  },
  btnExamination: {
    width: scale(200),
    height: scale(40),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    margin: scale(10),
  },
  image: {
    flex: 1,
    height: scale(50),
    width: scale(80),
  },
});
