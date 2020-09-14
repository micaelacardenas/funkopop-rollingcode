import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap'

import '../css/style.css'

leerStorage();

function leerStorage() {
    if (localStorage.length > 0) {
        let listaProductos = JSON.parse(localStorage.getItem("funkoKey"));
        for (let i in listaProductos) {
            let codigoHTML = `<div class="col-sm-12 col-md-4 col-lg-3">
            <div class="card">
                <img src="./img/productos/${listaProductos[i].imagen}" class="card-img-top" alt="${listaProductos[i].nombre}">
                <div class="card-body">
                  <h5 class="card-title"${listaProductos[i].imagen}</h5>
                  <p class="card-text">${listaProductos[i].descripcion}</p>
                  <a href="#" class="btn btn-primary disa">Comprar</a>
                </div>
              </div>
        </div>`;
        
        catalogo.innerHTML += codigoHTML;
        }
    }
}
