let lugarAEnviar = {};
let mymap;
let contadorUbicacion=0;
let marcador;
let mensajeDeCompra="";
let articulos=[];
let contadorMeramenteEstetico=0;
let contadorCompraExitosa=0
let contadorSuntuoso=1
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("titulo").innerHTML="Carrito de " + usuario.nombre;
    if (localStorage.usuario!==undefined) {
        usuario=JSON.parse(localStorage.getItem("usuario"));
    } else {
        usuario=JSON.parse(sessionStorage.getItem("usuario"));
    }

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            articulos = resultObj.data.articles;
            mostrarCarrito(articulos);
            setInterval(comprobarNoArticulos, 100);
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
    setTimeout(() => {
        hablar("Tomá música de ascensor");
    }, 6000);
    setTimeout(() => {
        document.getElementById("audio").src="audio/ascensor.mp3";
    }, 10000);
    setInterval(calcular, 100);
    setInterval(comprobarFormaDePago, 100);

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
    document.getElementById("cartForm").addEventListener("submit", () => {
        return false
    });

    document.getElementById("metodoDePago").addEventListener("click", () => {
        if (contadorMeramenteEstetico===0) {
            document.getElementById("metodoDePago").innerHTML="Efectivo";
            document.getElementById("metodoPagoInvalido").hidden=true;
            document.getElementById("abitab").setAttribute("checked", 1)
            document.getElementById("metodoDePago").className="btn btn-success";
            contadorMeramenteEstetico=1;
        }
    });

    document.addEventListener("click", ()=>{
        if (usuario.contadorCompraExitosa===1) {
            hablar("Gracias por su compra señor barra aaa/"+usuario.nombre+"//y por ser el cliente número 1000000 no tenés envíio grátis");
            alertMeme('img/compraEnvioGratis.gif', mensajeDeCompra, 'Señor/a '+usuario.nombre+" sos el cliente n°1 millon y no tenes envío gratis :v");
            usuario.contadorCompraExitosa=0
            if (localStorage.usuario!==undefined) {
                localStorage.setItem("usuario", JSON.stringify(usuario));
            } else {
                sessionStorage.setItem("usuario", JSON.stringify(usuario));
            }

        }
    });

    document.getElementById("tel").value=usuario.telefono;
    document.getElementById("correo").value=usuario.email;
});

function mostrarCarrito(articulos){
    let i=0
    let htmlContentToAppend=""
    //Añado la lista al carrito
    if (articulos.length>0){
        for (let articulo of articulos){
            htmlContentToAppend+=`<tr class"row container">
            <td class"col" name="cosa"><img style="width: 1cm; height: 1cm;" src="`+ articulo.src +`">`+ articulo.name +`</td>
            <td class"col"><span name="precio" style="width: auto; color: black; background-color: white;">`+ parseFloat(articulo.unitCost) +`</span> <span name=monedas>`+ articulo.currency +`</span></td>
            <td class"col"><input type="number" value="`+ parseInt(articulo.count) +`" name="cantidad" min="0" style="width: 1.35cm;"></td>
            <td class"col"><span name="subtotal" style=width: 1.5cm;"color: black; background-color: white;">`+ (parseFloat(articulo.unitCost)*parseInt(articulo.count)) +`</span> <span name=monedasS>`+ articulo.currency +`</span></td>
            <td class"col"><button onclick="eliminar(${i})" class="btn-danger">Eliminar</button></td>
            </tr>`;
            document.getElementById("cuerpoTabla").innerHTML=htmlContentToAppend;
            i+=1;
        }
    }else{
        document.getElementById("cuerpoTabla").innerHTML="";
    }
}

function eliminar(i){
    let indice=0;
    for (let articulo of articulos) {
        articulo.count=document.getElementsByName("cantidad")[indice].value;
        articulo.unitCost=parseFloat(document.getElementsByName("precio")[indice].innerHTML);
        articulo.currency=parseFloat(document.getElementsByName("monedas")[indice].innerHTML);
        indice+=1;
    }
    articulos.splice(i,1);
    mostrarCarrito(articulos);
}

