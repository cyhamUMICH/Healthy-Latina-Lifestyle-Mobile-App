import { StyleSheet } from 'react-native';
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
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
    bottom: 100,
  },
  loginPhoto:{
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  }
});
  