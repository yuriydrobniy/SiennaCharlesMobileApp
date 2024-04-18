import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  Share,
  Text,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import Pdf from 'react-native-pdf';
import {GlobalContext} from '../../context/global-context';
import base64PDF from '../../assets/pdf/itineraries';

const Detail = ({navigation, route}) => {
  const globalContext = useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const {
    params: {pdfLink, base64Link, pdfName},
  } = route;

  useEffect(() => {
    globalContext.setLoading(true);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <View
          style={{
            height: Platform.OS === 'ios' ? 100 : 50,
            width: '100%',
            backgroundColor: '#000',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/icons/back/back.png')}
              style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? 70 : 20,
                left: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: 0.5, backgroundColor: 'white'}} />
        <View
          style={{
            padding: 20,
            // paddingTop: 0,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 32,
              fontFamily: 'DomaineSansDisplay-Light',
            }}>
            {pdfName && pdfName}
          </Text>
        </View>
      </View>
      <View style={{height: '85%', width: '100%'}}>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: base64Link
              ? `data:application/pdf;base64,${base64Link}`
              : pdfLink.replace(/\s/g, '%20'),
          }}
          onLoadProgress={percent => {
            console.log('percent', percent);
            // globalContext.setLoading(true);
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            globalContext.setLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
            Alert.alert('Something went wrong.', '', [
              {
                text: 'Okay',
                onPress: () => {
                  setTimeout(() => {
                    globalContext.setLoading(false);
                    navigation.goBack();
                  }, 1000);
                },
                style: 'cancel',
              },
            ]);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>

      {base64Link && (
        <View
          style={{
            height: Platform.OS === 'ios' ? 70 : 50,
            width: '100%',
            backgroundColor: '#000',
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                title: pdfName ? pdfName : 'Title',
                message: pdfName ? pdfName : 'Message',
                url: 'data:application/pdf;base64,' + base64Link,
              })
            }>
            <Image
              source={require('../../assets/icons/share/share.png')}
              style={
                {
                  // position: 'absolute',
                  // top: Platform.OS === 'ios' ? 60 : 10,
                  // right: 10,
                }
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Detail;
