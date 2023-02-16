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
import * as DocumentPicker from 'expo-document-picker';


export default function RFIDetails({ route }) {
  const { rfi_form_id } = route.params
  const navigation = useNavigation()
  const rfi_details = global.fetch_rfi_con
  const adduploadURL = global.addFile;

  const rfi_doc = global.fetch_rfi_doc
  const rfi_add_doc = global.rfi_additional_doc
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [datadoc, setDatadoc] = useState([])
  const [dataAdditionaldoc, setDataAdditionaldoc] = useState([])
  const [isAdditional, setAdditional] = useState([])
  const [isAdditionalPressed, setAdditionalPressed] = useState(false)
  const [file, setFile] = useState([]);
  let DocuploadResult = 0;

  useEffect(() => {
    Promise.all([
      fetch(rfi_details, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: rfi_form_id,
        }),
      }),
      fetch(rfi_doc, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: rfi_form_id,
        }),
      }),
      fetch(rfi_add_doc, {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: rfi_form_id,
        }),
      }),
    ])
      .then(([resdata, resdoc, resadddoc]) =>
        Promise.all([resdata.json(), resdoc.json(), resadddoc.json()]),
      )
      .then(([dataData, dataDatadoc, dataAdddoc]) => {
        setData(dataData)
        setDatadoc(dataDatadoc)
        setDataAdditionaldoc(dataAdddoc)
        setAdditional(dataAdditionaldoc.success)
        console.log(data, datadoc, dataAdditionaldoc, dataAdditionaldoc.success)
      })
      .finally(setLoading(false))
    // docfetch()
  }, [isAdditional])
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
  //   const datafetch = () => {
  //     fetch(rfi_details, {
  //       method: 'post',
  //       header: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ID: rfi_form_id,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => console.error(error))
  //       .finally(setLoading(false))
  //   }
  //   const docfetch = () => {
  //     console.log(data, datadoc)
  //   }

  const loadInBrowser = (item) => {
    Linking.openURL(global.rfi_docs + item.RFI_Scanned_document).catch((err) =>
      console.error("Couldn't load page", err),
    )
  }
  const loadInBrowser2 = (item2) => {
    Linking.openURL(
      global.rfi_docs + item2.add_RFI_Scanned_document,
    ).catch((err) => console.error("Couldn't load page", err))
  }
  const uploadDocFiles = async () => {
    if (file.length == 0) {
        alert("Please Select a File!");
  
      } else {
    // If file selected then create FormData
    for (let i = 0; i < file.length; i++) {
      const fileToUpload = file[i];
      const dataAdddocupload = new FormData();
      dataAdddocupload.append('rfi_no', rfi_form_id);
      dataAdddocupload.append('name', 'abcd');
      dataAdddocupload.append('file_attachment', fileToUpload);
      console.log(dataAdddocupload);
      // Please change file upload URL
      let res = await fetch(
        adduploadURL,
        {
          method: 'post',
          body: dataAdddocupload,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      console.log(responseJson.msg);
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
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'RFIcontractorDash' }]
            }),
            style: "cancel"
          },
          {
            text: "OK", onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'RFIcontractorDash' }]
            })
          }
        ]
      );
  }else{
    alert("Data uploadation Error!!")
  }
}
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            tw`mt-2.5 ml-2.5 mr-2.5 text-indigo-700 text-xl font-bold`,
            styles.header,
          ]}
        >
          RFI DETAILS
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
                    {item.package_name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Employer
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.employer_name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Engineer
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.engineer_name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Contractor
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
                    RFI No.
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.rfi_no}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>Description of Work</Text>
                  <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>
                    {item.desc_of_work}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Location
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
                    Person In-Charge
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.person_incharge}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Activity
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
                    Date of inspection
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.inspection_date}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Time of inspection
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.inspection_time}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={[
                      tw` mt-2.5 ml-2.5 text-indigo-700`,
                      styles.titleBox,
                    ]}
                  >
                    Date of Submission
                  </Text>
                  <Text
                    style={[
                      tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                      styles.DataBox,
                    ]}
                  >
                    {item.submission_date}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>RFI Attachments</Text>
                  <View>
                    {/* <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>{item.package_name}</Text> */}
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
                          <ScrollView
                            style={{
                              flex: 1,
                              margin: 10,
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          >
                            {item.count == '1' ? (
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
                                {item.RFI_Scanned_document.includes('.pdf') ? (
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
                                          global.rfi_docs +
                                          item.RFI_Scanned_document,
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
                        )}
                      />
                    )}
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.titleBoxBig}>
                    RFI Additonal Attachments
                  </Text>
                  <View>
                    {/* <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>{item.package_name}</Text> */}
                    {isLoading ? (
                      <ActivityIndicator
                        animating={true}
                        size="small"
                        color="#0000ff"
                      />
                    ) : (
                      <FlatList
                        data={dataAdditionaldoc.users_data}
                        horizontal
                        style={{ marginLeft: 10, marginRight: 10 }}
                        renderItem={({ item }) => (
                          <ScrollView
                            style={{
                              flex: 1,
                              margin: 10,
                              borderWidth: 1,
                              borderColor: 'black',
                            }}
                          >
                            {item.count == '1' ? (
                              <View>
                                {item.add_RFI_Scanned_document.includes(
                                  '.pdf',
                                ) ? (
                                  <TouchableOpacity
                                    onPress={() => loadInBrowser2(item)}
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
                                    onPress={() => loadInBrowser2(item)}
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          global.rfi_docs +
                                          item.add_RFI_Scanned_document,
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
                              </View>
                            ) : null}
                          </ScrollView>
                        )}
                      />
                    )}
                  </View>
                </View>
                {isAdditionalPressed ? (
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={[
                          tw` mt-2.5 ml-2.5 text-indigo-700`,
                          styles.titleBox,
                        ]}
                      >
                        Attachment
                      </Text>
                      <Text
                        onPress={pickDocument}
                        style={[
                          tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`,
                          styles.DataBox,
                        ]}
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
                              style={{
                                width: 200,
                                height: 200,
                                margin: 10,
                                padding: 5,
                              }}
                            />
                          ) : (
                            <Image
                              source={{ uri: data.uri }}
                              style={{
                                width: 200,
                                height: 200,
                                margin: 10,
                                padding: 5,
                              }}
                            />
                          )}
                        </View>
                      ))}
                    </ScrollView>
                    <TouchableOpacity
                    onPress={uploadDocFiles}
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
                {item.sup_reply_given == '0' && isAdditional == '0' ? (
                  <TouchableOpacity
                    onPress={() => setAdditionalPressed(true)}
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
                      Add Additional Document
                    </Text>
                  </TouchableOpacity>
                ) : null}
                
                {item.sup_reply_given == '1' ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('InspectionDetails', {
                        rfi_form_id: item.rfi_form_id,
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
                      See Inspection data
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {global.rfi_super == '1' && item.sup_reply_given != '1' ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('InspectionForm', {
                        rfi_no: item.rfi_no,
                        rfi_form_id: item.rfi_form_id,
                        package_name: item.package_name,
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
                      Give Inspection data
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {global.rfi_cre == '1' && item.verify_status != '1' ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('RfiVerification', {
                        rfi_no: item.rfi_no,
                        rfi_form_id: item.rfi_form_id,
                        package_name: item.package_name,
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
                      Verify and assign Supervisor.
                    </Text>
                  </TouchableOpacity>
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
