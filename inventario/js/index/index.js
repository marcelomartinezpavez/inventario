// Initialize Firebase
var config = {
    apiKey: "AIzaSyAz2S2RPN4u0ijdHXfkgQXHnX4OAMvhy8M",
    authDomain: "inventario-e01bb.firebaseapp.com",
    databaseURL: "https://inventario-e01bb.firebaseio.com",
    projectId: "inventario-e01bb",
    storageBucket: "inventario-e01bb.appspot.com",
    messagingSenderId: "249599638020"
};
firebase.initializeApp(config);
var db = firebase.firestore();


var cuantosProveedores = 0;


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                cuantosProveedores++;


            });
        }).then(function () {
            $("#cuantosProveedores").append("Hay " + cuantosProveedores + " Proveedores activos en este momento");

        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    } else {

    }
});




