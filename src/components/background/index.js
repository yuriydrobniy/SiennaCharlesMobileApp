import {View, Image} from 'react-native';
import React from 'react';

const Background = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
      }}>
      <Image
        source={require('../../assets/images/background/background.png')}
      />
    </View>
  );
};

export default Background;
