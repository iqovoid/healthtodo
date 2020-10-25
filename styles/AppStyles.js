/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F9F9F9',
  },
  text: {
    fontSize: 22,
  },
  opis: {
    fontSize: 16,
    color: 'gray',
    maxHeight: 90,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 12,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    height: 200,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    overflow: 'hidden',
    flexWrap: 'wrap',
    flexDirection: 'row',
    elevation: 5,
  },
  content: {
    width: 0,
    height: '100%',
    flexGrow: 1,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  contentCenter: {
    justifyContent: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    minHeight: 200,

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  modalInput: {
    borderColor: 'black',
    borderWidth: 1.3,
    borderRadius: 4,
    minWidth: 200,
    padding: 4,
    margin: 10,
  },
  cover: {
    width: undefined,
    height: '100%',
    minWidth: 120,
    aspectRatio: 1 / 2,
  },
  button: {
    margin: 5,
    backgroundColor: '#00eaa4',
    padding: 10,
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default styles;
