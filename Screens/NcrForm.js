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
import AllPackageNcr from '../Components/AllPackageNcr'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

export default function NcrForm() {
  const navigation = useNavigation()
  const contractor = global.contractor_name
  const user_cd = global.user_cd
  const ncn_form = global.ncn_form
  const ncn_doc = global.ncn_doc

  const [ncrNo, setNcrNo] = useState('')
  const [packageString, setpackageString] = useState('')
  const [lid, setLid] = useState('')
  const [contractNo, setContractNo] = useState('')
  const [contractorName, setContractorName] = useState('')
  const [enRepresent, setEnRepresent] = useState('')
  const [conRepresent, setConRepresent] = useState('')
  const [date2, setDate2] = useState('')
  const [ncrfinding, setNcrfinding] = useState('')
  const [file, setFile] = useState([])
  const [refDoc, setRefDoc] = useState('')
  const [clause, setClause] = useState('')
  const [originator, setOriginator] = useState('')
 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isClicked, setClicked] = useState(false)
  const [user, setUser] = useState('0')

  let nextdocId = 0
  let nextFileId = 0
  let DocuploadResult = 0
  const dataFetch = (data, label, user2, contractor_name) => {
    setpackageString(label)
    setLid(data)
    setUser(user2)
    setContractorName(contractor_name)

    if (data == '1') {
      setContractNo('HORC/HRIDC/C-1/2021')
    } else if (data == '2') {
      setContractNo('HORC/HRIDC/T-1/2022')
    } else if (data == '3') {
      setContractNo('HORC/HRIDC/BR-1/2022')
    } else {
      setContractNo('')
    }
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

  const SubmitFn = () => {
    if (ncrNo.length == 0) {
      alert('Please Enter NCR No.!')
    } else if (packageString.length == 0 || packageString == 'Select Package') {
      alert('Please Select a Package')
    } else if (contractNo.length == 0) {
      alert('Sorry!! No Contract Number is assigned to this package. Select Another.')
    } else if (user == '0') {
      alert('Sorry!! No Contractor is assigned to this package. Select Another.')
    } else if (enRepresent.length == 0) {
      alert('Please Enter Engineer’s Representative !')
    } else if (conRepresent.length == 0) {
      alert('Please Enter Contractor’s Representative!')
    } else if (date2.length == 0) {
      alert('Please Enter Date!')
    } else if (ncrfinding.length == 0) {
      alert('Please Enter Non Conformity!')
    } else if (file.length == 0) {
      alert('Please Select a File!')
    } else if (refDoc.length == 0) {
      alert('Please Enter Reference Document!')
    } else if (clause.length == 0) {
      alert('Please Enter Clause!')
    } else if (originator.length == 0) {
      alert('Please Enter Originators!')
    } else {
      setClicked(true)
      fetch(ncn_form, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ncnNo2: ncrNo.value,
          user_id: user_cd,
          title: packageString,
          lid2: lid,
          contract_no2: contractNo,
          contractor2: user,
          en_represent2: enRepresent.value,
          con_represent2: conRepresent.value,
          date2: date2,
          description2: ncrfinding.value,
          ref_document2: refDoc.value,
          clause2: clause.value,
          originator2: originator.value,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          let loginObj = JSON.stringify(response)
          var parsed = JSON.parse(loginObj)
          var success = parsed.success
          if (success == 1) {
            uploadDocFiles()
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
      let res = await fetch(ncn_doc, {
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
          onPress: () => navigation.replace('NcrList'),

          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.replace('NcrList')
           
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
              NCR No.
            </Text>
            <TextInput
              style={[
                tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                styles.DataInputBox,
              ]}
              onChangeText={(text) => setNcrNo({ value: text, error: '' })}
            />
          </View>
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
              <AllPackageNcr onChange={dataFetch} style={styles.DataBox} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Contract No.
            </Text>
            <Text
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {contractNo}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>
              Conractor Name
            </Text>
            <Text
              style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}
            >
              {contractorName}
            </Text>
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

          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>Non-Conformity Finding</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) => setNcrfinding({ value: text, error: '' })}
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
            <Text style={styles.titleBoxBig}>Reference Documents </Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              onChangeText={(text) => setRefDoc({ value: text, error: '' })}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>Clause No.:</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
              onChangeText={(text) => setClause({ value: text, error: '' })}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleBoxBig}>Originators:</Text>
            <TextInput
              style={[tw`text-indigo-700`, styles.DataBoxBig]}
              multiline={true} // ios fix for centering it at the top-left corner
              numberOfLines={10}
              onChangeText={(text) => setOriginator({ value: text, error: '' })}
            />
          </View>

          {!isClicked  ?
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
          </TouchableOpacity>:null}
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
