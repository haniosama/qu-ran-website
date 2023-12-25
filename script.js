// To MAke Responsive navbar

let icon = document.querySelector("#icons");
icon.addEventListener("click", function () {
  let nav = document.querySelector("nav");
  nav.classList.toggle("active");
});

// for validation of form

let nameError = document.querySelector("#name-error");
let phoneError = document.querySelector("#phone-error");
let emailError = document.querySelector("#email-error");
let messageError = document.querySelector("#massege-error");
let submitError = document.querySelector("#submit-error");

function validname() {
  let name = document.querySelector("#name").value;
  if (name.length == 0) {
    nameError.innerHTML = "الاسم مطلوب";
    return false;
  }
  if (!name.match(/[A-Za-a]*\s{1}[A-Za-z]*$/g)) {
    nameError.innerHTML = "اكتب الاسم كامل";
    return false;
  }
  nameError.innerHTML = `<i class="fa-solid fa-check" id="icon"></i>`;
  return true;
}

function validphone() {
  let phone = document.querySelector("#phone").value;

  if (phone.length == 0) {
    phoneError.innerHTML = "الرقم مطلوب";
    return false;
  }
  if (phone.match(/0\d{3}\d{3}\d{4}/)) {
    phoneError.innerHTML = "الرقم مطلوب";
  }
  if (phone.length !== 11) {
    phoneError.innerHTML = "رقم التليفون يجي ان يكون 11 رقم";
    return false;
  }
  phoneError.innerHTML = `<i class="fa-solid fa-check"></i>`;
  return true;
}
function validemail() {
  let email = document.querySelector("#email").value;
  if (email == 0) {
    emailError.innerHTML = "البريد الالكترونى مطلوب";
    return false;
  }
  if (!email.match(/\w*\-\w*\d{2,4}\@\w*\.\w{2,}/)) {
    emailError.innerHTML = "البريد الالكترونى غير مطابق";
    return false;
  }
  emailError.innerHTML = `<i class="fa-solid fa-check"></i>`;
  return true;
}
function validmassege() {
  let massege = document.querySelector("#masseges").value;

  let require = 30;
  let left = require - massege.length;
  console.log(left);
  if (left > 0) {
    messageError.innerHTML = `عدد متبقى${left}`;
    return false;
  }
  messageError.innerHTML = `<i class="fa-solid fa-check"></i>`;
  return true;
}
function validerror() {
  if (validemail() || validmassege() || validname() || validphone()) {
    submitError.innerHTML = `<i class="fa-solid fa-check"></i>`;
    return true;
  } else {
    submitError.innerHTML = "من فضلك ادخل البانات ف الاعلى";
    return false;
  }
}
for (let i = 0; i < 75; i++) {
  let stars = document.createElement("div");
  stars.className = "str";
  let star = document.querySelector(".star");
  let icons = document.createElement("i");
  icons.className = "fa-solid fa-star";
  let size = Math.random() * 20;
  stars.style.fontSize = 10 + size + "px";
  stars.style.left = Math.random() * +innerWidth + "px";
  stars.style.top = Math.random() * +innerHeight + "px";
  stars.appendChild(icons);
  star.appendChild(stars);
}
function randomstars() {
  let allstars = document.querySelectorAll(".str");
  let randomnum = Math.floor(Math.random() * allstars.length);
  allstars[randomnum].classList.toggle("random");
}

setInterval(randomstars, 40);

let scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});

// to scroll
let scroll = document.querySelector(".scroll");
let height = document.documentElement.scrollHeight - document.body.clientHeight;
window.onscroll = function () {
  let scrollTop = document.body.scrollTop;
  scroll.style.width = `${(scrollTop / height) * 100}%`;

  if (scrollY >= 700) {
    scrollUp.style.display = "block";
  } else {
    scrollUp.style.display = "none";
  }
};

async function gethaduth() {
  let api = await fetch(
    `https://api.hadith.gading.dev/books/abu-daud?range=1-50`
  );
  let indexhadith = 0;

  let hadt = document.querySelector(".min-hadith");
  let right = document.querySelector(".rigth");
  let left = document.querySelector(".left");
  let count = document.querySelector(".count");

  let data = await api.json();
  let hadth = data.data.hadiths;
  right.addEventListener("click", function () {
    indexhadith == 149 ? (indexhadith = 0) : indexhadith++;
    hadith();
  });
  left.addEventListener("click", function () {
    indexhadith == 0 ? (indexhadith = 149) : indexhadith--;
    hadith();
  });

  function hadith() {
    hadt.innerHTML = `
    <h2>${hadth[indexhadith].arab}</h2>
    `;
    count.innerText = `150 - ${indexhadith + 1}`;
  }
  hadith();
}
gethaduth();
