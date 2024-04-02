export function createArticleFunction(id, name, theme, date, admin, fileName) {

    if(admin) {
        const wrapperArticlesItem = document.createElement("div");
        wrapperArticlesItem.classList.add("wrapper__articles-item");
        wrapperArticlesItem.classList.add("mt-20");

        const wrapperArticlesItemLogo = document.createElement("h2");
        wrapperArticlesItemLogo.innerHTML = "Назва: " + name;

        const wrapperArticlesItemTheme = document.createElement("h3");
        wrapperArticlesItemTheme.innerHTML = "Тема: " + theme;

        const wrapperArticlesItemDate = document.createElement("h3");
        wrapperArticlesItemDate.innerHTML = "Дата публікації: " + date;

        const wrapperArticlesItemFooter = document.createElement("div");
        wrapperArticlesItemFooter.classList.add("wrapper__articles-item-footer");

        const editLink = document.createElement("a");
        editLink.setAttribute("href", "/admin/articles/edit/" + id);
        editLink.innerHTML = "Редагувати";

        const deleteArticleBtn = document.createElement("button");
        deleteArticleBtn.addEventListener("click", function () {
            fetch("/admin/articles/" + id, {
                method: "DELETE"
            });

            deleteArticleBtn.parentElement.parentElement.remove();
        });
        deleteArticleBtn.classList.add("delete-article-btn");
        deleteArticleBtn.setAttribute("id", id);
        deleteArticleBtn.innerHTML = "Видалити";

        wrapperArticlesItemFooter.appendChild(editLink);
        wrapperArticlesItemFooter.appendChild(deleteArticleBtn);

        wrapperArticlesItem.appendChild(wrapperArticlesItemLogo);
        wrapperArticlesItem.appendChild(wrapperArticlesItemTheme);
        wrapperArticlesItem.appendChild(wrapperArticlesItemDate);
        wrapperArticlesItem.appendChild(wrapperArticlesItemFooter);

        return wrapperArticlesItem;
    } else {
        console.log(fileName)
        const wrapperArticlesItem = document.createElement("div");
        wrapperArticlesItem.classList.add("wrapper__articles-item");
        wrapperArticlesItem.classList.add("mt-20");

        const wrapperArticlesItemLogo = document.createElement("h2");
        wrapperArticlesItemLogo.innerHTML = "Назва: " + name;

        const wrapperArticlesItemTheme = document.createElement("h3");
        wrapperArticlesItemTheme.innerHTML = "Тема: " + theme;

        const wrapperArticlesItemDate = document.createElement("h3");
        wrapperArticlesItemDate.innerHTML = "Дата публікації: " + date;

        const wrapperArticlesItemFooter = document.createElement("div");
        wrapperArticlesItemFooter.classList.add("wrapper__articles-item-footer");

        const readLink = document.createElement("a");
        readLink.setAttribute("href", "/articles/" + fileName);
        readLink.innerHTML = "Читати";

        wrapperArticlesItemFooter.appendChild(readLink);

        wrapperArticlesItem.appendChild(wrapperArticlesItemLogo);
        wrapperArticlesItem.appendChild(wrapperArticlesItemTheme);
        wrapperArticlesItem.appendChild(wrapperArticlesItemDate);
        wrapperArticlesItem.appendChild(wrapperArticlesItemFooter);

        return wrapperArticlesItem;
    }
}
