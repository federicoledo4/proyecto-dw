const ORDER_ASC_BY_NAME = "AZ";
const ORDER_BY_PROD_COST = "Cost.";
const ORDER_BY_PROD_SOLD = "SoldCount."
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var productName = undefined;
//Contadores para la estética de las listas vacias
let contadorEstetico = -2
//Fin de contadores estéticos

//Función que ordena listas de productos
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });
        
    }else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount){ return -1; }
            if ( aSoldCount < bSoldCount){ return 1; }
            return 0;
        });
    }

    return result;
}

//Función que filtra la lista de productos que está en el json y luego la muestra
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))&&
            ((productName == undefined) || (productName != undefined && product.name.toLowerCase().includes(productName)))){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small>` + `<span style="font-size: 30px;">`+ "<strong>" + product.currency+ " " + product.cost + "</strong>"+ "<br>" +`</span>` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }


    //Pura estética para cuando se muestra una lista vacia
    let listaEstetica1 = ['img/meme.gif', 'img/no_result.gif']
    let listaEstetica2 = ['img/pepe.gif', 'img/pepe1.gif']
    let listaEstetica3 = ['img/pepe2.gif', 'img/windows95.gif']
    let listaDeListasEsteticas = [listaEstetica1, listaEstetica2, listaEstetica3]
    if (contadorEstetico===3) {
        contadorEstetico=-2
    }
    if (htmlContentToAppend === "" && contadorEstetico < 3 && contadorEstetico >= 0) {
        document.getElementById("cat-list-container").innerHTML+=`<p style='font-size: 2cm; background-color:red;'><strong>No hay resultados</strong><img style='width: 4cm; height: 4cm;' src=` + (listaDeListasEsteticas[contadorEstetico])[0] + `></p><img style='width:20cm; height:4cm;' src=` + (listaDeListasEsteticas[contadorEstetico])[1] + `>`
        contadorEstetico+=1
    }
    if (htmlContentToAppend === "" && contadorEstetico <0 ) {
        document.getElementById("cat-list-container").innerHTML +=`<p style='font-size: 2cm; background-color:red;'><strong>No hay resultados</strong></p>`
        contadorEstetico+=1
    }
    
    if (contadorEstetico===3) {
        Swal.fire({
            title: 'Desarrolladores ahora',
            text: '(Federico)',
            imageUrl: 'img/pepe4.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    }
    //Fin de la estética de la lista vacia
}

//Función que ordena y muestra listas de productos
let times_Pressed = 0
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    //Ordena la lista de productos
    currentProductsArray= sortProducts(currentSortCriteria, currentProductsArray);

    
    
        if (times_Pressed === 0) {
            times_Pressed=1
        }else{
            currentProductsArray.reverse()
            times_Pressed=0
        }
    //Muestra la lista de productos filtrada anteriormente ordenada
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Establece los eventos para las etiquetas html que los necesiten y obtiene los datos del json
document.addEventListener("DOMContentLoaded", function(e){

    //Toma los datos del json y los pone en un objeto
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    //añade el evento que necesita boton de ordenar alfabeticamente
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
        ascDsc(true, 'sortAsc');
        ascDsc(false, 'sortByCost');
        ascDsc(false, 'sortByProdSold');
    });

    //añade el evento que necesita boton de ordenar por costo
    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COST);
        ascDsc(true, 'sortByCost');
        ascDsc(false, 'sortAsc');
        ascDsc(false, 'sortByProdSold');
    });

    //añade el evento que necesita boton de ordenar por relevancia
    document.getElementById("sortByProdSold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
        ascDsc(true, 'sortByProdSold');
        ascDsc(false, 'sortAsc');
        ascDsc(false, 'sortByCost');
    });

    //añade el evento que necesita boton de limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        document.getElementById("search").value = "";

        minPrice = undefined;
        maxPrice = undefined;
        productName = undefined;

        showProductsList();
    });

    //añade el evento que necesita boton de filtrar ya sea por precio o por nombre
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de los productos
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;
        productName = document.getElementById("search").value.toLowerCase();

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });

    document.getElementById("search").addEventListener("keyup", function(){
        productName = document.getElementById("search").value.toLowerCase();
        showProductsList();
    });
});
//Fin de las asignaciones de eventos


//detalle estético de las etiquetas que ordenan
function ascDsc(booleano, id){
    if (booleano) {
        if (times_Pressed === 1) {
            document.getElementById(id).style = "color: rgb(0, 0, 0); background-image:url('img/flecha_dsc.jpg'); border-color: rgb(255, 0, 0); background-size: cover; background-position: center;";
        }else{
      document.getElementById(id).style = "color: rgb(0, 0, 0); background-image: url('img/flecha_asc.jpg'); border-color: rgb(255, 0, 0); background-size: cover;"
        }
    }else{
        document.getElementById(id).style=""
    }
}
//fin del detalle estético
