"use strict";

const getInfo = async () => {
    let peticion = await fetch("informacion.txt");
    let resultado = await peticion.json();
    return resultado;
}

let res = getInfo().then(res => {return res.content});
console.log(res);

//console.log(getInfo().then(res => res.content[0]));