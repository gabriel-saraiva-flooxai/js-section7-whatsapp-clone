const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config  = {
            apiKey: "AIzaSyDEfBD6SohzT_E2IgVVSa6zqYiQVEsB-i0",
            authDomain: "whatsapp-clone-saas.firebaseapp.com",
            projectId: "whatsapp-clone-saas",
            storageBucket: "gs://whatsapp-clone-saas.firebasestorage.app",
            messagingSenderId: "561114180097",
            appId: "1:561114180097:web:7abfbde2cecea087f4ae00",
            measurementId: "G-2SHPW96DMV"
        };

        this.init();

    }

    init(){

        if (!window._initializedFirebase) {        
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });

            })
            .catch(err => {
                f(err);
            });

        });

    }

}