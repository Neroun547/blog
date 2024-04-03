export function createPublication(parent, imgSrc, id) {
    const wrapperPublicationsItem = document.createElement("div");
    wrapperPublicationsItem.classList.add("wrapper__publications-item");

    const wrapperPublicationItemFilter = document.createElement("div");
    wrapperPublicationItemFilter.classList.add("wrapper__publication-item-filter");

    wrapperPublicationsItem.appendChild(wrapperPublicationItemFilter);

    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", "Зображення");
    img.classList.add("wrapper__publications-item-img");

    const span = document.createElement("span");
    span.classList.add("wrapper__publications-item-about-span");
    span.setAttribute("id", id);

    span.innerHTML = "Докладніше";

    wrapperPublicationsItem.appendChild(wrapperPublicationItemFilter);
    wrapperPublicationsItem.appendChild(img);
    wrapperPublicationsItem.appendChild(span);

    parent.appendChild(wrapperPublicationsItem);

    return { wrapperPublicationsItem: wrapperPublicationsItem, span: span, img: img, wrapperPublicationItemFilter: wrapperPublicationItemFilter };
}
