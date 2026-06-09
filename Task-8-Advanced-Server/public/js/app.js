const statsButton = document.querySelector("#statsButton");
const jobButton = document.querySelector("#jobButton");
const statsOutput = document.querySelector("#statsOutput");
const jobsOutput = document.querySelector("#jobsOutput");

async function loadStats() {
  const response = await fetch("/api/stats");
  statsOutput.textContent = JSON.stringify(await response.json(), null, 2);
}

async function loadJobs() {
  const response = await fetch("/api/jobs");
  const jobs = await response.json();
  jobsOutput.innerHTML = jobs.length ? jobs.map((job) => `
    <div class="job">
      <strong>#${job.id} ${job.name}</strong>
      <span>${job.status}</span>
    </div>
  `).join("") : "No jobs yet.";
}

statsButton.addEventListener("click", loadStats);
jobButton.addEventListener("click", async () => {
  await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Prepare screenshot checklist" }),
  });
  await loadJobs();
});

setInterval(loadJobs, 2000);
loadStats();
loadJobs();
