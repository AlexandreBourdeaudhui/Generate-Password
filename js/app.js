/* Amélioration possible :
 - quand on tape un chiffre en dessous de 6(minimum demandé)
    il passe a 6 mais il fait quand même 
    la génération au nombre inférieur (par ex 5). 
 
- si 2 fois le même caractère, generate à nouveau ?

- créer une fonction isChecked ? 
    si true > on ajoute l'élément (par exemple : passInteger) à l'objet de base (pass = abcdefg..)
*/

var passString = "abcdefghikklmnopqrstuvwxyz",
    passStringUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    passInteger = "0123456789",
    passSpecialCharacters = "!@#$%^&*()-+<>",
    pass = "";

var btnElt = document.getElementById("btnElt"),
    copyBtn = document.getElementById("copyBtn"),
    checkBtn = document.getElementById("checkAll");

var form = document.querySelector("form"),
    result = document.getElementById("result"),
    nb = document.getElementById("nombreChar");


//================================
// $ On génère le pwd
//================================

function generatePassword() {
    'use strict';
    var nbResult = form.elements.nombreChar.value,
        passLength = pass.length,
        resultG = "",
        i,
        nbI;

    if (nbResult < 6) {
        nb.value = 6;
    }
    console.log("Taille du tableau à être traité : " + passLength); //debug
    console.log("Taille du mot de pass généré : " + nbResult); //debug 

    for (i = 0; i < nbResult; i++) {
        nbI = Math.round(Math.random() * passLength);
        resultG += pass.charAt(nbI); // retourne la lettre / le char sorti par nbI
        console.log(resultG); //débug
    }
    result.innerHTML = "";
    result.value = resultG;
}

//================================
// $ Bouton pour générer le pwd
//================================

btnElt.addEventListener("click", function (e) {
    'use strict';
    if (form.elements.majElt.checked) {
        pass = passString + passStringUpper;
    } else if (form.elements.nElt.checked) {
        pass = passString + passInteger;
    } else if (form.elements.charElt.checked) {
        pass = passString + passSpecialCharacters;
    } else {
        pass = passString; // Si rien n'est coché, ne générer que les minuscule
    }

    if (form.elements.majElt.checked && form.elements.nElt.checked) {
        pass = passInteger + passString + passStringUpper;
    } else if (form.elements.majElt.checked && form.elements.charElt.checked) {
        pass = passString + passSpecialCharacters + passStringUpper;
    } else if (form.elements.nElt.checked && form.elements.charElt.checked) {
        pass = passString + passInteger + passSpecialCharacters;
    }

    if (form.elements.majElt.checked && form.elements.nElt.checked && form.elements.charElt.checked) {
        pass = passString + passInteger + passStringUpper + passSpecialCharacters;
    }

    generatePassword(pass);
    e.preventDefault();
});

// Copy generate password
copyBtn.addEventListener("click", function (e) {
    var textCopy = result;
    textCopy.select();
    document.execCommand('copy');
    e.preventDefault();
});

// Select all
function checkAll(status) {
    var checkBox = document.querySelectorAll("input[type='checkbox']");

    console.log(checkBox); // débug 
    for (i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = status;
        console.log(checkBox[i]); // débug 
    }
}

checkBtn.addEventListener("click", function (e) {
    'use strict';
    checkAll(true);
    e.preventDefault();
});