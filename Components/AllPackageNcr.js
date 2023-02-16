import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import '../global'
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

const AllPackageNcr = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [pkgData, setpkgData] = useState([]);
    const allPackage = global.packag;
    const [label, setLabel] = useState([]);
    const loginID = global.user_cd;
    const [value, setValue] = useState('0');
    const [isFocus, setIsFocus] = useState(false);
   

    useEffect(() => {
        var getpkgdatadrop={
            method:'get',
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
            
            pkgArray.push({
                value:res.data[i].lid,
                label:res.data[i].title,
                user:res.data[i].user_cd,
                contractor_name:res.data[i].contractor_name,
            });
            
        }
        setpkgData(pkgArray);
    })
    .catch(err=>{
        console.log(err)
    });
    },[]);

     
    const handletitle = (titleValue,titleLabel,user,contractor_name) => {
        props.onChange(titleValue,titleLabel,user,contractor_name);
    }

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Select Package
                </Text>
            );
        }      
        return null;
    };
    return (
        <View style={styles.container}>
            {renderLabel()}
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
                placeholder={!isFocus ? 'Select Package' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    {handletitle(item.value,item.label,item.user,item.contractor_name)}
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
    );
};

export default AllPackageNcr

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 12,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
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
});