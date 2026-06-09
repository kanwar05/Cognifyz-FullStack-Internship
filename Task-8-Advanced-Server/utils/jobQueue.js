let nextId = 1;
const jobs = [];

function addJob(name) {
  const job = {
    id: nextId++,
    name,
    status: "queued",
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  jobs.unshift(job);
  return job;
}

function getJobs() {
  return jobs;
}

function startWorker() {
  setInterval(() => {
    const job = jobs.find((item) => item.status === "queued");
    if (!job) return;
    job.status = "processing";
    setTimeout(() => {
      job.status = "completed";
      job.completedAt = new Date().toISOString();
    }, 2500);
  }, 1500);
}

module.exports = { addJob, getJobs, startWorker };
