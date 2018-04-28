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

var userId = "";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = user.uid;
    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        var productos = '';
        db.collection("Usuarios").doc(user.uid).collection("Productos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var codigo = doc.data().codigo;
        var descripcion = doc.data().descripcion;
        var marca = doc.data().marca;
        var categoria = doc.data().categoria;
        var color = doc.data().color;
        var talla = doc.data().talla;
        var lavado = doc.data().lavado;
        var stock = doc.data().stock;

        productos = productos + "<tr><td>"+codigo+"</td>"+
            "<td>"+codigo+"</td>"+
            "<td>"+descripcion+"</td>"+
            "<td>"+marca+"</td>"+
            "<td>"+categoria+"</td>"+
            "<td>"+color+"</td>"+
            "<td>"+talla+"</td>"+
            "<td>"+lavado+"</td>"+
            "<td>"+stock+"</td>" +
            "<td> <a class=\"btn-floating waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a> </td>" +
            "<td> <a class=\"btn-floating waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a> </td>" +
            "</tr>";

    });
        $("#productos").append(productos);
    });
    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});


function guardarProducto() {
    var codigo = $("#epCodigo").val();
    var categoria = $("#epCategoria").val();
    var color = $("#epColor").val();
    var costo = $("#epCosto").val();
    var descripcion = $("#epDescripcion").val();
    var dscto1 = $("#epDscto1").val();
    var dscto2 = $("#epDscto2").val();
    var dscto3 = $("#epDscto3").val();
    var marca = $("#epMarca").val();
    var margen = $("#epMargen").val();
    var ordencorte = $("#epOrdenCorte").val();
    var precioventa = $("#epPrecioVenta").val();
    var stock = $("#epStock").val();
    var stockcritico = $("#epStockCritico").val();
    var talla = $("#epTalla").val();
    var tipo_lavado = $("#epTipoLavado").val();

    // Add a new document in collection "cities"
    console.log(userId);
    db.collection("Usuarios").doc(userId).collection("Productos").doc(codigo).set({

        codigo: codigo,
        categoria: categoria,
        color: color,
        costo:costo,
        descripcion:descripcion,
        dscto1:dscto1,
        dscto2:dscto2,
        dscto3:dscto3,
        marca:marca,
        margen:margen,
        ordencorte:ordencorte,
        precioventa:precioventa,
        stock:stock,
        stockcritico:stockcritico,
        talla:talla,
        tipo_lavado:tipo_lavado
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}