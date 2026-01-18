const apiUrl = "https://api.openf1.org/v1/meetings?year=2026";
const trackContainer = document.getElementById("track-container");

const trackImages = {
  "Bahrain Grand Prix": "images/Bahrain.png",
  "Saudi Arabian Grand Prix": "images/Saudi Arabia.png",
  "Australian Grand Prix": "images/Australia.png",
  "Monaco Grand Prix": "images/Monaco.png",
  "Barcelona Grand Prix": "images/Spain.png",
  "Canadian Grand Prix": "images/Canada.png",
  "Austrian Grand Prix": "images/Austria.png",
  "British Grand Prix": "images/Great Britain.png",
  "Hungarian Grand Prix": "images/Hungary.png",
  "Belgian Grand Prix": "images/Belgium.png",
  "Dutch Grand Prix": "images/Netherlands.png",
  "Italian Grand Prix": "images/Italy.png",
  "Singapore Grand Prix": "images/Singapore.png",
  "Japanese Grand Prix": "images/Japan.png",
  "Qatar Grand Prix": "images/Qatar.png",
  "United States Grand Prix": "images/USA.png",
  "Mexico City Grand Prix": "images/Mexico.png",
  "São Paulo Grand Prix": "images/Brazil.png",
  "Abu Dhabi Grand Prix": "images/Abu Dhabi.png",
  "Chinese Grand Prix": "images/China.png",
  "Spanish Grand Prix": "images/Madring.png",
  "Las Vegas Grand Prix": "images/Vegas.png",
  "Azerbaijan Grand Prix": "images/Azerbaijan.png",
  "Miami Grand Prix": "images/Miami.png",
  "Pre-Season Testing": "images/Preseason.png",
};

const fallbackImage = "images/placeholder.png";

async function loadTracks() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch tracks");

    const races = await response.json();
    trackContainer.innerHTML = "";

    races.forEach(race => {
      const card = document.createElement("div");
      card.className = "card";

      const raceDate = race.date_start ? new Date(race.date_start).toLocaleDateString() : "N/A";


      const imgSrc = trackImages[race.meeting_name] || fallbackImage;

      card.innerHTML = `
        <img src="${imgSrc}" alt="${race.meeting_name}" 
             onerror="this.onerror=null; this.src='${fallbackImage}'">
        <div class="card-body">
          <h2>${race.meeting_name}</h2>
          <p>${race.location}, ${race.country_name}</p>
          <p>${raceDate}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        localStorage.setItem("selectedGP", race.meeting_name);
        window.location.href = "track.html";
      });

      trackContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading tracks:", error);
    trackContainer.innerHTML = "<p>Could not load tracks. Make sure Live Server is running.</p>";
  }
}


loadTracks();

