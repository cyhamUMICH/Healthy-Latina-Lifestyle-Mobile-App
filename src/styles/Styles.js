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
  drawerContentContainer: {
    flex: 1, 
    justifyContent: 'space-between'
  },
  drawerTopItemsView: {
    justifyContent: 'flex-start'
  },
  drawerButton: {
    backgroundColor: colors.button,
    marginHorizontal: '2%',
    marginBottom: '2%',
    justifyContent: 'flex-start'
  },
  // Tries to scale icon based on window height
  drawerIconSize: Dimensions.get('window').height / 30,
  drawerIconContainer: {
    width: '15%',
    marginRight: '2%'
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
    flex: 1,
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
    marginBottom: '2%',
  },
  button: {
    backgroundColor: colors.button,
    marginBottom: '2%'
  },
  smallButton: {
    borderRadius: 200,
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
    transform: [{scale: 2.5}],
    paddingBottom: '5%'
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
    width: '40%',
    height: null,
    aspectRatio: 4/3,
    alignSelf: 'center'
  },
  homeRoundButtonSection: {
    flex: 1,
    marginBottom: '4%'
  },
  homeFeaturedSection: {
    flex: 5
  },
  homeItemSeparator: {
    // Percentage doesn't work, so try to scale it based on screen size
    width: Dimensions.get('window').width / 75
  },
  homeRoundButton: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').height / 2,
    width: '100%',
    height: null,
    aspectRatio: 1,
    backgroundColor: colors.button
  },
  // Tries to scale icon based on window height
  homeIconSize: Dimensions.get('window').height / 20,
  homeFeaturedContentTypeView: {
    flex: 1,
    marginBottom: '2%'
  },
  homeFeaturedView: {
    flex: 1,
    height: Dimensions.get('window').height / 5
  },
  homeFeaturedTitle: {
    alignSelf: 'flex-end',
    width: '100%',
    fontSize: 18,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    backgroundColor: colors.partialTransparent
  },
  homeFeaturedImage: {
    // Make sure full 16:9 images appear
    // https://stackoverflow.com/questions/29642685/maintain-aspect-ratio-of-image-with-full-width-in-react-native
    height: '100%',
    width: null,
    aspectRatio: 16/9,
    // Add overflow: 'hidden' if borderRadius isn't visible
    // https://reactnative.dev/docs/view-style-props
    borderRadius: Dimensions.get('window').height / 75,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  meditationPhoto: {
    width: "80%",
    height: null,
    aspectRatio: 1,
    borderRadius: Dimensions.get('window').height / 2,
    alignSelf: 'center'
  },
  challengeVideo:{
    width: 300,
    height: 300,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    left: 50
  },
  yogaVideo: {
    width: "90%",
    height: null,
    aspectRatio: 16/9,
    borderRadius: Dimensions.get('window').height / 75,
    alignSelf: 'center'
  },
  yogaPhoto: {
    width: "90%",
    height: null,
    aspectRatio: 16/9,
    borderRadius: Dimensions.get('window').height / 75,
    alignSelf: 'center'
  },
  courseVideo: {
    width: "90%",
    height: null,
    aspectRatio: 16/9,
    borderRadius: Dimensions.get('window').height / 75,
    alignSelf: 'center'
  },
  coursePhoto: {
    width: "90%",
    height: null,
    aspectRatio: 16/9,
    borderRadius: Dimensions.get('window').height / 75,
    alignSelf: 'center'
  },
  bufferingText: {
    marginLeft: "5%",
    fontSize: 18
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
  timerIntentionPicker: {
    marginTop: '5%'
  },
  timerIntentionView: {
    marginVertical: '2%',
    alignSelf: 'flex-start'
  },
  timerIntentionText: {
    textAlign: 'left',
    fontSize: 18
  },
  timerScreen: {
    marginTop: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  setTimerDisplayContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: '10%'
  },
  setTimerDisplayNumber: {
    fontSize: 50,
    flex: 2,
    textAlign: 'center'
  },
  setTimerDisplayColon: {
    fontSize: 50,
    flex: 1,
    textAlign: 'center'
  },
  setTimerDisplayLabel: {
    fontSize: 18,
    flex: 2,
    textAlign: 'center'
  },
  setTimerDisplayLabelSpace: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center'
  },
  setTimerButtonsContainer: {
    marginBottom: '10%'
  },
  timerButtonsRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '10%'
  },
  setTimerNumberButton: {
    backgroundColor: colors.button,
    borderRadius: Dimensions.get('window').height / 2,
    height: null,
    width: '15%',
    aspectRatio: 1,
    marginHorizontal: '5%'
  },
  setTimerIconButton: {
    backgroundColor: colors.modalButtons,
    borderRadius: Dimensions.get('window').height / 2,
    height: null,
    width: '15%',
    aspectRatio: 1,
    marginHorizontal: '5%'
  },
  setTimerNumberButtonText: {
    fontSize: 30
  },
  // Tries to scale icon based on window height
  timerIconSize: Dimensions.get('window').height / 20,
  timerIconReducedSize: Dimensions.get('window').height / 25,

  playPhoto:{
    width: 90,
    height: 90,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Tries to scale icon based on window height
  setFeaturedIconSize: Dimensions.get('window').height / 25,
  floatingActionView: {
    flex: 1,
    marginBottom: '2%'
  },
  floatingActionButtonTopRight: {
    backgroundColor: colors.button,
    borderRadius: Dimensions.get('window').height / 2,
    height: null,
    width: '12%',
    aspectRatio: 1,
    position: 'absolute',
    top: 0,
    right: 0
  },
  floatingActionButtonBottomRight: {
    backgroundColor: colors.button,
    borderRadius: Dimensions.get('window').height / 2,
    height: null,
    width: '12%',
    aspectRatio: 1,
    position: 'absolute',
    bottom: 0,
    right: 0
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
  divider: {
    backgroundColor: colors.text, 
    height: 2, 
    marginVertical: '2%'
  },
  flexContainer: {
    flex: 1
  },
  usernameText:{
   marginHorizontal:'28%',
   color: 'red'
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  challengePhoto:{
    width: "90%",
    height: null,
    aspectRatio: 16/9,
    borderRadius: Dimensions.get('window').height / 75,
    alignSelf: 'center'
  },
  challengeContentDescriptionSpacer: {
    flex:0
  },
  containerCheck: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainerCheck: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkboxCheck: {
    alignSelf: "center",
  },
  labelCheck: {
    margin: 8,
  },
  sendContentButtonLayout: {
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // flexWrap: 'wrap',
    marginVertical: '1%',
    justifyContent: 'center',
    left: 30,
    alignSelf: "center"

  },
  chatHorizontalLayout:{
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',

  },
  chatButton: {
      backgroundColor: colors.button,
  },
  challengeDayTitle: {
    fontSize: 24,
    textAlign: "center"
  },
  theChallengeTitle: {
    fontSize: 24,
    textAlign: "center"
  },
  theChallengeDesc: {
    fontSize: 18
  },
  emptyJournalButton: {
    backgroundColor: colors.button,
    marginBottom: '2%'
  },
  journalCardList: {
    
  },
  journalCardTitle: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 20,
    lineHeight: 30
  },
  journalCardDesc: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 14,
    lineHeight: 30
  },
  journalTitles: {
    marginTop: '20%',
    marginBottom: '0%',
    bottom: 90,
  },
  journalEntrySpace:{
    backgroundColor: colors.journalTextBackground, 
    borderBottomColor: '#CCCCCC',  
    borderTopColor: '#CCCCCC',
    borderLeftColor: '#CCCCCC',
    borderRightColor: '#CCCCCC',
    borderBottomWidth: 1, 
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    bottom:"8%",
    height: "60%"
  },
  courseTitle:{
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 20,
    lineHeight: 30,
    bottom: "35%"
  },
  courseDesc:{
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 16,
    lineHeight: 30,
    bottom: "5%"
  }
});
  