import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: Dimensions.get('window').height,
  },
  loginText: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'DomaineSansDisplay-Thin',
    textTransform: 'uppercase',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  checkboxText: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
  },
  text1: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 16,
  },
  text2: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  text3: {
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default styles;
