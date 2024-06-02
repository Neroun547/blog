import { createArticleFunction } from "./admin/articles/functions/create-article.function.js";

const wrapperArticles = document.querySelector(".wrapper__articles");
const loadMoreBtn = document.querySelector(".load-more-btn");
const wrapperSearchInput = document.querySelector(".wrapper__search-input");
const wrapperSearchBtn = document.querySelector(".wrapper__search-btn");
const wrapperContent = document.querySelector(".wrapper__content");
const wrapperArticlesSmallTextItems = document.querySelectorAll(".wrapper__articles-item-small-text");

let take = 10;
let skip = 10;
let filtersName = "";

if(loadMoreBtn) {
    loadMoreBtn.addEventListener("click", async function () {
        await loadMore();
    });
}

wrapperSearchBtn.addEventListener("click", async function () {
    skip = 0;

    filtersName = wrapperSearchInput.value;

    const api = await fetch("/articles/by-filters?name=" + filtersName + "&take=10&skip=" + skip);
    const response = await api.json();

    const wrapperArticlesItems = document.querySelectorAll(".wrapper__articles-item");

    for(let i = 0; i < wrapperArticlesItems.length; i++) {
        wrapperArticlesItems[i].remove();
    }
    if(!response.articles.length) {
        if(!document.querySelector(".articles-not-found-logo")) {
            const articlesNotFoundLogo = document.createElement("h2");
            articlesNotFoundLogo.classList.add("articles-not-found-logo");
            articlesNotFoundLogo.style.textAlign = "center";
            articlesNotFoundLogo.innerHTML = "За цією назвою статтю не знайдено :(";

            wrapperContent.appendChild(articlesNotFoundLogo);
        }
    } else {
        if(document.querySelector(".articles-not-found-logo")) {
            document.querySelector(".articles-not-found-logo").remove();
        }
        for (let i = 0; i < response.articles.length; i++) {
            wrapperArticles.appendChild(createArticleFunction(
                response.articles[i].id,
                response.articles[i].name,
                response.articles[i].theme,
                response.articles[i].date,
                false,
                response.articles[i].file_name
            ));
        }
    }
    if(!response.loadMore) {

        if(document.querySelector(".load-more-btn")) {
            document.querySelector(".load-more-btn").remove();
        }
    } else {
        if(!document.querySelector(".load-more-btn")) {
            const loadMoreBtn = document.createElement("button");
            loadMoreBtn.classList.add("load-more-btn");
            loadMoreBtn.classList.add("mt-50");
            loadMoreBtn.classList.add("mb-50");

            loadMoreBtn.innerHTML = "Завантажити більше";

            loadMoreBtn.addEventListener("click", async function () {
                await loadMore();
            });
            wrapperContent.appendChild(loadMoreBtn);
        }
    }
    skip += 10;
});

for(let i = 0; i < wrapperArticlesSmallTextItems.length; i++) {
    wrapperArticlesSmallTextItems[i].innerHTML = wrapperArticlesSmallTextItems[i].textContent;
}

async function loadMore() {
    let api;

    if(filtersName) {
        api = await fetch(`/articles/load-more?take=${take}&skip=${skip}&name=${filtersName}`);
    } else {
        api = await fetch(`/articles/load-more?take=${take}&skip=${skip}`);
    }
    const response = await api.json();

    skip += 10;

    for(let i = 0; i < response.articles.length; i++) {
        wrapperArticles.appendChild(createArticleFunction(
            response.articles[i].id,
            response.articles[i].name,
            response.articles[i].theme,
            response.articles[i].date,
            false,
            response.articles[i].file_name
        ));
    }
    if(!response.loadMore) {
        document.querySelector(".load-more-btn").remove();
    }
}


