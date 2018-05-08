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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        crearTabla();

        $("#btnGuardar").click(function () {

            var habilitado = true;
            if (!$("#habilitado").prop('checked')) {
                habilitado = false;
            }


            var cliente = {
                rut: $("#epRut").val(),
                habilitado: habilitado,
                nombre: $("#epNombre").val(),
                celular: $("#epCelular").val(),
                facebook: $("#epFacebook").val(),
                fechaNacimiento: $("#epFechaNacimiento").val(),
                giro: $("#epGiro").val(),
                mail: $("#epMail").val(),
                telefono: $("#epTelefono").val(),
                tipoCliente: $("#epTipoCliente").val(),
                twitter: $("#epTwitter").val(),
                banco: $("#epBanco").val(),
                cuenta: $("#epCuenta").val(),
                tipoCuenta: $("#epTipoCuenta").val(),
                direccion: $("#epDireccion").val(),
                region: $("#region :selected").text(),
                provincia: $("#provincia :selected").text(),
                comuna: $("#comuna :selected").text()
            };


            db.collection("Usuarios").doc(user.uid).collection("Clientes").doc(cliente.rut).set(cliente).then(function () {
                M.toast({html: 'El usuario se ha creado correctamente', classes: 'rounded green'});

                crearTabla();
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });

            // crearTabla();
            // $("#selectDireccion").empty();
            // $("#selectdireccioneditar").empty();

        });


        function crearTabla() {
            $("#clientes").empty();

            var cltes = "<thead>\n" +
                "<tr>\n" +
                "<th>Rut</th>\n" +
                "<th>Nombre</th>\n" +
                "<th>Direccion</th>\n" +
                "<th>Comuna</th>\n" +
                "<th>Mail</th>\n" +
                "<th>Celular</th>\n" +
                "<th>Telefono</th>\n" +
                "<th>Contacto</th>\n" +
                "</tr>\n" +
                "</thead>" +
                "<tbody>";

            db.collection("Usuarios").doc(user.uid).collection("Clientes").where("habilitado", "==", true).orderBy("rut").get().then(function (querySnapshot) {
                $("#cargandotabla").empty();

                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var rut = doc.data().rut;
                    var nombre = doc.data().nombre;
                    var direccion = doc.data().direccion;
                    var comuna = doc.data().comuna;
                    var mail = doc.data().mail;
                    var celular = doc.data().celular;
                    var telefono = doc.data().telefono;
                    var contacto = doc.data().contacto;
                    cltes = cltes + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=\" + rut + \">" +
                        "<td>" + rut + "</td>" +
                        "<td>" + nombre + "</td>" +
                        "<td>" + direccion + "</td>" +
                        "<td>" + comuna + "</td>" +
                        "<td>" + mail + "</td>" +
                        "<td>" + celular + "</td>" +
                        "<td>" + telefono + "</td>" +
                        "<td>" + contacto + "</td>" +
                        // "<td> <a onclick=\"editarCliente()\" class=\"modal-action modal-close waves-effect waves-green btn-flat btn-floating waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a> </td>" +
                        // "<td> <a class=\"btn-floating waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a> </td>" +
                        "</tr>";

                });

                cltes = cltes + "</tbody>";

                $("#clientes").append(cltes);
                $("#clientes").dataTable().fnDestroy();


            }).then(function () {
                $('#clientes').DataTable({
                    "language": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar:_MENU_",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "<i class=\"material-icons\">navigate_next</i>",
                            "sPrevious": "<i class=\"material-icons\">navigate_before</i>"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    }
                });
                $("select").val('10');
                $("#clientes_length").addClass("col s1 l1");
                $("#clientes_filter").addClass("col s11 l11");
                $("#clientes_info").addClass("col s6 l6");
                $("#clientes_paginate").addClass("col l6 right-align flow-text");
                $("#clientes").append("<br>");
                $('select').formSelect();

            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }

        //Fin crear Tabla

        $("#crearCliente").click(function () {
            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();
            regionesagregar();
        })


    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});

function regionesagregar() {

    db.collection("Regiones").get().then(function (querySnapshot) {
        var html =
            "<div class=\"input-field col s12 l6\">" +
            "<select class=\" \" onchange=\"cargaProvincias(this)\" id=\"region\">" +
            "<option value=\"0\" disabled selected>Selecciona una Region</option>";
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>";
        });
        html = html + "</select>" +
            "<label>Regiones</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<select onchange=\"cargaComunas(this)\" id=\"provincia\">" +
            "<option value=\"0\" disabled selected>Selecciona una Provincia</option>" +
            "</select>" +
            "<label>Provincias</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<select id='comuna'>" +
            "<option value=\"0\" disabled selected>Selecciona una comuna</option>" +
            "</select>" +
            "<label>Comunas</label>" +
            "</div>";

        $('#selectDireccion').append(html);
        $('select').formSelect();

    });

}

function regionesmodificar() {

    db.collection("Regiones").get().then(function (querySnapshot) {
        var html =
            "<div class=\"input-field col s12 l6\">" +
            "<select class=\" \" onchange=\"cargaProvincias(this)\" id=\"region\">" +
            "<option value=\"0\" disabled selected>Selecciona una Region</option>";
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=" + doc.id.trim() + ">" + doc.id + "</option>";
        });
        html = html + "</select>" +
            "<label>Regiones</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<select onchange=\"cargaComunas(this)\" id=\"provincia\">" +
            "<option value=\"0\" disabled selected>Selecciona una Provincia</option>" +
            "</select>" +
            "<label>Provincias</label>" +
            "</div>" +
            "<div class=\"input-field col s12 l6\">" +
            "<select id='comuna'>" +
            "<option value=\"0\" disabled selected>Selecciona una comuna</option>" +
            "</select>" +
            "<label>Comunas</label>" +
            "</div>";

        $('#selectdireccioneditar').append(html);
        $('select').formSelect();

        //document.write(html);
    });

}

function cargaComunas(provinciaSelect) {
    $('#comuna').find('option:not(:first)').remove();
    $('#comuna').val("0");
    var provincia = $("#provincia :selected").text();
    var region = $("#region :selected").text();
    var html = '';
    db.collection("Regiones").doc(region).collection("Provincias").doc(provincia).collection("Comunas").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            html = html + " <option value=\"1\">" + doc.id + "</option>";
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
    db.collection("Regiones").doc(region).collection("Provincias").get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
            html = html + "<option value=" + doc.id + ">" + doc.id + "</option>";
        });
        $("#provincia").append(html);
        $('select').formSelect();

    });
}