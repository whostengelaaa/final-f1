const constructorsApi = "https://f1api.dev/api/2025/constructors-championship";
const constructorsBody = document.getElementById("constructors-body");

fetch(constructorsApi)
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data.constructors_championship)) {
      data.constructors_championship.forEach(c => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${c.position}</td>
          <td>${c.team.teamName}</td>
          <td>${c.points}</td>
        `;
        constructorsBody.appendChild(row);
      });
    } else {
      constructorsBody.innerHTML = "<tr><td colspan='3'>No constructors data</td></tr>";
    }
  })
  .catch(err => {
    console.error("Error loading constructor standings:", err);
    constructorsBody.innerHTML = "<tr><td colspan='3'>Failed to load constructors</td></tr>";
  });
