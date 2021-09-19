var contadorMostrarComentarios = 0
var calificacionAComentar = 0
let comentariosHechos=[]
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
        <a class="list-group-item list-group-item-action">
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
}

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `;

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showCommentsGallery(commentsObject){

    let htmlContentToAppend = "";

    for(comment of commentsObject){

        
        htmlContentToAppend = `
        <a class="list-group-item list-group-item-action">
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. PRODUCT_INFO_URL
document.addEventListener("DOMContentLoaded", function(e){
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

    document.getElementById("comprar").addEventListener("click", () => {
        Swal.fire({
            title: 'Comprado',
            text: 'Gracias por su compra señor/a '+usuario.nombre,
            imageUrl: 'img/comprado.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
    });

    document.getElementById("ocultarComentarios").addEventListener("click", () => {
        if (contadorMostrarComentarios===0) {
            document.getElementById("productCommentsGallery").hidden = true;
            document.getElementById("ocultarComentarios").innerHTML="Mostrar comentarios"
            contadorMostrarComentarios += 1;
        }else{
            document.getElementById("productCommentsGallery").hidden = false;
            document.getElementById("ocultarComentarios").innerHTML="Ocultar comentarios"
            contadorMostrarComentarios = 0;
        };
    });
    document.getElementById("nombreDeUsuario").innerHTML=usuario.nombre+":"
});