const audio = document.querySelectorAll(".wrapper__music-sub-item-audio");
let prev = null;

for(let i = 0; i < audio.length; i++) {
    audio[i].addEventListener("play", function () {

        if(prev && prev !== audio[i]) {
            prev.pause();
        }
        prev = audio[i];
    });
}
