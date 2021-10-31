document.body.innerHTML += '<audio src="" id="audioDesconectarse" autoplay></audio>'
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});
//función que verifica los datos introducidos con un aviso y memoria
let booleanoSaludo=true;
let contador = 1;
let vocesDisponibles=[""];
let usuarios=[]

if (sessionStorage.usuarios!==undefined){
  usuarios=JSON.parse(sessionStorage.getItem("usuarios"));
}
if (localStorage.usuarios!==undefined){
  usuarios=JSON.parse(localStorage.getItem("usuarios"));
}

function obtenerVoces(){
vocesDisponibles = window.speechSynthesis.getVoices();
}
obtenerVoces();
setTimeout(obtenerVoces, 100)

//alerta memes
function alertMeme(imgsrc, tittleText, text){
  Swal.fire({
      title: tittleText,
      text: text,
      imageUrl: imgsrc,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
  });
}

//habla
function hablar(palabras){
let mensaje = new SpeechSynthesisUtterance();
    mensaje.voice = vocesDisponibles[7];
    mensaje.rate = 1;
    mensaje.text = palabras;
    mensaje.pitch = 1;
    // ¡Habla!
    speechSynthesis.speak(mensaje);
}

function verificar() {

    let dato1 = document.getElementById("user");
    let dato2 = document.getElementById("password");
    let usuario = {primeraVez:true};
    if (dato1.value.trim() !== "" && dato2.value.trim() !== "") {
        usuario.nombre = dato1.value;
        usuario.contraseña = md5(dato2.value);
        usuario.nombresReales="";
      usuario.apellidos="";
      usuario.edad="";
      usuario.telefono="";
      usuario.email="";
      usuario.imgsrc="img/pepe2.gif"
        if (usuarios[0]!==undefined){
          let contadorDeGuardado=0
          while (contadorDeGuardado<usuarios.length){
              if (usuarios[contadorDeGuardado].nombre===usuario.nombre || (usuarios[contadorDeGuardado].contraseña!==usuario.contraseña&&usuarios[contadorDeGuardado].nombre===usuario.nombre)){
                  usuario=usuarios[contadorDeGuardado];
              }
              contadorDeGuardado+=1;
          }
        }
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
      document.getElementById("desconectarse").style = "color:rgb(255, 0, 0); background-image:url('img/desconectar.gif'); border-color: rgb(255, 0, 0); background-size: contain; background-color:white;";
      document.getElementById("desconectarse").innerHTML="Nooooo";
      document.getElementById("audioDesconectarse").src="audio/loquendo1.mp3";
    }else{
      document.getElementById("desconectarse").style = "color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;";
      document.getElementById("desconectarse").innerHTML="Desconectarse";
      document.getElementById("audioDesconectarse").src="audio/loquendo2.mp3";
    } 
}

function explotar(){
  document.getElementById("audioDesconectarse").src="audio/loquendo3.mp3";
}
 //Fin de los detalles estéticos
 
 //declaración, modificación de variables, pone el nombre de usuario y saluda
let cuenta = false;
let usuario = {};

if (sessionStorage.usuario !== undefined) {
  usuario = JSON.parse(sessionStorage.getItem("usuario"));
  cuenta = true;
  //Pone el nombre de usuario sessionStorage
  document.getElementById("usuario").innerHTML ='<img id="imageResult" src='+usuario.imgsrc+' alt="" class="img-fluid rounded shadow-sm mx-auto userPicture"></img>'+ usuario.nombre;
  //Saludo sessionStorage
  if (cuenta && usuario.primeraVez) {
    document.addEventListener("click", () => {
      if (booleanoSaludo) {
        hablar("Bienvenido barra aaa/ a la matrix"+usuario.nombre+"si oyes a lokendo no le creas");
        booleanoSaludo= false;
      }
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido ' + usuario.nombre,
      showConfirmButton: false,
      timer: 3000
    });
    

    usuario.primeraVez = false;
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    sessionStorage.removeItem("usuario.primeraVez");
    añadirUsuario(sessionStorage);
    
  }else{
    document.removeEventListener("click",()=>{});
    }
}

//Saluda, declara, pone el nombre de usuario y modifica mas variables 
if (localStorage.usuario !== undefined) {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  cuenta = true;
  //Pone el nombre de usuario localStorage
  document.getElementById("usuario").innerHTML ='<img id="imageResult" src="img/pepe2.gif" alt="" class="img-fluid rounded shadow-sm mx-auto userPicture"></img>'+ usuario.nombre;
  //Saludo localStorage
  if (cuenta && usuario.primeraVez) {
    document.addEventListener("click", () => {
      if (booleanoSaludo) {
        hablar("Bienvenido barra aaa/ a la matrix"+usuario.nombre+"si oyes a lokendo no le creas");
        booleanoSaludo= false;
      }
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido/a ' + usuario.nombre,
      showConfirmButton: false,
      timer: 3000
    });

    usuario.primeraVez = false;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.removeItem("usuario.primeraVez");
    añadirUsuario(localStorage);
  }else{
    document.removeEventListener("click",()=>{});
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
      localStorage.removeItem("usuario");
    }
    if (sessionStorage.usuario !== undefined) {
      sessionStorage.removeItem("usuario");
    }
    cuenta = false;
    logueado();
}

function añadirUsuario(storage){
  if(usuarios[0]!==undefined){
    for (let datosUsuario of usuarios){
      if (datosUsuario.nombre===usuario.nombre || (datosUsuario.contraseña!==usuario.contraseña&&datosUsuario.nombre===usuario.nombre)){
        return;
      }
    }
    usuarios.push(usuario);
  }else{
    usuarios.push(usuario)
  }
  storage.setItem("usuarios", JSON.stringify(usuarios));
}
function compararUsuarios(){
    let usuario={};
    usuario.nombre=document.getElementById("usuario").value;
    usuario.contraseña=document.getElementById("contraseña").value;
    usuarios=JSON.parse(localStorage.getItem("usuarios"))

    for(cuenta of usuarios){
        if(usuario.nombre===cuenta.nombre&&md5(usuario.contraseña)===cuenta.contraseña){
            alert("Todo correcto")
        }else{alert("no hackees la cuenta de otro o se me van a quejar")}

    }
}