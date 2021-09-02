//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});
//función que verifica los datos introducidos con un aviso y memoria
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

//Detalles estéticos del botón de desconectar
function sadMoment(booleano){
    if (booleano) {
      document.getElementById("desconectarse").style = "color:  rgba(255, 235, 205, 0); background-image:url('img/desconectar.gif'); border-color: rgb(255, 0, 0); background-size: contain;";
    }else{
      document.getElementById("desconectarse").style = "color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;";
    } 
}
 //Fin de los detalles estéticos
 
 //declaración, modificación de variables, pone el nombre de usuario y saluda
let cuenta = false;
let usuario = {};

if (sessionStorage.usuario !== undefined) {
  usuario = JSON.parse(sessionStorage.getItem("usuario"));
  cuenta = true;
  //Pone el nombre de usuario sessionStorage
  document.getElementById("usuario").innerHTML = usuario.nombre;
  //Saludo sessionStorage
  if (cuenta && usuario.primeraVez) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido ' + usuario.nombre,
      showConfirmButton: false,
      timer: 3000
    })
    usuario.primeraVez = false;
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    sessionStorage.removeItem("usuario.primeraVez");
  }
}

//Saluda, declara, pone el nombre de usuario y modifica mas variables 
if (localStorage.usuario !== undefined) {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  cuenta = true;
  //Pone el nombre de usuario localStorage
  document.getElementById("usuario").innerHTML = usuario.nombre;
  //Saludo localStorage
  if (cuenta && usuario.primeraVez) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido ' + usuario.nombre,
      showConfirmButton: false,
      timer: 3000
    })
    usuario.primeraVez = false;
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    sessionStorage.removeItem("usuario.primeraVez");
  }
}

//Estas conectado?
function logueado() {
  if (!cuenta) {
    location.href = "login.html";
  }
}

//Desconecta
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
//Estética de desconexión
let clicksAUsuario = 0
function clickUsuario(){
  if (clicksAUsuario===0) {
    document.getElementById("nav").innerHTML += `<button class="py-2 d-none d-md-inline-block" id="desconectarse" onclick="desconectarse()" onmouseover="sadMoment(true)" onmouseleave="sadMoment(false)" style="color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;" >Desconectarse</button>`
    clicksAUsuario = 1
  }else{
    document.getElementById("nav").removeChild(document.getElementById("desconectarse"))
    clicksAUsuario = 0
  }
  
}