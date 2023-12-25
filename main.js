let selectCities = document.querySelector("#city-select");

let cities = [
  {
    arabicName: "الاسكندرية",
    name: "Al Iskandarīyah",
  },
  {
    arabicName: "القاهرة",
    name: "Al Qāhirah",
  },
  {
    arabicName: "اسوان",
    name: "Aswān",
  },
  {
    arabicName: "الدقهلية",
    name: "Ad Daqahlīyah",
  },
  {
    arabicName: "البحر الاحمر",
    name: "Al Baḩr al Aḩmar",
  },
  {
    arabicName: "الغربية",
    name: "Al Gharbīyah",
  },
];

let city = cities.forEach((e) => {
  const count = `<option>${e.arabicName}</option>`;

  selectCities.innerHTML += count;
});

async function get(Citys) {
  let response = await fetch(
    `http://api.aladhan.com/v1/timingsByCity?country=EG&city=${Citys}`
  );
  let data = await response.json();
  let timing = data.data.timings;
  timeForPrayer("#Fajr", timing.Fajr);
  timeForPrayer("#Dhuhr", timing.Dhuhr);
  timeForPrayer("#Asr", timing.Asr);
  timeForPrayer("#Maghrib", timing.Maghrib);
  timeForPrayer("#Isha", timing.Isha);

  let readDate = data.data.date.readable;
  let readOfday = data.data.date.hijri.weekday.ar;
  let month = data.data.date.hijri.month.ar;
  let day = data.data.date.hijri.month.number;
  let numOfDay = data.data.date.hijri.year;
  document.querySelector(".dateOfcen").innerHTML = `${readOfday} ${readDate}`;
  document.querySelector(
    ".dateOfHigri"
  ).innerHTML = `${day} ${month} ${numOfDay}`;
}
get("Al Iskandarīyah");
function timeForPrayer(id, time) {
  document.querySelector(id).innerHTML = time;
}

selectCities.addEventListener("change", function () {
  let h1 = document.querySelector("#nameOfcounrty");
  h1.innerHTML = this.value;
  let Citys = "";
  for (let concity of cities) {
    if (concity.arabicName == this.value) {
      Citys = concity.name;
    }
  }
  get(Citys);
});
