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

db.collection("Regiones").get().then((querySnapshot) => {
    var html =
        "<div class=\"input-field col s12 l6\">" +

        "<select class=\" \" onchange=\"cargaProvincias(this)\" id=\"region\">" +
        "<option value=\"0\" disabled selected>Choose your option</option>\n";
querySnapshot.forEach((doc) => {
    html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>\n";
})
;
html = html + "</select>\n" +
    " <label>Regiones</label>" +
    " </div>" +
    "<div class=\"input-field col s12 l6\">" +

    "<select class=\"\" onchange=\"cargaComunas(this)\" id=\"provincia\">" +
    "<option value=\"0\" disabled selected>Choose your option</option>\n" +
    "</select>\n" +
    "<label>Provincias</label>" +
    "</div>" +
    "<div class=\"input-field col s12 l6\">\n" +

    "<select class=\"\" id='comuna'>\n" +
    "<option value=\"0\" disabled selected>Choose your option</option>\n" +
    "</select>\n" +
    " <label>Comunas</label>\n" +
    " </div>";
$('#selectDireccion').append(html);
$('select').formSelect();

//document.write(html);
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        var cltes = '';
        db.collection("Usuarios").doc(user.uid).collection("Clientes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var rut = doc.data().rut;
        var nombre = doc.data().nombre;
        var direccion = doc.data().direccion;
        var comuna = doc.data().comuna;
        var mail = doc.data().mail;
        var celular = doc.data().celular;
        var telefono = doc.data().telefono;
        var contacto = doc.data().contacto;
        cltes = cltes + "<tr><td>"+rut+"</td>"+
            "<td>"+nombre+"</td>"+
            "<td>"+direccion+"</td>"+
            "<td>"+comuna+"</td>"+
            "<td>"+mail+"</td>"+
            "<td>"+celular+"</td>"+
            "<td>"+telefono+"</td>"+
            "<td>"+contacto+"</td>" +
            "<td> <a class=\"btn-floating waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a> </td>" +
            "<td> <a class=\"btn-floating waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a> </td>" +
            "</tr>";

    })
        ;
        $("#clientes").append(cltes);
    })
        ;

    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});

function cargaComunas(provinciaSelect) {
    $('#comuna').find('option:not(:first)').remove();
    $('#comuna').val("0");
    var provincia = $("#provincia :selected").text();
    var region = $("#region :selected").text();
    var html = '';
    db.collection("Regiones").doc(region).collection("Provincias").doc(provincia).collection("Comunas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        html = html + " <option value=\"1\">" + doc.id + "</option>\n";
});
    $("#comuna").append(html);
    $('select').formSelect();
});
}

function cargaProvincias(regionSelect) {
    $('#provincia').find('option:not(:first)').remove();
    $("#provincia").val("0");
    $('#comuna').find('option:not(:first)').remove();
    $('#comuna').val("0");
    var region = $("#region :selected").text();
    var html = '';
    db.collection("Regiones").doc(region).collection("Provincias").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        html = html + "<option value=" + doc.id + ">" + doc.id + "</option>\n";
});
    $("#provincia").append(html);
    $('select').formSelect();
});
}

function guardarCliente() {
    var rut = $("#epRut").val();
    var nombre = $("#epNombre").val();
    var celular = $("#epCelular").val();
    var contacto = $("#epContacto").val();
    var edad = $("#epEdad").val();
    var facebook = $("#epFacebook").val();
    var fechaNacimiento = $("#epFechaNacimiento").val();
    var fax = $("#epFax").val();
    var giro = $("#epGiro").val();
    var mail = $("#epMail").val();
    var sexo = $("#epSexo").val();
    var telefono = $("#epTelefono").val();
    var tipoCliente = $("#epTipoCliente").val();
    var twitter = $("#epTwitter").val();
    var banco = $("#epBanco").val();
    var cuenta = $("#epCuenta").val();
    var tipoCuenta = $("#epTipoCuenta").val();
    var direccion = $("#epDireccion").val();
    var region = $("#region :selected").text();
    var provincia = $("#provincia :selected").text();
    var comuna = $("#comuna :selected").text();

    // Add a new document in collection "cities"
    console.log(userId);
    db.collection("Usuarios").doc(userId).collection("Clientes").doc(rut).set({
        rut: rut,
        nombre: nombre,
        celular: celular,
        contacto: contacto,
        edad: edad,
        facebook: facebook,
        fechaNacimiento: fechaNacimiento,
        fax: fax,
        giro: giro,
        mail: mail,
        sexo: sexo,
        telefono: telefono,
        tipoCliente: tipoCliente,
        twitter: twitter,
        banco: banco,
        cuenta: cuenta,
        tipoCuenta: tipoCuenta,
        direccion: direccion,
        region: region,
        provincia: provincia,
        comuna: comuna
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}
