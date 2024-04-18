import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useContext, useCallback} from 'react';
import {GlobalContext} from '../../context/global-context';
import {withAPIRequest} from '../../hoc/with-api-request';
import {API, AXIOS_METHOD_TYPES} from '../../constants/api';

const SettingModal = ({setModalVisible, modalVisible, commonAPIRequest}) => {
  const globalContext = useContext(GlobalContext);
  let url = 'https://siennacharles.com/policy/';

  const openPrivacyPolicy = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  const callLogoutApi = () => {
    let serviceParams = {
      api: API.LOGOUT,
      method: AXIOS_METHOD_TYPES.POST,
    };
    globalContext.setLoading(true);

    try {
      commonAPIRequest(serviceParams, async result => {
        try {
          if (result) {
            globalContext.setLoading(false);
            console.log('RESULT____', result);
            globalContext.handleLogout();
          } else {
            globalContext.setLoading(false);
            return;
          }
        } catch (error) {
          console.log('Err', error);
          globalContext.setLoading(false);
        }
      });
    } catch (error) {
      console.log('ERRR', error);
      globalContext.setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0, 0.5)',
        }}>
        <View
          style={{
            //   margin: 20,
            backgroundColor: '#131516',
            borderRadius: 10,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderColor: '#fff',
            borderWidth: 1,
            width: '90%',
            height: '50%',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontFamily: 'Roboto-Light',
              }}>
              Settings
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image source={require('../../assets/icons/cross/cross.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '100%',
              margin: 20,
            }}
          />

          <View style={{width: '100%', marginVertical: 20}}>
            <TouchableOpacity
              onPress={openPrivacyPolicy}
              style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/icons/policy/policy.png')} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Roboto-Light',
                  marginLeft: 10,
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setTimeout(() => {
                  callLogoutApi();
                }, 1000);
              }}
              style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/icons/logout/logout.png')} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Roboto-Light',
                  marginLeft: 10,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default withAPIRequest(SettingModal);
