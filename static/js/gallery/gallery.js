import { createPublication } from "../admin/gallery/functions/create-publication.js";

const loadMoreBtn = document.querySelector(".load-more-btn");
const wrapperPublications = document.querySelector(".wrapper__publications");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const wrapperPublicationsRow = wrapperPublications.querySelector(".row");
const navGalleryLink = document.getElementById("nav-gallery-link");

let take = 10;
let skip = 10;

if(navGalleryLink) {
    document.getElementById("nav-gallery-link").classList.add("active");
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, null);
});

for(let i = 0; i < modalTriggers.length; i++) {
    modalTriggers[i].addEventListener("click", function (e) {
        openModalEvent(modalTriggers[i]);
    });
}


if(loadMoreBtn) {
    loadMoreBtn.addEventListener("click", async function () {
        const api = await fetch(`/gallery/load-more?take=${take}&skip=${skip}`);
        const response = await api.json();

        for(let i = 0; i < response.publications.length; i++) {
            const newItem = createPublication(response.publications[i].file_name, response.publications[i].description);

            newItem.addEventListener("click", function (e) {
                openModalEvent(newItem);
            });

            wrapperPublicationsRow.appendChild(newItem);
        }
        if(!response.loadMore) {
            loadMoreBtn.remove();
        }
        skip += 10;
    });
}

function openModalEvent(item) {
    const img = item.querySelector("img");
    const description = item.querySelector(".image-description");

    document.getElementById("modal-image-image").setAttribute("src", img.getAttribute("src"));
    document.getElementById("modal-image-description").innerHTML = description ? description.innerHTML : "";
}
