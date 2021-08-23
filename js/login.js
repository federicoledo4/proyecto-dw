//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});

let contador = 1
function verificar() {

    let dato1 = document.getElementById("user");
    let dato2 = document.getElementById("password");
    let usuario = {primeraVez:true};
    if (dato1.value.trim() !== "" && dato2.value.trim() !== "") {
        usuario.nombre = dato1.value;
        usuario.contraseña = dato2.value;
        if (document.getElementById("recordar").checked) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
        } else {
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
        }
        location.href = "index.html";
    } else { 
        if (contador===1) {
            contador+=1;
            document.getElementById("formulario").innerHTML += '<p style="color:red">Usuario y/o contraseña invalido<p>';
        
        }
    }
}

//Detalles esteticos
function sadMoment(booleano){
    if (booleano) {
      document.getElementById("desconectarse").style = "color:  rgba(255, 235, 205, 0); background-image:url('img/desconectar.gif'); border-color: rgb(255, 0, 0); background-size: contain;";
    }else{
      document.getElementById("desconectarse").style = "color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;";
    } 
}
 //Fin de los detalles estéticos
 
let cuenta = false;
let usuario = {};

if (sessionStorage.usuario !== undefined) {
  usuario = JSON.parse(sessionStorage.getItem("usuario"));
  cuenta = true;
  if (cuenta && usuario.primeraVez) {
    alert("Bienvenido/a " + usuario.nombre);
    usuario.primeraVez = false
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    sessionStorage.removeItem("usuario.primeraVez")
  }
}

//Saluda y declara variables 
if (localStorage.usuario !== undefined) {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  cuenta = true;
  if (cuenta && usuario.primeraVez) {
    alert("Bienvenido/a " + usuario.nombre);
    usuario.primeraVez = false
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    sessionStorage.removeItem("usuario.primeraVez")
  }
}

function logueado() {
  if (!cuenta) {
    location.href = "login.html";
  }
}

function desconectarse() {
    if (localStorage.usuario !== undefined) {
      localStorage.removeItem("usuario");
    }
    if (sessionStorage.usuario !== undefined) {
      sessionStorage.removeItem("usuario");
    }
    cuenta = false;
    logueado();
}