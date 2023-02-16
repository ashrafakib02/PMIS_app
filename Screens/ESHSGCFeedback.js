import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { Header } from '@react-navigation/elements'
import Footer from './Footer'
import tw from 'tailwind-react-native-classnames'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import '../global'
import { useNavigation } from '@react-navigation/native'

export default function ESHSGCFeedback({ route }) {
  const navigation = useNavigation()

  const { eshs_obs_id } = route.params
  const [isSelected, setIsSelected] = useState(true)

  const eshs_approval_feedback = global.eshs_approval_feedback

  const [checkString, setCheckString] = useState('0')

  const onSelectCheck = (index, value) => {
    setCheckString(value)
    console.log(checkString)
  }
  const SubmitFn = () => {
    if (checkString == '0') {
      alert('Please Select a Feedback')
    } else {
      fetch(eshs_approval_feedback, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: eshs_obs_id,
          approvalString: checkString,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          let loginObj = JSON.stringify(response)
          var parsed = JSON.parse(loginObj)
          var success = parsed.success
          if (success == 1) {
            Alert.alert('SUCCESS', 'Verification Successful', [
              {
                text: 'Cancel',
                onPress: () =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'EshsGCDashboard' }],
                  }),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'EshsGCDashboard' }],
                  }),
              },
            ])
          } else {
            alert('Data Not Added!!')
          }
        })
        .catch((error) => {
          alert('Error ' + error)
        })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
      <Header style={{ color: 'black' }} />
      <View style={{ flex: 1 }}>
        <View>
          <Text style={tw` ml-5 mt-10 font-bold text-base text-indigo-900`}>
            Consultant’s (GC) Response{' '}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1.5,
            backgroundColor: 'white',
            padding: 10,
            marginTop: 10,
          }}
        >
          <View style={{ backgroundColor: 'blue', marginTop: 20 }}>
            <Text style={tw` ml-2 mt-1 mb-1 font-bold text-base text-white`}>
              Corrective Action has been -{' '}
            </Text>
          </View>
          <RadioGroup
            style={{
              borderWidth: 1,
              borderColor: 'black',
              padding: 5,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              justifyContent: 'space-evenly',
            }}
            size={24}
            thickness={2}
            color="#9575b2"
            highlightColor="#C1F9FF"
            // selectedIndex={0}
            onSelect={(index, value) => onSelectCheck(index, value)}
          >
            <RadioButton value="1" color="blue">
              <Text>Taken and Accepted </Text>
            </RadioButton>

            <RadioButton value="2" color="blue">
              <Text>Taken and Not Accepted </Text>
            </RadioButton>
          </RadioGroup>

          <TouchableOpacity
            onPress={SubmitFn}
            style={{
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
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
