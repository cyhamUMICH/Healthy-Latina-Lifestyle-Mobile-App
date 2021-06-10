import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

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
  buttonIconRight: {
    marginLeft: '5%'
  },
  inputView: {
    marginVertical: '2%'
  },
  inputText: {
    borderRadius: 30,
    backgroundColor: colors.accentBackground,
    marginBottom: '2%',
    paddingHorizontal: '5%',
    paddingVertical: '2%'
  },
  fullWidthWindow: {
    flex: 1,
    width: '100%',
    paddingTop: '2%',
    paddingHorizontal: '2%'
  },
  smallerWidthWindow: {
    padding: '10%'
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
  contentTitle: {
    fontSize: 28,
    textAlign: "center"
  },
  contentDescription: {
    fontSize: 18
  },
  contentDescriptionSpacer: {
    marginTop: '2%',
    marginBottom: '5%'
  },
  sliderAndController: {
    marginBottom: '25%'
  },
  button: {
    backgroundColor: colors.button,
    marginBottom: '2%'
  },
  smallButton: {
    backgroundColor: colors.button,
    marginHorizontal: '20%',
    marginBottom: '2%'
  },
  horizontalSpaceButtonWrapper: {
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
    backgroundColor: colors.selectedButton,
    marginBottom: '2%'
  },
  selectedFilterButtonText: {
    color: colors.selectedButtonText
  },
  buttonGroup: {
    backgroundColor: colors.button
  },
  buttonGroupSelected: {
    backgroundColor: colors.selectedButton,
    color: colors.selectedButtonText
  },
  buttonGroupText: {
    fontSize: 20,
    color: colors.text
  },
  fileNameText: {
    fontSize: 20,
    color: colors.text,
    marginBottom: '2%'
  },
  checkBoxLabel: {
    fontSize: 20,
    fontWeight: 'normal',
    color: colors.text,
    marginLeft: '2%'
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0,
    marginTop: 0,
    marginBottom:'2%'
  },
  extraLargeSpinner: {
    transform: [{scale: 2.5}]
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
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginVertical: '1%'
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
  homepageLogo:{
    width: 80,
    height: 100,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homepageRoundButton:{
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 66,
    width: 66,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: colors.button,
  },
  meditationPhoto:{
    width: 300,
    height: 300,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    left: 50
  },
  challengeVideo:{
    width: 300,
    height: 300,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    left: 50
  },
  editAccountProfile:{
    width: null,
    height: null,
    aspectRatio: 1,
    borderRadius: 100,
    marginHorizontal: '15%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginPhoto:{
    height: null,
    width: null,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadedImage: {
    width: null,
    height: null,
    aspectRatio: 16/9,
    marginBottom: '2%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  timerview: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 100,
    color: '#444',
    height: "25%",
    borderRadius: 5,
    marginBottom: 50,
    marginTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFF',
  },
  timercomponent: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
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
  arrowButton: {
    flex: 0,
    justifyContent: 'center',
    height: 20,
    width: 30,
  },
  timerObject: {
    flex: 0,
    width: 70,
    height: "76%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {  
    flex: 0,
    width: "80%",
    height: '20%',
    padding: 1,
    justifyContent: 'center'
  },
  playPhoto:{
    width: 90,
    height: 90,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingActionView: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  floatingActionButton: {
    backgroundColor: colors.button,
    borderRadius: Dimensions.get('window').height / 2,
    height: null,
    width: '12%',
    aspectRatio: 1,
    marginBottom: '2%',
    alignSelf: 'flex-end',
  },
  floatingActionIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  browseactionbutton: {
    flex: 0,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%'
  },

  browsebutton: {
    flex: 0,
    justifyContent: 'center',
    height: 25,
    width: 25,
  },
  
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },

  
});
  