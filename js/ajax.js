function getHeader(route) {
    $.ajax({
        url: "header.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#header").innerHTML = data;
            // console.log(data);
            $.ajax({
                url: "panier.html",
                type: 'GET',
                success: function (data) {
                    document.querySelector("#content").innerHTML = data;
                    // console.log(data);
                    document.querySelector("#showPanier").addEventListener("click", function () {
                        initPanier();
                    });
                    loadPage(route);
                }
            });
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
            document.querySelectorAll(".filtre").forEach(function(lien){
                lien.addEventListener("click", function (e) {
                    console.log("clicked : ", this.id);
                    e.preventDefault();
                    produitFiltrer(this.id);
                });
            });
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
        url: "footer.html",
        type: 'GET',
        success: function (data) {
            document.querySelector("#content").innerHTML += data;
            // console.log(data);
        }
    });
}

function loadPage(route){
    switch (route) {
        case "produit":getProduit();
            break;
        default: getHome();
            break;
    }
}