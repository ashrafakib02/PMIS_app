import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import '../global'
import tw from 'tailwind-react-native-classnames';
// const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
// ];


const ContractorActivity = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [pkgData, setpkgData] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const allActivity =global.activity;
    const allPackage = global.packag;
    const [label, setLabel] = useState([]);
    const loginID = global.user_cd;
    const [value, setValue] = useState('0');
    const [value2, setValue2] = useState('0');

    const [isFocus, setIsFocus] = useState(false);
   

    useEffect(() => {
    
        var getpkgdatadrop={
            method:'post',
            url:allPackage,
            headers:{
                'abc':'abc'
            }
        }
        axios(getpkgdatadrop)
    .then (res=> {
        var count=Object.keys(res.data).length;
        let pkgArray=[];
        for (var i = 0; i < count; i++) {
            if(res.data[i].user_cd!='0')
          {  pkgArray.push({
            value:res.data[i].user_cd,
            label:res.data[i].contractor_name,
            user:res.data[i].package_code,
            });}
            
        }
        setpkgData(pkgArray);
    })
    .catch(err=>{
        console.log(err)
    });
    },[]);

    const handleActivity = (titleValue) => {
        var code=titleValue;
        var getpkgdatadrop={
            method:'post',
            url:allActivity,
            data:{
                code:code
            }
        }
        axios(getpkgdatadrop)
    .then (res=> {
        var count=Object.keys(res.data).length;
        let ActArray=[];
        for (var i = 0; i < count; i++) {
            if(res.data[i].user_cd!='0')
          {  ActArray.push({
            value:res.data[i].package_wise_activity_id,
                label:res.data[i].rfi_activity_name,
            });}
            
        }
        setActivityData(ActArray);
    })
    .catch(err=>{
        console.log(err)
    });
    }
    const handletitle = (empValue) => {
        setValue(empValue);                    
        props.onChange(empValue,value2);
    }
    const handletitle2 = (Actvalue) => {
        setValue2(Actvalue);

        props.onChange(value,Actvalue);
    }
    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>NAME OF EMPLOYER</Text>
            <View style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.dropDown]}>

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={pkgData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Employer' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    {handleActivity(item.user)}
                    {handletitle(item.value)}
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
</View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', }}>
        <Text style={[tw` mt-2.5 ml-2.5 text-indigo-700`, styles.titleBox]}>NAME OF EMPLOYER</Text>
            <View style={[tw`mt-2.5 ml-1.5 mr-2.5 text-indigo-700`, styles.dropDown]}>

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={activityData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Activity' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    {handletitle2(item.value)}
                    setIsFocus(false);

                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
</View>
        </View>
        </View>
    );
};

export default ContractorActivity

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 12,
    },
    dropdown: {
        padding:10,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    titleBox: {

        backgroundColor: 'blue',
        color: 'white',
        padding: 5,
        fontSize: 14,
        width: 100,
        textAlignVertical: "center"


    },
    DataBox: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        fontSize: 14,
        backgroundColor: '#d0f5e6',
        textAlignVertical: 'center'
    },
    dropDown: {
        flex: 1,
        borderColor: 'black',
        fontSize: 14,
        backgroundColor: '#ffffff'
    },
});