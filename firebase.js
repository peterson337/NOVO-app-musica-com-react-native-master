import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage} from 'firebase/storage';
import { getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC-7PGZc6H-GVr_jL1lEEufo0jNkSY02IY",
    authDomain: "app-music-24262.firebaseapp.com",
    projectId: "app-music-24262",
    storageBucket: "app-music-24262.appspot.com",
    messagingSenderId: "83963152470",
    appId: "1:83963152470:web:3f851a4f08b14b278453f7",
    measurementId: "G-7F89DK3EGD"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

    export{db, auth, storage};

    const Firebase = () => {
        return null;
      };
      
      export default Firebase;