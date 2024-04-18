import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

const Loader = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
};

export default Loader;
