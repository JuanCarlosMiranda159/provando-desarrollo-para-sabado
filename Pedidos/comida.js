const precios = {
    'Lenteja': 10,
    'Estofado': 15,
    'Lomo Saltado': 20,
    'Ají de Gallina': 18,
    'Causa Rellena': 12
};

const limiteCompra = 5; // Límite de unidades por producto
let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

// Inicializar Firebase
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "cafeteria-96b83.firebaseapp.com",
    projectId: "cafeteria-96b83",
    storageBucket: "cafeteria-96b83.appspot.com",
    messagingSenderId: "1076748169985",
    appId: "1:1076748169985:web:6d8b25fccad7e246756100",
    measurementId: "G-CGX7RXHK1F"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function agregarProducto(nombre) {
    if (carrito[nombre]) {
        if (carrito[nombre].cantidad < limiteCompra) {
            carrito[nombre].cantidad++;
        } else {
            alert(`No puedes agregar más de ${limiteCompra} unidades de ${nombre}.`);
            return;
        }
    } else {
        carrito[nombre] = {
            cantidad: 1,
            precio: precios[nombre]
        };
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    guardarProductoEnFirebase(nombre); // Guarda el producto en Firebase
}

function guardarProductoEnFirebase(nombre) {
    db.collection("productos").add({
        nombre: nombre,
        precio: precios[nombre],
        cantidad: carrito[nombre].cantidad
    })
    .then((docRef) => {
        console.log("Producto agregado a Firebase con ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error al agregar producto a Firebase: ", error);
    });
}

function eliminarProducto(nombre) {
    delete carrito[nombre];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const tablaCarrito = document.getElementById('carrito-tabla');
    tablaCarrito.innerHTML = '';
    let total = 0;

    for (let producto in carrito) {
        const { cantidad, precio } = carrito[producto];
        const subtotal = cantidad * precio;
        total += subtotal;
        let row = `<tr>
                     <td>${producto}</td>
                     <td>${cantidad}</td>
                     <td>$${precio}</td>
                     <td>$${subtotal}</td>
                     <td><button onclick="eliminarProducto('${producto}')">Eliminar</button></td>
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

function finalizarPedido() {
    if (Object.keys(carrito).length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar el pedido.");
        return;
    }

    const pedido = {
        productos: carrito,
        fecha: new Date()
    };

    db.collection("pedidos").add(pedido)
        .then(() => {
            alert("Pedido realizado con éxito.");
            localStorage.removeItem('carrito'); // Elimina el carrito del localStorage si es necesario
            carrito = {}; // Reinicia el carrito
            actualizarCarrito(); // Actualiza la vista del carrito
        })
        .catch((error) => {
            console.error("Error al realizar el pedido: ", error);
        });
}