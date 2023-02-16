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

export default function IncedentDetails({ route }) {
  const { incident_form_id } = route.params

  const navigation = useNavigation()
  const fetch_accident_detail = global.fetch_accident_detail
  const fetch_accident_doc = global.fetch_accident_doc
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [datadoc, setDatadoc] = useState([])
  const [conreplyID, setConreplyID] = useState('0')

  useEffect(() => {
    Promise.all([
      fetch(fetch_accident_detail, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: incident_form_id,
        }),
      }),
      fetch(fetch_accident_doc, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: incident_form_id,
        }),
      }),
    ])
      .then(([resdata, resdoc]) => Promise.all([resdata.json(), resdoc.json()]))
      .then(([dataData, dataDatadoc]) => {
        setData(dataData)
        setDatadoc(dataDatadoc)

        console.log(data, datadoc)
      })
      .catch((err) => console.error("Couldn't load page", err))
      .finally(setLoading(false))
  }, [])

  const loadInBrowser = (item) => {
    Linking.openURL(
      global.eshs_docs + item.incident_Scanned_document,
    ).catch((err) => console.error("Couldn't load page", err))
  }
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
                    INCIDENT TYPE{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.type}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    DATE{' '}
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
                    TIME{' '}
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
                    EXACT LOCATION{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.location}
                  </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    NAME OF WITNESS{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.witnessName}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Name of Employer:{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.employerName}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    ACTIVITY{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.activity}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    PLANT / MACHINERY INVOLVED{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.machinery}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    PROPERTY DAMAGE{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.damage}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>INCIDENT DISRIPTION</Text>
                  <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                    {item.description}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>ROOT CAUSE </Text>
                  <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                    {item.cause}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>
                    IMMEDIATE ACTION TAKEN / CORRECTIVE ACTION TAKE{' '}
                  </Text>
                  <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                    {item.actionTaken}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>Attachments</Text>
                  {isLoading ? (
                    <ActivityIndicator
                      animating={true}
                      size="small"
                      color="#0000ff"
                    />
                  ) : (
                    <FlatList
                      data={datadoc.users_data}
                      horizontal
                      style={{ marginLeft: 10, marginRight: 10 }}
                      renderItem={({ item }) => (
                        <View>
                          <ScrollView
                            style={{
                              flex: 1,
                              marginLeft: 10,
                              marginTop: 10,
                              marginRight: 10,
                              marginBottom: 10,
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              activeOpacity={0.8}
                            >
                              {item.incident_Scanned_document.includes(
                                '.pdf',
                              ) ? (
                                <TouchableOpacity
                                  onPress={() => loadInBrowser(item)}
                                  style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  activeOpacity={0.8}
                                >
                                  <Image
                                    source={{
                                      uri:
                                        'https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png',
                                    }}
                                    style={{
                                      width: 100,
                                      height: 100,
                                      resizeMode: 'contain',
                                      marginTop: 10,
                                    }}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  activeOpacity={0.8}
                                  onPress={() => loadInBrowser(item)}
                                >
                                  <Image
                                    source={{
                                      uri:
                                        'http://117.247.187.20:8071/HORC/pages/project-tools/ESHS/eshs_docs/' +
                                        item.ESHS_Scanned_document,
                                    }}
                                    style={{
                                      width: 100,
                                      height: 100,
                                      resizeMode: 'contain',
                                      marginTop: 10,
                                    }}
                                  />
                                </TouchableOpacity>
                              )}
                            </TouchableOpacity>
                          </ScrollView>
                        </View>
                      )}
                    />
                  )}
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    SUBMITTED BY{' '}
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
                    SUBMISSION TIME{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.submissionTime}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    SUBMISSION DATE{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.submissionDate}
                  </Text>
                </View>
                {global.eshs_super == '1' ? (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('IncedentPersonForm', {
                          incident_form_id: incident_form_id,
                          reported_by: item.name,
                          reporting_date: item.submissionTime,
                          reporting_time: item.submissionDate,
                        })
                      }
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
                        ADD INJURED PERSON
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
               
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('IncedentPersonList', {
                          incident_form_id: incident_form_id,
                          
                        })
                      }
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
                        INJURED PERSON LIST
                      </Text>
                    </TouchableOpacity>
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
