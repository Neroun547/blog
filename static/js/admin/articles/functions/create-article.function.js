export function createArticleFunction(id, name, theme, date, fileName, smallText) {
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
        deleteArticleBtn.className = "delete-article-btn btn red darken-3";
        deleteArticleBtn.setAttribute("id", id);
        deleteArticleBtn.innerHTML = "<i class='material-icons'>delete</i>";

        wrapperArticlesItemFooter.appendChild(editLink);
        wrapperArticlesItemFooter.appendChild(deleteArticleBtn);

        wrapperArticlesItem.appendChild(wrapperArticlesItemLogo);
        wrapperArticlesItem.appendChild(wrapperArticlesItemTheme);
        wrapperArticlesItem.appendChild(wrapperArticlesItemDate);
        wrapperArticlesItem.appendChild(wrapperArticlesItemFooter);

        return wrapperArticlesItem;
}
