import { CurrentRenderContext } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';
import { colors } from './Colors';

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.appBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    padding: 10
  },
  inputView: {
    backgroundColor: colors.accentBackground,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 0,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    textAlign: 'center',
  },
  fullWidthWindow: {
    flex: 1,
    width: '100%',
    padding: '2%',
    marginBottom: '4%'
  },
  noContent: {
    alignSelf: 'center'
  },
  cardList: {
    marginVertical: '2%',
    marginBottom: '4%'
  },
  card: {
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: '2%'
  },
  cardTitle: {
    textAlign: 'left',
    flexWrap: 'wrap',
    fontSize: 20,
    lineHeight: 30
  },
  cardImage: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    // Make sure full 16:9 images appear
    // https://stackoverflow.com/questions/29642685/maintain-aspect-ratio-of-image-with-full-width-in-react-native
    height: null,
    width: null,
    aspectRatio: 16/9
  }, 
  duration: {
    borderRadius: 20,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    marginRight: '2%',
    marginBottom: '2%',
    backgroundColor: colors.duration,
    fontWeight: 'bold'
  },
  tags: {
    alignItems: 'flex-start',
    marginTop: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  difficultyTag: {
    borderRadius: 20,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    backgroundColor: colors.difficultyTag,
    marginRight: '2%',
    marginBottom: '2%'
  },
  topicTag: {
    borderRadius: 20,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    backgroundColor: colors.topicTag,
    marginRight: '2%',
    marginBottom: '2%'
  },
  button: {
    backgroundColor: colors.button,
  },
  modalButtonWrapper: {
    marginHorizontal: '2%',
    marginBottom: '2%'
  },
  modalButtons: {
    backgroundColor: colors.modalButtons,
  },
  buttonText: {
    color: colors.text
  },
  selectedFilterButton: {
    backgroundColor: colors.selectedButton
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appBackground
  },
  modal: {
    maxHeight: '70%',
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
    padding: '5%',
    marginHorizontal: '10%',
    marginVertical: '30%',
    borderColor: colors.borderColor,
    borderWidth: 1,
    // https://reactnative.dev/docs/modal#example
    borderRadius: 20,
    shadowColor: colors.modalBorder,
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalSection: {
    alignItems: 'center'
  },
  modalText: {
    fontSize: 18
  },
  horizontalButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: '5%'
  },
  playButton: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(93, 63, 106, 0.2)',
    borderWidth: 16,
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
    shadowColor: '#5D3F6A',
    shadowRadius: 30,
    shadowOpacity: 0.5,
  },
  meditationPhoto:{
    width: 300,
    height: 300,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 85,
  },
  editAccountProfile:{
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginPhoto:{
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  },
  basicButtons:{
    backgroundColor: colors.accentBackground,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  titleView: {
    flex: 0,
    justifyContent: 'center',
    height: 60,
    marginBottom: 25,
  },
  titleText: {
    flex: 0,
    textAlign: 'center',
    fontSize: 48,
    color: '#444',
  },
  timerview: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 140,
    color: '#444',
    height: 140,
    borderRadius: 5,
    marginBottom: 50,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFF',
    width: 500,
  },
  timercomponent: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 220,
  },
  timerselector: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 40,
    color: '#444',
  },
  timerselectortitle: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 24,
    color: '#0B173B',
    height: 30,
    marginBottom: 10,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
    margin: 15,
    borderRadius: 10,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.accentBackground,
    
  },
  stopButton: {
    backgroundColor: colors.accentBackground,
  },
  resetButton: {
    backgroundColor: colors.accentBackground,
  },
  arrowButton: {
    flex: 0,
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  timerObject: {
    flex: 0,
    width: 70,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
      
    flex: 0,
    width: "80%",
    height: 150,
    padding: 1,
    justifyContent: 'center',

  }
});
  