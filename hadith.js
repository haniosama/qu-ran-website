async function gethaduth(aboutname) {
  let api = await fetch(
    `https://api.hadith.gading.dev/books/${aboutname}?range=1-50`
  );
  let data = await api.json();
  let hadth = data.data.hadiths;

  let hadiths = document.querySelector(".mini-hadith");
  hadiths.innerHTML = "";
  for (let hadith in hadth) {
    hadiths.innerHTML += `
    <p style="margin-bottom: 20px;">${hadth[hadith].arab}</p>

    `;
  }
}
gethaduth("muslim");
let names = [
  {
    arabicname: "مسلم",
    name: "muslim",
  },
  {
    arabicname: "ابو داود",
    name: "abu-daud",
  },
  {
    arabicname: "احمد",
    name: "ahmad",
  },
  {
    arabicname: "داريمي",
    name: "darimi",
  },
];

let optionsName = document.querySelector("#name-select");
let nameOfOptions = names.forEach((e) => {
  let persons = `<option>${e.arabicname}</option>`;

  optionsName.innerHTML += persons;
});

optionsName.addEventListener("change", function () {
  let nameofname = document.querySelector(".nameofname");
  nameofname.textContent = `الاسم:${this.value}`;
  let aboutname = "";
  for (let namess of names) {
    if (namess.arabicname == this.value) {
      aboutname = namess.name;
    }
  }
  gethaduth(aboutname);
});
