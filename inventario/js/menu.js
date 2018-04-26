firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        console.log(user);





        // user.updateProfile({
        //     displayName: "Jane Q. User",
        //     photoURL: "https://example.com/jane-q-user/profile.jpg"
        // }).then(function() {
        //     // Update successful.
        // }).catch(function(error) {
        //     // An error happened.
        // });

$('#cerrarSesion').click(function () {

    firebase.auth().signOut().then(function() {
        console.warn("Sesion Cerrada");
        window.location.href = 'iniciarSesion.html';


        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });

});

    } else {
        window.location.href = 'iniciarSesion.html';
    }
});