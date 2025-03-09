export function createPublication(fileName, description) {
    const div = document.createElement("div");
    div.className = "col s12 m6 l3 modal-trigger";
    div.setAttribute("data-target", "modal-image");

    const card = document.createElement("div");
    card.className = "card pa-2";

    const cardImage = document.createElement("div");
    cardImage.className = "card-image";

    const img = document.createElement("img");
    img.src = `/uploaded-photo/${fileName}`;

    cardImage.appendChild(img);
    card.appendChild(cardImage);

    if (description) {
        const cardContent = document.createElement("div");
        cardContent.className = "card-content";

        const p = document.createElement("p");
        p.className = "image-description";
        p.textContent = description;

        cardContent.appendChild(p);
        card.appendChild(cardContent);
    }

    div.appendChild(card);
    return div;
}
