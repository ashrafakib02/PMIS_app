import { ActivityIndicator, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Footer from './Footer';

const InspectionDetails = ({ route }) => {
    const { rfi_form_id } = route.params;
    const navigation = useNavigation();

    const inspection_details = global.fetch_ins;
    const inspection_doc = global.fetch_ins_doc;
    const inspection_check_doc = global.fetch_check_doc;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [datadoc, setDatadoc] = useState([]);
    const [checkdoc, setCheckdoc] = useState([]);
    useEffect(() => {
        Promise.all([
            fetch(inspection_details, {
                method: 'post',
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID: rfi_form_id,
                }),
            }),
            fetch(inspection_doc, {
                method: 'post',
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID: rfi_form_id,
                }),
            }),
            fetch(inspection_check_doc, {
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
            .then(([resdata, resdoc, rescheck]) =>
                Promise.all([resdata.json(), resdoc.json(), rescheck.json()])
            )
            .then(([dataData, dataDatadoc, dataCheckdoc]) => {
                setData(dataData);
                setDatadoc(dataDatadoc);
                setCheckdoc(dataCheckdoc);
                console.log(data, datadoc, checkdoc);

            })
            .finally(setLoading(false));
        docfetch();
    }, []);
    const docfetch = () => {
        console.log(data, datadoc, checkdoc);
    }
    const loadInBrowser = item => {
        Linking.openURL(item.RFI_Scanned_document).catch(err => console.error("Couldn't load page", err));
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>

            <View style={{ flex: 1, }}>
                <Text style={[tw`mt-2.5 ml-2.5 mr-2.5 text-indigo-700 text-xl font-bold`, styles.header]}>INSPECTION DETAILS</Text>

                {isLoading ? (
                    <ActivityIndicator animating={true} size="small" color="#0000ff" />
                ) : (
                    <FlatList
                        data={data.users_data}
                        renderItem={({ item }) => (

                            <ScrollView style={{ flex: 1, margin: 10, borderWidth: 1, borderColor: 'black', }}>

                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Package</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.package_name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>RFI No.</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.rfi_no}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Date of Inspection</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.date}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Time of Inspection</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.time}</Text>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Text style={styles.titleBoxBig}>Observation</Text>

                                    <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>{item.observation}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Approved</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.isapproved}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Checked by employer</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.isChecked}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>Inspected By</Text>
                                    <Text style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.DataBox]}>{item.sup_name}</Text>
                                </View>


                                <View style={{ flex: 1, }}>
                                    <Text style={styles.titleBoxBig}>RFI Checklist Attachments</Text>
                                    <View>
                                        {/* <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>{item.package_name}</Text> */}
                                        {isLoading ? (
                                            <ActivityIndicator animating={true} size="small" color="#0000ff" />
                                        ) : (

                                            <FlatList
                                                data={checkdoc.users_data}

                                                horizontal
                                                style={{ marginLeft: 10, marginRight: 10 }}
                                                renderItem={({ item }) => (

                                                    <ScrollView style={{ flex: 1, margin: 10, borderWidth: 1, borderColor: 'black', }}>
                                                        <View>
                                                            {item.RFI_Scanned_document.includes('.pdf') ?
                                                                <TouchableOpacity
                                                                    onPress={() => loadInBrowser(item)}
                                                                    style={{ flex: 1, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                                                                    activeOpacity={.8}
                                                                >
                                                                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png' }}
                                                                        style={{ width: 100, height: 100, resizeMode: 'contain', marginTop: 10 }} />


                                                                </TouchableOpacity>
                                                                : <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                                                                    activeOpacity={.8}
                                                                    onPress={() => loadInBrowser(item)}
                                                                >
                                                                    <Image source={{ uri: item.RFI_Scanned_document }}
                                                                        style={{ width: 100, height: 100, resizeMode: 'contain', marginTop: 10 }} />

                                                                </TouchableOpacity>}
                                                        </View>

                                                    </ScrollView>


                                                )}

                                            />

                                        )}
                                    </View>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Text style={styles.titleBoxBig}>Other Attachments</Text>
                                    <View>
                                        {/* <Text style={[tw`text-indigo-700`, styles.DataBoxBig]}>{item.package_name}</Text> */}
                                        {isLoading ? (
                                            <ActivityIndicator animating={true} size="small" color="#0000ff" />
                                        ) : (

                                            <FlatList
                                                data={datadoc.users_data}

                                                horizontal
                                                style={{ marginLeft: 10, marginRight: 10 }}
                                                renderItem={({ item }) => (

                                                    <ScrollView style={{ flex: 1, margin: 10, borderWidth: 1, borderColor: 'black', }}>
                                                        <View>
                                                            {item.RFI_Scanned_document.includes('.pdf') ?
                                                                <TouchableOpacity
                                                                    onPress={() => loadInBrowser(item)}
                                                                    style={{ flex: 1, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                                                                    activeOpacity={.8}
                                                                >
                                                                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_960_720.png' }}
                                                                        style={{ width: 100, height: 100, resizeMode: 'contain', marginTop: 10 }} />


                                                                </TouchableOpacity>
                                                                : <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                                                                    activeOpacity={.8}
                                                                    onPress={() => loadInBrowser(item)}
                                                                >
                                                                    <Image source={{ uri: item.RFI_Scanned_document }}
                                                                        style={{ width: 100, height: 100, resizeMode: 'contain', marginTop: 10 }} />

                                                                </TouchableOpacity>}
                                                        </View>

                                                    </ScrollView>


                                                )}

                                            />

                                        )}
                                    </View>
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

export default InspectionDetails

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        justifyContent: 'center',
        textShadowRadius: 5,
        borderRadius: 10,
        backgroundColor: '#50C878',
        marginTop: 30

    },
    titleBox: {

        backgroundColor: 'blue',
        color: 'white',
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
        marginRight: 10
    },
    DataBoxBig: {
        flex: 1,
        flexShrink: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        fontSize: 14,
        margin: 10,
    },
    DataBox: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        fontSize: 14,


    },
});