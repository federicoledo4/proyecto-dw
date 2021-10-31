const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
document.getElementsByTagName("head").innerHTML+='<meta name="viewport" content="width=device-width, initial-scale=1.0"/>'

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


/*document.getElementById("nav").innerHTML +=`
<div class="nav-item dropdown">
  <button class="py-2 d-md-inline-block usuario nav-link dropdown-toggle" type="button" id="usuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Usuario
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2" style="background-color:#343A40;">
    <button class="dropdown-item enlaceNormal" onclick="changeToHref('cart.html')">Ver mi carrito</button>
    <button class="dropdown-item enlaceNormal" onclick="changeToHref('my-profile.html')">Mi perfil</button>
    <button class="dropdown-item py-2 d-md-inline-block" type="button" id="desconectarse" onmousedown="explotar()" onclick="desconectarse()" onmouseover="sadMoment(true)" onmouseleave="sadMoment(false)" style="color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;" >Cerrar sesión</button>
  </div>
</div>
`;*/
document.getElementById("nav").innerHTML+=`<nav class="d-flex flex-column flex-md-row justify-content-between site-header sticky-top py-1 bg-dark navbar navbar-expand-lg navbar-light bg-light">
<div class="container">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav2" aria-controls="nav2" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="justify-content-between collapse navbar-collapse" id="nav2">
    <a class="d-md-inline-block nav-link" href="index.html">Inicio</a>
    <a class="d-md-inline-block nav-link" href="categories.html">Categorías</a>
    <a class="d-md-inline-block nav-link" style="color: white;" href="products.html">Productos</a>
    <a class="d-md-inline-block nav-link" href="sell.html">Vender</a>
    <div class="nav-item dropdown">
      <button class="py-2 d-md-inline-block usuario nav-link dropdown-toggle botonChico" type="button" id="usuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img id="imageResult" src="" alt="" class="img-fluid rounded shadow-sm mx-auto userPicture"></img>Usuario
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2" style="background-color:#343A40;">
        <button class="dropdown-item enlaceNormal" onclick="changeToHref('cart.html')">Ver mi carrito</button>
        <button class="dropdown-item enlaceNormal" onclick="changeToHref('my-profile.html')">Mi perfil</button>
        <button class="dropdown-item py-2 d-md-inline-block" type="button" id="desconectarse" onmousedown="explotar()" onclick="desconectarse()" onmouseover="sadMoment(true)" onmouseleave="sadMoment(false)" style="color: white; background-color: rgba(0, 0, 0, 0); background-image: url('img/desconectar.jpg'); border-color: rgb(255, 0, 0); background-size: cover;" >Cerrar sesión</button>
      </div>
    </div>
  </div>
</div>
</nav>`;
