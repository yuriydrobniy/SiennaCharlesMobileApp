import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itineraryName: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Roboto-Light',
    // letterSpacing: 2,
  },
  line: {
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginTop: 10,
  },
  updatedText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Light',
  },
});

export default styles;
