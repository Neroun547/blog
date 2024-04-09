export function createModalForGalleryPhoto(parent, admin, imgSrc, description, date, id) {
    const wrapperModal = document.createElement("div");
    wrapperModal.classList.add("wrapper__modal-photo-gallery");

    const wrapperRightSide = document.createElement("div");
    wrapperRightSide.classList.add("wrapper__modal-photo-gallery-right-side");

    const closeModalBtn = document.createElement("button");
    closeModalBtn.innerHTML = "&times;";
    closeModalBtn.classList.add("wrapper__modal-photo-gallery-close-btn");

    closeModalBtn.addEventListener("click", function () {
        wrapperModal.remove();
    });
    wrapperRightSide.appendChild(closeModalBtn);

    const wrapperModalDescription = document.createElement("div");
    wrapperModalDescription.classList.add("wrapper__modal-photo-gallery-description");
    wrapperModalDescription.innerHTML = description;

    wrapperRightSide.appendChild(wrapperModalDescription);

    const image = document.createElement("img");
    image.setAttribute("src", imgSrc);

    const dateLogo = document.createElement("h2");

    dateLogo.innerHTML = "Дата публікації: " + date;

    const wrapperFooter = document.createElement("div");

    wrapperFooter.appendChild(dateLogo);

    if(admin) {
        const deletePhotoBtn = document.createElement("button");
        deletePhotoBtn.classList.add("delete-publication-btn")
        deletePhotoBtn.innerHTML = "Видалити";

        deletePhotoBtn.addEventListener("click", async function () {
            console.log("Click")
            await fetch("/admin/gallery/" + id, {
                method: "DELETE"
            });

            window.location.reload();
        }, true);

        wrapperFooter.appendChild(deletePhotoBtn);
    }

    wrapperRightSide.appendChild(wrapperFooter);

    wrapperModal.appendChild(image);
    wrapperModal.appendChild(wrapperRightSide);

    parent.appendChild(wrapperModal);
}
