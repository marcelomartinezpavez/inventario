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


var limit = 5;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        crearTabla();


        console.log("si hay usuario");


        $("#test").click(function () {

            console.log("vamos bien");
            var prove = {
                rut: $("#epRut").val(),
                nombre: $("#name").val(),
                celular: $("#epCelular").val(),
                contacto: $("#epContacto").val(),
                fax: $("#epFax").val(),
                giro: $("#epGiro").val(),
                telefono: $("#telefono").val(),
                mail: $("#epMail").val(),
                banco: $("#epBanco").val(),
                cuenta: $("#epCuenta").val(),
                tipoCuenta: $("#epTipoCuenta").val(),
                direccion: $("#epDireccion").val(),
                region: $("#region :selected").text(),
                provincia: $("#provincia :selected").text(),
                comuna: $("#comuna :selected").text(),
            };
            console.log(prove);
            db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(prove.rut).set(prove);

            crearTabla();

        });
        $("#limit").change(function () {
            limit = $("#limit").val();
            console.log(limit);
            crearTabla();
        });

        function crearTabla() {
            $("#proveedores").empty();


            var prov = "<tr>";
            db.collection("Usuarios").doc(user.uid).collection("Proveedores").limit(parseInt(limit)).get().then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var rut = doc.data().rut;
                    var nombre = doc.data().nombre;
                    var direccion = doc.data().direccion;
                    var comuna = doc.data().comuna;
                    var mail = doc.data().mail;
                    var celular = doc.data().celular;
                    var fono = doc.data().telefono
                    var contacto = doc.data().contacto;
                    prov = prov + "<td>" + rut + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + direccion + "</td>" +
                        "<td>" + comuna + "</td>" +
                        "<td>" + mail + "</td>" +
                        "<td>" + celular + "</td>" +
                        "<td>" + fono + "</td>" +
                        "<td>" + contacto + "</td>" +
                        "<td>" +
                        "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                        "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                        "</td>" +
                        "</tr>";

                });
                $("#proveedores").append(prov);
            })
                .then(function () {
                    console.log("Se ha hecho la consulta correctamente");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });


        }


        db.collection("Regiones").get().then(function (querySnapshot) {
            var html =
                "<div class=\"input-field col s12 l6\">" +
                "<select class=\" \" onchange=\"cargaProvincias(this)\" id=\"region\">" +
                "<option value=\"0\" disabled selected>Selecciona una Region</option>\n";
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>\n";
            });
            html = html + "</select>" +
                "<label>Regiones</label>" +
                "</div>" +
                "<div class=\"input-field col s12 l6\">" +
                "<select onchange=\"cargaComunas(this)\" id=\"provincia\">" +
                "<option value=\"0\" disabled selected>Selecciona una Provincia</option>\n" +
                "</select>\n" +
                "<label>Provincias</label>" +

                "</div>" +
                "<div class=\"input-field col s12 l6\">\n" +
                "<select id='comuna'>\n" +
                "<option value=\"0\" disabled selected>Selecciona una comuna</option>\n" +
                "</select>\n" +
                "<label>Comunas</label>\n" +

                "</div>";

            $('#selectDireccion').append(html);
            $('select').formSelect();

            //document.write(html);
        });


    }
    else {
        console.error("sin usuario")


    }
});

function cargaComunas(provinciaSelect) {
    $('#comuna').find('option:not(:first)').remove();
    $('#comuna').val("0");
    var provincia = $("#provincia :selected").text();
    var region = $("#region :selected").text();
    var html = '';
    db.collection("Regiones").doc(region).collection("Provincias").doc(provincia).collection("Comunas").get().then(function (querySnapshot) {


        querySnapshot.forEach(function (doc) {
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
    var region = $("#region").find(":selected").text();
    var html = '';
    console.log(region);
    db.collection("Regiones").doc(region).collection("Provincias").get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
            html = html + "<option value=" + doc.id + ">" + doc.id + "</option>\n";
        });
        $("#provincia").append(html);
        $('select').formSelect();

    });
}



