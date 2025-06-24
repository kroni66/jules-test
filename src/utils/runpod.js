// src/utils/runpod.js

/**
 * Helper to start a fine-tune job on RunPod.
 * @param {Object} opts
 * @param {string} opts.apiKey
 * @param {string} opts.endpointId
 * @param {Object} opts.input - { model, dataset, epochs, batch_size, learning_rate }
 * @returns {Promise<string>} jobId
 */
export async function startJob({ apiKey, endpointId, input }) {
  const url = `https://api.runpod.ai/v2/${endpointId}/run`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input })
  });
  if (!res.ok) {
    let error = "Failed to start job.";
    try {
      const data = await res.json();
      error = data.error || error;
    } catch (e) {}
    throw new Error(error);
  }
  const data = await res.json();
  if (!data.id) throw new Error("No jobId returned from RunPod.");
  return data.id;
}

/**
 * Polls the status for a job.
 * @param {Object} opts
 * @param {string} opts.apiKey
 * @param {string} opts.endpointId
 * @param {string} opts.jobId
 * @returns {Promise<Object>} status response JSON
 */
export async function getJobStatus({ apiKey, endpointId, jobId }) {
  const url = `https://api.runpod.ai/v2/${endpointId}/status/${jobId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": apiKey
    }
  });
  if (!res.ok) {
    let error = "Failed to fetch job status.";
    try {
      const data = await res.json();
      error = data.error || error;
    } catch (e) {}
    throw new Error(error);
  }
  return res.json();
}