let lugarAEnviar = {};
let mymap;
let contadorUbicacion=0;
let marcador;
let mensajeDeCompra="";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("titulo").innerHTML="Carrito de " + usuario.nombre;

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            var articulos = resultObj.data.articles;

            //Añado la lista al carrito
            for (let articulo of articulos){
                añadir(articulo.src, articulo.name, articulo.currency, articulo.unitCost, articulo.count);
            }
        };
    });
    getJSONData(CART_BUY_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            //Obtengo mensaje de compra exitosa del json
            mensajeDeCompra = resultObj.data.msg;
        };
    });

    //Música
    document.body.innerHTML+=`<audio id="audio" src="" autoplay loop></audio>`;
    setTimeout(() => {
        hablar("Tomá música de ascensor");
    }, 6000);
    setTimeout(() => {
        document.getElementById("audio").src="audio/ascensor.mp3";
    }, 10000);
    setInterval(calcular, 100);

    //Pongo el mapa y el marcador
    if (lugarAEnviar.lat===undefined){
        mymap = L.map('mapid').setView([-33.054716, -55.689697,7.75], 7);
        marcador = L.marker([-33.054716, -55.689697]).addTo(mymap);
    }else{
        mymap = L.map('mapid').setView([(lugarAEnviar.lat), (lugarAEnviar.lng,7.75)], 13);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    //Esta funcion mueve el marcador al dar click
    function onMapClick(e) {
        marcador.setLatLng(e.latlng);
    }
    mymap.on('click', onMapClick);

    //Muestra el mensaje con meme al comprar
    document.getElementById("comprar").addEventListener("click", () => {
        hablar("Gracias por su compra señor barra aaa/"+usuario.nombre+"//y por ser el cliente número 1000000 tenés envíio grátis");
        alertMeme('img/compraEnvioGratis.gif', mensajeDeCompra, 'Señor/a '+usuario.nombre+" sos el cliente n°1 millon y tenes envio gratis :v");
    });
});

function añadir(img, articulo, moneda, precioCosa, cantidad){

    document.getElementById("cuerpoTabla").innerHTML+=`<tr>
        <td name="cosa"><img style="width: 1cm; height: 1cm;" src="`+ img +`">`+ articulo +`</td>
        <td><span name="precio" style="width: auto; color: black; background-color: white;">`+ parseInt(precioCosa) +`</span> <span name=monedas>`+ moneda +`</span></td>
        <td><input type="number" value="`+ parseInt(cantidad) +`" name="cantidad" min="0" style="width: 1.35cm;"></td>
        <td><span name="subtotal" style=width: 1.5cm;"color: black; background-color: white;">`+ (parseInt(precioCosa)*parseInt(cantidad)) +`</span> <span name=monedasS>`+ moneda +`</span></td>
        </tr>`; 
}
function calcular(){
    let preciosf=document.getElementsByName("precio");
    let cantidadesf=document.getElementsByName("cantidad");
    let subtotalesf=document.getElementsByName("subtotal");
    let monedasf=document.getElementsByName("monedas")
    let monedasS=document.getElementsByName("monedasS")
    let total=document.getElementById("total");
    let contador=0;
    let suma=0
    while(contador<subtotalesf.length){
        if (cantidadesf[contador].value < 0 || cantidadesf[contador].value===""){
            cantidadesf[contador].value=0;
        }else{
            cantidadesf[contador].value=parseInt(cantidadesf[contador].value);
        }
        if(document.getElementById("moneda").value==="URU" && monedasf[contador].innerHTML==="USD"){
            preciosf[contador].innerHTML=parseFloat(preciosf[contador].innerHTML)*40
        }else{
            if(document.getElementById("moneda").value==="USD" && monedasf[contador].innerHTML==="URU"){
                preciosf[contador].innerHTML=parseFloat(preciosf[contador].innerHTML)/40
            }
        }
        subtotalesf[contador].innerHTML=parseFloat(preciosf[contador].innerHTML) * parseFloat(cantidadesf[contador].value);
        monedasf[contador].innerHTML=document.getElementById("moneda").value
        monedasS[contador].innerHTML=document.getElementById("moneda").value
        suma+=parseFloat(subtotalesf[contador].innerHTML);
        total.innerHTML=suma +" "+ document.getElementById("moneda").value;
        contador+=1;
    }
}

function comprobarEnvio(){
    if (document.getElementById("envio").value==="no"){
        document.getElementById("envioSi").hidden=true;
    }else{
        document.getElementById("envioSi").hidden=false;
    }
}
function comprobarFormaDePago(){
    if (document.getElementById("formaDePago").value==="efectivo"){
        document.getElementById("tarjeta").hidden=true;
        document.getElementById("efectivo").hidden=false;
    }else{
        document.getElementById("efectivo").hidden=true;
        document.getElementById("tarjeta").hidden=false;
    }
}

function estoyAqui(){
    if(contadorUbicacion===0){
        navigator.geolocation.getCurrentPosition((miposicion)=> { 
            lugarAEnviar = {lat: miposicion.coords.latitude, lng: miposicion.coords.longitude}
        });
        contadorUbicacion=1
    }
    if (lugarAEnviar.lat!==undefined){
        mymap.setView([lugarAEnviar.lat, lugarAEnviar.lng,7.75], 13);
        marcador.setLatLng(lugarAEnviar);
    }
}