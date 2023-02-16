import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from './Footer'
import tw from 'tailwind-react-native-classnames'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import AllSupervisor from '../Components/AllSupervisor'
import '../global'
import { useNavigation } from '@react-navigation/native'


export default function RfiVerification({ route }){
    const navigation = useNavigation();

    const { rfi_form_id } = route.params;
    const [isSelected, setIsSelected] = useState(true); 

    const [bgColor, setBgColor] = useState('#f0eef7'); 
    const verify_rfi = global.verify_rfi;

    const [superId, setSuperId] = useState('0');
    const [checkString, setCheckString] = useState('0');

    const dataFetch = (data) => {
        setSuperId(data);
      }
        
    const onSelectCheck = (index, value) => {
        setCheckString(value);
        console.log(checkString);
    };
    const SubmitFn = () => {
        if (checkString=='1' && superId == '0') {
          alert("Please Select a Supervisor");
    
        }
        else {
        fetch(verify_rfi,
          {
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: rfi_form_id,
                verificationString: checkString,
                supervisorID: superId,
             
            }),
          })
          .then((response) => response.json())
          .then((response) => {
            let loginObj = JSON.stringify(response);
            var parsed = JSON.parse(loginObj);
            var success = parsed.success;
            if (success == 1) {
                Alert.alert(
                    "SUCCESS",
                    "Verification Successful",
                    [
                      {
                        text: "Cancel",
                        onPress: () => navigation.replace('RFICreDash'),
                        style: "cancel"
                      },
                      {
                        text: "OK", 
                        onPress: () => navigation.replace('RFICreDash'),
                      }
                    ]
                  );            } else {
              alert("Data Not Added!!");
            }
          }).catch((error) => { alert("Error " + error) })
        }
      }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',padding:5 }}>
    <Header style={{ color: 'black' }} />
    <View style={{flex:1}}>
    <View>
      <Text style={tw` ml-5 mt-10 font-bold text-base text-indigo-900`}>Consultant’s (CRE) Response </Text>
    </View>
    <View style={{ borderWidth:1.5, backgroundColor: 'white',padding:10,marginTop:10}}>
    
    
    <View style={{backgroundColor:'blue',marginTop:20}}>
      <Text style={tw` ml-2 mt-1 mb-1 font-bold text-base text-white`}>Verification Action</Text>
    </View>   
    <RadioGroup style={{  borderWidth: 1, borderColor: 'black', padding: 5, marginLeft: 10, marginRight: 10, marginTop: 5, justifyContent: 'space-evenly' }}
                            size={24}
                            thickness={2}
                            color='#9575b2'
                            highlightColor='#C1F9FF'
                            selectedIndex={1}
                            onSelect={(index, value) => onSelectCheck(index, value)}
                        >
                            <RadioButton
                                value='1'
                                color='blue'
                            >
                                <Text>Verified</Text>
                            </RadioButton>

                            <RadioButton
                                value='0'
                                color='blue'
                            >
                                <Text>Not Verified</Text>
                            </RadioButton>
                        </RadioGroup>
                        {checkString != ('0') ?
                           <View >
                            <View style={{backgroundColor:'blue',marginTop:5}}>
                            <Text style={tw` ml-2 mt-1 mb-1 font-bold text-base text-white`}>Activity</Text>
                            </View>
                           <View style={{  borderWidth: 1, borderColor: 'black', padding: 5, marginLeft: 10, marginRight: 10, marginTop: 5, justifyContent: 'space-evenly' }}>
                             <AllSupervisor onChange={dataFetch} style={styles.DataBox} />
                           </View>
                           <View >

    </View>  
                           </View> : null


                        }

<TouchableOpacity onPress={SubmitFn}
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
              marginBottom: 5,
              backgroundColor: 'blue',
              padding: 5,
              borderRadius: 5
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', justifyContent: 'center' }}>Submit</Text>

          </TouchableOpacity>

    </View>
   
    </View>
    <Footer/>
  </SafeAreaView>

  )
}


const styles = StyleSheet.create({
    flexdiv: {
        borderWidth: 1.5,

        borderColor:'blue',
        borderRadius:10,
        padding: 10,
        marginTop:30,
        marginLeft:10,
        marginRight:10,
        borderColor:'blue',
        borderRadius:10,


    },
})