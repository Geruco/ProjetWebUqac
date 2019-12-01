function afficherProduit(prod){
    let caseProduit = creerCase();
    caseProduit.setAttribute("id", prod.id);
    caseProduit.querySelector("img").src = "img/"+prod.id+".jpg";
    caseProduit.querySelector("h4").innerHTML = prod.nom;
    caseProduit.querySelector(".description").innerHTML = prod.categorie;
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
    acheter.setAttribute("class", "btn btn-info pull-right ml-auto");
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
    bdd.forEach(function(produit){
        if(produit.priorite == 1) {
            let caseProduit = afficherProduit(produit);
            caseProduit.addEventListener("click", function(e){
                // console.log(caseProduit.id);
                window.location.hash = "produit-"+caseProduit.id;
                console.log("changement de hash");
                e.preventDefault();
            })
            document.querySelector("#vedette").appendChild(caseProduit);
        }
    })
}