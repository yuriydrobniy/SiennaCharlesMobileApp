import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({onPress, label}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            paddingVertical: 20,
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 40,
            marginVertical: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto-Light',
              letterSpacing: 2,
            }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
