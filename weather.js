const fetchBtn = document.querySelector("#fetchBtn");
const loading = document.querySelector("#loading");
const result = document.querySelector("#result");
const error = document.querySelector("#error");
const city = document.querySelector("#city");

async function getWeather() {
  const city = document.querySelector("#city").value.trim();

  if (city === "") {
    error.textContent = "Please enter a city name.";
    return;
  }
  loading.classList.remove("hidden");
  loading.classList.add("block");
  error.textContent = "";
  try {
    const response = await fetch(
      `./weather.php?city=${encodeURIComponent(city)}`
    );
    const data = await response.json();
    loading.classList.add("hidden");
    loading.classList.remove("block");

    if (data.status === "success") {
      result.classList.remove("hidden");
      result.classList.add("block");

      result.innerHTML = `
      <p
                  class="text-text-light dark:text-text-dark text-2xl font-bold leading-tight tracking-[-0.015em]"
                >
                  ${data.name}, ${data.region}
                </p>
                <div class="my-4 text-primary">
                      <img src=${data.icon} alt="weather icon">
                  
                </div>
                <div class="flex flex-col items-center gap-1">
                  <p
                    class="text-text-light dark:text-text-dark text-6xl font-bold leading-none"
                  >
                    ${data.temprature} C
                  </p>
                  <p
                    class="text-text-secondary-light dark:text-text-secondary-dark text-lg font-normal leading-normal"
                  >
                  ${data.sky}
                  </p>
                </div>
        `;
    } else {
      error.textContent = data.message;
    }
  } catch (e) {
    loading.classList.add("hidden");
    loading.classList.remove("block");
    error.textContent = `Request Failed ${e.message}`;
  }
}

fetchBtn.addEventListener("click", getWeather);
