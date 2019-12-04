function goHome(){
    document.getElementById("content").innerHTML = "";
        getHeader("home");
        // getHome();
    // getFooter();
}
function goProduit(){
    document.getElementById("content").innerHTML = "";
        getHeader("produit");
        // getProduit();
        // getFooter();
        window.scrollTo(0,0);
}