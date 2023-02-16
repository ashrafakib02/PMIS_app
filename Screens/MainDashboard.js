import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import React from 'react'
import Footer from './Footer'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCardBasic from "../Components/MaterialCardBasic";
import MaterialCardBasic2 from "../Components/MaterialCardBasic2";
import { Center } from 'native-base';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationActions } from '@react-navigation/native';
import Header from '../Components/Header';



export default function MainDashboard({ navigation }) {

  const LogoutFn = () => {
    Alert.alert(
      "LOGOUT",
      "Are You sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("CANCEL PRESSED"),
          style: 'default'
        },
        {
          text: "LOGOUT",
          onPress: () => {
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
            })
          },
          style: 'cancel'
        }
      ]
    )



  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.container}>

        <ImageBackground source={require('../assets/untitled.png')} style={{ flex: 1, width: '100%', resizeMode: "contain", height: '100%', }}>
          <View style={styles.container}>
            <Header />
            <Text style={styles.moduleDashboard}>Module {"\n"}Dashboard</Text>

          </View>
          <MaterialCardBasic style={styles.materialCardBasic}></MaterialCardBasic>
          <MaterialCardBasic2 style={styles.materialCardBasic2} ></MaterialCardBasic2>
        </ImageBackground>
      </View>
      <Footer />
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    top: -378,
    width: "100%",
    position: "absolute",
    bottom: -208,
    left: 0
  },
  materialCardBasic2: {
    height: 186,
    width: 146,
    position: "absolute",
    left: 193,
    top: 220,
    shadowColor: "rgba(0,0,1,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 15,
    shadowOpacity: 0.45,
    shadowRadius: 5
  },
  materialCardBasic: {
    height: 186,
    width: 146,
    position: "absolute",
    left: 22,
    top: 220,
    shadowColor: "rgba(0,0,1,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 15,
    shadowOpacity: 0.45,
    shadowRadius: 5
  },
  moduleDashboard: {
    top: 60,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'serif',
    color: 'rgba(255,255,255,1)',
    fontSize: 36,
    textAlign: "center",
  },
  container2: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10

  },
  caption: {
    color: 'white',
    fontSize: 24
  }


});