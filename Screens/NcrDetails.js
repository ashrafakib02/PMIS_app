import {
    ActivityIndicator,
    Alert,
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

  export default function NcrDetails({ route }){
    const { ncnId } = route.params
    const { ncn_submitted_by } = route.params

  
    const navigation = useNavigation()
    const user_id=global.user_cd
    const fetch_ncn_detail = global.fetch_ncn_detail
    const fetch_ncn_doc = global.fetch_ncn_doc
    const fetch_ncn_con_doc = global.fetch_ncn_con_doc
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [datadoc, setDatadoc] = useState([])
    const [datadocCon, setDatadocCon] = useState([])
    const [conreplyID, setConreplyID] = useState('0')
  
    useEffect(() => {
      Promise.all([
        fetch(fetch_ncn_detail, {
          method: 'post',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID: ncnId,
          }),
        }),
        fetch(fetch_ncn_doc, {
          method: 'post',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID: ncnId,
          }),
        }),
       
      ])
        .then(([resdata, resdoc]) =>
          Promise.all([resdata.json(), resdoc.json()]),
        )
        .then(([dataData, dataDatadoc]) => {
          setData(dataData)
          setDatadoc(dataDatadoc)
          setConreplyID(dataData.users_data[0].ncn_con_reply_id)
        })
        .finally(setLoading(false))
  
      condoc()
    }, [conreplyID])
  
    const condoc = () => {
      fetch(fetch_ncn_con_doc, {
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
        console.log(data,datadoc,datadocCon,conreplyID);
    }
    const submit = item => {
        fetch(update_ncn_review, {
            method: 'post',
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: ncnId,
                user_id: user_id,

             
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              let loginObj = JSON.stringify(response)
              var parsed = JSON.parse(loginObj)
              var success = parsed.success
              var msg=parsed.users_data
              if (success == 1) {
                Alert.alert('SUCCESS', 'Data Updated Successfully', [
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

              } else {
                alert(msg)
              }
            })
            .catch((error) => {
              alert('Error 1' + error)
            })
        
      };
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
              NCR DETAILS
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
                        NCR No.{' '}
                      </Text>
                      <Text
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
                      >
                        {item.ncnNo}
                      </Text>
                    </View>
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
                        {item.packag}
                      </Text>
                    </View>
                   
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={[
                          tw` mt-2.5 ml-2.5 text-indigo-700`,
                          styles.titleBox,
                        ]}
                      >
                        Contract No.{' '}
                      </Text>
                      <Text
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
                      >
                        {item.contract_no}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={[
                          tw` mt-2.5 ml-2.5 text-indigo-700`,
                          styles.titleBox,
                        ]}
                      >
                        Contractor{' '}
                      </Text>
                      <Text
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
                      >
                        {item.contractor_name}
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
                        {item.en_represent}
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
                        {item.con_represent}
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
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titleBoxBig}>
                      Description of Non-Conformaity 
                      </Text>
                      <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titleBoxBig}>Reference Document</Text>
                      <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                        {item.ref_doc}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titleBoxBig}>Clause No.</Text>
                      <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                        {item.clause_no}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titleBoxBig}>Originators</Text>
                      <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                        {item.originators}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={[
                          tw` mt-2.5 ml-2.5 text-indigo-700`,
                          styles.titleBox,
                        ]}
                      >
                        Issued by 
                      </Text>
                      <Text
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
                      >
                        {ncn_submitted_by}
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
                          style={{ marginLeft: 10, marginRight: 10,marginTop:10 }}
                          renderItem={({ item }) => (
                            <View>
    
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
                                    {item.NCN_Scanned_document.includes('.pdf') ? (
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
                                              item.NCN_Scanned_document,
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
                                  <Text style={styles.titleBoxBig}>
                                    Contractor Response
                                  </Text>
                                  <Text
                                    style={[tw`text-indigo-700`, styles.DataBoxBig]}
                                  >
                                    {item.action}
                                  </Text>
                                </View>
                        
                            <View style={{ flex: 1 }}>
                              <Text style={styles.titleBoxBig}>
                                Contractor's Attachments
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

                                      <ScrollView
                                        style={{
                                          flex: 1,
                                          marginLeft: 10,
                                          marginRight: 10,
                                          marginTop:10,
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
                                            {item.Ncn_Con_Scanned_document.includes(
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
                                                      item.Ncn_Con_Scanned_document,
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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={[
                          tw` mt-2.5 ml-2.5 text-indigo-700`,
                          styles.titleBox,
                        ]}
                      >
                       Date
                      </Text>
                      <Text
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
                      >
                        {item.date_con}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={[
                          tw` mt-2.5 ml-2.5 text-indigo-700`,
                          styles.titleBox,
                        ]}
                      >
                      Reviewed by {' '}
                      </Text>
                      <Text
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
                      >
                        {item.review_by}
                      </Text>
                    </View>
                   
                    {global.eshs_cre == '1' &&
                    item.isReviewed == '0' &&
                    item.isApproved == '0' ? (
                      <View>
                        <TouchableOpacity
                       onPress={() => submit(item)}
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
                      </View>
                    ) : null}
                    
                   
                    
    
                   
                    {global.eshs_super == '1' &&
                    item.con_reply_given == '1' &&
                    item.isReviewed == '1' &&
                    item.isApproved == '0' ? (
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('NcrClose', {
                              ncnId: ncnId,
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
                    item.isApproved == '0' ? (
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('NcnConReply', {
                              ncnId: ncnId,
                              ncn_submitted_by:ncn_submitted_by,
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
  