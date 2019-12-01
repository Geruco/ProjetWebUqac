window.addEventListener("load", function(){

    // window.history.pushState("object or string", "Title", "/new-url");
    getHash();

    function getHash(){
        let hash = location.hash;
        if(hash.includes("produit-")){
            let id = hash.split("produit-")[1];
            // console.log("id : ", id);
            goProduit();
        }
        else{
            goHome();
            // console.log("Go Home");
        }
    }
    window.addEventListener("hashchange", function(){
        getHash();
    });

})