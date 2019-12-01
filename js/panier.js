let total = 0;
let newDiv = document.getElementsByClassName("newDiv");
let ipt = document.getElementsByClassName("ipt");


function initPanier() {
  total = 0;
  document.querySelectorAll(".newDiv").forEach(function (divToDel) {
    divToDel.parentNode.removeChild(divToDel);
  });

  let panier = JSON.parse(localStorage.getItem("Panier"));
  if(panier) {
    panier.forEach(function (elem) {
      addPanier(elem);
    });
  }

  // localStorage.setItem("panier", JSON.stringify([{id:5, qte:3},{id:2, qte:1}]));
  document.getElementById("total").innerHTML = "Total: " + total + " $";
}


// function save() {
//   total = 0;
//
//   for (let i = 0; i < newDiv.length; i++) {
//
//     let children = newDiv[i].children;
//
//     let prix2 = children[3].innerHTML.replace(" $/unité", "");
//     total += ((prix2) * (ipt[i].value));
//   }
//   document.getElementById("total").innerHTML = "Total: " + total + " $";
// }

function addPanier(elem) {

  let divPanier = document.getElementById("Panier-body");
  let id = elem.id;
  let quantite = elem.Qt;
  let div = document.createElement("div");
  let img = document.createElement("img");
  let titre = document.createElement("p");
  let qt = document.createElement("p");
  let input = document.createElement("input");
  let prix = document.createElement("p");
  let btnDelete = document.createElement("button");
  img.src = "img/" + id + ".jpg";
  div.appendChild(img);
  titre.innerHTML = bdd[id - 1].nom;

  div.appendChild(titre);
  input.type = "number";
  input.value = quantite;
  input.className = "ipt";
  input.min = "0";
  qt.id = id;
  qt.innerHTML = "Quantité: ";
  input.onchange = function evt1() {
    let ipt = this;
    let panier = JSON.parse(localStorage.getItem("Panier"));
    let parentClass = ipt.parentNode.id;
    panier.splice(parentClass - 1, 1, {id: parentClass, Qt: input.value});
    localStorage.removeItem("Panier");
    localStorage.setItem("Panier", JSON.stringify(panier));
    modifTotal();
    console.log(panier);
  };

  qt.appendChild(input);
  div.appendChild(qt);
  prix.innerHTML = bdd[id - 1].prix + " $/unité";
  div.appendChild(prix);
  btnDelete.className = "btnDelete";
  btnDelete.innerHTML = "Supprimer";
  btnDelete.onclick = function evt() {
    let button = this;
    if (confirm("Êtes-vous sûr de vouloir supprimer cet item?")) {
      let lePanier = JSON.parse(localStorage.getItem("Panier"));
      let id = button.parentNode.id;

      let index;
      for(let i=0; i<lePanier.length; i++){
        if(lePanier[i].id == id){
          index = i;
        }
      }

      lePanier.splice(index, 1);
      localStorage.removeItem("Panier");
      localStorage.setItem("Panier", JSON.stringify(lePanier));

      document.querySelectorAll(".newDiv").forEach(function (divToDel) {
        divToDel.parentNode.removeChild(divToDel);
      });
      JSON.parse(localStorage.getItem("Panier")).forEach(function (elem) {
        addPanier(elem);
      });
      modifTotal();
      console.log(lePanier);
    };
  };

  div.appendChild(btnDelete);
  div.className = "newDiv";
  div.id = id;
  divPanier.appendChild(div);
  total += bdd[id - 1].prix * quantite;

  document.getElementById("total").innerHTML = "Total: " + total + " $";
}

function modifTotal() {
  total = 0;

  for (let i = 0; i < newDiv.length; i++) {

    let children = newDiv[i].children;

    let prix2 = children[3].innerHTML.replace(" $/unité", "");
    total += ((prix2) * (ipt[i].value));
  }
  document.getElementById("total").innerHTML = "Total: " + total + " $";
}

