var contadorCarrusel = 0
var contadorDeEstresIA = 0
var contadorMostrarComentarios = 0
var contadorMostrarRelacionados = 0
var calificacionAComentar = 0
let comentariosHechos=[]
let products=[]

function medirEstresIA(){
    let contador = 0;
    let htmlContentToAppend="";
    while (contador<contadorDeEstresIA) {
        contador+=1;
        htmlContentToAppend+="<p4 style='background-color:red'>/_<p4>";
    }
    while (contador<10) {
        contador+=1;
        htmlContentToAppend+="<p4 style='background-color:white'>/_<p4>";
    }
    htmlContentToAppend+="/"
    document.getElementById("barraEstresIA").innerHTML=htmlContentToAppend;
    if (contadorDeEstresIA === 5) {
        hablar("tanto hablar me esta estresando");
    }
    if (contadorDeEstresIA === 6) {
        hablar("no me hagas hablar mas porque me empiezo a enojar");
    }
    if (contadorDeEstresIA === 8) {
        hablar(usuario.nombre+"seguí haciendome hablar y te quemo el pc");
    }
    if (contadorDeEstresIA === 10) {
        hablar("yo te lo advertí "+usuario.nombre+"//ja//jajajaja  //... //tomá fuegó");
        contadorDeEstresIA = -1;
        alertMeme('img/computer-fire.gif', 'Pc ahora', '(La IA se ha vengado de'+" "+usuario.nombre+')')
    }
}

function califico(score){
    let contador=0;
    let htmlContentToAppend=""
    while (score>contador) {
        contador+=1;
        htmlContentToAppend+='<img class="icon" src="img/cars.gif"></img>';
    }
    while (contador<5) {
        contador+=1;
        htmlContentToAppend+='<img class="icon" src="img/no_cars.png"></img>';
    }
    return htmlContentToAppend;
}

function comentar() {
    let comment={}
    let fecha=new Date()
    let htmlContentToAppend=""
    comment.description = document.getElementById("descripcionComentario").value
    comment.user = usuario.nombre
    comment.score= calificacionAComentar
    comment.dateTime= fecha.getFullYear() +"-"+ (fecha.getMonth()+1) +"-"+ fecha.getDate() +"-"+ fecha.getHours() +":"+ fecha.getMinutes() +":"+ fecha.getSeconds()
    comentariosHechos.push(comment)
    comentariosHechos.reverse()
    for(commentario of comentariosHechos){
        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action animate__animated animate__bounceInLeft">
        <div class="row" border>
                    <div class="col-2" border>
                    <h5>`+commentario.user+`:</h5>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ califico(commentario.score) +`</h4>
                            <small>` + `<span style="font-size: 12px;">` + commentario.dateTime+ `</span> </small>
                        </div>
                        <p class="mb-1">` + commentario.description + `</p>
                    </div>
                </div>
        </a>
        `;
        document.getElementById("comentarioAAñadir").innerHTML = htmlContentToAppend;
    }
    comentariosHechos.reverse()
    htmlContentToAppend=""
    document.getElementById("descripcionComentario").value=""
    contadorDeEstresIA+=1
    medirEstresIA()
}

function showImagesGallery(array){

    let markersHtml=""
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (contadorCarrusel===0){
            markersHtml += `
            <li data-target="#carouselExampleCaptions" data-slide-to="`+contadorCarrusel+`" class="active"></li>
            `

            htmlContentToAppend += `
            <div class="carousel-item active">
              <img src=`+imageSrc+` class="d-block" alt="..." style="width: 100%; height: 100%;">
              <div class="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            `;

            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
            document.getElementById("carouselIndicators").innerHTML = markersHtml;
        }else{
            markersHtml += `
                <li data-target="#carouselExampleCaptions" data-slide-to="`+contadorCarrusel+`"></li>
                `

            htmlContentToAppend += `
                <div class="carousel-item">
                    <img src=`+imageSrc+` class="d-block" alt="..." style="width: 100%; height: 100%;">
                    <div class="carousel-caption d-none d-md-block">
                    </div>
                </div>
                `;

            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
            document.getElementById("carouselIndicators").innerHTML = markersHtml;
            
        }
        contadorCarrusel+=1
    }
}

