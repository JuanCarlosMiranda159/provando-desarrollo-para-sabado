const preciosEnsaladas = {
    'Ensalada Mixta': 8,
    'Ensalada de Choclo': 10,
    'Ensalada de Verduras': 12,
    'Ensalada de Rabanos': 9,
    'Ensalada de Palta': 14
};

const limiteCompra = 5; // Límite de unidades por producto
let carritoEnsaladas = JSON.parse(localStorage.getItem('carritoEnsaladas')) || {};

// Función para agregar ensaladas al carrito
function agregarProductoEnsalada(nombre) {
    if (carritoEnsaladas[nombre]) {
        if (carritoEnsaladas[nombre].cantidad < limiteCompra) {
            carritoEnsaladas[nombre].cantidad++;
        } else {
            alert(`No puedes agregar más de ${limiteCompra} unidades de ${nombre}.`);
            return;
        }
    } else {
        carritoEnsaladas[nombre] = {
            cantidad: 1,
            precio: preciosEnsaladas[nombre]
        };
    }
    localStorage.setItem('carritoEnsaladas', JSON.stringify(carritoEnsaladas));
    actualizarCarritoEnsaladas();
}

function eliminarProductoEnsalada(nombre) {
    delete carritoEnsaladas[nombre];
    localStorage.setItem('carritoEnsaladas', JSON.stringify(carritoEnsaladas));
    actualizarCarritoEnsaladas();
}

function actualizarCarritoEnsaladas() {
    const tablaCarrito = document.getElementById('carrito-ensaladas-tabla');
    tablaCarrito.innerHTML = '';
    let total = 0;

    for (let producto in carritoEnsaladas) {
        const { cantidad, precio } = carritoEnsaladas[producto];
        const subtotal = cantidad * precio;
        total += subtotal;
        let row = `<tr>
                     <td>${producto}</td>
                     <td>${cantidad}</td>
                     <td>$${precio}</td>
                     <td>$${subtotal}</td>
                     <td><button onclick="eliminarProductoEnsalada('${producto}')">Eliminar</button></td>
                   </tr>`;
        tablaCarrito.innerHTML += row;
    }

    const totalRow = `<tr>
                        <td colspan="3">Total</td>
                        <td>$${total}</td>
                        <td></td>
                      </tr>`;
    tablaCarrito.innerHTML += totalRow;
}

// Llama a esta función al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarritoEnsaladas);