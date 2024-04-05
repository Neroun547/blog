const likeBtn = document.querySelector(".wrapper__comments-like-btn");
const dislikeBtn = document.querySelector(".wrapper__comments-dislike-btn");

const likeSpan = document.querySelector(".wrapper__comments-like-span");
const dislikeSpan = document.querySelector(".wrapper__comments-dislike-span");

const filename = document.querySelector(".wrapper__comments-grade").getAttribute("id");

const alreadyLikedBtn = document.querySelector(".wrapper__comments-like-btn-liked");

if(!alreadyLikedBtn) {
    likeBtn.addEventListener("click", async function () {
        const api = await fetch("/articles/" + filename + "/add-like", {
            method: "PATCH"
        });

        if (api.ok) {
            likeSpan.innerHTML = String(Number(likeSpan.innerText) + 1);
        }
        window.location.reload();
    });
} else {
    alreadyLikedBtn.addEventListener("click", async function () {
        const api = await fetch("/articles/" + filename + "/remove-like", {
            method: "DELETE"
        });

        if (api.ok) {
            likeSpan.innerHTML = String(Number(likeSpan.innerText) - 1);
        }
        window.location.reload();
    });
}

dislikeBtn.addEventListener("click", async function () {
    dislikeSpan.innerHTML = String(Number(dislikeSpan.innerText) + 1);
});
