function getHeader() {
    $.ajax({
        url: "header.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#header").innerHTML = data;
            // console.log(data);
        }
    });
    $.ajax({
        url: "panier.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#content").innerHTML = data;
            // console.log(data);
            setTimeout(function() {
                document.querySelector("#showPanier").addEventListener("click", function () {
                    initPanier();
                });
            },500);
        }
    });
}

function getHome(){
    // console.log("home function");
    $.ajax({
        url: "accueil.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#content").innerHTML += data;
            // console.log(data);
            toutProduits();
            enVedette();
        }
    });
}

function getProduit(){
    $.ajax({
        url: "produit.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#content").innerHTML += data;
            // console.log(produit);
            initProduit()
        }
    });
}
function getFooter(){
    $.ajax({
        url: "produit.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#content").innerHTML += data;
            // console.log(data);
        }
    });
}