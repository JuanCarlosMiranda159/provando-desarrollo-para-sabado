const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "cafeteria-96b83.firebaseapp.com",
    projectId: "cafeteria-96b83",
    storageBucket: "cafeteria-96b83.appspot.com",
    messagingSenderId: "1076748169985",
    appId: "1:1076748169985:web:6d8b25fccad7e246756100",
    measurementId: "G-CGX7RXHK1F"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para mostrar pedidos en la tabla de pedidos.html
function mostrarPedidos() {
    const tablaPedidos = document.getElementById('tabla-pedidos');
    
    // Limpiar tabla
    tablaPedidos.innerHTML = '';

    // Leer y mostrar productos de la colección 'productos'
    db.collection('productos').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tablaPedidos.innerHTML += `
                <tr>
                    <th scope="row">${doc.id}</th>
                    <td>${data.comida}</td>
                    <td>${data.postre}</td>
                    <td>${data.ensalada}</td>
                    <td>${data.bebida}</td>
                    <td>${data.extra}</td>
                </tr>
            `;
        });
    });
}

// Mostrar pedidos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPedidos);