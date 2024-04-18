import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {GlobalContext} from '../../context/global-context';
import styles from './styles';
import {withAPIRequest} from '../../hoc/with-api-request';
import {API, AXIOS_METHOD_TYPES} from '../../constants/api';
import SubItinerary from '../sub-itinerary';

const Itinerary = ({navigation, info, commonAPIRequest}) => {
  const [downloaded, setDownloaded] = useState(false);
  const globalContext = useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const [tripLoader, setTripLoader] = useState(false);
  const [downloadAllNow, setDownloadAllNow] = useState(false);
  const [counter, setCounter] = useState(0);

  const [morePdfs, setMorePdfs] = useState([]);

  const [openMorePdfs, setOpenMorePdfs] = useState(false);

  const [morePdfsIdArray, setMorePdfsIdArray] = useState([]);

  const callGetMorePdfs = () => {
    let serviceParams = {
      api: `${API.GET_MORE_PDFS}/${info.id}/pdfs`,
      method: AXIOS_METHOD_TYPES.GET,
    };
    setLoader(true);
    try {
      commonAPIRequest(serviceParams, async result => {
        // setResponse(true);
        // console.log('RESPONSE', result.response.status);

        try {
          if (result) {
            setLoader(false);
            console.log('RESULT', result);
            if (JSON.stringify(result?.response?.status)?.includes(4)) {
              return;
            }
            setMorePdfs(result);
            setMorePdfsIdArray(result.map(r => r.id));
            console.log('result', result);
          } else {
            setLoader(false);
            return;
          }
        } catch (error) {
          console.log('Err', error);
          setLoader(false);
        }
      });
    } catch (error) {
      console.log('ERRR', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (openMorePdfs) {
      if (!globalContext.isOffline) {
        callGetMorePdfs();
      } else {
        if (
          globalContext.morePdfs.findIndex(pdf => pdf.tripId === info.id) !== -1
        ) {
          setMorePdfs(
            globalContext.morePdfs.find(pdf => pdf.tripId === info.id).pdfs,
          );
        }
      }
    }
  }, [openMorePdfs]);

  const onDownloadTrip = async tripInfo => {
    // globalContext.setLoading(true);
    setTripLoader(true);
    await ReactNativeBlobUtil.fetch('GET', info.pdf_url.replace(/\s/g, '%20'))
      .then(res => {
        globalContext.setTrips(prevTrips => [
          ...prevTrips,
          {
            tripBase64: res.data,
            mobile_app_itinerary_name: tripInfo.mobile_app_itinerary_name,
            id: tripInfo.id,
            published_to_mobile_app: tripInfo.published_to_mobile_app,
            morePdfs: [],
          },
        ]);
        // globalContext.setLoading(false);
        setTripLoader(false);
        console.log('globalContext', globalContext);
      })
      .catch(err => {
        // globalContext.setLoading(false);
        setTripLoader(false);
        console.log('ERR', err);
      });
  };

  const downloadAllmorePdfs = async () => {
    if (
      !(globalContext?.trips?.findIndex(trip => info.id === trip.id) !== -1)
    ) {
      await onDownloadTrip(info);
    }
    setDownloadAllNow(morePdfsIdArray[0]);
  };

  useEffect(() => {
    if (morePdfsIdArray[counter]) {
      setDownloadAllNow(morePdfsIdArray[counter]);
    }
  }, [counter]);

  return (
    <View
      style={{
        borderWidth: 0.5,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#252525',
      }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() =>
              navigation.navigate('DETAILS_SCREEN', {
                pdfLink: info.pdf_url ? info.pdf_url : false,
                base64Link:
                  globalContext?.trips?.findIndex(
                    trip => info.id === trip.id,
                  ) !== -1
                    ? globalContext?.trips?.find(trip => info.id === trip.id)
                        ?.tripBase64
                    : false,
              })
            }>
            <Image source={require('../../assets/icons/pdf/pdf.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setOpenMorePdfs(prevValue => !prevValue)}
            style={{width: '95%'}}>
            <Text style={styles.itineraryName}>
              {info?.mobile_app_itinerary_name
                ? info?.mobile_app_itinerary_name
                : '-'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              if (
                globalContext?.trips?.findIndex(trip => info.id === trip.id) !==
                -1
              ) {
                return;
              } else {
                onDownloadTrip(info);
              }
            }}>
            {tripLoader ? (
              <ActivityIndicator />
            ) : (
              <Image
                source={
                  globalContext?.trips?.findIndex(
                    trip => info.id === trip.id,
                  ) !== -1
                    ? require('../../assets/icons/complete/complete.png')
                    : require('../../assets/icons/download/download.png')
                }
              />
            )}
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.line} />

      <TouchableOpacity
        onPress={() => setOpenMorePdfs(prevValue => !prevValue)}
        style={{alignItems: 'center'}}>
        {openMorePdfs ? (
          <Image source={require('../../assets/icons/arrow-up/arrow-up.png')} />
        ) : (
          <Image
            source={require('../../assets/icons/arrow-down/arrow-down.png')}
          />
        )}
      </TouchableOpacity>

      {openMorePdfs &&
        (loader ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : morePdfs.length === 0 ? (
          <View>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>
              No pdf Found
            </Text>
          </View>
        ) : (
          <View style={{}}>
            <View
              style={{
                paddingBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* <TouchableOpacity
                  style={{marginRight: 15}}
                  onPress={() =>
                    navigation.navigate('DETAILS_SCREEN', {
                      pdfName: info?.mobile_app_itinerary_name,
                      pdfLink: info.pdf_url ? info.pdf_url : false,
                      base64Link:
                        globalContext?.trips?.findIndex(
                          trip => info.id === trip.id,
                        ) !== -1
                          ? globalContext?.trips?.find(
                              trip => info.id === trip.id,
                            )?.tripBase64
                          : false,
                    })
                  }>
                  <Image source={require('../../assets/icons/pdf/pdf.png')} />
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    if (
                      globalContext?.trips?.findIndex(
                        trip => info.id === trip.id,
                      ) !== -1
                    ) {
                      navigation.navigate('DETAILS_SCREEN', {
                        pdfName: info?.mobile_app_itinerary_name,
                        pdfLink: info.pdf_url ? info.pdf_url : false,
                        base64Link:
                          globalContext?.trips?.findIndex(
                            trip => info.id === trip.id,
                          ) !== -1
                            ? globalContext?.trips?.find(
                                trip => info.id === trip.id,
                              )?.tripBase64
                            : false,
                      });
                    } else {
                      onDownloadTrip(info);
                    }
                  }}
                  style={{width: '90%'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Roboto-Regular',
                      fontWeight: '400',
                      // width: '60%',
                      fontSize: 16,
                    }}>
                    Itinerary
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      globalContext?.trips?.findIndex(
                        trip => info.id === trip.id,
                      ) !== -1
                    ) {
                      navigation.navigate('DETAILS_SCREEN', {
                        pdfName: info?.mobile_app_itinerary_name,
                        pdfLink: info.pdf_url ? info.pdf_url : false,
                        base64Link:
                          globalContext?.trips?.findIndex(
                            trip => info.id === trip.id,
                          ) !== -1
                            ? globalContext?.trips?.find(
                                trip => info.id === trip.id,
                              )?.tripBase64
                            : false,
                      });
                    } else {
                      onDownloadTrip(info);
                    }
                  }}>
                  {tripLoader ? (
                    <ActivityIndicator />
                  ) : (
                    <Image
                      style={{height: 24, width: 24}}
                      source={
                        globalContext?.trips?.findIndex(
                          trip => info.id === trip.id,
                        ) !== -1
                          ? require('../../assets/icons/pdf/pdf.png')
                          : require('../../assets/icons/download/download.png')
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {morePdfs?.map(pdf => (
                <SubItinerary
                  key={pdf.id}
                  pdf={pdf}
                  navigation={navigation}
                  globalContext={globalContext}
                  info={info}
                  downloadNow={downloadAllNow}
                  setCounter={setCounter}
                />
              ))}
            </View>
            {/* {!globalContext.isOffline && (
              <TouchableOpacity
                onPress={async () => await downloadAllmorePdfs(morePdfs)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#D9D9D9',
                  padding: 20,
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 16, fontFamily: 'Roboto'}}>
                  Download all files
                </Text>
              </TouchableOpacity>
            )} */}
          </View>
        ))}
    </View>
  );
};

export default withAPIRequest(Itinerary);
