import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginTop: 20,
  },
  noInternetContainer: {
    // color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    // fontWeight: '300',
  },
  settingContainer: {
    alignItems: 'flex-end',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'DomaineSansDisplay-Thin',
  },
  noItenaryFoundContainer: {
    height: Dimensions.get('screen').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Roboto-Thin',
  },
});

export default styles;
