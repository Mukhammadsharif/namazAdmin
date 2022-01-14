import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyCtn9RiKjT50WngE2COgoc2LI7tDLJdmKI",
    authDomain: "my-todo-app-be96d.firebaseapp.com",
    databaseURL: "https://my-todo-app-be96d-default-rtdb.firebaseio.com",
    projectId: "my-todo-app-be96d",
    storageBucket: "my-todo-app-be96d.appspot.com",
    messagingSenderId: "528049907815",
    appId: "1:528049907815:web:867971abdbb7ae3024ccc2"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider)
        const user = res.user
        const query = await db
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
        if (query.docs.length === 0) {
          await db.collection("users").add({
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
          });
        }
          } catch (err) {
            console.error(err)
            alert(err.message)
          }
}

const signInWithEmailAndPassword = async (email, password) => {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (err) {
        console.error(err)
        alert(err.message)
      }
}

const registerWithEmailAndPassword = async (name, email, password) => {
      try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
          uid: user.uid,
          name,
          authProvider: "local",
          email,
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    const sendPasswordResetEmail = async (email) => {
      try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    const logout = async () => {
      await auth.signOut();
      console.log('logout')
    }

export {
  app,
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
