// Code from: https://medium.com/@shalomsam/setting-up-jest-in-an-expo-app-thats-using-firebase-b21465fbc3f2
import firebasemock from 'firebase-mock';

const mockdatabase = new firebasemock.MockFirebase();
const mockauth = new firebasemock.MockFirebase();
const mocksdk = new firebasemock.MockFirebaseSdk(path => (
  path ? mockdatabase.child(path) : mockdatabase
),
() => mockauth);

export default mocksdk;