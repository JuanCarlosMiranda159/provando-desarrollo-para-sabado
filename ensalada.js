const firebaseConfig = {
  apiKey: "AIzaSyDRwUG3sqeaMlSqrSXMi4CfmC2Z_t-tw20",
  authDomain: "cafeteria-96b83.firebaseapp.com",
  projectId: "cafeteria-96b83",
  storageBucket: "cafeteria-96b83.appspot.com",
  messagingSenderId: "1076748169985",
  appId: "1:1076748169985:web:6d8b25fccad7e246756100",
  measurementId: "G-CGX7RXHK1F"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar documentos
function guardar() {
  var ensalada = document.getElementById('ensalada').value;
  var descripcion = document.getElementById('descripcion').value;
  var tipo = document.getElementById('tipo').value;
  var sabor = document.getElementById('sabor').value;
  var valor = document.getElementById('valor').value;
  
  db.collection("ensaladas").add({
    ensalada: ensalada,
    descripcion: descripcion,
    tipo: tipo,
    sabor: sabor,
    valor: valor
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    limpiarCampos();
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

// Limpiar campos después de guardar
function limpiarCampos() {
  document.getElementById('ensalada').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('sabor').value = '';
  document.getElementById('valor').value = '';
}

// Leer documentos
var tabla = document.getElementById('tabla');
db.collection("ensaladas").onSnapshot((querySnapshot) => {
  tabla.innerHTML = ``;
  querySnapshot.forEach((doc) => {
    tabla.innerHTML += `
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().ensalada}</td>
        <td>${doc.data().descripcion}</td>
        <td>${doc.data().tipo}</td>
        <td>${doc.data().sabor}</td>
        <td>${doc.data().valor}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().ensalada}', '${doc.data().descripcion}', '${doc.data().tipo}', '${doc.data().sabor}', '${doc.data().valor}')">Editar</button></td>
      </tr>
    `;
  });
});

// Eliminar documentos
function eliminar(id) {
  db.collection("ensaladas").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

// Editar documentos
function editar(id, ensalada, descripcion, tipo, sabor, valor) {
  document.getElementById('ensalada').value = ensalada;
  document.getElementById('descripcion').value = descripcion;
  document.getElementById('tipo').value = tipo;
  document.getElementById('sabor').value = sabor;
  document.getElementById('valor').value = valor;
  
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';
  
  boton.onclick = function() {
    var washingtonRef = db.collection("ensaladas").doc(id);
    
    washingtonRef.update({
      ensalada: document.getElementById('ensalada').value,
      descripcion: document.getElementById('descripcion').value,
      tipo: document.getElementById('tipo').value,
      sabor: document.getElementById('sabor').value,
      valor: document.getElementById('valor').value
    }).then(() => {
      console.log("Document successfully updated!");
      boton.innerHTML = 'Guardar';
      limpiarCampos();
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
}