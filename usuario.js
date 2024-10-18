const firebaseConfig = { 
    apiKey: "API_KEY",
    authDomain: "cafeteria-96b83.firebaseapp.com",
    projectId: "cafeteria-96b83",
    storageBucket: "cafeteria-96b83.appspot.com",
    messagingSenderId: "1076748169985",
    appId: "1:1076748169985:web:6d8b25fccad7e246756100",
    measurementId: "G-CGX7RXHK1F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Agregar documentos (usuarios)
function guardarUsuario() {
    var nombreUsuario = document.getElementById('nombre-usuario').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dni = document.getElementById('dni').value;
    var correo = document.getElementById('correo').value;
    var celular = document.getElementById('celular').value;
    var contrasena = document.getElementById('contrasena').value;

    db.collection("usuarios").add({
        nombreUsuario: nombreUsuario,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        correo: correo,
        celular: celular,
        contrasena: contrasena
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Usuario creado con éxito."); // Mostrar alerta
        limpiarFormularioUsuario();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// Limpiar el formulario
function limpiarFormularioUsuario() {
    document.getElementById('nombre-usuario').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('dni').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('contrasena').value = '';
}

// Leer documentos (usuarios)
var tablaUsuarios = document.getElementById('tabla-usuarios');
db.collection("usuarios").onSnapshot((querySnapshot) => {
    tablaUsuarios.innerHTML = ``;
    querySnapshot.forEach((doc) => {
        tablaUsuarios.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().nombreUsuario}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellido}</td>
            <td>${doc.data().dni}</td>
            <td>${doc.data().correo}</td>
            <td>${doc.data().celular}</td>
            <td>${doc.data().contrasena}</td>
            <td><button class="btn btn-danger" onclick=eliminarUsuario('${doc.id}')>Eliminar</button></td>
            <td><button class="btn btn-warning" onclick=editarUsuario('${doc.id}','${doc.data().nombreUsuario}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().dni}','${doc.data().correo}','${doc.data().celular}','${doc.data().contrasena}')>Editar</button></td>
        </tr>`;
    });
});

// Borrar documentos (usuarios)
function eliminarUsuario(id) {
    db.collection("usuarios").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// Editar documentos (usuarios)
function editarUsuario(id, nombreUsuario, nombre, apellido, dni, correo, celular, contrasena) {
    document.getElementById('nombre-usuario').value = nombreUsuario;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('dni').value = dni;
    document.getElementById('correo').value = correo;
    document.getElementById('celular').value = celular;
    document.getElementById('contrasena').value = contrasena;

    var boton = document.getElementById('boton-usuario');
    boton.innerHTML = 'Editar';

    boton.onclick = function() {
        var nombreUsuario = document.getElementById('nombre-usuario').value;
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var dni = document.getElementById('dni').value;
        var correo = document.getElementById('correo').value;
        var celular = document.getElementById('celular').value;
        var contrasena = document.getElementById('contrasena').value;

        return db.collection("usuarios").doc(id).update({
            nombreUsuario: nombreUsuario,
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            correo: correo,
            celular: celular,
            contrasena: contrasena
        })
        .then(() => {
            console.log("Document successfully updated!");
            limpiarFormularioUsuario();
            boton.innerHTML = 'Guardar';
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
}