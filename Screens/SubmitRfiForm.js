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


export default function SubmitRfiForm() {
  const navigation = useNavigation();
  const contractor = global.contractor_name;
  const id = global.user_cd;
  const packageString = global.package_title;
  const form_rfi = global.form_rfi;
  const uploadURL = global.fileupload;
  const employerString = "HRIDC";
  const engineerString = "GC HORC (RITES-SMEC JV)";

  const [rfiNo, setRfiNo] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [inCharge, setInCharge] = useState('');

  const [date2, setDate2] = useState('');
  const [time2, setTime2] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [fileResponse, setFileResponse] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [file, setFile] = useState([]);
  const [activityString, setActivityString] = useState('');
  const [activityDetailString, setActivityDetailString] = useState('NULL');
  let nextdocId = 0;
  let nextFileId = 0;
  let DocuploadResult = 0;
  const dataFetch = (data) => {
    setActivityString(data);
  }
  const showDatePicker2 = () => {
    setTimePickerVisibility(true);
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

  const SubmitFn = () => {
    if (rfiNo.length == 0) {
      alert("Please Enter RFI No.!");

    }
    else if (activityString.length == 0 || activityString == 'Select Activity') {
      alert("Please Select Activity!");

    }
    else if ((activityString == 'Other Activities' && activityDetailString == 'NULL')||(activityString == 'Other Activities' && activityDetailString.value.length==0)) {
      alert("Please Select Activity Details!")

    }
    else if (description.length == 0) {
      alert("Please Enter Description!");

    } else if (location.length == 0) {
      alert("Please Enter Location!");

    } else if (inCharge.length == 0) {
      alert("Please Enter Person In Charge!");

    } else if (date2.length == 0) {
      alert("Please Enter Date!");

    } else if (time2.length == 0) {
      alert("Please Enter Time!");

    }
    else if (file.length == 0) {
      alert("Please Select a File!");

    } else {
    fetch(form_rfi,
      {
        method: 'post',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packag2: packageString,
          user_id: id,
          employer2: employerString,
          engineer2: engineerString,
          contractor2: contractor,
          rfi_no2: rfiNo.value,
          activity3: activityString,
          activity4: activityDetailString.value,
          description2: description.value,
          location2: location.value,
          picow2: inCharge.value,
          inspect_date2: date2,
          inspect_time2: time2,
          submission_date2: currentDate,
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
          uploadURL,
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
              onPress: () => navigation.replace('RFIcontractorDash'),
              style: "cancel"
            },
            {
              text: "OK", 
              onPress: () => navigation.replace('RFIcontractorDash'),
              
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
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Package</Text>
            <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{packageString}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Employer</Text>
            <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{employerString}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Engineer</Text>
            <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{engineerString}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Contractor</Text>
            <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{global.contractor_name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>RFI No.</Text>
            <TextInput style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataInputBox]}
              onChangeText={text => setRfiNo({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Activity</Text>
            <View style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.dropDown]}>
              <ActivityByPackage onChange={dataFetch} style={styles.DataBox} />
            </View>

          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            {activityString == 'Other Activities' ?
              <TextInput style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataInputBox]}
                onChangeText={text => setActivityDetailString({ value: text, error: '' })}
              /> : null


            }
          </View>
          <View style={{ flex: 1, }}>
            <Text style={styles.titleBoxBig}>Description of Work</Text>
            <TextInput style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={text => setDescription({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner 
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1, }}>
            <Text style={styles.titleBoxBig}>Location (in Details) with Chainage</Text>
            <TextInput style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={text => setLocation({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner 
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1, }}>
            <Text style={styles.titleBoxBig}>Person In-Charge of Work (PICOW)</Text>
            <TextInput style={[tw`text-indigo-700`, styles.DataBoxBig]}
              multiline={true} // ios fix for centering it at the top-left corner 
              numberOfLines={10}
              onChangeText={text => setInCharge({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Date of inspection</Text>
            <Text onPress={showDatePicker} style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{date2}</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Time of inspection</Text>
            <Text onPress={showDatePicker2} style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{time2}</Text>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Date of Submission</Text>
            <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{currentDate}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Attachment</Text>
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
    margin: 10
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