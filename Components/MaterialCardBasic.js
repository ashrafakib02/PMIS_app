import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "../global"

export default function MaterialCardBasic(props) {
  const navigation = useNavigation();

  const RfiDashChooser = () => {
    if (global.rfi_contractor == "1") {
      navigation.navigate("RFIcontractorDash");
    } else if (global.rfi_super == "1") {
      navigation.navigate("RFISuperDash");
    } else if (global.rfi_cre == "1") {
      navigation.navigate("RFICreDash");
    } else {
      alert("You are not authorized to use this feature!")
    }
  }



  return (
    <TouchableOpacity onPress={RfiDashChooser} style={[styles.container, props.style]}>
      <Image
        source={require("../assets/download.png")}
        style={styles.cardItemImagePlace}
      />
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
            "RFI"}
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


  }
});
