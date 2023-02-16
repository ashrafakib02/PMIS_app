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
import PersonSent from '../Components/PersonSent'
import InjuryType from '../Components/InjuryType'
import AllGender from '../Components/AllGender'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import ContractorActivity from '../Components/ContractorActivity'
import Checkbox from 'expo-checkbox';
export default function IncedentPersonForm({ route }) {
  
  const { incident_form_id } = route.params
  const { reported_by } = route.params
  const { reporting_date } = route.params
  const { reporting_time } = route.params
  const navigation = useNavigation()

  const incident_person_form = global.incident_person_form

  const user_cd = global.user_cd

  const [file, setFile] = useState([])

  const [name, setName] = useState('')
  const [DOB, setDob] = useState('')
  const [Doj, setDoj] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [injury, setInjury] = useState('')
  const [bodyPart, setBodyPart] = useState('')
  const [injuryType, setInjuryType] = useState('')
  const [person, setPerson] = useState('')
  const [check, setCheck] = useState(false)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false)
  const [isClicked, setClicked] = useState(false)

  const [state, setState] = useState('')
  const [state2, setState2] = useState('')

  let DocuploadResult = 0
  let DocuploadResult2 = 0

  const GenderdataFetch = (data) => {
    setGender(data)
  }
  const injuryTypeFetch = (data) => {
    setInjuryType(data)
  }
  const SentFetch = (data) => {
    setPerson(data)
  }
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true)
  }

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false)
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm2 = (date) => {
    var curDate = date.getDate()
    var curMonth = date.getMonth() + 1
    var curYear = date.getFullYear()
    setDoj(curYear + '-' + curMonth + '-' + curDate)

    console.warn('A date has been picked: ' + ActualDate)
    hideDatePicker2()
  }
  const handleConfirm = (date) => {
    // setDate2(date);
    var curDate = date.getDate()
    var curMonth = date.getMonth() + 1
    var curYear = date.getFullYear()
    setDob(curYear + '-' + curMonth + '-' + curDate)

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
    if (name.length == 0) {
      alert('Please Enter Name!')
    } else if (DOB.length == 0) {
      alert('Please Select Date of Birth')
    } else if (Doj.length == 0) {
      alert('Please Enter Date of Joining!')
    } else if (jobTitle.length == 0) {
      alert('Please Enter Job Title!')
    } else if (gender.length == 0) {
      alert('Please Select Gender!')
    } else if (address.length == 0) {
      alert('Please Enter Address!')
    } else if (injury.length == 0) {
      alert('Please Enter Injury!')
    } else if (bodyPart.length == 0) {
      alert('Please Enter Injured Body Part!')
    } else if (injuryType.length == 0) {
      alert('Please Select Injury Type!')
    } else if (person.length == 0) {
      alert('Please Select where person was sent')
    } else if (!check) {
      alert('Please check and verify')
    } else {
        setClicked(true)
        fetch(incident_person_form, {
          method: 'post',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: incident_form_id,
            name2: name.value,
            dob2: DOB,
            doJoin2: Doj,
            jobTitle2: jobTitle.value,
            gender2: gender,
            address2: address.value,
            whatInjury2: injury.value,
            bodyPart2: bodyPart.value,
            injType2: injuryType,
            person2: person,
            
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            let loginObj = JSON.stringify(response)
            var parsed = JSON.parse(loginObj)
            var success = parsed.success
            if (success == 1) {
                Alert.alert('SUCCESS', 'Data Added Successfully', [
                    {
                      text: 'Cancel',
                      onPress: () => navigation.replace('IncidentList'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => navigation.replace('IncidentList'),
                    },
                  ])
            }
          })
          .catch((error) => {
            alert('Error ' + error)
          })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>DETAILS OF INJURED PERSON </Text>
        <ScrollView style={{ flex: 1, margin: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              NAME
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setName({ value: text, error: '' })}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              DATE OF BIRTH
            </Text>
            <Text
              onPress={showDatePicker}
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
            >
              {DOB}
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
              DATE OF JOINING
            </Text>
            <Text
              onPress={showDatePicker2}
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
            >
              {Doj}
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              JOB TITLE
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setJobTitle({ value: text, error: '' })}
            />
          </View>
          <AllGender onChange={GenderdataFetch} />
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>ADDRESS</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) => setAddress({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              WHAT WAS THE INJURY
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setInjury({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              INJURED BODY PART
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setBodyPart({ value: text, error: '' })}
            />
          </View>
          <InjuryType onChange={injuryTypeFetch} />
          <PersonSent onChange={SentFetch} />
          <View style={styles.checkBoxBig}>
            <Text style={styles.checkBoxText}>
            I have checked the above information and can confirm that it is a true record of the accident.
            </Text>
            <Checkbox
          style={styles.checkBox}
          value={check}
          onValueChange={setCheck}
          color={check ? 'coral' : undefined}
        />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              REPORTED BY:{' '}
            </Text>
            <Text
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {reported_by}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              DATE
            </Text>
            <Text
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {reporting_date}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              TIME
            </Text>
            <Text
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {reporting_time}
            </Text>
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
  checkBoxBig: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    justifyContent:'center',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexShrink: 1,
  },
  checkBoxText: {
    flex:1,
    textAlign: 'center',
    padding: 5,
    marginRight:10,
    textAlignVertical: 'top',
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'coral',
    justifyContent:'center',
    marginRight: 10,
  },
  
})
