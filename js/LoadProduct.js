function initProduit(){
    function loadSuggestion(Numero,id){
        let Receveur;
        let Item;
        DEBUG && console.log("id : ",id);
        for(let i=0; i<bdd.length;i++){

            if(id == bdd[i].id){

                Item = bdd[i];
                DEBUG && console.log(Item);
            }
        }

        //Identifie pour quelle suggestion on fait la fonction
        switch (Numero) {
            case 0:
                Receveur=document.getElementById("Suggestion1"); break;
            case 1:
                Receveur=document.getElementById("Suggestion2"); break;
            case 2:
                Receveur=document.getElementById("Suggestion3"); break;
            default:
        }
        //Crée les champs de la carte de suggestion
        let SuggImg=document.createElement("img");
        SuggImg.src = "img/"+(Item.id).toString()+".jpg";
        SuggImg.classList="card-img-top ImageSuggestion";

        let SuggDiv=document.createElement("div");
        SuggDiv.classList="card-body";

        let SuggNom=document.createElement("h5");
        SuggNom.classList="card-title";
        SuggNom.innerText=Item.nom;

        let SuggPrix=document.createElement("p");
        SuggPrix.classList="card-text";
        SuggPrix.innerText=Item.prix+"$";

        let SuggLien=document.createElement("a");
        SuggLien.classList="btn btn-primary";
        SuggLien.innerText="Visiter la page";
        SuggLien.onclick=function(e){
            // goProduit(Item.id);
            window.location.hash = "produit-"+Item.id;
            DEBUG && console.log("changement de hash");
            e.preventDefault();
        }
        //Assemble la carte
        SuggDiv.appendChild(SuggNom);
        SuggDiv.appendChild(SuggPrix);
        SuggDiv.appendChild(SuggLien);

        Receveur.appendChild(SuggImg);
        Receveur.appendChild(SuggDiv);
    }





    //Lecture de l'URL pour obtenir l'id
    // LienSuivis=document.location.href;
    // ValeurID=LienSuivis.search(/\?Id=\d*/);
    // SousStr=LienSuivis.substr(ValeurID+4,LienSuivis.length-1);
    ProduitID = parseInt(location.hash.split("produit-")[1]);
    DEBUG && console.log("hash : ", ProduitID);
     // ProduitID=produitRecuperer;


    for(let i=0; i<bdd.length;i++){
        if(ProduitID == bdd[i].id){
            Produit = bdd[i];
        }
    }
    // Produit = bdd[ProduitID-1];
    DEBUG && console.log(Produit);
    // Produit=bdd[ProduitID-1];

    //Mise en place de la bonne image
    Img=document.createElement("img");
    Img.src = "img/"+Produit.id+".jpg";
    Img.className="Image";

    document.getElementById("Conteneurimage").appendChild(Img);

    //Convertir la date dans le json en format textuel (dd mois yy)
    let DatePreformat=Produit.date;
    let Mois;

    MoisPreformat=parseInt(DatePreformat.substr(DatePreformat.search("/")+1,2));
    switch (MoisPreformat) {
        case 1: Mois=" Janvier "; break;
        case 2: Mois=" Février ";break;
        case 3: Mois=" Mars ";break;
        case 4: Mois=" Avril ";break;
        case 5: Mois=" Mai ";break;
        case 6: Mois=" Juin ";break;
        case 7: Mois=" Juillet ";break;
        case 8: Mois=" Août ";break;
        case 9: Mois=" Septembre ";break;
        case 10: Mois=" Octobre ";break;
        case 11: Mois=" Novembre ";break;
        case 12: Mois=" Décembre ";break;
    }
    let DatePostFormat= DatePreformat.substr(0, DatePreformat.search("/")) + Mois +DatePreformat.substr(DatePreformat.search("/")+4,4);

    //Remplace les champs
    document.getElementById("Titre").innerText=Produit.nom;
    document.getElementById("AuteurEditeurDate").innerText=Produit.auteur+', '+Produit.editeur+', '+DatePostFormat;
    document.getElementById("Prix").innerText=Produit.prix+"$";
    document.getElementById("Resume").innerText=Produit.resume;


    //-------------------------------------------------------------
    //Ajoute trois produits aléatoires aux suggestions
    let IdSugg1, IdSugg2, IdSugg3;
    IdSugg1=Math.floor(Math.random() * (bdd.length - 0 + 1)) + 0;   //nombre entre 0 et 49
    IdSugg2=Math.floor(Math.random() * (bdd.length - 0 + 1)) + 0;
    IdSugg3=Math.floor(Math.random() * (bdd.length - 0 + 1)) + 0;

    //S'assure que les trois suggestion soient differentes entre elle et du produit
    while(IdSugg1===ProduitID-1){
        IdSugg1=Math.floor(Math.random() * (bdd.length - 0 + 1)) + 0;
    }
    while(IdSugg2===ProduitID-1||IdSugg2===IdSugg1){
        IdSugg2=Math.floor(Math.random() * (bdd.length - 0 + 1)) + 0;
    }
    while(IdSugg3===ProduitID-1||IdSugg3===IdSugg1 ||IdSugg3===IdSugg2){
        IdSugg3=Math.floor(Math.random() * (bdd.length - 0 + 1)) + 0;
    }


    loadSuggestion(0,IdSugg1);
    loadSuggestion(1,IdSugg2);
    loadSuggestion(2,IdSugg3);

    //------------------------------------------------------------------------------------------
    //Bouton d'ajout au panier
    document.getElementById("BoutonAchat").onclick=function(){
        //Load panier via le localstorage, recupere la valeur dans l'input
        let Panier=JSON.parse(localStorage.getItem("Panier"));
        let ProduitQt=parseInt(document.getElementById("QuantiteAchat").value);
        //Variables utilisées pour le fonctionnement du code
        let Trouve=false;
        let i;

        //Si le input ne contient pas une valeur valide, ne fait rien

        if(!ProduitQt){
            return;
        }
        //Si le panier est "défini" (donc qu'il y avait déjà un objet panier en storage)
        if (Panier){

            //Teste si l'element est déjà dans le panier (donc on ajoute des exemplaires)
            for (i=0;i<Panier.length;i++){
                if (Panier[i].id==ProduitID){
                    Trouve=true;
                    break;
                }
            }
            //Si l'element était déjà dans le panier (doit ajouter exemplaires)
            if(Trouve){
                //Si la valeur de quantite était invalide (ex: si on avait vider la valeur de l'input et appuyer sur le bouton)
                if (Panier[i].Qt == null){
                    DEBUG && console.log(Panier);
                    Panier[i].Qt = ProduitQt;   //Remplace la Qt par la valeur de l'input
                }
                else{   //Sinon, peut juste faire une addition
                    DEBUG && console.log(Panier);
                    Panier[i].Qt=Panier[i].Qt+ProduitQt;
                }

            }
            else{//L'element n'était pas présent, on ajoute donc un element au tableau
                Panier.push({id:parseInt(ProduitID),Qt:ProduitQt});
            }

        }
        else{ //Sinon, pas de panier existant. On doit en créer un
            DEBUG && console.log(Panier);
            Panier=[{id:parseInt(ProduitID),Qt:ProduitQt}];
        }

        //Replace le nouveau panier dans le cache
        DEBUG && console.log(Panier);
        localStorage.setItem("Panier",JSON.stringify(Panier));
        DEBUG && console.log(localStorage);
    }

}


// window.onload=initProduit();

