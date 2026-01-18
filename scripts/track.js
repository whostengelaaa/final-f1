const apiUrl = "https://api.openf1.org/v1/meetings?year=2026";


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

const trackNameEl = document.getElementById("track-name");
const trackImageEl = document.getElementById("track-image");
const trackLocationEl = document.getElementById("track-location");
const trackCountryEl = document.getElementById("track-country");
const trackDateEl = document.getElementById("track-date");
const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
  window.history.back();
});


const selectedGP = localStorage.getItem("selectedGP");

if (!selectedGP) {
  trackNameEl.textContent = "No track selected.";
  trackImageEl.src = fallbackImage;
} else {
  fetch(apiUrl)
    .then(res => res.json())
    .then(races => {
      const race = races.find(r => r.meeting_name === selectedGP);
      if (!race) {
        trackNameEl.textContent = "Track not found.";
        trackImageEl.src = fallbackImage;
        return;
      }

      trackNameEl.textContent = race.meeting_name;
      trackLocationEl.textContent = `Location: ${race.location}`;
      trackCountryEl.textContent = `Country: ${race.country_name}`;
      trackDateEl.textContent = `Date: ${race.date_start ? new Date(race.date_start).toLocaleDateString() : "N/A"}`;


      trackImageEl.src = trackImages[race.meeting_name] || fallbackImage;
      trackImageEl.onerror = () => trackImageEl.src = fallbackImage;
    })
    .catch(err => {
      console.error("Error loading track details:", err);
      trackNameEl.textContent = "Error loading track.";
      trackImageEl.src = fallbackImage;
    });
}
