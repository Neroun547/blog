import { createPublication } from "../admin/gallery/functions/create-publication.js";

const loadMoreBtn = document.querySelector(".load-more-btn");
const wrapperPublications = document.querySelector(".wrapper__publications");
const modalTriggers = document.querySelectorAll(".modal-trigger");

let take = 10;
let skip = 10;

document.getElementById("nav-gallery-link").classList.add("active");

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, null);
});

for(let i = 0; i < modalTriggers.length; i++) {
    modalTriggers[i].addEventListener("click", function (e) {
        const img = modalTriggers[i].querySelector("img");
        const description = modalTriggers[i].querySelector(".image-description");

        document.getElementById("modal-image-image").setAttribute("src", img.getAttribute("src"));
        document.getElementById("modal-image-description").innerHTML = description.innerHTML;
    });
}


if(loadMoreBtn) {
    loadMoreBtn.addEventListener("click", async function () {
        const api = await fetch(`/gallery/load-more?take=${take}&skip=${skip}`);
        const response = await api.json();

        for(let i = 0; i < response.publications.length; i++) {
            const { wrapperPublicationsItem, span, imgSrc, wrapperPublicationItemFilter } = createPublication(wrapperPublications, "/uploaded-photo/" + response.publications[i].file_name, response.publications[i].id);


        }
        if(!response.loadMore) {
            loadMoreBtn.remove();
        }
        skip += 10;
    });
}
