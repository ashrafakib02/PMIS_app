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
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'


export default function InspectionForm({ route }) {
    const navigation = useNavigation();
    const { rfi_form_id } = route.params;
    const { rfi_no } = route.params;
    const { package_name } = route.params;
    const inspect_submit = global.inspect_submit;
    const fileupload_ins = global.fileupload_ins;
    const fileupload_check = global.fileupload_check;

    const user_cd = global.user_cd;

    const [file, setFile] = useState([]);
    const [file2, setFile2] = useState([]);
    const [date2, setDate2] = useState('');
    const [time2, setTime2] = useState('');
    const [observation, setObservation] = useState('');
    const [checkDetail, setCheckDetail] = useState('NULL');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [doc, setDoc] = useState();
    const [uri, setUri] = useState();
    const [state, setState] = useState('');
    const [state2, setState2] = useState('');
    const [checkString, setCheckString] = useState('0');
    const [approvalString, setApprovalString] = useState('1');
    let DocuploadResult = 0;
    let DocuploadResult2 = 0;
    // var approvalString = '';
    // var checkString = '';
    const showDatePicker2 = () => {
        setTimePickerVisibility(true);
    };
    const onSelectApproval = (index, value) => {
        setApprovalString(value);
        setState(index);
    };
    const onSelectCheck = (index, value) => {
        setCheckString(value);
        setState2(index);
        console.log(checkString);
    };
    const hideDatePicker2 = () => {
        setTimePickerVisibility(false);
    };


    const handleConfirm2 = (date) => {

        // setDate2(date);
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        setTime2(hours + ':' + min + ':' + sec);
        console.warn("A time has been picked: ", date);
        hideDatePicker2();
    };
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const handleConfirm = (date) => {
        // setDate2(date);
        var curDate = date.getDate();
        var curMonth = date.getMonth() + 1;
        var curYear = date.getFullYear();
        setDate2(curYear + '-' + curMonth + '-' + curDate);

        console.warn("A date has been picked: " + ActualDate);
        hideDatePicker();
    };

    useEffect(async () => {
        var curDate = new Date().getDate()
        var curMonth = new Date().getMonth() + 1
        var curYear = new Date().getFullYear()
        setCurrentDate(curYear + '-' + curMonth + '-' + curDate)


    }, []);

    const insSubmit = () => {
        if (date2.length == 0) {
            alert("Please Enter Date!");

        } else if (time2.length == 0) {
            alert("Please Enter Time!");

        } else if (observation.length == 0) {
            alert("Please Enter Observation!");

        } else if (date2.length == 0) {
            alert("Please Enter Date!");

        } else if (time2.length == 0) {
            alert("Please Enter Time!");

        } else if (checkString == '1' && checkDetail.length == 0) {
            alert("Please Enter Detail!");

        }
        else if (file.length == 0) {
            alert("Please Select a File for RFI Checklist!");
      
          } else if (file2.length == 0) {
            alert("Please Select a File for Other Document!");
      
          }  
        else {

            fetch(inspect_submit,
                {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        packag2: package_name,
                        rfiNo2: rfi_no,
                        observe2: observation.value,
                        date3: date2,
                        time2: time2,
                        approveString: approvalString,
                        checkString: checkString,
                        detail2:checkDetail.value,
                        super_id: user_cd,
                        rfi_id: rfi_form_id,

                    }),
                })
                .then((response) => response.json())
                .then((response) => {
                    let loginObj = JSON.stringify(response);
                    var parsed = JSON.parse(loginObj);
                    var success = parsed.success;
                    if (success == 1) {
                        uploadDocFiles();}
                }).catch((error) => { alert("Error " + error) })

        }

    }
    const uploadDocFiles = async () => {
   
        // If file selected then create FormData
        for (let i = 0; i < file.length; i++) {
  
          const fileToUpload = file[i];
          const data = new FormData();
          
          data.append('rfi_id',rfi_form_id);
          data.append('name', fileToUpload.name);
          data.append('file_attachment', fileToUpload);
          // Please change file upload URL
          let res = await fetch(
            fileupload_check,
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
            uploadDocFiles2();
      }
    };
    const uploadDocFiles2 = async () => {
   
        // If file selected then create FormData
        for (let i = 0; i < file2.length; i++) {
  
          const fileToUpload = file2[i];
          const data = new FormData();
          data.append('rfi_id',rfi_form_id);
          data.append('name', fileToUpload.name);
          data.append('file_attachment', fileToUpload);
          // Please change file upload URL
          let res = await fetch(
            fileupload_ins,
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
            DocuploadResult2++;
  
          }
        }
        if (DocuploadResult2 = file2.length) {
          Alert.alert(
            "SUCCESS",
            "Data Added Successfully",
            [
              {
                text: "Cancel",
                onPress: () => navigation.replace('RFISuperDash'),
                style: "cancel"
              },
              {
                text: "OK", 
                onPress: () => navigation.replace('RFISuperDash'),
              }
            ]
          );
      }
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
      const pickDocument2 = () => {
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
    
            docDataPicker2(fileToUpload);
    
          }
        });
    
      }
      const docDataPicker = (docFull) => {
        setFile([...file, docFull]);
    
        console.log("Doc: " + file);
      };
      const docDataPicker2 = (docFull) => {
        setFile2([...file2, docFull]);
    
        console.log("Doc: " + file2);
      };
        
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Text style={styles.header}>Inspection Details</Text>
                <ScrollView style={{ flex: 1, margin: 2, }}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Package</Text>
                        <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{package_name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>RFI No.</Text>
                        <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{rfi_no}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Date of inspection</Text>
                        <Text onPress={showDatePicker} style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataInputBox]}>{date2}</Text>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Time of inspection</Text>
                        <Text onPress={showDatePicker2} style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataInputBox]}>{time2}</Text>
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirm2}
                            onCancel={hideDatePicker2}
                        />
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.titleBoxBig}>Observation</Text>
                        <TextInput style={[tw`text-indigo-700`, styles.DataBoxBig]}
                            onChangeText={text => setObservation({ value: text, error: '' })}
                            multiline={true} // ios fix for centering it at the top-left corner 
                            numberOfLines={10}
                        />
                    </View>

                    <View style={{ flex: 1, }}>
                        <Text style={styles.titleBoxBig}>Approval</Text>
                        <RadioGroup style={{ flexDirection: 'row', flex: 1, borderWidth: 1, borderColor: 'black', padding: 5, marginLeft: 10, marginRight: 10, marginTop: 5, justifyContent: 'space-evenly' }}
                            size={24}
                            thickness={2}
                            color='#9575b2'
                            highlightColor='#C1F9FF'
                            selectedIndex={0}
                            onSelect={(index, value) => onSelectApproval(index, value)}
                        >
                            <RadioButton
                                value='1'
                                color='blue'
                            >
                                <Text>Approved</Text>
                            </RadioButton>

                            <RadioButton
                                value='2'
                                color='blue'
                            >
                                <Text>Not Approved</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.titleBoxBig}>Checked by</Text>
                        <RadioGroup style={{ flexDirection: 'row', flex: 1, borderWidth: 1, borderColor: 'black', padding: 5, marginLeft: 10, marginRight: 10, marginTop: 5, justifyContent: 'space-evenly' }}
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
                                <Text>YES</Text>
                            </RadioButton>

                            <RadioButton
                                value='0'
                                color='blue'
                            >
                                <Text>NO</Text>
                            </RadioButton>
                        </RadioGroup>
                        {checkString != ('0') ?
                            <TextInput style={[tw`text-indigo-700`, styles.DataBoxBig]}
                                onChangeText={text => setCheckDetail({ value: text, error: '' })}
                                multiline={true} // ios fix for centering it at the top-left corner 
                                numberOfLines={10}
                            /> : null


                        }
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>RFI Checklist Attachment</Text>
                        <Text onPress={pickDocument} style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>Attach Document</Text>
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
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Other Attachment</Text>
                        <Text onPress={pickDocument2} style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>Attach Document</Text>
                    </View>
                    <ScrollView style={[tw`text-indigo-700`, styles.DocBox]} horizontal={true}>
            {file2.map(data =>
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
                    <TouchableOpacity 
                    onPress={insSubmit}
                    activeOpacity={.8}
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
        fontWeight: 'bold',
        textAlign: 'center',
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
        marginLeft: 10,
        marginRight: 10
    },
    DataBoxBig: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        height: 100,
        flexShrink: 1,
        textAlignVertical: "top",
    },

})