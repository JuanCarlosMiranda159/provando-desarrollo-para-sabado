// Configuración de Firebase
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

// Función para guardar productos
function guardarProductos() {
    // Obtener los valores de cada input
    const comida = document.getElementById('comida').value;
    const postre = document.getElementById('postre').value;
    const ensalada = document.getElementById('ensalada').value;
    const bebida = document.getElementById('bebida').value;
    const extra = document.getElementById('extra').value;

    // Guardar en la colección 'productos' de Firestore
    const productos = {
        comida: comida,
        postre: postre,
        ensalada: ensalada,
        bebida: bebida,
        extra: extra
    };

    db.collection('productos').add(productos)
    .then((docRef) => {
        console.log("Productos guardados con ID: ", docRef.id);
        limpiarCampos();
        mostrarProductos();
    })
    .catch((error) => {
        console.error("Error al guardar los productos: ", error);
    });
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById('comida').value = '';
    document.getElementById('postre').value = '';
    document.getElementById('ensalada').value = '';
    document.getElementById('bebida').value = '';
    document.getElementById('extra').value = '';
}

// Función para mostrar productos
function mostrarProductos() {
    const tablaProductos = document.getElementById('tabla-productos');
    
    // Limpiar tabla
    tablaProductos.innerHTML = '';

    // Leer y mostrar productos de la colección 'productos'
    db.collection('productos').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tablaProductos.innerHTML += `
                <tr>
                    <th scope="row">${doc.id}</th>
                    <td>${data.comida}</td>
                    <td>${data.postre}</td>
                    <td>${data.ensalada}</td>
                    <td>${data.bebida}</td>
                    <td>${data.extra}</td>
                    <td><button class="btn btn-danger" onclick="eliminarProducto('${doc.id}')">Eliminar</button></td>
                    <td><button class="btn btn-warning" onclick="editarProducto('${doc.id}', '${data.comida}', '${data.postre}', '${data.ensalada}', '${data.bebida}', '${data.extra}')">Editar</button></td>
                </tr>
            `;
        });
    });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    db.collection('productos').doc(id).delete().then(() => {
        console.log("Producto eliminado");
        mostrarProductos();
    }).catch((error) => {
        console.error("Error al eliminar el producto: ", error);
    });
}

// Función para editar un producto
function editarProducto(id, comida, postre, ensalada, bebida, extra) {
    document.getElementById('comida').value = comida;
    document.getElementById('postre').value = postre;
    document.getElementById('ensalada').value = ensalada;
    document.getElementById('bebida').value = bebida;
    document.getElementById('extra').value = extra;

    const boton = document.getElementById('guardar-producto');
    boton.innerHTML = 'Actualizar';
    boton.onclick = function() {
        db.collection('productos').doc(id).update({
            comida: document.getElementById('comida').value,
            postre: document.getElementById('postre').value,
            ensalada: document.getElementById('ensalada').value,
            bebida: document.getElementById('bebida').value,
            extra: document.getElementById('extra').value
        }).then(() => {
            console.log("Producto actualizado");
            boton.innerHTML = 'Guardar Productos';
            limpiarCampos();
            mostrarProductos();
        }).catch((error) => {
            console.error("Error al actualizar el producto: ", error);
        });
    };
}

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);

// Función para mostrar el nombre del usuario
function mostrarUsuario() {
    const usuario = localStorage.getItem('usuario') || 'Usuario Anónimo';
    document.getElementById('nombre-usuario-span').innerText = usuario;
}

document.addEventListener('DOMContentLoaded', mostrarUsuario);

