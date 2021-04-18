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
  }
});
  