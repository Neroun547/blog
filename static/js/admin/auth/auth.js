const authForm = document.querySelector(".auth__form");
const wrapperAuthFormMessage = document.querySelector(".wrapper__auth-form-message");

authForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    wrapperAuthFormMessage.style.display = "none";

    const api = await fetch("/admin/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: e.target[0].value,
            password: e.target[1].value
        })
    })

    if(api.ok) {
        window.location.href = "/admin";
    } else {
        wrapperAuthFormMessage.style.display = "block";
        wrapperAuthFormMessage.innerHTML = "Невірне ім'я користувача чи пароль";
    }
});
