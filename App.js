import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, LogBox, AsyncStorage } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tw from 'tailwind-react-native-classnames';

import Footer from './Screens/Footer';
import Login from './Screens/Login';
import MainDashboard from './Screens/MainDashboard';
import RFIcontractorDash from './Screens/RFIcontractorDash';
import RFICreDash from './Screens/RFICreDash';
import RFISuperDash from './Screens/RFISuperDash';
import RFIList from './Screens/RFIList';
import RFIDetails from './Screens/RFIDetails';
import InspectionDetails from './Screens/InspectionDetails';
import SubmitRfiForm from './Screens/SubmitRfiForm';
import InspectionForm from './Screens/InspectionForm';
import RfiVerification from './Screens/RfiVerification';
import EshsGCDashboard from './Screens/EshsGCDashboard';
import ESHSObservationForm from './Screens/ESHSObservationForm';
import ESHSGCObserveList from './Screens/ESHSGCObserveList';
import ESHSDetails from './Screens/ESHSDetails';
import ESHSGCFeedback from './Screens/ESHSGCFeedback';
import EshsContractorDash from './Screens/EshsContractorDash';
import ESHSContractorFeedback from './Screens/ESHSContractorFeedback';
import IncidentList from './Screens/IncidentList';
import IncidentForm from './Screens/IncidentForm';
import IncedentDetails from './Screens/IncedentDetails';
import IncedentPersonForm from './Screens/IncedentPersonForm';
import IncedentPersonList from './Screens/IncedentPersonList';
import IncedentPersonDetails from './Screens/IncedentPersonDetails';
import NcrForm from './Screens/NcrForm';
import NcrList from './Screens/NcrList';
import NcrDetails from './Screens/NcrDetails';
import NcnConReply from './Screens/NcnConReply';
import NcrClose from './Screens/NcrClose';







LogBox.ignoreAllLogs();

function SplashScreen({ navigation }) {
  const manageData = async () => {
    try {
      var success = await AsyncStorage.getItem('success');
      var name = await AsyncStorage.getItem('name');
      var user_cd = await AsyncStorage.getItem('user_cd');
      var rfi_super = await AsyncStorage.getItem("rfi_super");
      var rfi_contractor = await AsyncStorage.getItem('rfi_contractor');
      var rfi_cre = await AsyncStorage.getItem('rfi_cre');
      var eshs_super = await AsyncStorage.getItem('eshs_super');
      var eshs_contractor = await AsyncStorage.getItem('eshs_contractor');
      var eshs_cre = await AsyncStorage.getItem('eshs_cre');
      var package_code = await AsyncStorage.getItem('package_code');
      var package_title = await AsyncStorage.getItem('package_title');
      var contractor_name = await AsyncStorage.getItem('contractor_name');

    } catch (error) {
      alert("Error while Loading data!");
    }

    global.success = success;
    global.user_cd = user_cd;
    global.name = name;
    global.rfi_super = rfi_super;
    global.rfi_contractor = rfi_contractor;
    global.rfi_cre = rfi_cre;
    global.eshs_super = eshs_super;
    global.eshs_contractor = eshs_contractor;
    global.eshs_cre = eshs_cre;
    global.package_code = package_code;
    global.package_title = package_title;
    global.contractor_name = contractor_name;


  }
  useEffect(() => {
    manageData();
    setTimeout(() => {
      if (success == "1") {
        navigation.replace('MainDashboard');
      } else {
        navigation.replace('Login');
      }

    }, 3000);
  });

  return (

    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Image source={require('./assets/picture.png')} />
        <Text style={tw`text-2xl font-bold text-blue-700`}>Hariyana Orbital Rail Corridor</Text>
        <Text style={tw`text-2xl font-bold text-blue-700`}>(HORC)</Text>
      </View>
      <Footer />
    </View>

  );

}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' >
        <Stack.Screen name="SpashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MainDashboard" component={MainDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="RFIcontractorDash" component={RFIcontractorDash} options={{ headerShown: false }} />
        <Stack.Screen name="RFICreDash" component={RFICreDash} options={{ headerShown: false }} />
        <Stack.Screen name="RFISuperDash" component={RFISuperDash} options={{ headerShown: false }} />
        <Stack.Screen name="RFIList" component={RFIList} options={{ headerShown: false }} />
        <Stack.Screen name="RFIDetails" component={RFIDetails} options={{ headerShown: false }} />
        <Stack.Screen name="InspectionDetails" component={InspectionDetails} options={{ headerShown: false }} />
        <Stack.Screen name="SubmitRfiForm" component={SubmitRfiForm} options={{ headerShown: false }} />
        <Stack.Screen name="InspectionForm" component={InspectionForm} options={{ headerShown: false }} />
        <Stack.Screen name="RfiVerification" component={RfiVerification} options={{ headerShown: false }} />
        <Stack.Screen name="EshsGCDashboard" component={EshsGCDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="ESHSObservationForm" component={ESHSObservationForm} options={{ headerShown: false }} />
        <Stack.Screen name="ESHSGCObserveList" component={ESHSGCObserveList} options={{ headerShown: false }} />
        <Stack.Screen name="ESHSDetails" component={ESHSDetails} options={{ headerShown: false }} />
        <Stack.Screen name="ESHSGCFeedback" component={ESHSGCFeedback} options={{ headerShown: false }} />
        <Stack.Screen name="EshsContractorDash" component={EshsContractorDash} options={{ headerShown: false }} />
        <Stack.Screen name="ESHSContractorFeedback" component={ESHSContractorFeedback} options={{ headerShown: false }} />
        <Stack.Screen name="IncidentList" component={IncidentList} options={{ headerShown: false }} />
        <Stack.Screen name="IncidentForm" component={IncidentForm} options={{ headerShown: false }} />
        <Stack.Screen name="IncedentDetails" component={IncedentDetails} options={{ headerShown: false }} />
        <Stack.Screen name="IncedentPersonForm" component={IncedentPersonForm} options={{ headerShown: false }} />
        <Stack.Screen name="IncedentPersonList" component={IncedentPersonList} options={{ headerShown: false }} />
        <Stack.Screen name="IncedentPersonDetails" component={IncedentPersonDetails} options={{ headerShown: false }} />
        <Stack.Screen name="NcrForm" component={NcrForm} options={{ headerShown: false }} />
        <Stack.Screen name="NcrList" component={NcrList} options={{ headerShown: false }} />
        <Stack.Screen name="NcrDetails" component={NcrDetails} options={{ headerShown: false }} />
        <Stack.Screen name="NcnConReply" component={NcnConReply} options={{ headerShown: false }} />
        <Stack.Screen name="NcrClose" component={NcrClose} options={{ headerShown: false }} />






        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

});
