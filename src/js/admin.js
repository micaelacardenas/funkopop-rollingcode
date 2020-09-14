import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap'

import '../css/style.css'

import Funko from './funko.js'

import $ from "jquery"

import Swal from 'sweetalert2'

import '@fortawesome/fontawesome-free/js/all'

//Inicializar las variables (darles valor)
let listaFunko = [];
leerProductos();
//variable bandera
let productoExistente = false; //cuando la variable sea false es igual a agregar nuevo funko y cuando sea verdadero quiero editarlo 

//function agregarFunko(event) {

window.agregarFunko = function () {
    
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let numSerie = document.getElementById("numSerie").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
    let precio = document.getElementById("precio").value;
    //validar datos del formulario

    let nuevoFunko = new Funko(codigo, nombre, numSerie, categoria, descripcion, imagen, precio);

    console.log(nuevoFunko);

    listaFunko.push(nuevoFunko);
    localStorage.setItem("funkoKey", JSON.stringify(listaFunko));

    limpiarFormulario();
    leerProductos();

    let ventanaModal = document.getElementById("modalFormulario");
    $(ventanaModal).modal("hide");

    Swal.fire(
        'Producto agregado!',
        'Tu producto se agregó correctamente!',
        'success'
    )

};

function limpiarFormulario() {
    let formulario = document.getElementById("formProducto");
    formulario.reset();
    productoExistente = false;
}

function leerProductos() {
    if (localStorage.length > 0) {

        let _listaFunko = JSON.parse(localStorage.getItem("funkoKey"));

        if (listaFunko.length == 0) {
            listaFunko = _listaFunko;
        }
        //borrar tabla
        borrarTabla();
        //dibujar tabla
        dibujarTabla(_listaFunko);
    }
}

function dibujarTabla(_listaFunko) {
    let tablaFunko = document.getElementById("tablaFunko");

    let codigoHTML = "";

    for (let i in _listaFunko) {
        codigoHTML = `<tr>
        <th scope="row">${_listaFunko[i].codigo}</th>
        <td>${_listaFunko[i].nombre}</td>
        <td>${_listaFunko[i].numSerie}</td>
        <td>${_listaFunko[i].categoria}</td>
        <td>${_listaFunko[i].descripcion}</td>
        <td>${_listaFunko[i].imagen}</td>
        <td>$${_listaFunko[i].precio}</td>
        <td>
            <button class="btn btn-outline-info" onclick= "modificarProducto(${_listaFunko[i].codigo})">Editar</button>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id= "${_listaFunko[i].codigo}"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>`;

        tablaFunko.innerHTML += codigoHTML;
    }
}

function borrarTabla() {
    let tablaFunko = document.getElementById("tablaFunko");

    if (tablaFunko.children.length > 0) {
        while (tablaFunko.firstChild) {
            tablaFunko.removeChild(tablaFunko.firstChild)
        }
    }
}

window.eliminarProducto = function (botonEliminar) {
    if (localStorage.length > 0) {
        let _listaFunko = JSON.parse(localStorage.getItem("funkoKey"));
        //Opcion 1
        /*for (let i in _listaFunko) {
            if(_listaFunko[i].codigo == botonEliminar.id){

            }
        }*/

        //opcion 2
        Swal.fire({
            title: 'Estas seguro de eliminar este producto?',
            text: "No podrás revertir estos cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                let datosFiltrados = _listaFunko.filter(function (producto) {
                    return producto.codigo != botonEliminar.id;

                });

                localStorage.setItem("funkoKey", JSON.stringify(datosFiltrados));
                leerProductos();
                listaFunko = datosFiltrados;
                Swal.fire(
                    'Funko borrado!',
                    'Tu producto se borró correctamente',
                    'success'
                );
            } else {
                Swal.fire(
                    'Cancelado!',
                    'Tu producto esta a salvo',
                    'info'
                );

            }
        });




    }
};

window.modificarProducto = function (codigo) {
    //Buscar el objeto del producto
    let objetoEncontrado = listaFunko.find(function (producto) {
        return producto.codigo == codigo;
    })
    //Cargar los datos en el formulario
    document.getElementById("codigo").value = objetoEncontrado.codigo;
    document.getElementById("nombre").value = objetoEncontrado.nombre;
    document.getElementById("numSerie").value = objetoEncontrado.numSerie;
    document.getElementById("categoria").value = objetoEncontrado.categoria;
    document.getElementById("descripcion").value = objetoEncontrado.descripcion;
    document.getElementById("imagen").value = objetoEncontrado.imagen;
    document.getElementById("precio").value = objetoEncontrado.precio;


    //Abrir una ventana modal
    let ventanaModal = document.getElementById("modalFormulario");
    $(ventanaModal).modal("show");
    productoExistente = true;
};

window.agregarModificar = function (event) {
    event.preventDefault();
    if (productoExistente == false) {
        //quiero agregar un nuevo producto
        agregarFunko();
    } else {
        Swal.fire({
            title: 'Seguro que quiere modificar el producto?',
            text: "No será posible modificar los cambios!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Modificar!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Producto modificado!',
                    'Tu producto se modificó correctamente',
                    'success'
                );
            } else {
                Swal.fire(
                    'Cancelado!',
                    'Sin cambios',
                    'success'
                );

            }
        })
        //quiero editar un producto ya subido
        guardarProductoModificado();

    }
}

function guardarProductoModificado() {
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let numSerie = document.getElementById("numSerie").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
    let precio = document.getElementById("precio").value;

    for (let i in listaFunko) {
        if (listaFunko[i].codigo == codigo) {
            listaFunko[i].nombre == nombre;
            listaFunko[i].numSerie == numSerie;
            listaFunko[i].categoria == categoria;
            listaFunko[i].descripcion == descripcion;
            listaFunko[i].imagen == imagen;
            listaFunko[i].precio == precio;
        }
    }
    localStorage.setItem("funkoKey", JSON.stringify(listaFunko));

    leerProductos();
    limpiarFormulario();

    let ventanaModal = document.getElementById("modalFormulario")
    $(ventanaModal).modal("hide");
}

