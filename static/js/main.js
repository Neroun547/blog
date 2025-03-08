import { createArticleFunction } from "./articles/functions/create-article.function.js";

const wrapperArticles = document.querySelector(".wrapper__articles");
const loadMoreBtn = document.querySelector(".load-more-btn");
const wrapperSearchInput = document.querySelector(".wrapper__search-input");
const wrapperSearchBtn = document.querySelector(".wrapper__search-btn");
const wrapperContent = document.querySelector(".wrapper__content");
const wrapperArticlesSmallTextItems = document.querySelectorAll(".wrapper__articles-item-small-text");
const wrapperArticlesRow = wrapperArticles.querySelector(".row");

document.getElementById("nav-main-link").classList.add("active");

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
        displayCards(response.articles);
    }
    if(!response.loadMore) {

        if(document.querySelector(".load-more-btn")) {
            document.querySelector(".load-more-btn").remove();
        }
    } else {
        if(!document.querySelector(".load-more-btn")) {
            const loadMoreBtn = createLoadMoreButton();

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

    displayCards(response.articles);

    if(!response.loadMore) {
        document.querySelector(".load-more-btn").remove();
    }
}

function createLoadMoreButton() {
    const button = document.createElement("button");
    button.className = "btn grey darken-3 load-more-btn d-block ma-auto mt-50 mb-50";

    button.innerHTML = 'Завантажити більше <i class="material-icons right">autorenew</i>';

    return button;
}

function displayCards(articles) {
    for(let i = 0; i < articles.length; i++) {
        wrapperArticlesRow.appendChild(createArticleFunction(
          articles[i].id,
          articles[i].name,
          articles[i].theme,
          articles[i].date,
          articles[i].file_name,
          articles[i].smallText
        ));
    }
}


