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

export default function ESHSDetails({ route }) {
  const { eshs_obs_id } = route.params
  const { eshs_submitted_by } = route.params

  
  const navigation = useNavigation()
  const eshs_details = global.eshs_details
  const eshs_con_details = global.eshs_con_details
  const eshs_doc_gc = global.eshs_doc_gc
  const eshs_doc_con = global.eshs_doc_con
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [datadoc, setDatadoc] = useState([])
  const [dataCon, setDataCon] = useState([])
  const [datadocCon, setDatadocCon] = useState([])
  const [conreplyID, setConreplyID] = useState('0')

  useEffect(() => {
    Promise.all([
      fetch(eshs_details, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: eshs_obs_id,
        }),
      }),
      fetch(eshs_doc_gc, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: eshs_obs_id,
        }),
      }),
      fetch(eshs_con_details, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: eshs_obs_id,
        }),
      }),
    ])
      .then(([resdata, resdoc, rescondata]) =>
        Promise.all([resdata.json(), resdoc.json(), rescondata.json()]),
      )
      .then(([dataData, dataDatadoc, dataDataCon]) => {
        setData(dataData)
        setDatadoc(dataDatadoc)
        setDataCon(dataDataCon)
        setConreplyID(dataDataCon[0].eshs_con_reply_id)
        // console.log(data,datadoc,dataCon,conreplyID);
      })
      .finally(setLoading(false))

    condoc()
  }, [conreplyID])

  const condoc = () => {
    fetch(eshs_doc_con, {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: conreplyID,
      }),
    })
      .then((response) => response.json())
      .then((json) => setDatadocCon(json))
      .catch((error) => console.error(error))
      .finally(setLoading(false))
    console.log(datadocCon)
  }

  const loadInBrowser = (item) => {
    Linking.openURL(
      global.eshs_docs + item.ESHS_Scanned_document,
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
          ESHS DETAILS
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
                    Package
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.package}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Observation No.{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.observation}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Date{' '}
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
                    Time{' '}
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
                    Location (with Chainage){' '}
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
                    Engineer’s Representative{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.en_representtative}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Contractor’s Representative{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.con_representtative}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>
                    Observation Description
                  </Text>
                  <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                    {item.description}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>Recommendation</Text>
                  <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                    {item.recommend}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Responsible/ Action by{' '}
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.action_by}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Target Date
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.targetDate}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Remarks
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.remarks}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Submitted By
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {eshs_submitted_by}
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
                          <Text>{item.RFI_Scanned_document}</Text>

                          <ScrollView
                            style={{
                              flex: 1,
                              marginLeft: 10,
                              marginRight: 10,
                              marginBottom: 10,
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          >
                            {item.count != '0' ? (
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
                                {item.ESHS_Scanned_document.includes('.pdf') ? (
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
                            ) : null}
                          </ScrollView>
                        </View>
                      )}
                    />
                  )}
                </View>
                {item.con_reply_given == '1' ? (
                  <View>
                    <View style={{ flex: 1 }}>
                      {isLoading ? (
                        <ActivityIndicator
                          animating={true}
                          size="small"
                          color="#0000ff"
                        />
                      ) : (
                        <FlatList
                          data={dataCon}
                          renderItem={({ item }) => (
                            <View style={{ flex: 1 }}>
                              <Text style={styles.titleBoxBig}>
                                Contractor Response
                              </Text>
                              <Text
                                style={[tw`text-indigo-700`, styles.DataBoxBig]}
                              >
                                {item.contractor_reply}
                              </Text>
                            </View>
                          )}
                        />
                      )}
                    </View>
                    {item.con_reply_given == '1' ? (
                      <View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.titleBoxBig}>
                            Contractor Attachments
                          </Text>
                          {isLoading ? (
                            <ActivityIndicator
                              animating={true}
                              size="small"
                              color="#0000ff"
                            />
                          ) : (
                            <FlatList
                              data={datadocCon.users_data}
                              horizontal
                              style={{ marginLeft: 10, marginRight: 10 }}
                              renderItem={({ item }) => (
                                <View>
                                  <Text>{item.RFI_Scanned_document}</Text>

                                  <ScrollView
                                    style={{
                                      flex: 1,
                                      marginLeft: 10,
                                      marginRight: 10,
                                      marginBottom: 10,
                                      borderWidth: 1,
                                      borderColor: 'black',
                                    }}
                                  >
                                    {item.count != '0' ? (
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
                                        {item.ESHS_Con_Scanned_document.includes(
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
                                                  item.ESHS_Con_Scanned_document,
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
                                    ) : null}
                                  </ScrollView>
                                </View>
                              )}
                            />
                          )}
                        </View>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                {global.eshs_super == '1' &&
                item.con_reply_given == '1' &&
                item.eshs_approved_status == '0' ? (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ESHSGCFeedback', {
                          eshs_obs_id: eshs_obs_id,
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
                        Give Feedback
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {global.eshs_contractor == '1' &&
                item.con_reply_given == '0' &&
                item.eshs_approved_status == '0' ? (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ESHSContractorFeedback', {
                          eshs_obs_id: eshs_obs_id,
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
                        Give Contractor Response
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
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
