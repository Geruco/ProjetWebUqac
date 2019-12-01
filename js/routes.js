function goHome(){
    document.getElementById("content").innerHTML = "";
    setTimeout(function(){
        getHeader();
        getHome();
    }, 500);
    // getFooter();
}
function goProduit(){
    document.getElementById("content").innerHTML = "";
    setTimeout(function(){
        getHeader();
        getProduit();
        // getFooter();
        window.scrollTo(0,0);
    }, 500);
}