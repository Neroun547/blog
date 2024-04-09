import { createModalForGalleryPhoto } from "./functions/create-modal-for-gallery-photo.js";
import { createPublication } from "./functions/create-publication.js";

const wrapperPublicationsItems = document.querySelectorAll(".wrapper__publications-item");
const wrapperPublicationsItemSpan = document.querySelectorAll(".wrapper__publications-item-about-span");
const wrapperContent = document.querySelector(".wrapper__content");
const loadMoreBtn = document.querySelector(".load-more-btn");
const wrapperPublications = document.querySelector(".wrapper__publications");
const wrapperFilter = document.querySelector(".wrapper__filter");

let modalActive = false;

let take = 10;
let skip = 10;

for(let i = 0; i < wrapperPublicationsItems.length; i++) {
    wrapperPublicationsItems[i].addEventListener("mousemove", function () {

        if(!modalActive) {
            wrapperPublicationsItems[i].querySelector(".wrapper__publications-item-about-span").style.display = "block";
            wrapperPublicationsItems[i].querySelector(".wrapper__publication-item-filter").style.display = "block";
        }
    });
    wrapperPublicationsItems[i].addEventListener("mouseleave", function () {
        wrapperPublicationsItems[i].querySelector(".wrapper__publications-item-about-span").style.display = "none";
        wrapperPublicationsItems[i].querySelector(".wrapper__publication-item-filter").style.display = "none";
    });
}

window.addEventListener("click", function (e) {
    console.log(e.target.classList)
    for(let i = 0; i < e.target.classList.length; i++) {
        console.log(e.target.classList[i])

        if(e.target.classList[i] === "delete-publication-btn" || e.target.classList[i] === "wrapper__modal-photo-gallery") {
            return;
        }
    }
    if(modalActive) {
        document.querySelector(".wrapper__modal-photo-gallery").remove();
        wrapperFilter.style.zIndex = "-1";
        wrapperFilter.style.backgroundColor = "transparent";
        modalActive = false;
        hideAllWrapperItemFilters();
        e.stopPropagation();
    }
}, true);

for(let i = 0; i < wrapperPublicationsItemSpan.length; i++) {
    wrapperPublicationsItems[i].addEventListener("click", async function () {

        if(!modalActive) {
            const id = wrapperPublicationsItemSpan[i].getAttribute("id");

            const api = await fetch("/gallery/" + id);
            const response = await api.json();
            const imgSrc = "/uploaded-photo/" + response.file_name;

            modalActive = true;

            createModalForGalleryPhoto(wrapperContent, true, imgSrc, response.description, response.date, response.id);

            wrapperFilter.style.zIndex = "1";
            wrapperFilter.style.backgroundColor = "rgba(0, 0, 0, 0.53)";

            window.scrollTo(0, 0);

            wrapperPublicationsItems[i].querySelector(".wrapper__publications-item-about-span").style.display = "none";
        }
    });
}

loadMoreBtn.addEventListener("click", async function () {
    const api = await fetch(`/gallery/load-more?take=${take}&skip=${skip}`);
    const response = await api.json();

    for(let i = 0; i < response.publications.length; i++) {
        const { wrapperPublicationsItem, span, imgSrc, wrapperPublicationItemFilter } = createPublication(wrapperPublications, "/uploaded-photo/" + response.publications[i].file_name, response.publications[i].id);

        wrapperPublicationsItem.addEventListener("click", async function () {

            if(!modalActive) {
                modalActive = true;
                createModalForGalleryPhoto(wrapperContent, true, imgSrc, response.publications[i].description, response.publications[i].date, response.publications[i].id);

                wrapperFilter.style.zIndex = "1";
                wrapperFilter.style.backgroundColor = "rgba(0, 0, 0, 0.53)";

                window.scrollTo(0, 0);

                span.style.display = "none";
            }
        });
        wrapperPublicationsItem.addEventListener("mousemove", function () {
            span.style.display = "block";
            wrapperPublicationItemFilter.style.display = "block";
        });
        wrapperPublicationsItem.addEventListener("mouseleave", function () {
            span.style.display = "none";
            wrapperPublicationItemFilter.style.display = "none";
        });
    }
    if(!response.loadMore) {
        loadMoreBtn.remove();
    }
    skip += 10;
});

function hideAllWrapperItemFilters() {
    const wrapperItemsFilters = document.querySelectorAll(".wrapper__publication-item-filter");

    for(let i = 0; i < wrapperItemsFilters.length; i++) {
        wrapperItemsFilters[i].style.display = "none";
    }
}
