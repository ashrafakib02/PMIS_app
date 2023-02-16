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
import ActivityByPackage from '../Components/ActivityByPackage'
import AllContractor from '../Components/AllContractor'
import IncidentType from '../Components/IncidentType'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import ContractorActivity from '../Components/ContractorActivity'

export default function IncidentForm() {
  const navigation = useNavigation()

  const incident_form = global.incident_form
  const incident_form_fileUpload = global.incident_form_fileUpload

  const user_cd = global.user_cd

  const [file, setFile] = useState([])
  const [date2, setDate2] = useState('')
  const [time2, setTime2] = useState('')
  const [incidentNo, setIncidentNo] = useState('')
  const [incidentType, setIncidentType] = useState('')
  const [location, setLocation] = useState('')
  const [witnessName, setWitnessName] = useState('')
  const [employerName, setEmployerName] = useState('0')
  const [activity, setActivity] = useState('0')
  const [machinery, setMachinery] = useState('NO')
  const [property, setProperty] = useState('NO')
  const [description, setDescription] = useState('')
  const [cause, setCause] = useState('')
  const [actionTaken, setActionTaken] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [isClicked, setClicked] = useState(false)
  const [doc, setDoc] = useState()
  const [uri, setUri] = useState()
  const [state, setState] = useState('')
  const [state2, setState2] = useState('')

  let DocuploadResult = 0
  let DocuploadResult2 = 0
  const dataFetch = (data, data2) => {
    if (data != '0') {
      setEmployerName(data)
    }

    if (data2 != '0') {
      setActivity(data2)
    }
  }
  const TypedataFetch = (data) => {
    setIncidentType(data)
  }
  const showDatePicker2 = () => {
    setTimePickerVisibility(true)
  }
  const onSelecMachinery = (index, value) => {
    setMachinery(value)
    setState(index)
  }
  const onSelectProperty = (index, value) => {
    setProperty(value)
    setState2(index)
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

  const handleConfirm = (date) => {
    // setDate2(date);
    var curDate = date.getDate()
    var curMonth = date.getMonth() + 1
    var curYear = date.getFullYear()
    setDate2(curYear + '-' + curMonth + '-' + curDate)

    console.warn('A date has been picked: ' + ActualDate)
    hideDatePicker()
  }

  useEffect(async () => {
    var curDate = new Date().getDate()
    var curMonth = new Date().getMonth() + 1
    var curYear = new Date().getFullYear()
    setCurrentDate(curYear + '-' + curMonth + '-' + curDate)
  }, [])

  const insSubmit = () => {
    if (incidentNo.length == 0) {
      alert('Please Enter Incident No.!')
    } else if (incidentType.length == 0) {
      alert('Please Select a Type')
    } else if (date2.length == 0) {
      alert('Please Enter Date!')
    } else if (time2.length == 0) {
      alert('Please Enter Time!')
    } else if (location.length == 0) {
      alert('Please Enter Location!')
    } else if (witnessName.length == 0) {
      alert('Please Enter Name of Witness!')
    } else if (employerName == '0') {
      alert('Please Select Employer!')
    } else if (activity == '0' || activity == 'undefined') {
      alert('Please Select Activity!')
    } else if (description.length == 0) {
      alert('Please Enter Description!')
    } else if (file.length == 0) {
      alert('Please Select a File !')
    } else if (cause.length == 0) {
      alert('Please Enter Root cause')
    } else if (actionTaken.length == 0) {
      alert('Please Enter Action Taken')
    } else {
      setClicked(true)
      fetch(incident_form, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_cd,
          accidentNo2: incidentNo.value,
          accidentType2: incidentType,
          employerId2: employerName,
          accidentDate2: date2,
          accidentTime2: time2,
          location2: location.value,
          witnessName2: witnessName.value,
          machineString: machinery,
          activity_code2: activity,
          propertyString: property,
          description2: description.value,
          cause2: cause.value,
          action2: actionTaken.value,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          let loginObj = JSON.stringify(response)
          var parsed = JSON.parse(loginObj)
          var success = parsed.success
          if (success == 1) {
            uploadDocFiles()
          }
        })
        .catch((error) => {
          alert('Error ' + error)
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
      let res = await fetch(incident_form_fileUpload, {
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
          onPress: () => navigation.replace('EshsGCDashboard'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.replace('EshsGCDashboard'),
        },
      ])
    }
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

  const docDataPicker = (docFull) => {
    setFile([...file, docFull])

    console.log('Doc: ' + file)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Inspection Details</Text>
        <ScrollView style={{ flex: 1, margin: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              INCIDENT NO.
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setIncidentNo({ value: text, error: '' })}
            />
          </View>

          <IncidentType onChange={TypedataFetch} />

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              DATE
            </Text>
            <Text
              onPress={showDatePicker}
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
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
              TIME
            </Text>
            <Text
              onPress={showDatePicker2}
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
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
              EXACT LOCATION
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
              NAME OF WITNESS{' '}
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) =>
                setWitnessName({ value: text, error: '' })
              }
            />
          </View>
          <ContractorActivity onChange={dataFetch} />

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              PLANT / MACHINERY INVOLVED{' '}
            </Text>
            <RadioGroup
              style={{
                flexDirection: 'row',
                flex: 1,
                borderWidth: 1,
                borderColor: 'black',
                padding: 5,
                marginLeft: 5,
                marginRight: 10,
                marginTop: 10,
                justifyContent: 'space-evenly',
              }}
              size={24}
              thickness={2}
              color="#9575b2"
              highlightColor="#C1F9FF"
              selectedIndex={1}
              onSelect={(index, value) => onSelecMachinery(index, value)}
            >
              <RadioButton value="YES" color="blue">
                <Text>YES</Text>
              </RadioButton>

              <RadioButton value="NO" color="blue">
                <Text>NO</Text>
              </RadioButton>
            </RadioGroup>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              PROPERTY DAMAGE
            </Text>
            <RadioGroup
              style={{
                flexDirection: 'row',
                flex: 1,
                borderWidth: 1,
                borderColor: 'black',
                padding: 5,
                marginLeft: 5,
                marginRight: 10,
                marginTop: 10,
                justifyContent: 'space-evenly',
              }}
              size={24}
              thickness={2}
              color="#9575b2"
              highlightColor="#C1F9FF"
              selectedIndex={1}
              onSelect={(index, value) => onSelectProperty(index, value)}
            >
              <RadioButton value="YES" color="blue">
                <Text>YES</Text>
              </RadioButton>

              <RadioButton value="NO" color="blue">
                <Text>NO</Text>
              </RadioButton>
            </RadioGroup>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>INCIDENT DISRIPTION</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) =>
                setDescription({ value: text, error: '' })
              }
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
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
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>ROOT CAUSE</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) => setCause({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>
              IMMEDIATE ACTION TAKEN / CORRECTIVE ACTION TAKE
            </Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) =>
                setActionTaken({ value: text, error: '' })
              }
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>
          {!isClicked ? (
            <TouchableOpacity
              onPress={insSubmit}
              activeOpacity={0.8}
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
          ) : null}
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
    textAlign: 'center',
  },
  titleBox: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    fontSize: 14,
    width: 100,
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
