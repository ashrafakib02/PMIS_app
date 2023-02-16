import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Footer from './Footer'
import tw from 'tailwind-react-native-classnames'
import AllPackages from '../Components/AllPackages'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

export default function ESHSObservationForm() {
  const navigation = useNavigation()
  const contractor = global.contractor_name
  const id = global.user_cd
  const eshs_observ_form = global.eshs_observ_form
  const eshs_form_fileUpload = global.eshs_form_fileUpload

  const [packageString, setpackageString] = useState('')
  const [lid, setLid] = useState('')
  const [observeNo, setObserveNo] = useState('')
  const [date2, setDate2] = useState('')
  const [time2, setTime2] = useState('')
  const [location, setLocation] = useState('')
  const [enRepresent, setEnRepresent] = useState('')
  const [conRepresent, setConRepresent] = useState('')
  const [description, setDescription] = useState('')
  const [recommend, setRecommend] = useState('')
  const [responsible, setResponsible] = useState('')
  const [targetDate2, setTargetDate2] = useState('')
  const [remarks, setRemarks] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false)

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [fileResponse, setFileResponse] = useState([])
  const [user, setUser] = useState('0')
  const [currentDate, setCurrentDate] = useState('')
  const [file, setFile] = useState([])
  let nextdocId = 0
  let nextFileId = 0
  let DocuploadResult = 0
  const dataFetch = (data, label, user2) => {
    setpackageString(label)
    setLid(data)
    setUser(user2)
  }
  const showDatePicker2 = () => {
    setTimePickerVisibility(true)
  }

  const hideDatePicker2 = () => {
    setTimePickerVisibility(false)
  }

  const handleConfirm2 = (date) => {
    // setDate2(date);
    var hours = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()
    setTime2(hours + ':' + min + ':' + sec)
    console.warn('A time has been picked: ', date)
    hideDatePicker2()
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  const showDatePicker3 = () => {
    setDatePickerVisibility2(true)
  }
  const hideDatePicker3 = () => {
    setDatePickerVisibility2(false)
  }

  const handleConfirm = (date) => {
    // setDate2(date);
    var curDate = date.getDate()
    var curMonth = date.getMonth() + 1
    var curYear = date.getFullYear()
    setDate2(curYear + '-' + curMonth + '-' + curDate)

    console.warn('A date has been picked: ' + ActualDate)
    hideDatePicker()
  }
  const handleTargetConfirm = (date2) => {
    // setDate2(date);
    var curDate = date2.getDate()
    var curMonth = date2.getMonth() + 1
    var curYear = date2.getFullYear()
    setTargetDate2(curYear + '-' + curMonth + '-' + curDate)

    console.warn('A date has been picked: ' + ActualDate)
    hideDatePicker3()
  }

  useEffect(async () => {
    var curDate = new Date().getDate()
    var curMonth = new Date().getMonth() + 1
    var curYear = new Date().getFullYear()
    setCurrentDate(curYear + '-' + curMonth + '-' + curDate)
  }, [])

  const SubmitFn = () => {
    if (packageString.length == 0 || packageString == 'Select Package') {
      alert('Please Select a Package')
    } else if (user == '0') {
      alert(
        'Sorry!! No Contractor is assigned to this package. Select Another.',
      )
    } else if (observeNo.length == 0) {
      alert('Please Enter Observation No.!')
    } else if (date2.length == 0) {
      alert('Please Enter Date!')
    } else if (time2.length == 0) {
      alert('Please Enter Time!')
    } else if (location.length == 0) {
      alert('Please Enter Location!')
    } else if (enRepresent.length == 0) {
      alert('Please Enter Engineer’s Representative !')
    } else if (conRepresent.length == 0) {
      alert('Please Enter Contractor’s Representative!')
    } else if (description.length == 0) {
      alert('Please Enter Observation Description!')
    } else if (recommend.length == 0) {
      alert('Please Enter Recommendation!')
    } else if (responsible.length == 0) {
      alert('Please Enter Responsible/ Action by!')
    } else if (targetDate2.length == 0) {
      alert('Please Enter Target Date !')
    } else if (remarks.length == 0) {
      alert('Please Enter Remarks!')
    } else if (file.length == 0) {
      alert('Please Select a File!')
    } else {
      fetch(eshs_observ_form, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: packageString,
          code: lid,
          observation2: observeNo.value,
          date2: date2,
          time2: time2,
          location2: location.value,
          eng_represent2: enRepresent.value,
          con_represent2: conRepresent.value,
          description2: description.value,
          recommend2: recommend.value,
          actionBy2: responsible.value,
          targetDate2: targetDate2,
          user_cd: user,
          remarks2: remarks.value,
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          let loginObj = JSON.stringify(response)
          var parsed = JSON.parse(loginObj)
          var success = parsed.success
          if (success == 1) {
            uploadDocFiles();
          } else {
            alert('Data Not Added!!')
          }
        })
        .catch((error) => {
          alert('Error 1' + error)
        })
    }
  }
  const uploadDocFiles = async () => {
    // If file selected then create FormData
    for (let i = 0; i < file.length; i++) {
      const fileToUpload = file[i]
      const data = new FormData()
      data.append('name', fileToUpload.name)
      data.append('file_attachment', fileToUpload)
      // Please change file upload URL
      let res = await fetch(eshs_form_fileUpload, {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      })
      let responseJson = await res.json()
      if (responseJson.status == 1) {
        DocuploadResult++
      }
    }
    if ((DocuploadResult = file.length)) {
      Alert.alert('SUCCESS', 'Data Added Successfully', [
        {
          text: 'Cancel',
          onPress: () => navigation.replace('ESHSGCObserveList'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.replace('ESHSGCObserveList'),
        },
      ])
    }
  }
  const docDataPicker = (docFull) => {
    setFile([...file, docFull])

    console.log('Doc: ' + file)
  }

  const pickDocument = () => {
    let result = DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == 'success') {
        let { name, size, uri } = response
        let nameParts = name.split('.')
        let fileType = nameParts[nameParts.length - 1]
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: 'application/' + fileType,
        }
        console.log(fileToUpload.name, '...............file')

        docDataPicker(fileToUpload)
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Please fill the form</Text>
        <ScrollView style={{ flex: 1, margin: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Package
            </Text>
            <View
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.dropDown,
              ]}
            >
              <AllPackages onChange={dataFetch} style={styles.DataBox} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Observation No.
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setObserveNo({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Date
            </Text>
            <Text
              onPress={showDatePicker}
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {date2}
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Time
            </Text>
            <Text
              onPress={showDatePicker2}
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {time2}
            </Text>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Location (with Chainage)
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setLocation({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Engineer’s Representative{' '}
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) =>
                setEnRepresent({ value: text, error: '' })
              }
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Contractor’s Representative
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) =>
                setConRepresent({ value: text, error: '' })
              }
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>Observation Description</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) =>
                setDescription({ value: text, error: '' })
              }
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>Recommendation</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) => setRecommend({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Responsible/ Action by{' '}
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) =>
                setResponsible({ value: text, error: '' })
              }
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Target Date{' '}
            </Text>
            <Text
              onPress={showDatePicker3}
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {targetDate2}
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={handleTargetConfirm}
              onCancel={hideDatePicker3}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>Remarks </Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
              onChangeText={(text) => setRemarks({ value: text, error: '' })}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Attachment
            </Text>
            <Text
              onPress={pickDocument}
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              Attach Document
            </Text>
          </View>

          <ScrollView
            style={[tw`text-indigo-700`, styles.DocBox]}
            horizontal={true}
          >
            {file.map((data) => (
              <View>
                {data.name.includes('.pdf') ? (
                  <Image
                    source={{
                      uri:
                        'https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png',
                    }}
                    style={{ width: 200, height: 200, margin: 10, padding: 5 }}
                  />
                ) : (
                  <Image
                    source={{ uri: data.uri }}
                    style={{ width: 200, height: 200, margin: 10, padding: 5 }}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={SubmitFn}
            style={{
              flex: 1,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
              marginBottom: 5,
              backgroundColor: 'blue',
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              Submit
            </Text>
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
    borderWidth: 1,
  },
  header: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleBox: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    fontSize: 14,
    width: 110,
    textAlignVertical: 'center',
  },
  DataBox: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
    backgroundColor: '#d0f5e6',
    textAlignVertical: 'center',
  },
  dropDown: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 14,
    backgroundColor: '#d0f5e6',
  },
  DocBox: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 14,
    margin: 10,
  },
  DocDataBox: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    fontSize: 14,
    backgroundColor: '#d0f5e6',
    textAlignVertical: 'center',
    marginBottom: 5,
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
    marginRight: 10,
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
    textAlignVertical: 'top',
  },
})
