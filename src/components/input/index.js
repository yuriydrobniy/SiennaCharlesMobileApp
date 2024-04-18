import {View, TextInput, Image, Platform, Text} from 'react-native';
import React from 'react';

const Input = ({
  placeholderText,
  icon,
  keyword,
  setFieldValue,
  error,
  touched,
  value,
  secureTextEntry,
  textContentType,
}) => {
  return (
    <View style={{width: '80%', marginVertical: 10}}>
      <View style={{width: '100%', marginVertical: 10}}>
        <TextInput
          style={{
            padding: Platform.OS === 'ios' ? 20 : 10,
            borderWidth: 1,
            borderColor: 'white',
            width: '100%',
            borderRadius: 10,
            color: '#fff',
            fontFamily: 'Roboto-Light',
          }}
          placeholder={placeholderText}
          placeholderTextColor={'#707070'}
          onChangeText={val => setFieldValue(keyword, val)}
          value={value}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
        />
        {icon && (
          <Image
            style={{position: 'absolute', top: '30%', right: '5%'}}
            source={icon}
          />
        )}
      </View>

      {error && touched && <Text style={{color: '#ff0033'}}>{error}</Text>}
    </View>
  );
};

export default Input;
