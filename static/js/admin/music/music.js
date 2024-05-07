const deleteMusicBtn = document.querySelectorAll(".delete-music-btn");

for(let i = 0; i < deleteMusicBtn.length; i++) {
    deleteMusicBtn[i].addEventListener("click", function () {
        fetch("/admin/music/" + deleteMusicBtn[i].getAttribute("id"), {
            method: "DELETE"
        });
        deleteMusicBtn[i].parentElement.parentElement.remove();
    });
}
