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

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
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
                   </tr>`;
        tablaCarrito.innerHTML += row;
    }

    // Mostrar total
    const totalRow = `<tr>
                        <td colspan="3">Total</td>
                        <td>$${total}</td>
                      </tr>`;
    tablaCarrito.innerHTML += totalRow;
}

// Llamar a mostrarCarrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Función para finalizar el pedido
function finalizarPedido() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
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
            localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
            mostrarCarrito(); // Actualiza la vista del carrito
        })
        .catch((error) => {
            console.error("Error al realizar el pedido: ", error);
        });
}