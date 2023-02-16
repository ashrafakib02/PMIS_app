import { Alert, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Footer from './Footer'
import tw from 'tailwind-react-native-classnames'
import ActivityByPackage from '../Components/ActivityByPackage'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants"

export default function ESHSContractorFeedback({ route }) {

    const { eshs_obs_id } = route.params
    const contractorId=global.user_cd;
    const [file, setFile] = useState([]);
    const [action, setAction] = useState('');
    const eshs_con_form = global.eshs_con_form;
    const eshs_con_form_fileUpload = global.eshs_con_form_fileUpload;

    const navigation = useNavigation();

    let nextdocId = 0;
    let nextFileId = 0;
    let DocuploadResult = 0;
    const SubmitFn = () => {
        if (action.length == 0) {
          alert("Please Enter Taken Action Details.");
    
        }
        else if (file.length == 0) {
          alert("Please Select a File!");
    
        } else {
        fetch(eshs_con_form,
          {
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: eshs_obs_id,
                con_id: contractorId,
                packge2: action.value,
            
            }),
          })
          .then((response) => response.json())
          .then((response) => {
            let loginObj = JSON.stringify(response);
            var parsed = JSON.parse(loginObj);
            var success = parsed.success;
            if (success == 1) {
              uploadDocFiles();
            } else {
              alert("Data Not Added!!");
            }
          }).catch((error) => { alert("Error " + error) })
        }
      }
      const uploadDocFiles = async () => {
       
          // If file selected then create FormData
          for (let i = 0; i < file.length; i++) {
    
            const fileToUpload = file[i];
            const data = new FormData();
            data.append('name', fileToUpload.name);
            data.append('file_attachment', fileToUpload);
            // Please change file upload URL
            let res = await fetch(
                eshs_con_form_fileUpload,
              {
                method: 'post',
                body: data,
                headers: {
                  'Content-Type': 'multipart/form-data; ',
                },
              }
            );
            let responseJson = await res.json();
            if (responseJson.status == 1) {
              DocuploadResult++;
    
            }
          }
          if (DocuploadResult = file.length) {
            Alert.alert(
              "SUCCESS",
              "Data Added Successfully",
              [
                {
                  text: "Cancel",
                  onPress: () => navigation.replace('EshsContractorDash'),
                  style: "cancel"
                },
                {
                  text: "OK", 
                  onPress: () => navigation.replace('EshsContractorDash'),
                  
                }
              ]
            );
        }
      };
    const docDataPicker = (docFull) => {
        setFile([...file, docFull]);
    
        console.log("Doc: " + file);
      };
    
      const pickDocument = () => {
        let result = DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
          if (response.type == 'success') {
            let { name, size, uri } = response;
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
              name: name,
              size: size,
              uri: uri,
              type: "application/" + fileType
            };
            console.log(fileToUpload.name, '...............file');
    
            docDataPicker(fileToUpload);
    
          }
        });
    
      }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={styles.container}>
      <Text style={styles.header}>Please fill the form</Text>
      <ScrollView style={{ flex: 1, margin: 2, }}>
      <View style={{borderWidth:2,borderColor:'blue',padding:10,margin:5}}>
      <View>
            <Text style={styles.titleBoxBig}>Corrective Action Taken </Text>
            <TextInput style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={text => setAction({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner 
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5  text-indigo-700`, styles.titleBox]}>Attachment</Text>
            <Text onPress={pickDocument} style={[tw`mt-2.5 ml-1.5  text-indigo-700`, styles.DataBox]}>Attach Document</Text>
          </View>

          <ScrollView style={[tw`text-indigo-700`, styles.DocBox]} horizontal={true}>
            {file.map(data =>
              <View>
                {data.name.includes('.pdf') ?

                  <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png' }}
                    style={{ width: 200, height: 200, margin: 10, padding: 5 }} />


                  :

                  <Image source={{ uri: data.uri }}
                    style={{ width: 200, height: 200, margin: 10, padding: 5 }}
                  />
                }
              </View>
            )}
          </ScrollView>
          <TouchableOpacity onPress={SubmitFn}
            style={{
              flex: 1,
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
      </ScrollView>
    </View>
    <Footer />
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  margin: 10,
  borderColor: 'black',
  borderWidth: 1
}, header: {
  margin: 10,
  fontSize: 18,
  fontWeight: 'bold'
},
titleBox: {

  backgroundColor: 'blue',
  color: 'white',
  padding: 5,
  fontSize: 14,
  width: 100,
  textAlignVertical: "center"


},
DataBox: {
  flex: 1,
  borderColor: 'black',
  borderWidth: 1,
  padding: 5,
  fontSize: 14,
  backgroundColor: '#d0f5e6',
  textAlignVertical: 'center'
},
dropDown: {
  flex: 1,
  borderColor: 'black',
  borderWidth: 1,
  fontSize: 14,
  backgroundColor: '#d0f5e6'
},
DocBox: {
  flex: 1,
  borderColor: 'black',
  borderWidth: 1,
  fontSize: 14,
  marginTop: 5
},
DocDataBox: {
  flex: 1,
  borderColor: 'black',
  borderWidth: 1,
  padding: 5,
  fontSize: 14,
  backgroundColor: '#d0f5e6',
  textAlignVertical: 'center',
  marginBottom: 5
},
DataInputBox: {
  flex: 1,
  borderColor: 'black',
  borderWidth: 1,
  padding: 5,
  fontSize: 14,
},
titleBoxBig: {
  flex: 1,
  backgroundColor: 'blue',
  color: 'white',
  padding: 5,
  fontSize: 14,
  marginTop: 10,
 
},
DataBoxBig: {
  flex: 1,
  borderColor: 'black',
  borderWidth: 1,
  padding: 5,
  fontSize: 14,
  marginTop: 5,
  
  height: 150,
  flexShrink: 1,
  textAlignVertical: "top",
},

})