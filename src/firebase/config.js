import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBtpfKV5q5K5oqp2jgsQCbJOatbzBx6HNY",
	authDomain: "money-tracker-ba4fb.firebaseapp.com",
	projectId: "money-tracker-ba4fb",
	storageBucket: "money-tracker-ba4fb.appspot.com",
	messagingSenderId: "798291078747",
	appId: "1:798291078747:web:112913fdaf474d0932997e",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

//initialize and export services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
