import { createModalForGalleryPhoto } from "../admin/gallery/functions/create-modal-for-gallery-photo.js";
import { createPublication } from "../admin/gallery/functions/create-publication.js";

const wrapperPublicationsItems = document.querySelectorAll(".wrapper__publications-item");
const wrapperPublicationsItemSpan = document.querySelectorAll(".wrapper__publications-item-about-span");
const wrapperMain = document.querySelector(".wrapper__main");
const allWrapperFilters = document.querySelectorAll(".wrapper__publication-item-filter");
const wrapperContent = document.querySelector(".wrapper__content");
const loadMoreBtn = document.querySelector(".load-more-btn");
const wrapperPublications = document.querySelector(".wrapper__publications");

let prevPublicationItem;
let prevPublicationItemSpan;
let modalActive = false;

let take = 10;
let skip = 10;

for(let i = 0; i < wrapperPublicationsItems.length; i++) {
    wrapperPublicationsItems[i].addEventListener("mousemove", function () {
        if(!modalActive) {
            if (prevPublicationItem) {
                prevPublicationItem.style.display = "none";
            }
            wrapperPublicationsItems[i].querySelector(".wrapper__publications-item-about-span").style.display = "block";
            wrapperPublicationsItems[i].querySelector(".wrapper__publication-item-filter").style.display = "block";
            prevPublicationItem = wrapperPublicationsItems[i].querySelector(".wrapper__publication-item-filter");
            prevPublicationItemSpan = wrapperPublicationsItems[i].querySelector(".wrapper__publications-item-about-span");
        }
    });
}
window.addEventListener("mousemove", function (e) {
    if(!modalActive) {
        for (let i = 0; i < e.target.classList.length; i++) {
            if (prevPublicationItem && e.target.classList[i] !== "wrapper__publication-item"
                && prevPublicationItem && e.target.classList[i] !== "wrapper__publication-item-filter"
                && e.target.classList[i] !== "wrapper__publications-item-img"
                && e.target.classList[i] !== "wrapper__publications-item-about-span"
            ) {
                prevPublicationItem.style.display = "none";
                prevPublicationItemSpan.style.display = "none";
            }
        }
    }
});

window.addEventListener("click", function (e) {

    if(modalActive) {
        document.querySelector(".wrapper__modal-photo-gallery").remove();

        for(let i = 0; i < allWrapperFilters.length; i++) {
            allWrapperFilters[i].style.display = "none";
            wrapperMain.style.backgroundColor = "#fff";
        }
        modalActive = false;
        e.stopPropagation();
    }
}, true);

for(let i = 0; i < wrapperPublicationsItemSpan.length; i++) {
    wrapperPublicationsItems[i].addEventListener("click", async function () {

        if(!modalActive) {
            const img = wrapperPublicationsItemSpan[i].parentElement.querySelector(".wrapper__publications-item-img");
            const id = wrapperPublicationsItemSpan[i].getAttribute("id");

            const api = await fetch("/gallery/" + id);
            const response = await api.json();

            modalActive = true;

            const imgSrc = img.getAttribute("src");
            createModalForGalleryPhoto(wrapperContent, false, imgSrc, response.description, response.date, response.id);

            wrapperMain.style.backgroundColor = "rgba(0, 0, 0, 0.53)";

            for (let i = 0; i < allWrapperFilters.length; i++) {
                allWrapperFilters[i].style.display = "block";
            }
            window.scrollTo(0, 0);

            wrapperPublicationsItems[i].querySelector(".wrapper__publications-item-about-span").style.display = "none";
        }
    });
}

loadMoreBtn.addEventListener("click", async function () {
    const api = await fetch(`/gallery/load-more?take=${take}&skip=${skip}`);
    const response = await api.json();

    for(let i = 0; i < response.publications.length; i++) {
        const { wrapperPublicationsItem, span, img, wrapperPublicationItemFilter } = createPublication(wrapperPublications, "/uploaded-photo/" + response.publications[i].file_name, response.publications[i].id);

        wrapperPublicationsItem.addEventListener("click", async function () {

            if(!modalActive) {
                modalActive = true;
                const imgSrc = img.getAttribute("src");
                createModalForGalleryPhoto(wrapperContent, false, imgSrc, response.publications[i].description, response.publications[i].date, response.publications[i].id);

                wrapperMain.style.backgroundColor = "rgba(0, 0, 0, 0.53)";

                for (let i = 0; i < allWrapperFilters.length; i++) {
                    allWrapperFilters[i].style.display = "block";
                }
                window.scrollTo(0, 0);

                span.style.display = "none";
            }
        });
        wrapperPublicationsItem.addEventListener("mousemove", function () {
            if(!modalActive) {
                if (prevPublicationItem) {
                    prevPublicationItem.style.display = "none";
                }
                span.style.display = "block";
                wrapperPublicationItemFilter.style.display = "block";
                prevPublicationItem = wrapperPublicationItemFilter;
                prevPublicationItemSpan = span;
            }
        });
    }
    if(!response.loadMore) {
        loadMoreBtn.remove();
    }
    skip += 10;
});

