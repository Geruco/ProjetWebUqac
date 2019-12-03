function afficherProduit(prod){
    let caseProduit = creerCase();
    caseProduit.setAttribute("id", prod.id);
    caseProduit.querySelector("img").src = "img/"+prod.id+".jpg";
    caseProduit.querySelector("h4").innerHTML = prod.nom;
    caseProduit.querySelector(".description").innerHTML = getCategorie(prod.categorie);
    caseProduit.querySelector(".price").innerHTML = prod.prix;

    return caseProduit;
}

function creerCase(){
    let caseProduit = document.createElement("div");
    caseProduit.setAttribute("class", "block col-3 p-0 m-3 caseProduit");

    let produit = document.createElement("div");
    produit.setAttribute("class", "product");
    caseProduit.appendChild(produit);
    let img = document.createElement("img");
    produit.setAttribute("src", "");
    produit.appendChild(img);

    let info = document.createElement("div");
    caseProduit.appendChild(info);
    let titre = document.createElement("h4");
    info.appendChild(titre);
    let description = document.createElement("span");
    description.setAttribute("class", "description");
    info.appendChild(description);

    let details = document.createElement("div");
    details.setAttribute("class", "details d-flex align-items-center");
    caseProduit.appendChild(details);
    let prix = document.createElement("span");
    prix.setAttribute("class", "price");
    details.appendChild(prix);
    let acheter = document.createElement("a");
    acheter.setAttribute("class", "btn btn-buy pull-right ml-auto");
    acheter.innerHTML = "<i class=\"icon-shopping-cart\"></i> Acheter";
    details.appendChild(acheter);

    return caseProduit;
}

function toutProduits(){
    bdd.forEach(function(produit){
        let caseProduit = afficherProduit(produit);
        caseProduit.addEventListener("click", function(e){
            // console.log(this.id);
            window.location.hash = "produit-"+caseProduit.id;
            console.log("changement de hash");
            e.preventDefault();
        })
        document.querySelector("#lesProduits").appendChild(caseProduit);
    })
}

function enVedette(){
    let nbProd = 0;
    bdd.forEach(function(produit){
        if(produit.priorite == 1) {

            console.log("modulo : "+nbProd+" / 3 =", nbProd%3);
            if(nbProd%3 == 0 || nbProd == 0){
                let newSlide = document.createElement("div");
                newSlide.setAttribute("class", "carousel-item");
                let row = document.createElement("div");
                row.setAttribute("class", "row");
                newSlide.appendChild(row);

                // console.log("carousel-inner : ", document.querySelector(".carousel-inner"));
                document.querySelector(".carousel-inner").appendChild(newSlide);
                if(document.querySelectorAll(".carousel-item").length === 1){
                    newSlide.classList.add("active");
                }
            }
            let caseProduit = afficherProduit(produit);
            caseProduit.addEventListener("click", function(e){
                // console.log(caseProduit.id);
                window.location.hash = "produit-"+caseProduit.id;
                console.log("changement de hash");
                e.preventDefault();
            })
            console.log("Trunc : ", Math.trunc(nbProd/3))
            document.querySelectorAll(".carousel-item")[Math.trunc(nbProd/3)].querySelector(".row").appendChild(caseProduit);
            nbProd ++;
        }
    })
    startCarousel();
}

function startCarousel() {

    // manual carousel controls
    $('.next').click(function(){ $('.carousel').carousel('next');return false; });
    $('.prev').click(function(){ $('.carousel').carousel('prev');return false; });

}

function getCategorie(categorie){
    switch (categorie) {
        case 0: return "Mathématique";
        case 1: return "Philosophie";
        case 2: return "SVT";
        case 3: return "Informatique";
        case 4: return "Langue";
        case 5: return "Littérature";
        case 6: return "Religon";
        default : return false;
    }
}

function produitFiltrer(categorie){
    document.querySelector("#lesProduits").innerHTML = "";
    bdd.forEach(function(produit){
        if(produit.categorie == categorie) {
            let caseProduit = afficherProduit(produit);
            caseProduit.addEventListener("click", function (e) {
                // console.log(this.id);
                window.location.hash = "produit-" + caseProduit.id;
                console.log("changement de hash");
                e.preventDefault();
            })
            document.querySelector("#lesProduits").appendChild(caseProduit);
        }
    })
}