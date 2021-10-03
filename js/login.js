document.body.innerHTML+='<audio src="" id="audioDesconectarse" autoplay></audio>'
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});
//función que verifica los datos introducidos con un aviso y memoria
let booleanoSaludo=true
let contador = 1

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
  let vocesDisponibles=speechSynthesis.getVoices()
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
  document.getElementById("usuario").innerHTML = usuario.nombre;
  //Saludo sessionStorage
  if (cuenta && usuario.primeraVez) {
    document.addEventListener("click", () => {
      if (booleanoSaludo) {
        let vocesDisponibles=speechSynthesis.getVoices();
        let mensaje = new SpeechSynthesisUtterance();
        mensaje.voice = vocesDisponibles[7];
        mensaje.rate = 1;
        mensaje.text = "Bienvenido barra aaa/ a la matrix"+usuario.nombre+"si oyes a lokendo no le creas";
        mensaje.pitch = 1;
        // ¡Habla!
        speechSynthesis.speak(mensaje);
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

  }else{
    document.removeEventListener("click",()=>{});
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
    document.addEventListener("click", () => {
      if (booleanoSaludo) {
        let vocesDisponibles=speechSynthesis.getVoices();
        let mensaje = new SpeechSynthesisUtterance();
        mensaje.voice = vocesDisponibles[7];
        mensaje.rate = 1;
        mensaje.text = "Bienvenido barra aaa/ a la matrix"+usuario.nombre+"si oyes a lokendo no le creas";
        mensaje.pitch = 1;
        // ¡Habla!
        speechSynthesis.speak(mensaje);
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
//No se porqué pero si no repito esta parte se cambia la voz a inglés
let vocesDisponibles=speechSynthesis.getVoices()
    let mensaje = new SpeechSynthesisUtterance();
    mensaje.voice = vocesDisponibles[7];
    mensaje.rate = 1;
    mensaje.text = "Bienvenido barra aaa/ a la matrix"+usuario.nombre+"si oyes a loquendo no le creas";
    mensaje.pitch = 1;
    // ¡Habla!
    speechSynthesis.speak(mensaje);