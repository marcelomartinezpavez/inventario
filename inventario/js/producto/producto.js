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

            var producto = {
                codigo: $("#epCodigo").val(),
                categoria: $("#epCategoria").val(),
                color: $("#epColor").val(),
                costo: $("#epCosto").val(),
                descripcion: $("#epDescripcion").val(),
                dscto1: $("#epDscto1").val(),
                dscto2: $("#epDscto2").val(),
                dscto3: $("#epDscto3").val(),
                marca: $("#epMarca").val(),
                margen: $("#epMargen").val(),
                ordencorte: $("#epOrdenCorte").val(),
                precioventa: $("#epPrecioVenta").val(),
                stock: $("#epStock").val(),
                stockcritico: $("#epStockCritico").val(),
                talla: $("#epTalla").val(),
                lavado: $("#epTipoLavado").val()
            };

            db.collection("Usuarios").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {
                    crearTabla();
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        });
        $("#eebtnGuardar").click(function () {

            var producto = {
                codigo: $("#eeCodigo").val(),
                categoria: $("#eeCategoria").val(),
                color: $("#eeColor").val(),
                costo: $("#eeCosto").val(),
                descripcion: $("#eeDescripcion").val(),
                dscto1: $("#eeDscto1").val(),
                dscto2: $("#eeDscto2").val(),
                dscto3: $("#eeDscto3").val(),
                marca: $("#eeMarca").val(),
                margen: $("#eeMargen").val(),
                ordencorte: $("#eeOrdenCorte").val(),
                precioventa: $("#eePrecioVenta").val(),
                stock: $("#eeStock").val(),
                stockcritico: $("#eeStockCritico").val(),
                talla: $("#eeTalla").val(),
                lavado: $("#eeTipoLavado").val()
            };

            db.collection("Usuarios").doc(user.uid).collection("Productos").doc(producto.codigo).set(producto)
                .then(function () {
                    crearTabla();
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        });

        $('#productos').on('click', 'tr td', function (evt) {
            modalEditar();
        });


        function crearTabla() {
            $("#productos").empty();
            var prod = "<thead>" +
                "<tr>" +
                "<th>codigo</th>" +
                "<th>descripcion</th>" +
                "<th>marca</th>" +
                "<th>categoria</th>" +
                "<th>color</th>" +
                "<th>talla</th>" +
                "<th>lavado</th>" +
                "<th>stock</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                // db.collection("Usuarios").doc(user.uid).collection("Proveedores").orderBy("rut")
                //     .startAfter("12312").limit(parseInt(limit)).get().then(function (querySnapshot) {

                db.collection("Usuarios").doc(user.uid).collection("Productos").get().then(function (querySnapshot) {

                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        var codigo = doc.data().codigo;
                        var descripcion = doc.data().descripcion;
                        var marca = doc.data().marca;
                        var categoria = doc.data().categoria;
                        var color = doc.data().color;
                        var talla = doc.data().talla;
                        var lavado = doc.data().lavado;
                        var stock = doc.data().stock;

                        prod = prod + "<tr class=\"hoverable\" style=\"cursor: pointer\" data-codigo=" + codigo + ">;" +
                            "<td>" + codigo + "</td>" +
                            "<td>" + descripcion + "</td>" +
                            "<td>" + marca + "</td>" +
                            "<td>" + categoria + "</td>" +
                            "<td>" + color + "</td>" +
                            "<td>" + talla + "</td>" +
                            "<td>" + lavado + "</td>" +
                            "<td>" + stock + "</td>" +
                            // "<td>" +
                            // "<a class=\"btn-floating hoverable waves-effect waves-light yellow\"><i class=\"material-icons\">edit</i></a>\n" +
                            // "<a class=\"btn-floating hoverable waves-effect waves-light red\"><i class=\"material-icons\">delete</i></a>\n" +
                            // "</td>" +
                            "</tr>";

                    });

                    prod = prod + "</tbody>";

                    $("#productos").append(prod);
                    $("#productos").dataTable().fnDestroy();


                })
                    .then(function () {
                        $('#productos').DataTable({
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
                        $("#productos_length").addClass("col s1 l1");
                        $("#productos_filter").addClass("col s11 l11");
                        $("#productos_info").addClass("col s6 l6");
                        $("#productos_paginate").addClass("col l6 right-align flow-text");
                        $("#productos").append("<br>");
                        $('select').formSelect();

                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });


        }

        function modalEditar() {
            //Se vacian todos los selectores de regiones existentes en el documento


            //Se cargan los select de regiones solamente en el modal donde se modificara el proveedor
            //declaro variables para la funcion, estan detectaran y guardaran el rut de la fila en la que estoy haciendo click
            var target, codigo;
            target = $(event.target);
            codigo = target.parent().data('codigo');
            console.log(codigo);
            //Hago la consulta pasandole el rut capturado, si se realiza correctamente cargo los datos en la modal
            var docRef = db.collection("Usuarios").doc(user.uid).collection("Productos").doc(codigo.toString());
            docRef.get().then(function (doc) {
                    if (doc.exists) {


                        // if (doc.data().habilitado == false) {
                        //     $("#eehabilitado").prop('checked', false);
                        // } else {
                        //     $("#eehabilitado").prop('checked', true);
                        //
                        // }


                        $("#eeCodigo").val(doc.data().codigo);
                        $("#eeCategoria").val(doc.data().categoria);
                        $("#eeColor").val(doc.data().color);
                        $("#eeCosto").val(doc.data().costo);
                        $("#eeDescripcion").val(doc.data().descripcion);
                        $("#eeDscto1").val(doc.data().dscto1);
                        $("#eeDscto2").val(doc.data().dscto2);
                        $("#eeDscto3").val(doc.data().dscto3);
                        $("#eeMarca").val(doc.data().marca);
                        $("#eeMargen").val(doc.data().margen);
                        $("#eeOrdenCorte").val(doc.data().ordencorte);
                        $("#eePrecioVenta").val(doc.data().precioventa);
                        $("#eeStock").val(doc.data().stock);
                        $("#eeStockCritico").val(doc.data().stockcritico);
                        $("#eeTalla").val(doc.data().talla);
                        $("#eeTipoLavado").val(doc.data().lavado);


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


    } else {
        //redireccionar a login
        console.log("no existe usuario");
    }
});
