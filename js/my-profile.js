//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("perfil").innerHTML+=" "+usuario.nombre
    setInterval(() => {
        document.getElementById("userImage").src=usuario.imgsrc
    }, 300);

    //Música
    document.body.innerHTML+=`<audio id="audio" src="" autoplay loop></audio>`;
    setTimeout(() => {
        hablar("Tomá música de thór");
    }, 6000);
    setTimeout(() => {
        document.getElementById("audio").src="audio/thor.mp3";
    }, 10000);
    cargar()
});

function guardar(){
    usuario.nombresReales=document.getElementById("nombresReales").value;
    usuario.apellidos=document.getElementById("apellidos").value;
    usuario.edad=document.getElementById("edad").value;
    usuario.telefono=document.getElementById("telefono").value;
    usuario.email=document.getElementById("email").value;
    usuario.imgsrc=document.getElementById("imageResult").src
    if (usuarios[0]!==undefined){
        let contadorDeGuardado=0
        while (contadorDeGuardado<usuarios.length){
            if (usuarios[contadorDeGuardado].nombre===usuario.nombre || (usuarios[contadorDeGuardado].contraseña!==usuario.contraseña&&usuarios[contadorDeGuardado].nombre===usuario.nombre)){
                usuarios[contadorDeGuardado]=usuario;
            }
            contadorDeGuardado+=1;
        }
        if (sessionStorage.usuarios!==undefined){
          sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
          usuarios=JSON.parse(sessionStorage.getItem("usuarios"));
          sessionStorage.setItem("usuario", JSON.stringify(usuario));
          usuario=JSON.parse(sessionStorage.getItem("usuario"));
        }
        if (localStorage.usuarios!==undefined){
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          usuarios=JSON.parse(localStorage.getItem("usuarios"));
          localStorage.setItem("usuario", JSON.stringify(usuario));
          usuarios=JSON.parse(localStorage.getItem("usuario"));
        }
    }
}

function cargar(){
    document.getElementById("nombresReales").value=usuario.nombresReales;
    document.getElementById("apellidos").value=usuario.apellidos;
    document.getElementById("edad").value=usuario.edad;
    document.getElementById("telefono").value=usuario.telefono;
    document.getElementById("email").value=usuario.email;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onloadend = function (e) {
          usuario.imgsrc=reader.result
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
  }

function elegirImagen(imageSrc){
    document.getElementById("imageResult").src=imageSrc
    usuario.imgsrc=document.getElementById("imageResult").src
}