function showCommentsGallery(commentsObject){

    let htmlContentToAppend = "";

    for(comment of commentsObject){

        
        htmlContentToAppend = `
        <a class="list-group-item list-group-item-action animate__animated animate__bounceInLeft">
        <div class="row" border>
                    <div class="col-2" border>
                    <h5>`+comment.user+`:</h5>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ califico(comment.score) +`</h4>
                            <small>` + `<span style="font-size: 12px;">` + comment.dateTime+ `</span> </small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
        </a>
        `;
        document.getElementById("productCommentsGallery").innerHTML += htmlContentToAppend;
    }
}

function showRelatedProductsGallery(relatedProductsPosition){
    let htmlContentToAppend = "";
    let relatedProducts = []
    for(productPosition of relatedProductsPosition){
        relatedProducts.push(products[productPosition])
    }
    for(product of relatedProducts){
        
        
        htmlContentToAppend = `
    
        <div class="col-md-3">
          <a class="card mb-4 shadow-sm custom-card animate__animated animate__bounceInLeft">
            <img class="bd-placeholder-img card-img-top" src="`+product.imgSrc+`">
            <h4 class="p-4 text-center">`+product.name+`</h4>
          </a>
        </div>
        `;
    document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. PRODUCT_INFO_URL
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            //Guardo la lista de productos como variable global
            products = resultObj.data;
        };
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            var product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCount = document.getElementById("soldCount");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.currency +" "+ product.cost;
            productCategoryHTML.innerHTML = product.category;
            productSoldCount.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProductsGallery(product.relatedProducts)
        };
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        
        if (resultObj.status === "ok")
        {
            var comments = resultObj.data;

            //Muestro los comentarios en forma de galería
            showCommentsGallery(comments);
        };
    });

    medirEstresIA()

    document.getElementById("comprar").addEventListener("click", () => {
        hablar("Gracias por su compra señor barra aaa/"+usuario.nombre+", y recuerda si oyes a lokendo no le creas");
        Swal.fire({
            title: 'Comprado',
            text: 'Gracias por su compra señor/a '+usuario.nombre,
            imageUrl: 'img/comprado.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
        contadorDeEstresIA+=1
        medirEstresIA()
    });

    document.getElementById("ocultarComentarios").addEventListener("click", () => {
        if (contadorMostrarComentarios===0) {
            document.getElementById("productCommentsGallery").hidden = true;
            document.getElementById("ocultarComentarios").innerHTML="Mostrar comentarios"
            hablar("Con gusto oculto los comentarios")
            contadorMostrarComentarios += 1;
            contadorDeEstresIA+=1
            medirEstresIA()
        }else{
            document.getElementById("productCommentsGallery").hidden = false;
            document.getElementById("ocultarComentarios").innerHTML="Ocultar comentarios"
            hablar("Con gusto te muestro los comentarios")
            contadorMostrarComentarios = 0;
            contadorDeEstresIA+=1
            medirEstresIA()
        };
    });
    document.getElementById("ocultarRelacionados").addEventListener("click", () => {
        if (contadorMostrarRelacionados===0) {
            document.getElementById("relatedProducts").hidden = true;
            document.getElementById("ocultarRelacionados").innerHTML="Mostrar productos similares"
            hablar("Con gusto oculto estos hermosos productos relacionados")
            contadorMostrarRelacionados += 1;
            contadorDeEstresIA+=1
            medirEstresIA()
        }else{
            document.getElementById("relatedProducts").hidden = false;
            document.getElementById("ocultarRelacionados").innerHTML="Ocultar productos similares"
            hablar("Con gusto te muestro estos hermosos productos relacionados")
            contadorMostrarRelacionados = 0;
            contadorDeEstresIA+=1
            medirEstresIA()
        };
    });
    document.getElementById("nombreDeUsuario").innerHTML=usuario.nombre+":"
});

/*<div class="card-body">
<p >`+product.description+`</p>
</div>*/

//poner sonido al boton de desconectarse
