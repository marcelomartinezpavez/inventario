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
//Busqueda en la tabla
$(document).ready(function () {
    // Keyup es para que se ejecute cada vez que apreto algo
    $("#search").keyup(function () {
        // Cuando la barra de busqueda tiene algo
        if ($(this).val() != "") {
            // Escondo todas las filas de la tabla
            $("#proveedores tbody>tr").hide();
            //Ahora solo muestro las que CONTIENEN lo escrito
            $("#proveedores td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else {
            // Si vuelve a estar vacio la barra de busqueda, vuelvo a mostrar todo
            $("#proveedores tbody>tr").show();
        }
    });
});
$.extend($.expr[":"],
    {
        "contains-ci": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

//Fin de busqueda en la tabla


//Se detecta si hay un usuario autenticado y que pasara en este c
firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            crearTabla();
            regiones();

            $("#botonguardar").click(function () {
                var habilitado = true;
                if (!$("#habilitado").prop('checked')) {
                    habilitado = false;
                }


                console.log("vamos bien");
                console.log(habilitado);
                var prove = {
                    rut: $("#epRut").val(),
                    habilitado: habilitado,
                    nombre: $("#name").val(),
                    celular: $("#epCelular").val(),
                    contacto: $("#epContacto").val(),
                    fax: $("#epFax").val(),
                    razonsocial: $("#epRazonSocial").val(),
                    giro: $("#epGiro").val(),
                    telefono: $("#telefono").val(),
                    correo: $("#epcorreo").val(),
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


//Consulta de Proveedores
            function crearTabla() {

                $("#proveedores").empty();


                var prov = " <thead>\n" +
                    "                <tr>\n" +
                    "                    <th>Rut</th>\n" +
                    "                    <th>Nombre</th>\n" +
                    "                    <th>Direccion</th>\n" +
                    "                    <th>Comuna</th>\n" +
                    "                    <th>Mail</th>\n" +
                    "                    <th>Celular</th>\n" +
                    "                    <th>Fono</th>\n" +
                    "                    <th>Contacto</th>\n" +
                    // "                    <th>Opciones</th>\n" +
                    "                </tr>\n" +
                    "                </thead>" +
                    "  <tbody>\n" +
                    "                 \n" +
                    // db.collection("Usuarios").doc(user.uid).collection("Proveedores").orderBy("rut")
                    //     .startAfter("12312").limit(parseInt(limit)).get().then(function (querySnapshot) {

                    db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", true).orderBy("rut").get().then(function (querySnapshot) {
                        $("#cargandotabla").empty();

                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            var rut = doc.data().rut;
                            var nombre = doc.data().nombre;
                            var direccion = doc.data().direccion;
                            var comuna = doc.data().comuna;
                            var correo = doc.data().correo;
                            var celular = doc.data().celular;
                            var fono = doc.data().telefono;
                            var contacto = doc.data().contacto;
                            prov = prov + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
                                "<td>" + rut + "</td>" +
                                "<td>" + nombre + "</td>" +
                                "<td>" + direccion + "</td>" +
                                "<td>" + comuna + "</td>" +
                                "<td>" + correo + "</td>" +
                                "<td>" + celular + "</td>" +
                                "<td>" + fono + "</td>" +
                                "<td>" + contacto + "</td>" +
                                // "<td>" +
                                // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                                // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                                // "</td>" +
                                "</tr>";

                        });

                        prov = prov + "</tbody>";

                        $("#proveedores").append(prov);
                        $("#proveedores").dataTable().fnDestroy();


                    })
                        .then(function () {
                            console.log("Se ha hecho la consulta correctamente");
                            M.toast({html: 'Se ha hecho la consulta correctamente', classes: 'rounded'});
                            $('#proveedores').DataTable({
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
                            $("#proveedores_length").addClass("col s1 l1");
                            $("#proveedores_filter").addClass("col s11 l11");
                            $("#proveedores_info").addClass("col s6 l6");
                            $("#proveedores_paginate").addClass("col l6 right-align flow-text");


                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });


            }

            //Detectar cual es el rut de la celda donde se esta haciendo click
            $('#proveedores').on('click', 'tr td', function (evt) {
                var target, rut, valorSeleccionado;
                target = $(event.target);
                rut = target.parent().data('rut');
                valorSeleccionado = target.text();
                // alert("Valor Seleccionado: " + valorSeleccionado + "\n rut: " + rut);

                var docRef = db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(rut.toString());
                docRef.get().then(function (doc) {
                        if (doc.exists) {

                            $("#eeRut").val(doc.data().rut);
                            $("#eename").val(doc.data().nombre);
                            $("#eeCelular").val(doc.data().celular);
                            $("#eeContacto").val(doc.data().contacto);
                            $("#eeFax").val(doc.data().fax);
                            $("#eeGiro").val(doc.data().giro);
                            $("#eeRazonSocial").val(doc.data().razonsocial);
                            $("#eetelefono").val(doc.data().telefono);
                            $("#eecorreo").val(doc.data().correo);
                            $("#eeBanco").val(doc.data().banco);
                            $("#eeCuenta").val(doc.data().cuenta);
                            $("#eeTipoCuenta").val(doc.data().tipoCuenta);
                            $("#eeDireccion").val(doc.data().direccion);
                            $("#region").val(doc.data().region);
                            $("#provincia").val(doc.data().provincia);
                            $("#comuna").val(doc.data().comuna);


                            M.Modal.getInstance($('#modalEditar')).open();
                            M.updateTextFields();

                            $("#eebotonguardar").click(function () {
                                var eehabilitado = true;
                                if (!$("#eehabilitado").prop('checked')) {
                                    eehabilitado = false;
                                }
                                var eeprov = {
                                    rut: $("#eeRut").val(),
                                    habilitado: eehabilitado,
                                    nombre: $("#eename").val(),
                                    celular: $("#eeCelular").val(),
                                    contacto: $("#eeContacto").val(),
                                    fax: $("#eeFax").val(),
                                    razonsocial: $("#eeRazonSocial").val(),
                                    giro: $("#eeGiro").val(),
                                    telefono: $("#eetelefono").val(),
                                    correo: $("#eecorreo").val(),
                                    banco: $("#eeBanco").val(),
                                    cuenta: $("#eeCuenta").val(),
                                    tipoCuenta: $("#eeTipoCuenta").val(),
                                    direccion: $("#eeDireccion").val(),
                                    region: $("#region").val(),
                                    provincia: $("#provincia").val(),
                                    comuna: $("#comuna").val()
                                };


                                db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(eeprov.rut).set(eeprov)
                                    .then(function () {
                                        crearTabla();
                                        console.log("Los datos se han sobreescrito correctamente");
                                    })
                                    .catch(function (error) {
                                        console.error("no se puede sobreescribir");
                                        console.error("Error writing document: ", error);
                                    });
                            })
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("");
                        }
                    }
                ).catch(function (error) {
                    console.log("Error getting document:", error);
                });


            });

            function regiones() {
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
                    $('#eeselectDireccion').append(html);
                    $('select').formSelect();

                    //document.write(html);
                });

            }


        }
        else {
            console.error("sin usuario")


        }
    }
);

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