function calcular(){
    let total=document.getElementById("total");
    let costoEnvio=document.getElementById("costoEnvio");
    let costoFinal=document.getElementById("costoFinal");
    let totalEnvio=document.getElementById("totalEnvio");
    if (articulos.length>0){
    let preciosf=document.getElementsByName("precio");
    let cantidadesf=document.getElementsByName("cantidad");
    let subtotalesf=document.getElementsByName("subtotal");
    let monedasf=document.getElementsByName("monedas");
    let monedasS=document.getElementsByName("monedasS");
    let contador=0;
    let suma=0;
    while(contador<subtotalesf.length){
        if (cantidadesf[contador].value < 1 || cantidadesf[contador].value===""){
            cantidadesf[contador].value=1;
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
        monedasf[contador].innerHTML=document.getElementById("moneda").value;
        monedasS[contador].innerHTML=document.getElementById("moneda").value;
        suma+=parseFloat(subtotalesf[contador].innerHTML);
        total.innerHTML=suma +" "+ document.getElementById("moneda").value;
        totalEnvio.innerHTML=total.innerHTML
        contador+=1;
    }
    }else{
        total.innerHTML=0 +" "+ document.getElementById("moneda").value;
        totalEnvio.innerHTML=total.innerHTML
    }
    for(let metodo of document.getElementsByName("metodoEnvio")){
        if (metodo.checked) {
            costoEnvio.innerHTML=(parseFloat(total.innerHTML)/100) * parseFloat(metodo.value) +" "+ document.getElementById("moneda").value;
            costoFinal.innerHTML=parseFloat(totalEnvio.innerHTML) + parseFloat(costoEnvio.innerHTML) +" "+ document.getElementById("moneda").value;
        }
    }
}

function comprobarEnvio(){
    if (document.getElementById("envio").value==="no"){
        document.getElementById("envioSi").hidden=true;
        document.getElementById("calle").removeAttribute("required");
        document.getElementById("numero").removeAttribute("required"); 
        document.getElementById("esquina").removeAttribute("required"); 
    }else{
        document.getElementById("envioSi").hidden=false;
        document.getElementById("calle").setAttribute("required", 1);
        document.getElementById("numero").setAttribute("required", 1);
        document.getElementById("esquina").setAttribute("required", 1);
    }
}

function comprobarFormaDePago(){
    if (document.getElementById("formaDePago").value==="efectivo"){
        document.getElementById("tarjeta").hidden=true;
        document.getElementById("nroTarjeta").removeAttribute("required", 1);
        document.getElementById("codigoSeguridad").removeAttribute("required", 1);
        document.getElementById("vencimiento").removeAttribute("required", 1);
        document.getElementById("efectivo").hidden=false;
        document.getElementById("transferenciaBancaria").hidden=true;
        document.getElementById("nroCuenta").removeAttribute("required", 1);
        if (document.getElementById("abitab").checked || document.getElementById("redpagos").checked) {
            document.getElementById("metodoDePago").className="btn btn-success";
            document.getElementById("metodoDePago").innerHTML="Efectivo";
        }
    }else{
        if (document.getElementById("formaDePago").value==="tarjeta"){
            document.getElementById("tarjeta").hidden=false;
            document.getElementById("nroTarjeta").setAttribute("required", 1);
            document.getElementById("codigoSeguridad").setAttribute("required", 1);
            document.getElementById("vencimiento").setAttribute("required", 1);
            document.getElementById("efectivo").hidden=true;
            document.getElementById("transferenciaBancaria").hidden=true;
            document.getElementById("nroCuenta").removeAttribute("required", 1);
            document.getElementById("metodoDePago").innerHTML="Tarjeta de credito";
            if (document.getElementById("nroTarjeta").value==="" || document.getElementById("codigoSeguridad").value==="" || document.getElementById("vencimiento").value==="") {
                document.getElementById("metodoDePago").className="btn btn-danger";
            }else{
                document.getElementById("metodoDePago").className="btn btn-success";
            }
        }else{
            if (document.getElementById("formaDePago").value==="transferenciaBancaria"){
                document.getElementById("tarjeta").hidden=true;
                document.getElementById("nroTarjeta").removeAttribute("required", 1);
                document.getElementById("codigoSeguridad").removeAttribute("required", 1);
                document.getElementById("vencimiento").removeAttribute("required", 1);
                document.getElementById("efectivo").hidden=true;
                document.getElementById("transferenciaBancaria").hidden=false;
                document.getElementById("nroCuenta").setAttribute("required", 1);
                document.getElementById("metodoDePago").innerHTML="Transferencia bancaria";
                if (document.getElementById("nroCuenta").value==="") {
                    document.getElementById("metodoDePago").className="btn btn-danger";
                }else{
                    document.getElementById("metodoDePago").className="btn btn-success";
                }
            }
        }
    }
}

function estoyAqui(){
    if(contadorUbicacion===0){
        navigator.geolocation.getCurrentPosition((miposicion)=> { 
            lugarAEnviar = {lat: miposicion.coords.latitude, lng: miposicion.coords.longitude}
        });
        contadorUbicacion=1;
    }
    if (lugarAEnviar.lat!==undefined){
        mymap.setView([lugarAEnviar.lat, lugarAEnviar.lng,7.75], 13);
        marcador.setLatLng(lugarAEnviar);
    }
}

function compraExitosa(){
    if (articulos.length===0) {
        return false
    }
    usuario.contadorCompraExitosa=1
    if (localStorage.usuario!==undefined) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
}

function comprobarNoArticulos(){
    if (articulos.length===0) {
        document.getElementById("cartForm").hidden=true;
        if (contadorSuntuoso===1) {
            hablar("señor barra aaa/ "+usuario.nombre+" Corré a llenár el carrito así sós el cliente número 1000000");
            alertMeme('img/carroDeComprasDS.gif', "Corré a llenar el carrito", 'Señor/a '+usuario.nombre+" no sos el cliente n°1 millon porque tenes el carro vacio :v");
            contadorSuntuoso=0;
        }
    }else{
        document.getElementById("cartForm").hidden=false;
    }
}

//falta el selector de canciones en el nav en lo posible.