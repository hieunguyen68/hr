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
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthorIcon, MoneyIcon, Clock, Edit, Can, Plus} from '../../svg/icon';
import HTML from 'react-native-render-html';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const CandidateProfile = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [newsID, setNewsID] = useState('');
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const DATA = [
    {
      id: '1',
      image: (
        <Image style={styles.image} source={require('../../img/avt.jpg')} />
      ),
      title: 'Business Analyst Lương Upto 25M',
      fullname: 'Nguyễn Văn A',
      loaihinh: 'Thực tập sinh',
    },
    {
      id: '2',
      image: (
        <Image style={styles.image} source={require('../../img/avt.jpg')} />
      ),
      title: 'Business Analyst Lương Upto 25M',
      fullname: 'Nguyễn Văn A',
      loaihinh: 'Thực tập sinh',
    },
    {
      id: '3',
      image: (
        <Image style={styles.image} source={require('../../img/avt.jpg')} />
      ),
      title: 'Business Analyst Lương Upto 25M',
      fullname: 'Nguyễn Văn A',
      loaihinh: 'Thực tập sinh',
    },
  ];
  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile')
          }>
          <View style={[styles.itemNew, {backgroundColor}]}>
            <View style={styles.layer}>
              <View style={styles.imageNew}>{item.image}</View>
              <View style={styles.text}>
                <View style={styles.viewNew}>
                  <Text style={styles.timeText1} numberOfLines={2}>
                    {item.fullname}
                  </Text>
                  <Text style={styles.titleNew} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.iconAndText}>
                    <AuthorIcon />
                    <Text style={styles.authorText}>
                      Vị trí: {item.loaihinh}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default CandidateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  itemNew: {
    marginHorizontal: scale(5),
    alignItems: 'center',
    borderRadius: scale(10),
    marginVertical: scale(5),
    borderRightColor: '#d3d4d4',
    height: scale(80),
    width: '96%',
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
    height: scale(90),
    width: '95%',
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#f6821f',
  },
  iconAndText: {
    marginTop: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconday: {
    marginTop: scale(5),
    marginLeft: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    marginLeft: scale(10),
    color: 'black',
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
  },
  text: {
    marginLeft: scale(100),
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
    width: '60%',
    backgroundColor: 'white',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#000',
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
    alignItems: 'center',
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