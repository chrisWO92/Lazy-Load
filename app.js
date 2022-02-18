"use strict";

const noHayMasPublis = document.createElement("DIV");
noHayMasPublis.classList.add("nohaymaspublis");
noHayMasPublis.textContent = "No hay más publicaciones";

const creatorPub = (namePub, contentPub) => {
    const publication = document.createElement("DIV");
    const name = document.createElement("H2");
    const content = document.createElement("P");
    const comments = document.createElement("DIV");
    const comment = document.createElement("INPUT");
    const submit = document.createElement("INPUT");

    submit.type = "submit";

    comments.appendChild(comment);
    comments.appendChild(submit);

    publication.appendChild(name);
    publication.appendChild(content);
    publication.appendChild(comments);

    publication.classList.add("publication");
    name.classList.add("name");
    comments.classList.add("comments");
    comment.classList.add("comment");
    submit.classList.add("submit");

    name.textContent = namePub;
    content.textContent = contentPub;
    
    return publication;
}

const verifyVisibility = (entry) => {
    if (entry[0].isIntersecting) cargarPublis(3);
}

const observer = new IntersectionObserver(verifyVisibility);

let contador = 0;

const cargarPublis = async (num) => {
    let peticion = await fetch("informacion.txt");
    let resultadoJSON = await peticion.json();
    let content = resultadoJSON.content;

    for (let i = 0; i < num; i++) {
        if (contador < content.length) {
            let publicacion = creatorPub(content[contador].nombre, content[contador].contenido);
            document.body.appendChild(publicacion);
            if (i == num - 1){
                observer.observe(publicacion);
            }
            contador ++;
        }else if (contador == content.length){
            document.body.appendChild(noHayMasPublis);
            break;
        }
    }
   
}

cargarPublis(4);
