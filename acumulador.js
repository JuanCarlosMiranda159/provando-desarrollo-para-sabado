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

    // Función para mostrar usuarios
    function mostrarUsuarios() {
        const tablaUsuarios = document.getElementById('tabla-usuarios');
        tablaUsuarios.innerHTML = ''; // Limpiar la tabla

        // Leer y mostrar usuarios de la colección 'usuarios'
        db.collection('usuarios').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                tablaUsuarios.innerHTML += `
                    <tr>
                        <td>${doc.id}</td>
                        <td>${data.nombreUsuario}</td>
                        <td>${data.nombre}</td>
                        <td>${data.apellido}</td>
                        <td>${data.dni}</td>
                        <td>${data.correo}</td>
                        <td>${data.celular}</td>
                        <td>
                            <button class="btn btn-danger" onclick="eliminarUsuario('${doc.id}')">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
    }

    // Función para eliminar un usuario
    function eliminarUsuario(id) {
        db.collection('usuarios').doc(id).delete().then(() => {
            console.log("Usuario eliminado");
            mostrarUsuarios();
        }).catch((error) => {
            console.error("Error al eliminar el usuario: ", error);
        });
    }

    // Mostrar usuarios al cargar la página
    document.addEventListener('DOMContentLoaded', mostrarUsuarios);