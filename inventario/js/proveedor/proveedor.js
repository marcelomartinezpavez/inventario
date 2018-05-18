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


//Se detecta si hay un usuario autenticado y que pasara en este caso
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // $('#habilitado').click(function () {
        //     if (!$(this).is(':checked')) {
        //         return confirm("El proveedor se creara deshabilitado");
        //     }
        // });

        crearTabla();
        //Se detecta el click en el boton de guardar los NUEVOS Proveedores
        $("#botonguardar").click(function () {

            var habilitado = true;
            if (!$("#habilitado").prop('checked')) {
                habilitado = false;
            }


            var prove = {
                rut: $("#epRut").val(),
                habilitado: habilitado,
                nombre: $("#name").val(),
                celular: $("#epCelular").val(),
                // contacto: $("#epContacto").val(),
                // fax: $("#epFax").val(),
                razonsocial: $("#epRazonSocial").val(),
                giro: $("#epGiro").val(),
                // telefono: $("#telefono").val(),
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
            M.toast({html: 'El usuario se ha creado correctamente', classes: 'rounded green'});

            crearTabla();
            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();

        });

        //Se detecta el click en el boton para MODIFICAR los proveedores
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
                // contacto: $("#eeContacto").val(),
                // fax: $("#eeFax").val(),
                razonsocial: $("#eeRazonSocial").val(),
                giro: $("#eeGiro").val(),
                // telefono: $("#eetelefono").val(),
                correo: $("#eecorreo").val(),
                banco: $("#eeBanco").val(),
                cuenta: $("#eeCuenta").val(),
                tipoCuenta: $("#eeTipoCuenta").val(),
                direccion: $("#eeDireccion").val(),
                region: $("#region :selected").text(),
                provincia: $("#provincia :selected").text(),
                comuna: $("#comuna :selected").text(),
            };


            db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(eeprov.rut).set(eeprov)
                .then(function () {

                    crearTabla();
                    $("#selectDireccion").empty();
                    $("#selectdireccioneditar").empty();
                    M.toast({html: 'Los datos se han modificado correctamente', classes: 'rounded green'});
                })
                .catch(function (error) {
                    M.toast({html: 'Error al sobreescribir', classes: 'rounded red'});
                    M.toast({html: 'Descripcion del error' + error, classes: 'rounded red'});
                });
        });


        //Consulta de Proveedores y los pinta en las dos tablas
        function crearTabla() {
            $("#proveedores").empty();
            var prov = " <thead>\n" +
                "<tr>" +
                "<th>Rut</th>" +
                "<th>Nombre</th>" +
                "<th>Razon social</th>" +
                "<th>Mail</th>" +
                "<th>Telefono</th>" +
                // "<th>Celular</th>" +
                "<th>Comuna</th>" +
                "<th>Direccion</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
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
                        var razon = doc.data().razonsocial;
                        prov = prov + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
                            "<td>" + rut + "</td>" +
                            "<td>" + nombre + "</td>" +
                            "<td>" + razon + "</td>" +
                            "<td>" + correo + "</td>" +
                            "<td>" + celular + "</td>" +
                            "<td>" + comuna + "</td>" +
                            "<td>" + direccion + "</td>" +
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
                        $("#proveedores").append("<br>");
                        $('select').formSelect();

                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });

            $("#proveedoresDeshabilitados").empty();
            var provdes = " <thead>\n" +
                "<tr>" +
                "<th>Rut</th>" +
                "<th>Nombre</th>" +
                "<th>Razon social</th>" +
                "<th>Mail</th>" +
                "<th>Telefono</th>" +
                // "<th>Celular</th>" +
                "<th>Comuna</th>" +
                "<th>Direccion</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                // db.collection("Usuarios").doc(user.uid).collection("Proveedores").orderBy("rut")
                //     .startAfter("12312").limit(parseInt(limit)).get().then(function (querySnapshot) {

                db.collection("Usuarios").doc(user.uid).collection("Proveedores").where("habilitado", "==", false).orderBy("rut").get().then(function (querySnapshot) {
                    $("#cargandotabla").empty();

                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        var rut = doc.data().rut;
                        var nombre = doc.data().nombre;
                        var direccion = doc.data().direccion;
                        var comuna = doc.data().comuna;
                        var correo = doc.data().correo;
                        var celular = doc.data().celular;
                        var razon = doc.data().razonsocial;
                        provdes = provdes + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-rut=" + rut + ">;" +
                            "<td>" + rut + "</td>" +
                            "<td>" + nombre + "</td>" +
                            "<td>" + razon + "</td>" +
                            "<td>" + correo + "</td>" +
                            "<td>" + celular + "</td>" +
                            "<td>" + comuna + "</td>" +
                            "<td>" + direccion + "</td>" +
                            // "<td>" +
                            // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                            // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                            // "</td>" +
                            "</tr>";

                    });

                    provdes = provdes + "</tbody>";

                    $("#proveedoresDeshabilitados").append(provdes);
                    $("#proveedoresDeshabilitados").dataTable().fnDestroy();


                })
                    .then(function () {
                        $('#proveedoresDeshabilitados').DataTable({
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
                        $("#proveedoresDeshabilitados_wrapper").addClass("row");
                        $("#proveedoresDeshabilitados_length").addClass("col s1 l1");
                        $("#proveedoresDeshabilitados_filter").addClass("col s11 l11");
                        $("#proveedoresDeshabilitados_info").addClass("col s6 l6");
                        $("#proveedoresDeshabilitados_paginate").addClass("col l6 right-align flow-text");
                        $("#proveedoresDeshabilitados").append("<br>");
                        $('select').formSelect();

                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });


        }

        //Modal para editar proveedores
        function modalEditar() {
            //Se vacian todos los selectores de regiones existentes en el documento
            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();

            //Se cargan los select de regiones solamente en el modal donde se modificara el proveedor
            regionesmodificar();
            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, rut;
            target = $(event.target);
            rut = target.parent().data('rut');
            //Hago la consulta pasandole el rut capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Usuarios").doc(user.uid).collection("Proveedores").doc(rut.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {


                        if (doc.data().habilitado == false) {
                            $("#eehabilitado").prop('checked', false);
                        } else {
                            $("#eehabilitado").prop('checked', true);

                        }

                        $("#eeRut").val(doc.data().rut);
                        $("#eename").val(doc.data().nombre);
                        $("#eeCelular").val(doc.data().celular);
                        // $("#eeContacto").val(doc.data().contacto);
                        // $("#eeFax").val(doc.data().fax);
                        $("#eeGiro").val(doc.data().giro);
                        $("#eeRazonSocial").val(doc.data().razonsocial);
                        // $("#eetelefono").val(doc.data().telefono);
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


                    } else {
                        // doc.data() will be undefined in this case
                        console.log("error");
                    }
                }
            ).catch(function (error) {
                console.log("Error getting document:", error);
            });


        }

        //Detectar cual es el rut de la celda donde se esta haciendo click
        $('#proveedores').on('click', 'tr td', function (evt) {
            modalEditar();
        });

        $('#proveedoresDeshabilitados').on('click', 'tr td', function (evt) {
            modalEditar();
        });

        $("#crearproov").click(function () {
            $("#selectDireccion").empty();
            $("#selectdireccioneditar").empty();
            regionesagregar();
        })
    }
    else {
        alert("No se detecto ningun usuario, cierra sesion e inicia nuevamente")
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

        //document.write(html);
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



