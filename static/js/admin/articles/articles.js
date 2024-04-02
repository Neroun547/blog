import { createArticleFunction } from "./functions/create-article.function.js";

const wrapperArticles = document.querySelector(".wrapper__articles");
const deleteArticleBtn = document.querySelectorAll(".delete-article-btn");
const loadMoreBtn = document.querySelector(".load-more-btn");

let take = 10;
let skip = 10;

for(let i = 0; i < deleteArticleBtn.length; i++) {
    deleteArticleBtn[i].addEventListener("click", function () {
        fetch("/admin/articles/" + deleteArticleBtn[i].getAttribute("id"), {
            method: "DELETE"
        });

        deleteArticleBtn[i].parentElement.parentElement.remove();
    });
}

if(loadMoreBtn) {
    loadMoreBtn.addEventListener("click", async function () {
        const api = await fetch(`/articles/load-more?take=${take}&skip=${skip}`);
        const response = await api.json();

        skip += 10;

        for (let i = 0; i < response.articles.length; i++) {
            wrapperArticles.appendChild(createArticleFunction(
                response.articles[i].id,
                response.articles[i].name,
                response.articles[i].theme,
                response.articles[i].date,
                true
            ));
        }

        if (!response.loadMore) {
            loadMoreBtn.remove();
        }
    });
}
