import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "../global"

function MaterialCardBasic2(props) {

  const navigation = useNavigation();

  const EshsDashChooser = () => {
    if (global.eshs_contractor == "1") {
      navigation.navigate("EshsContractorDash");
    } else if (global.eshs_super == "1") {
      navigation.navigate("EshsGCDashboard");
    } 
    else if (global.rfi_cre == "1") {
      navigation.navigate("NcrList");
    } 
    else {
      alert("You are not authorized to use this feature!")
    }
  }
  return (
    <TouchableOpacity onPress={EshsDashChooser} style={[styles.container, props.style]}>
      <Image
        source={require("../assets/eshs.png")}
        style={styles.cardItemImagePlace}
      ></Image>
      <View
        style={[
          styles.body,
          {
            backgroundColor: props.body || undefined
          }
        ]}
      >
        <Text style={styles.bodyText}>
          {props.bodyText ||
            "ESHS"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 5,
    overflow: "hidden"
  },
  cardItemImagePlace: {
    backgroundColor: "white",
    resizeMode: 'contain',
    flex: 1,
    padding: 10,
  },
  body: {
    flex: 1,
    padding: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  bodyText: {
    fontSize: 36,
    color: "#424242",
    alignItems: 'flex-end',
    justifyContent: 'flex-end'

  }
});

export default MaterialCardBasic2;
