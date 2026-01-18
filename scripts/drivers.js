const driversApi = "https://f1api.dev/api/2025/drivers-championship";
const driversBody = document.getElementById("drivers-body");

fetch(driversApi)
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data.drivers_championship)) {
      data.drivers_championship.forEach(d => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${d.position}</td>
          <td>${d.driver.name} ${d.driver.surname}</td>
          <td>${d.team.teamName}</td>
          <td>${d.points}</td>
        `;
        driversBody.appendChild(row);
      });
    } else {
      driversBody.innerHTML = "<tr><td colspan='4'>No drivers data</td></tr>";
    }
  })
  .catch(err => {
    console.error("Error loading drivers standings:", err);
    driversBody.innerHTML = "<tr><td colspan='4'>Failed to load drivers</td></tr>";
  });
