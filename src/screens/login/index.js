import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import React, {useContext, useCallback, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/input';
import Button from '../../components/button';
import {withAPIRequest} from '../../hoc/with-api-request';
import {API, AXIOS_METHOD_TYPES} from '../../constants/api';
import {GlobalContext} from '../../context/global-context';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Background from '../../components/background';
import NoInternetModal from '../../components/no-internet-modal';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';

const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = ({navigation, commonAPIRequest}) => {
  const globalContext = useContext(GlobalContext);
  let url = 'https://siennacharles.com/luxury-travel-concierge/';

  const [internetModal, setinternetModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: values => {
      callLoginAPI(values.username, values.password, formik.resetForm);
    },
  });

  const callLoginAPI = (username, password, resetForm) => {
    let serviceParams = {
      api: API.LOGIN,
      method: AXIOS_METHOD_TYPES.POST,
      data: {
        username: username,
        password: password,
        device_name: 'sample',
      },
    };
    if (globalContext.isOffline) {
      setinternetModal(true);
    } else {
      globalContext.setLoading(true);
      commonAPIRequest(serviceParams, async result => {
        globalContext.setLoading(false);

        console.log('RESULT', result);

        try {
          if (result.token) {
            console.log('result-login', result);
            globalContext.setUser(result);
          } else {
            globalContext.setToastNotifications({
              text: result.response.data.message,
            });
          }
        } catch (error) {
          console.log('ERRORR', error);
          globalContext.setToastNotifications({
            text: 'Something went wrong please try again.',
          });
        }

        resetForm();
      });
    }
  };

  const openLearnMore = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    console.log('supported', supported);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {/* <Background /> */}
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{height: Dimensions.get('window').height}}>
        <View style={styles.container}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{marginVertical: '10%'}}
              source={require('../../assets/icons/logo/logo.png')}
            />
            <Text style={styles.loginText}>Login</Text>
          </View>

          <View style={{width: '100%', alignItems: 'center'}}>
            <Input
              placeholderText={'Email/Username'}
              icon={require('../../assets/icons/user/user.png')}
              keyword="username"
              setFieldValue={formik.setFieldValue}
              error={formik.errors.username}
              touched={formik.touched.username}
              value={formik.values.username}
              textContentType="username"
            />

            <Input
              placeholderText={'Password'}
              icon={require('../../assets/icons/lock/lock.png')}
              keyword="password"
              setFieldValue={formik.setFieldValue}
              error={formik.errors.password}
              touched={formik.touched.password}
              value={formik.values.password}
              secureTextEntry={true}
              textContentType={'password'}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={globalContext.remember}
              onValueChange={newValue => globalContext.setRemember(newValue)}
              onCheckColor={'#fff'}
              onFillColor={'#000'}
              onTintColor={'#F4DCF8'}
              tintColors={{true: '#fff', false: '#fff'}}
              boxType="square"
              onAnimationType="bounce"
              offAnimationType="bounce"
            />
            <Text style={styles.checkboxText}>Remember me</Text>
          </View>

          <View>
            <Button label={'LOG IN'} onPress={formik.handleSubmit} />
          </View>

          <View>
            <Text style={styles.text1}>Interested in Becoming</Text>
            <Text style={styles.text2}>a Member?</Text>
            <TouchableOpacity onPress={openLearnMore}>
              <Text style={styles.text3}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <NoInternetModal
        show={internetModal}
        onRetry={() => setinternetModal(false)}
      />
    </View>
  );
};

export default withAPIRequest(Login);
