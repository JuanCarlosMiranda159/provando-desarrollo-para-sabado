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
const auth = firebase.auth();

function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    auth.signInWithEmailAndPassword(usuario, contraseña)
        .then((userCredential) => {
            // Ingreso exitoso
            console.log("Usuario ingresado:", userCredential.user);
            window.location.href = "menu.html"; // Redirigir a la página del menú
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error);
            alert("Error: " + error.message); // Mostrar un mensaje de error
        });
}

function crearUsuario() {
    window.open("usuario.html");
}