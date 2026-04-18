const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchJobs() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return await response.json();
}

export async function createJob(job) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return await response.json();
}

export async function updateJob(job) {
  const response = await fetch(`${BASE_URL}/${job.Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error('Failed to update job');
  }

  return await response.json();
}

export async function deleteJob(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
}