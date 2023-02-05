import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBQrsTqx3bcfMp13qRDuP-RbAtBGI2C_hk",
    authDomain: "poke-game-ec62f.firebaseapp.com",
    projectId: "poke-game-ec62f",
    storageBucket: "poke-game-ec62f.appspot.com",
    messagingSenderId: "287578428442",
    appId: "1:287578428442:web:a6ba14d231a23381ddeda3",
    measurementId: "G-X2ZEDXZVZ6"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export const loginWithGithub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider);
}

const mapUserFromFirebaseAuth = (user: any) => {
    const { displayName } = user;
    return {
      userName: displayName
    }
}

export const onAuthStateChanged = (onChange: any) => {
    console.log(onChange)
    return firebase.auth().onAuthStateChanged(user => {
      const thereUser = user ? mapUserFromFirebaseAuth(user) : null;
      onChange(thereUser)
    });

}