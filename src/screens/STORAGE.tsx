// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     Modal,
//     Touchable,
//     TouchableOpacity,
//   } from 'react-native';
//   import React, {useEffect, useState} from 'react';
//   import {COLORS} from '../theme/theme';
//   import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  
//   import {useNavigation} from '@react-navigation/native';
//   import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//   import {HomeStackParamsList} from '../router/HomeStack';
//   import {NativeStackScreenProps} from '@react-navigation/native-stack';
  
//   type EDProps = NativeStackScreenProps<HomeStackParamsList, 'ED'>;
  
//   const ED = ({route}: EDProps) => {
//     const {imagePath} = route.params;
  
//     const [isModalVisible, setIsModalVisible] = useState(true);
//     const [imageUri, setImageUri] = useState<string | undefined>(imagePath);
  
//     const navigation =
//       useNavigation<NativeStackNavigationProp<HomeStackParamsList>>();
  
//     const returnHandler = () => {
//       navigation.goBack()
//     };
//     // Pass the image to
//     const ProcessImage = () => {};
//     return (
//       <Modal animationType="fade" transparent={false} visible={isModalVisible}>
//         <View style={styles.container}>
//           <Text style={styles.headText}>Do you want to recognize emotions?</Text>
//           <View style={styles.bodyImage}>
//             <Image source={{uri: imagePath}} style={styles.image} />
//           </View>
//           <View style={styles.botBar}>
//             <TouchableOpacity style={styles.button} onPress={returnHandler}>
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={ProcessImage}>
//               <Text style={styles.buttonText}>Proceed</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   };
  
//   export default ED;
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: COLORS.primaryBlackHex,
//       // alignItems: 'center',
//       padding: 20,
//     },
//     headText: {
//       color: COLORS.primaryWhiteHex,
//       fontSize: 20,
//       textAlign: 'center',
//     },
//     bodyImage: {
//       flex: 1,
//       alignItems: 'center',
//       marginVertical: 10,
//     },
//     botBar: {
//       flexDirection: 'row',
//       justifyContent: 'space-evenly',
//     },
//     image: {
//       flex: 1,
//       width: '90%',
//     },
//     button: {
//       width: 140,
//       height: 50,
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: COLORS.primaryOrangeHex,
//     },
//     buttonText: {
//       color: COLORS.primaryWhiteHex,
//       fontSize: 18,
//     },
//   });
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------