import { StyleSheet, Text, ScrollView, Image, Dimensions, View, SafeAreaView, Item, LogBox, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import tw from 'tailwind-react-native-classnames';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import Footer from './Footer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import '../global'

export default function Login({ navigation }) {
    LogBox.ignoreAllLogs();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setisSubmit] = useState(false);
    const LoginUrl = global.Login;

    const LoginFn = () => {

        if (username.length == 0) {
            alert("Please Enter Email!");
            setisSubmit(false);
        } else if (password.length == 0) {
            alert("Please Enter Password!");
            setisSubmit(false);
        } else {

            fetch(LoginUrl,
                {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uname: username.value,
                        password: password.value,
                    }),
                })
                .then((response) => response.json())
                .then((response) => {
                    let loginObj = JSON.stringify(response);
                    var parsed = JSON.parse(loginObj);
                    var success = parsed.success;
                    var name = parsed.name;
                    var email = parsed.email;
                    var user_cd = parsed.user_cd;
                    var rfi_super = parsed.isGCsupervisor;
                    var rfi_contractor = parsed.isRficontractor;
                    var rfi_cre = parsed.isgc_operator_cre;
                    var eshs_super = parsed.isEshsExpert;
                    var eshs_contractor = parsed.isEshsCotractor;
                    var eshs_cre = parsed.isEshsCre;
                    var package_code = parsed.package_code;
                    var package_title = parsed.title;
                    var contractor_name = parsed.contractor_name;

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

                    AsyncStorage.setItem('success', success);
                    AsyncStorage.setItem('name', name);
                    AsyncStorage.setItem('user_cd', user_cd);
                    AsyncStorage.setItem('rfi_super', rfi_super);
                    AsyncStorage.setItem('rfi_contractor', rfi_contractor);
                    AsyncStorage.setItem('rfi_cre', rfi_cre);
                    AsyncStorage.setItem('eshs_super', eshs_super);
                    AsyncStorage.setItem('eshs_contractor', eshs_contractor);
                    AsyncStorage.setItem('eshs_cre', eshs_cre);
                    AsyncStorage.setItem('package_code', package_code);
                    AsyncStorage.setItem('package_title', package_title);
                    AsyncStorage.setItem('contractor_name', contractor_name);


                    if (success == 1) {

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainDashboard' }]
                        })


                    } else {
                        alert("Username and Password Didn't match!!");
                    }
                }).catch((error) => { alert("Error " + error) })
                .finally(setisSubmit(false))
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}>

                <View style={styles.logo}>
                    <Image source={require('../assets/picture.png')} />
                    <Text style={tw`text-2xl mt-5 font-bold text-blue-700`}>Hariyana Orbital Rail Corridor</Text>
                    <Text style={tw`text-2xl font-bold text-blue-700`}>(HORC)</Text>
                </View>
                <View style={[tw`max-h-96 max-w-screen-sm ml-2.5 mr-2.5 rounded-3xl  mt-10 bg-indigo-900`, styles.flexdiv]}>
                    <View style={styles.viewdiv}>
                        <Text style={styles.text}>LOGIN</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput style={{ marginBottom: 10 }}
                            label="Email"
                            autoCapitalize="none"
                            onChangeText={text => setEmail({ value: text, error: '' })}
                        />
                        <TextInput style={{ marginTop: 10 }}
                            label="Password"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={text => setPassword({ value: text, error: '' })}
                        />
                    </View>
                    <View style={{
                        justifyContent: 'space-evenly',
                        marginBottom: 20
                    }}>

                        <TouchableOpacity
                            onPress={LoginFn}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#87CEEB',
                                height: 40,
                                marginLeft: '20%',
                                marginRight: '20%',
                                marginTop: 10

                            }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,

    },
    flexdiv: {
        flex: 1,
        padding: 10


    },
    viewdiv: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,


    },
    text: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'

    },

});