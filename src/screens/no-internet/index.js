import {View, Text, Image} from 'react-native';
import React from 'react';
import Background from '../../components/background';
import Button from '../../components/button';

const NoInternet = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <Background />
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image source={require('../../assets/icons/logo2/logo2.png')} />
        <View
          style={{
            // height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{marginVertical: 20}}
            source={require('../../assets/icons/error/error.png')}
          />

          <Text
            style={{
              fontSize: 35,
              color: 'white',
              fontFamily: 'DomaineSansDisplay-Light',
              marginVertical: 10,
            }}>
            Something went wrong!
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Roboto-Light',
            }}>
            Please check your connection.
          </Text>
        </View>

        <View>
          <Button label={'DOWNLOADS'} />
        </View>
      </View>
    </View>
  );
};

export default NoInternet;
