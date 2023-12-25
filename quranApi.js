let api = "https://api.quran.gading.dev/surah";

async function getsSur() {
  let sur = await fetch(api);
  let data = await sur.json();
  let surah = document.querySelector(".container .child");
  for (let surahs in data.data) {
    surah.innerHTML += `
    <div class="surah">
        <h3>${data.data[surahs].name.long}</h3>
        <div class="no-surah">
        <div>
            <span>اياتها</span>
            <span>${data.data[surahs].numberOfVerses}</span>
            </div>
            <img src = "./image/kaaba.png"; class="image">
        </div>
    </div>
  `;
    let image = Array.from(document.querySelectorAll(".image"));
    image.forEach(function (ele) {
      if (data.data[surahs].revelation.en == "Medinan") {
        ele.src = "./image/nabawi-mosque.png";
      }
    });

    let allSur = document.querySelectorAll(".container .child .surah");
    let popup = document.querySelector(".surah-popup");
    allSur.forEach((sur, index) => {
      sur.addEventListener("click", () => {
        fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let aya = document.querySelector(".Elaya");
            aya.innerHTML = "";
            let everysurah = data.data.verses;
            everysurah.forEach((surah) => {
              aya.innerHTML += `
              <div>
              <p>${surah.text.arab}

              <img src="./image/accolade_droite.png" class="img">
              <span>${surah.number.inSurah}</span>
              <img src="./image/accolade_gauche.png" class="img">
              </p>
              </div>
              `;
              popup.classList.add("active");
            });
          });
      });
    });
    let close = document.querySelector(".close");
    close.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  }
}
getsSur();
let scrollUp = document.querySelector("#scroll-up");
window.onscroll = function () {
  if (scrollY >= 700) {
    scrollUp.style.display = "block";
  } else {
    scrollUp.style.display = "none";
  }
};

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});
