import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import styles from './styles';

const NoInternetModal = ({show, onRetry, isRetrying}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={show}
    onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(false);
    }}>
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.7)',
      }}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default NoInternetModal;
