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


//LOGIN

export const loginWithGithub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider);
}

const mapUserFromFirebaseAuth = (user: any) => {

    const { displayName, uid } = user;
    return {
      userName: displayName,
      userId: uid
    }
}

export const onAuthStateChanged = (onChange: any) => {
    return firebase.auth().onAuthStateChanged(user => {
      const thereUser = user ? mapUserFromFirebaseAuth(user) : null;
      onChange(thereUser)
    });

}


//DATABASE

const db = firebase.firestore();

export const rankPokemonDB = (pokemon: string, type: string[], ranking: number, user: string) => {

  return db.collection('ranking').add({
    pokemon, type, ranking, user
  });
}

export const fetchRanking = async (user: string) => {
  return db.collection('ranking').where('user', '==', user)
  .get()
  .then(snapshot => {
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {...data}
    })
  })
}