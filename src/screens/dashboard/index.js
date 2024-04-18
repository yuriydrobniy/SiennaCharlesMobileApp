import {
  View,
  Text,
  Platform,
  Image,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Itinerary from '../../components/itinerary';
import {API, AXIOS_METHOD_TYPES} from '../../constants/api';
import {GlobalContext} from '../../context/global-context';
import {withAPIRequest} from '../../hoc/with-api-request';
import Background from '../../components/background';
import SettingModal from '../../components/modal';
import NoInternetModal from '../../components/no-internet-modal';
import styles from './styles';

const Dashboard = ({navigation, commonAPIRequest}) => {
  const globalContext = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [itineraries, setItineraries] = useState([]);
  const [response, setResponse] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const callGetTripsAPI = () => {
    let serviceParams = {
      api: API.GET_TRIPS,
      method: AXIOS_METHOD_TYPES.GET,
    };
    globalContext.setLoading(true);

    console.log('SERVICE_PARAMS', globalContext);

    try {
      commonAPIRequest(serviceParams, async result => {
        setResponse(true);
        // console.log('RESPONSE', result.response.status);

        try {
          if (result) {
            globalContext.setLoading(false);
            console.log('RESULT', result);
            if (
              JSON.stringify(result?.response?.status)?.includes(4) ||
              result?.code === 'ERR_NETWORK'
            ) {
              return;
            } else {
              setItineraries(result);
            }
            // setItineraries(result);
            // console.log('result', result);
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

  console.log('ITINERARIES', itineraries);

  const callGetTripsRefreshAPI = () => {
    let serviceParams = {
      api: API.GET_TRIPS,
      method: AXIOS_METHOD_TYPES.GET,
    };
    setRefreshing(true);

    try {
      commonAPIRequest(serviceParams, async result => {
        setResponse(true);

        try {
          if (result) {
            setRefreshing(false);
            if (
              JSON.stringify(result?.response?.status)?.includes(4) ||
              result?.code === 'ERR_NETWORK'
            ) {
              return;
            } else {
              setItineraries(result);
            }
            setRefreshing(false);
            console.log('result', result);
          } else {
            setRefreshing(false);
          }
        } catch (error) {
          console.log('Err', error);
        }
      });
    } catch (error) {
      console.log('ERRR', error);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    if (globalContext.isOffline) {
      return;
    } else {
      callGetTripsRefreshAPI();
    }
  }, []);

  // useEffect(() => {
  //   if (itineraries.length !== 0) {
  //     globalContext.setMorePdfs(
  //       itineraries.map(itinerary => {
  //         return {
  //           tripId: itinerary.id,
  //           pdfs: [],
  //         };
  //       }),
  //     );
  //   }
  // }, [itineraries]);

  useEffect(() => {
    if (!globalContext.isOffline) {
      callGetTripsAPI();
    }
  }, [globalContext.isOffline]);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
      {/* <Background /> */}
      <SafeAreaView style={{height: '100%'}}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === 'ios'}
          // bounces={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          keyboardShouldPersistTaps={'handled'}>
          {/* <View style={styles.logo}>
            <Image
              source={require('../../assets/icons/dashboard-logo/dashboard-logo.png')}
            />
            <View style={styles.line} />
          </View> */}

          {globalContext.isOffline && (
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
              }}>
              <Text style={styles.noInternetContainer}>
                No internet connection.
              </Text>
            </View>
          )}

          <View style={styles.settingContainer}>
            {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require('../../assets/icons/cog/cog.png')} />
            </TouchableOpacity> */}
          </View>

          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.header}>Current trips</Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require('../../assets/icons/cog/cog.png')} />
            </TouchableOpacity>
          </View>

          <View style={{padding: 20}}>
            {globalContext.isOffline
              ? globalContext.trips?.map(itenary => (
                  <Itinerary
                    key={itenary.id}
                    info={itenary}
                    navigation={navigation}
                  />
                ))
              : itineraries &&
                itineraries?.map(itenary => (
                  <Itinerary
                    key={itenary.id}
                    info={itenary}
                    navigation={navigation}
                  />
                ))}
          </View>

          {itineraries.length === 0 && response && !globalContext.isOffline && (
            <View style={styles.noItenaryFoundContainer}>
              <Text style={styles.notFoundText}>No Itinerary Found.</Text>
            </View>
          )}

          {globalContext?.trips?.length === 0 && globalContext.isOffline && (
            <View style={styles.noItenaryFoundContainer}>
              <Text style={styles.notFoundText}>No Itinerary Found.</Text>
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>

      <SettingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <NoInternetModal show={false} />
    </View>
  );
};

export default withAPIRequest(Dashboard);
