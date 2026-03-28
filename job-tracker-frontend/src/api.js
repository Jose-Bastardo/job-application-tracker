const BASE_URL = 'http://localhost:8080/api/application';

export async function fetchJobs() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
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

  return response.json();
}

export async function deleteJob(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
}