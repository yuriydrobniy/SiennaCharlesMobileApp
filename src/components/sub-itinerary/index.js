import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';

const SubItinerary = ({
  pdf,
  navigation,
  globalContext,
  info,
  downloadNow,
  setCounter,
}) => {
  const [loader, setLoader] = useState(false);

  const onDownloadMorePdfs = async morePdfsInfo => {
    setLoader(true);
    await ReactNativeBlobUtil.fetch(
      'GET',
      morePdfsInfo.pdf_url.replace(/\s/g, '%20'),
    )
      .then(res => {
        setLoader(false);
        // globalContext.setMorePdfs(prevPdfs => )
        if (
          globalContext.morePdfs.findIndex(
            p => p.tripId === morePdfsInfo?.trip_id,
          ) === -1
        ) {
          globalContext.setMorePdfs(prevPdfs => [
            ...prevPdfs,
            {
              tripId: morePdfsInfo.trip_id,
              pdfs: [
                {
                  id: morePdfsInfo?.id,
                  name: morePdfsInfo.name,
                  base64Link: res.data,
                },
              ],
            },
          ]);
        } else {
          globalContext.setMorePdfs(prevPdfs =>
            prevPdfs.map(file =>
              file.tripId === info.id
                ? {
                    ...file,
                    pdfs: [
                      ...globalContext.morePdfs.find(p => p.tripId === info.id)
                        .pdfs,
                      {
                        id: morePdfsInfo?.id,
                        name: morePdfsInfo.name,
                        base64Link: res.data,
                      },
                    ],
                  }
                : file,
            ),
          );
        }
      })
      .catch(err => {
        setLoader(false);
        console.log('ERR', err);
      });
    setCounter(prevValue => prevValue + 1);
  };

  useEffect(() => {
    if (
      !(
        globalContext.morePdfs?.findIndex(p => p.tripId === info.id) !== -1 &&
        globalContext.morePdfs
          .find(pd => pd.tripId === info.id)
          .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
      )
    ) {
      if (downloadNow === pdf.id) {
        // call download function.
        try {
          onDownloadMorePdfs(pdf);
        } catch (error) {
          console.log('errorrr', error);
        }
        // console.log('aaaa', pdf);
      }
    } else {
      console.log('heyyy', pdf);
    }
  }, [downloadNow]);

  console.log('info', info);

  return (
    <View
      key={pdf.id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate('DETAILS_SCREEN', {
            pdfName: pdf.name && pdf.name,
            pdfLink: pdf.pdf_url ? pdf.pdf_url : false,
            base64Link:
              globalContext.morePdfs?.findIndex(p => p.tripId === info.id) !==
                -1 &&
              globalContext.morePdfs
                .find(pd => pd.tripId === info.id)
                .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
                ? globalContext.morePdfs
                    .find(pd => pd.tripId === info.id)
                    .pdfs.find(pd => pd.id === pdf.id).base64Link
                : false,
          })
        }>
        <Image source={require('../../assets/icons/pdf/pdf.png')} />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() =>
          globalContext.morePdfs?.findIndex(p => p.tripId === info.id) !== -1 &&
          globalContext.morePdfs
            .find(pd => pd.tripId === info.id)
            .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
            ? navigation.navigate('DETAILS_SCREEN', {
                pdfName: pdf.name && pdf.name,
                pdfLink: pdf.pdf_url ? pdf.pdf_url : false,
                base64Link:
                  globalContext.morePdfs?.findIndex(
                    p => p.tripId === info.id,
                  ) !== -1 &&
                  globalContext.morePdfs
                    .find(pd => pd.tripId === info.id)
                    .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
                    ? globalContext.morePdfs
                        .find(pd => pd.tripId === info.id)
                        .pdfs.find(pd => pd.id === pdf.id).base64Link
                    : false,
              })
            : onDownloadMorePdfs(pdf)
        }
        style={{width: '70%'}}>
        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            // width: '60%',
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
          }}>
          {pdf?.name}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          width: '25%',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() =>
            globalContext.morePdfs?.findIndex(p => p.tripId === info.id) !==
              -1 &&
            globalContext.morePdfs
              .find(pd => pd.tripId === info.id)
              .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
              ? navigation.navigate('DETAILS_SCREEN', {
                  pdfName: pdf.name && pdf.name,
                  pdfLink: pdf.pdf_url ? pdf.pdf_url : false,
                  base64Link:
                    globalContext.morePdfs?.findIndex(
                      p => p.tripId === info.id,
                    ) !== -1 &&
                    globalContext.morePdfs
                      .find(pd => pd.tripId === info.id)
                      .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
                      ? globalContext.morePdfs
                          .find(pd => pd.tripId === info.id)
                          .pdfs.find(pd => pd.id === pdf.id).base64Link
                      : false,
                })
              : onDownloadMorePdfs(pdf)
          }>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <Image
              style={{height: 24, width: 24}}
              source={
                globalContext.morePdfs?.findIndex(p => p.tripId === info.id) !==
                  -1 &&
                globalContext.morePdfs
                  .find(pd => pd.tripId === info.id)
                  .pdfs.findIndex(pd => pd.id === pdf.id) !== -1
                  ? require('../../assets/icons/pdf/pdf.png')
                  : require('../../assets/icons/download/download.png')
              }
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubItinerary;
