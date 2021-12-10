import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import Swipeout from 'react-native-swipeout';
const { width } = Dimensions.get('window')
const Messenger = ({navigation}) => {
    const data = [
      {
          id: 1,
          avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
          name: 'Crush số 1',
          description: 'Crush số 1 waved at you!'
      },
      {
          id: 2,
          avatar: 'http://sphm-female-site-production.s3-ap-southeast-1.amazonaws.com/2017/07/w111-750x500.jpg',
          name: 'Crush số 2',
          description: 'Em à, Em đã đánh cắp trái tim anh. Vì thế anh sẽ đánh cắp nụ hôn của em'
      },
      {
          id: 3,
          avatar: 'https://bellanyc.com/wp-content/uploads/2017/06/blake-lively.jpg',
          name: 'Crush số 3',
          description: 'Em là nguồn cảm hứng đằng sau tất cả những gì anh làm, làm nguồn gốc của những điều tốt lành trong cuộc sống của anh'
      },
      {
          id: 4,
          avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
          name: 'Crush số 4',
          description: 'Cảm ơn chúa, bởi người đã gửi nữ thần xinh đẹp nhất của thiên đường vào cuộc sống của con.'
      },
      {
          id: 5,
          avatar: 'https://pbs.twimg.com/profile_images/652669289326092288/RsXc7UnS_400x400.jpg',
          name: 'Crush số 5',
          description: 'Anh rất hạnh phúc vì được gặp em, em là điều tuyệt vời nhất trong cuộc sống của anh.'
      },
      {
          id: 6,
          avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
          name: 'Crush số 6',
          description: 'Khi anh yêu em, trái tim em trở nên ấm áp. Hãy để tình yêu ngọt ngào của chúng ta lớn lên theo từng ngày'
      },
      {
          id: 7,
          avatar: 'https://66.media.tumblr.com/2ffbcea054ae96a839d0583f4c56ce38/tumblr_ots4vdLKgl1w0bqvso2_250.gif',
          name: 'Crush số 7',
          description: 'Giữa chúng có một sự sợi dây. Nó buộc trái tim chúng ta lại với nhau vì vậy chúng ta luôn cảm thấy gần nhau dù có cách xa như thế nào?'
      },
      {
          id: 8,
          avatar: 'http://static.global.mnet.com/data/ucc/000/132/089',
          name: 'Crush số 8',
          description: 'Anh muốn tặng em trái tim này và em hãy giữ nó, bởi anh rất vụng về, anh sợ rằng anh sẽ làm mất hoặc dễ dàng tặng nó cho một ai khác'
      },
      {
          id: 9,
          avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
          name: 'Crush số 9',
          description: 'Nếu em dám, hãy nắm lấy tay anh và dẫn anh đến trái tim của em. Anh muốn cảm nhận tình yêu của em.'
      },
      {
          id: 10,
          avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
          name: 'Crush số 10',
          description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
      }
   ];
  //   const Item = () => {
  //     constructor = () => {
  //         this.state = {
  //             activeRowKey: null, //set item active
  //             numberOfRefresh: 0,
  //         };
  //     }

  //     _onOpen = () => {
  //         this.setState({
  //             activeRowKey: this.props.item.key
  //         });
  //     }
  //     _onClose = () => {
  //         if(this.state.activeRowKey != null) {
  //             this.setState({
  //                 activeRowKey: null
  //             });
  //         }
  //     }
  //   render = () => {
  //     const {item} = this.props;
  //     const swipeSettings = {
  //         autoClose: true, //sẽ tự động đóng khi ta click vào buton nào đó trong item được swipe
  //         onOpen: this._onOpen, //khi open swipe thì nên set row nào được active để tránh nhầm lẫn khi ta click sự kiện bên trong các item.
  //         onClose: this._onClose, //xóa row active

  //         //tiếp theo ta sẽ làm swipe phía bên trái
  //         left: [
  //                 {
  //                     onPress: () => {},
  //                     component: (
  //                         <View style={styles.item}>
  //                             <View style={[styles.inItem, {backgroundColor: '#45B8AC'}]}>
  //                                 <Icon name="camera" style={[styles.icon, {color: 'white'}]} />
  //                             </View>
  //                         </View>
  //                     ),
  //                     backgroundColor: 'white'
  //                 },
  //                 {
  //                     onPress: () => {},
  //                     component: (
  //                         <View style={styles.item}>
  //                             <Icon name="phone" style={styles.icon} />
  //                         </View>
  //                     ),
  //                     backgroundColor: 'white'
  //                 },
  //                 {
  //                     onPress: () => {},
  //                     component: (
  //                         <View
  //                             style={styles.item}
  //                         >
  //                             <Icon name="video" style={styles.icon} />
  //                         </View>
  //                     ),
  //                     backgroundColor: 'white'
  //                 }
  //             ],
  //             rowId: this.props.index,
  //             sextionId: 1
  //        };

  //     return (
  //       <Swipeout {...swipeSettings} backgroundColor="white">
  //         <TouchableOpacity>
  //           <View style={styles.container}>
  //             <View style={styles.bgAvatar}>
  //               <Image source={{uri: item.avatar}} style={styles.avatar} />
  //             </View>
  //             <View style={styles.info}>
  //               <Text style={styles.name}>{item.name}</Text>
  //               <Text numberOfLines={1}>{item.description}</Text>
  //             </View>
  //             <View style={styles.bgSeen}>
  //               <Image source={{uri: item.avatar}} style={styles.avatarSeen} />
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //       </Swipeout>
  //     );
  //   }
  // }
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>My Crush</Text>
      </View>
      <FlatList
        ref={'flatList'}
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id} // tránh trùng các item với nhau
        parentFlatList={this} //để lát làm swipe left và swipe right
      />
    </View>
  );
};

export default Messenger;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bgAvatar: {
    flex: 2,
  },
  avatar: {
    width: (width * 15) / 100,
    height: (width * 15) / 100,
    borderRadius: (width * 10) / 100,
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    paddingBottom: 3,
  },
  bgSeen: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSeen: {
    width: (width * 5) / 100,
    height: (width * 5) / 100,
    borderRadius: (width * 2.5) / 100,
  },
});
