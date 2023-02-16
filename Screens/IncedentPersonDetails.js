import {
    ActivityIndicator,
    FlatList,
    Image,
    Linking,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native'
  import React, { useEffect, useState } from 'react'
  import Footer from './Footer'
  import { ScrollView } from 'react-native-gesture-handler'
  import tw from 'tailwind-react-native-classnames'
  import { useNavigation } from '@react-navigation/native'

export default function IncedentPersonDetails({ route }){
    const { incident_person_id } = route.params

    const fetch_person_detail = global.fetch_person_detail
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

  
    useEffect(() => {
      Promise.all([
        fetch(fetch_person_detail, {
          method: 'post',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID: incident_person_id,
          }),
        }),
       
      ])
        .then(([resdata]) => Promise.all([resdata.json()]))
        .then(([dataData]) => {
          setData(dataData)
  
          console.log(data)
        })
        .catch((err) => console.error("Couldn't load page", err))
        .finally(setLoading(false))
    }, [])
  
    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              tw`mt-2.5 ml-2.5 mr-2.5 text-indigo-700 text-xl font-bold`,
              styles.header,
            ]}
          >
            INCEDENT DETAILS
          </Text>
  
          {isLoading ? (
            <ActivityIndicator animating={true} size="small" color="#0000ff" />
          ) : (
            <FlatList
              data={data.users_data}
              renderItem={({ item }) => (
                <ScrollView
                  style={{
                    flex: 1,
                    margin: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                  }}
                >
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      INCIDENT NO.
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.accidentNo}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      ACCIDENT DATE{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.date}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      ACCIDENT TIME{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.time}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      PERSON NAME{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      DATE OF BIRTH{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.DOB}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      DATE OF JOINING{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.dateOfJoin}
                    </Text>
                  </View>
  
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      DESIGNATION{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.designation}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      GENDER:{' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.gender}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.titleBoxBig}>ADDRESS</Text>
                    <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                      {item.address}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      WHAT WAS THE INJURY {' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.whatInjury}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      INJURED BODY PART {' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.bodyPart}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      INJURY TYPE {' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.injuryType}
                    </Text>
                  </View>
                  
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[
                        tw` mt-2.5 ml-2.5 text-indigo-700`,
                        styles.titleBox,
                      ]}
                    >
                      PERSON SENT TO : {' '}
                    </Text>
                    <Text
                      style={[
                        tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                        styles.DataBox,
                      ]}
                    >
                      {item.person}
                    </Text>
                  </View>
                
                </ScrollView>
              )}
            />
          )}
        </View>
  
        <Footer />
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      justifyContent: 'center',
      textShadowRadius: 5,
      borderRadius: 10,
      backgroundColor: '#50C878',
      marginTop: 30,
    },
    titleBox: {
      backgroundColor: 'blue',
      color: 'white',
      padding: 5,
      fontSize: 14,
      width: 100,
    },
    DataBox: {
      flex: 1,
      borderColor: 'black',
      borderWidth: 1,
      padding: 5,
      fontSize: 14,
    },
    imageTitle: {
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      fontSize: 14,
      width: 100,
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
      margin: 10,
      flexShrink: 1,
    },
  })
  