const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
  logueado()
  
});

function changeToHref(hrefx){
  location.href=hrefx
}

document.getElementById("nav").innerHTML +=`
<div class="dropdown">
  <button class="py-2 d-none d-md-inline-block usuario dropdown-toggle" type="button" id="usuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Usuario
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2" style="background-color:#343A40;">
    <button class="dropdown-item enlaceNormal" onclick="changeToHref('cart.html')">Ver mi carrito</button>
    <button class="dropdown-item enlaceNormal" onclick="changeToHref('my-profile.html')">Mi perfil</button>
    <button class="dropdown-item py-2 d-none d-md-inline-block" type="button" id="desconectarse" onmousedown="explotar()" onclick="desconectarse()" onmouseover="sadMoment(true)" onmouseleave="sadMoment(false)" style="color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;" >Cerrar sesión</button>
  </div>
</div>
`;