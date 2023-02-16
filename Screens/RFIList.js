import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react'
import '../global'
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import tw from 'tailwind-react-native-classnames';
import AllPackages from '../Components/AllPackages';
export default function RFIList() {
  const navigation = useNavigation();
  var rfi_list="";


  const loginId = global.user_cd;
  const [title, setTitle] = useState('0');
  const [label, setLabel] = useState('0');
  const [user, setUser] = useState('0');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  if (global.rfi_super =='1') {
    rfi_list = global.rfi_fetch_sup;
  } else if(global.rfi_cre =='1'){
    rfi_list = global.rfi_gc_list;

  }else{
    rfi_list = global.rfi_fetch_cont;

  }

  const onItemPressed = item => {
    navigation.navigate('RFIDetails', {
      rfi_form_id: item.rfi_form_id,
    }
    );
  };
  useEffect(() => {
    dataFetch(title,label,user);
  },[]);
  const dataFetch=(data,label,user)=>{
    const aboutCont = new AbortController();
    fetch(rfi_list, {
      signal: aboutCont.signal,
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginID: loginId,
        title:label,

      }),
    })
      .then(response => response.json())
      .then(json => setData(json))
      .finally(setLoading(false));
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header style={{ color: 'black' }} />
      <View>
        <Text style={tw` ml-10 mt-5 font-bold`}>Welcome, {global.name} </Text>
      </View>
      <View>
        <Text style={tw` ml-10 mt-5 mb-2.5 text-indigo-700 text-xl font-bold`}>Showing RFI List </Text>
      </View>
      {global.rfi_super == '1' ?
                    <AllPackages onChange={dataFetch}/> : null
                  }
                  {global.rfi_cre == '1' ?
                    <AllPackages onChange={dataFetch}/> : null
                  }
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
      ) : (
        <View style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          margin: 10, paddingTop: 5
          , paddingBottom: 5,
        }}>

          <FlatList
            data={data.users_data}
            keyExtractor={({ rfi_form_id }, index) => rfi_form_id}
            renderItem={({ item }) => (
              
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onItemPressed(item)}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    padding: 5,
                    borderRadius: 10,

                    shadowColor: "rgba(0,0,1,1)",
                    shadowOffset: {
                      width: 2,
                      height: 2
                    },
                    elevation: 2,
                    shadowOpacity: 0.90,
                    shadowRadius: 1
                  }}>
                  <Text
                    style={styles.boxtext}>
                    Package Name:  {item.package_name}
                  </Text>
                  <Text
                    style={styles.boxtext}>
                    RFI No:  {item.rfi_no}
                  </Text>
                  <Text
                    style={styles.boxtext}>
                    Submission Date:  {item.submission_date}
                  </Text>
                 
                   {item.verify_status == '0' && global.rfi_cre=='1' ?
                   <Text
                     style={{
                       flex: 1,
                       color: 'black',
                       fontWeight: 'bold',
                       fontSize: 14,
                       height: 30,
                       marginTop: 10,
                       marginLeft: 5,
                       marginRight: 5,
                       marginBottom: 5,
                       textAlign: 'center',
                       backgroundColor: '#DFFF00',
                       padding: 5,
                       borderRadius: 10
                     }}>
                     Not Yet Verified
                   </Text> : null
                 }
                  {item.verify_status == '1' && global.rfi_cre=='1' ?
                   <Text
                     style={{
                       flex: 1,
                       color: 'black',
                       fontWeight: 'bold',
                       fontSize: 14,
                       height: 30,
                       marginTop: 10,
                       marginLeft: 5,
                       marginRight: 5,
                       marginBottom: 5,
                       textAlign: 'center',
                       backgroundColor: '#50C878',
                       padding: 5,
                       borderRadius: 10
                     }}>
                     Verified
                   </Text> : null
                 }
                  {item.rfi_approved_status == '0' && (global.rfi_super=='1' || global.rfi_contractor=='1') ?
                    <Text
                      style={{
                        flex: 1,
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                        height: 30,
                        marginTop: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                        textAlign: 'center',
                        backgroundColor: '#DFFF00',
                        padding: 5,
                        borderRadius: 10
                      }}>
                      Pending
                    </Text> : null
                  }
                  {item.rfi_approved_status == '1' && (global.rfi_super=='1' || global.rfi_contractor=='1') ?
                    <Text
                      style={{
                        flex: 1,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 14,
                        height: 30,
                        marginTop: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                        textAlign: 'center',
                        backgroundColor: '#50C878',
                        padding: 5,
                        borderRadius: 10
                      }}>
                      Approved
                    </Text> : null
                  }
                  {item.rfi_approved_status == '2' && (global.rfi_super=='1' || global.rfi_contractor=='1')?
                    <Text
                      style={{
                        flex: 1,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 14,
                        height: 30,
                        marginTop: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                        textAlign: 'center',
                        backgroundColor: '#C41E3A',
                        padding: 5,
                        borderRadius: 10
                      }}>
                      Not Approved
                    </Text> : null
                  }
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

      )}
      <Footer />
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5,
  },
  inner: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#002a55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxtextsty: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  boxtext: {
    marginTop: 5,
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  positiontextRed: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
    color: '#ff4466',
  },
  positiontextGreen: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
    color: '#1cfebd',
  },
  button: {
    width: 70,
    height: 30,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#80b900',
    padding: 5,
    borderRadius: 10,
  },
  buttonSearch: {
    flexDirection: 'row',
    width: 130,
    height: 40,
    marginTop: 5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#72a400',
    padding: 5,
    borderRadius: 10,
  },
  buttonSearch2: {
    flexDirection: 'row',
    width: 130,
    height: 40,
    marginTop: 20,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003da6',
    padding: 5,

    borderRadius: 10,
  },
  dropdownStyles: {
    backgroundColor: '#eee',
    width: '100%',
    height: 50,
    padding: 15,
    borderRadius: 10,
  },
});