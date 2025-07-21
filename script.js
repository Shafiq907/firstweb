
const busData = {
  Karachi: [
    { company: "Daewoo", time: "10:00 AM", fare: "Rs. 1500", location: "Main Terminal" },
    { company: "Skyways", time: "2:00 PM", fare: "Rs. 1400", location: "Saddar Terminal" }
  ],
  Lahore: [
    { company: "Faisal Movers", time: "9:00 AM", fare: "Rs. 1300", location: "Thokar Niaz Baig" },
    { company: "Daewoo", time: "5:00 PM", fare: "Rs. 1350", location: "Kalma Chowk" }
  ],
  Multan: [
    { company: "Niazi Express", time: "11:00 AM", fare: "Rs. 1200", location: "General Bus Stand" }
  ]
};

function searchCity() {
  const input = document.getElementById("cityInput").value.trim();
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "";
  if (input.length === 0) return;

  const city = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  const buses = busData[city];

  if (!buses) {
    resultsSection.innerHTML = `<p>No data found for "${input}"</p>`;
    return;
  }

  buses.forEach(bus => {
    const div = document.createElement("div");
    div.className = "bus-card";
    div.innerHTML = `
      <h3>${bus.company}</h3>
      <p><strong>Departure:</strong> ${bus.time}</p>
      <p><strong>Fare:</strong> ${bus.fare}</p>
      <p><strong>Location:</strong> ${bus.location}</p>
    `;
    resultsSection.appendChild(div);
  });
}
