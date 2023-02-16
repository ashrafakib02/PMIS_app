import { Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';



export default function Header () {
const navigation=useNavigation();

  const LogoutFn = () => {
    Alert.alert(
  "LOGOUT",
  "Are You sure?",
  [
    {
      text:"Cancel",
      onPress :()=>console.log("CANCEL PRESSED"),
      style:'default'
    },
    {
      text:"LOGOUT",
      onPress :()=>{
        global.success = "0";
global.user_cd = "0";
global.name = "0";
global.rfi_super = "0";
global.rfi_contractor = "0";
global.rfi_cre = "0";
global.eshs_super = "0";
global.eshs_contractor = "0";
global.eshs_cre = "0";
global.package_code = "0";
global.package_title = "0";
global.contractor_name = "0";

AsyncStorage.setItem('success', "0");
AsyncStorage.setItem('user_cd', "0");
AsyncStorage.setItem('name', "0");
AsyncStorage.setItem('rfi_super', "0");
AsyncStorage.setItem('rfi_contractor', "0");
AsyncStorage.setItem('rfi_cre', "0");
AsyncStorage.setItem('eshs_super', "0");
AsyncStorage.setItem('eshs_contractor', "0");
AsyncStorage.setItem('eshs_cre', "0");
AsyncStorage.setItem('package_code', "0");
AsyncStorage.setItem('package_title', "0");
AsyncStorage.setItem('contractor_name', "0");
navigation.reset({
  index: 0,
  routes: [{ name: 'Login' }]
})},
      style:'cancel'
    }
  ]
)



}


  return (
    <View 
    style={styles.container2}
    >
       <TouchableOpacity style={styles.container2} onPress={LogoutFn}>
      <Icon name={"menu"} style={styles.caption}></Icon>
    </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  materialButtonTransparentHamburger: {
    height: 36,
    width: 36,
    left: 310,
    top: 20
  },
  container2: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    marginTop:10,
    marginRight:10,
    
  
    
  },
  caption: {
    backgroundColor:'grey',
    color: 'white',
    fontSize: 24
  }
})