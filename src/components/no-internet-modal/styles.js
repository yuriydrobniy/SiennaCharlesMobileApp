import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // ...
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Roboto-Light',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Light',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },
});

export default styles;
