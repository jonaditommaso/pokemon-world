import firebase from 'firebase'

import { FirebaseUser } from '../interfaces/FirebaseUser';

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

export const fetchUsers = async (user: FirebaseUser) => {
  return db.collection('users')
  .where('username', '==', user.username)
  .where('password', '==', user.password)
  .get()
  .then(snapshot => {
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {...data}
    })
  })
}

export const fetchProvidedUsers = async (id: string) => {
  return db.collection('users')
  .where('id', '==', id)
  .get()
  .then(snapshot => {
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {...data}
    })
  })
}

export const createRegisteredUser = (username: string, password: string) => {

  const userData = {
    username,
    password,
    id: crypto.randomUUID()
  }

  return db.collection('users').add(userData);

}

export const createProvidedUser = (username: string, source: string, id: string) => {

  const userData = {
    username,
    source,
    id
  }

  return db.collection('users').add(userData);
}

export const updateCharts = (user: string, charts: string[]) => {
  let userRef = db.collection('users').where('username', '==', user);

  userRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Use the document ID to get a reference to the document
      var docRef = db.collection("users").doc(doc.id);

      docRef.get().then((doc) => {
        const currentCharts = doc?.data()?.charts || [];
        const updatedCharts = currentCharts.concat(charts.filter(chart => !currentCharts.includes(chart)));

      // Update the data for the user document
      docRef.update({
        charts: updatedCharts
      })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
      })
    });
  });
}

export const fetchCharts = async (user: string) => {
  return db.collection('users')
  .where('username', '==', user)
  .get()
  .then(snapshot => {
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {...data.charts}
    })
  })
}