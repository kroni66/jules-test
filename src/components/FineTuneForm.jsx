// src/components/FineTuneForm.jsx

import React, { useState, useEffect, useRef } from "react";
import { startJob, getJobStatus } from "../utils/runpod";

function Alert({ type = "info", children }) {
  const base =
    "p-3 rounded-md text-sm mb-4 " +
    (type === "error"
      ? "bg-red-100 text-red-800 border border-red-200"
      : "bg-indigo-100 text-indigo-900 border border-indigo-200");
  return <div className={base}>{children}</div>;
}

const DEFAULTS = {
  epochs: 3,
  batch_size: 8,
  learning_rate: 2e-5
};

function usePersistedState(key, fallback) {
  const [val, setVal] = useState(() => {
    try {
      const v = window.localStorage.getItem(key);
      return v !== null ? v : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, val ?? "");
  }, [key, val]);
  return [val, setVal];
}

export default function FineTuneForm() {
  // Persist API key and endpoint ID in localStorage
  const [apiKey, setApiKey] = usePersistedState("runpodApiKey", "");
  const [endpointId, setEndpointId] = usePersistedState("runpodEndpointId", "");

  // Form state
  const [modelId, setModelId] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [modelLoading, setModelLoading] = useState(false);
  const [dataset, setDataset] = useState("");
  const [epochs, setEpochs] = useState(DEFAULTS.epochs);
  const [batchSize, setBatchSize] = useState(DEFAULTS.batch_size);
  const [learningRate, setLearningRate] = useState(DEFAULTS.learning_rate);

  // RunPod job state
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [output, setOutput] = useState(null);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const pollingRef = useRef();

  // Validation state
  const [touched, setTouched] = useState({});

  // Hugging Face model search
  useEffect(() => {
    if (!modelQuery || modelQuery.length < 2) {
      setModelSuggestions([]);
      return;
    }
    let cancelled = false;
    setModelLoading(true);
    fetch(
      `https://huggingface.co/api/models?search=${encodeURIComponent(
        modelQuery
      )}&limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setModelSuggestions(
            (Array.isArray(data) ? data : []).map((m) => ({
              id: m.id,
              likes: m.likes,
              downloads: m.downloads
            }))
          );
        }
      })
      .catch(() => {
        if (!cancelled) setModelSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setModelLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [modelQuery]);

  // Polling for job status
  useEffect(() => {
    if (polling && jobId && apiKey && endpointId) {
      let stop = false;
      async function poll() {
        try {
          const status = await getJobStatus({ apiKey, endpointId, jobId });
          setJobStatus(status.status);
          if (status.status === "COMPLETED") {
            setOutput(status.output || status);
            setPolling(false);
            setInfo("Fine-tuning completed successfully.");
          } else if (status.status === "FAILED") {
            setPolling(false);
            setError("Job failed.");
          } else if (!stop) {
            pollingRef.current = setTimeout(poll, 10000);
          }
        } catch (err) {
          setPolling(false);
          setError("Failed to fetch job status: " + err.message);
        }
      }
      poll();
      return () => {
        stop = true;
        clearTimeout(pollingRef.current);
      };
    }
  }, [polling, jobId, apiKey, endpointId]);

  // Cancel polling on unmount
  useEffect(() => {
    return () => {
      clearTimeout(pollingRef.current);
    };
  }, []);

  // Form validation
  const validate = () => {
    const errors = {};
    if (!modelId) errors.modelId = "Model is required.";
    if (!dataset) errors.dataset = "Dataset is required.";
    if (!apiKey) errors.apiKey = "API key is required.";
    if (!endpointId) errors.endpointId = "Endpoint ID is required.";
    if (!epochs || epochs < 1) errors.epochs = "Epochs must be ≥ 1.";
    if (!batchSize || batchSize < 1) errors.batchSize = "Batch size must be ≥ 1.";
    if (
      !learningRate ||
      isNaN(Number(learningRate)) ||
      Number(learningRate) <= 0
    )
      errors.learningRate = "Learning rate must be positive.";
    return errors;
  };
  const errors = validate();
  const hasError = Object.keys(errors).length > 0;

  // Form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      modelId: true,
      dataset: true,
      apiKey: true,
      endpointId: true,
      epochs: true,
      batchSize: true,
      learningRate: true
    });
    setError("");
    setInfo("");
    setOutput(null);
    if (hasError) return;
    setPolling(false);
    setJobStatus(null);
    setInfo("Starting fine-tuning job...");
    try {
      const id = await startJob({
        apiKey,
        endpointId,
        input: {
          model: modelId,
          dataset,
          epochs: Number(epochs),
          batch_size: Number(batchSize),
          learning_rate: Number(learningRate)
        }
      });
      setJobId(id);
      setJobStatus("QUEUED");
      setPolling(true);
      setInfo("Job started. Polling status...");
    } catch (err) {
      setError(
        "Failed to start fine-tuning: " + (err?.message || "Unknown error")
      );
    }
  }

  function handleCancel() {
    setPolling(false);
    setInfo("Polling cancelled.");
    clearTimeout(pollingRef.current);
  }

  function handleNewJob() {
    setJobId(null);
    setJobStatus(null);
    setOutput(null);
    setError("");
    setInfo("");
    setPolling(false);
    setTouched({});
  }

  const jobActive = polling || (jobStatus && !["COMPLETED", "FAILED"].includes(jobStatus));

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ring-1 ring-indigo-100 dark:ring-gray-800 p-8 mt-8 flex flex-col">
      <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
        Fine-tune LLM (RunPod)
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
        Start a fine-tuning job on your RunPod serverless endpoint using any Hugging Face model and dataset.
      </p>
      {error && <Alert type="error">{error}</Alert>}
      {info && <Alert>{info}</Alert>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Model selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hugging Face Model<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full rounded-lg border px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.modelId && touched.modelId ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
            placeholder="e.g. meta-llama/Llama-2-7b-hf"
            value={modelQuery || modelId}
            autoComplete="off"
            onChange={e => {
              setModelQuery(e.target.value);
              setModelId("");
            }}
            onBlur={() => setTouched(t => ({ ...t, modelId: true }))}
            disabled={jobActive}
            list="hf-model-list"
          />
          <datalist id="hf-model-list">
            {modelSuggestions.map(m => (
              <option key={m.id} value={m.id}>
                {m.id} {m.likes ? `(${m.likes} likes)` : ""}
              </option>
            ))}
          </datalist>
          {modelSuggestions.length > 0 && !modelId && (
            <div className="mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow max-h-40 overflow-y-auto">
              {modelSuggestions.map(m => (
                <div
                  key={m.id}
                  className="px-3 py-1 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950"
                  onClick={() => {
                    setModelId(m.id);
                    setModelQuery(m.id);
                    setModelSuggestions([]);
                  }}
                >
                  <span className="font-mono">{m.id}</span>
                  {m.likes ? (
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                      {m.likes} likes
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          )}
          {errors.modelId && touched.modelId && (
            <span className="text-xs text-red-600">{errors.modelId}</span>
          )}
        </div>
        {/* Dataset */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dataset (HF ID or URL)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full rounded-lg border px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.dataset && touched.dataset ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
            placeholder="e.g. glue/sst2 or https://..."
            value={dataset}
            onChange={e => setDataset(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, dataset: true }))}
            disabled={jobActive}
          />
          {errors.dataset && touched.dataset && (
            <span className="text-xs text-red-600">{errors.dataset}</span>
          )}
        </div>
        {/* API key */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            RunPod API Key<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className={`input input-bordered w-full rounded-lg border px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.apiKey && touched.apiKey ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
            placeholder="sk-..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, apiKey: true }))}
            disabled={jobActive}
          />
          {errors.apiKey && touched.apiKey && (
            <span className="text-xs text-red-600">{errors.apiKey}</span>
          )}
        </div>
        {/* Endpoint ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            RunPod Serverless Endpoint ID<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full rounded-lg border px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.endpointId && touched.endpointId ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
            placeholder="e.g. 123xyzabc"
            value={endpointId}
            onChange={e => setEndpointId(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, endpointId: true }))}
            disabled={jobActive}
          />
          {errors.endpointId && touched.endpointId && (
            <span className="text-xs text-red-600">{errors.endpointId}</span>
          )}
        </div>
        {/* Hyperparameters */}
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Epochs<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              className={`input input-bordered w-full rounded-lg border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.epochs && touched.epochs ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
              value={epochs}
              onChange={e => setEpochs(Number(e.target.value))}
              onBlur={() => setTouched(t => ({ ...t, epochs: true }))}
              disabled={jobActive}
            />
            {errors.epochs && touched.epochs && (
              <span className="text-xs text-red-600">{errors.epochs}</span>
            )}
          </div>
          <div className="w-1/3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Batch Size<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              className={`input input-bordered w-full rounded-lg border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.batchSize && touched.batchSize ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
              value={batchSize}
              onChange={e => setBatchSize(Number(e.target.value))}
              onBlur={() => setTouched(t => ({ ...t, batchSize: true }))}
              disabled={jobActive}
            />
            {errors.batchSize && touched.batchSize && (
              <span className="text-xs text-red-600">{errors.batchSize}</span>
            )}
          </div>
          <div className="w-1/3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Learning Rate<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              min={1e-8}
              className={`input input-bordered w-full rounded-lg border px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.learningRate && touched.learningRate ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
              value={learningRate}
              onChange={e => setLearningRate(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, learningRate: true }))}
              disabled={jobActive}
            />
            {errors.learningRate && touched.learningRate && (
              <span className="text-xs text-red-600">{errors.learningRate}</span>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          {!jobId || ["COMPLETED", "FAILED"].includes(jobStatus) ? (
            <button
              type="submit"
              disabled={jobActive || hasError}
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-indigo-600 text-white shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${jobActive || hasError ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"}`}
            >
              {jobActive ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Starting...
                </>
              ) : (
                "Start fine-tune"
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNewJob}
              className="px-5 py-2.5 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Start another job
            </button>
          )}
          {jobActive && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-lg font-medium bg-red-100 text-red-700 shadow hover:bg-red-200 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {/* Status display */}
      {jobId && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center mb-2 gap-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Job ID:</span>
            <span className="font-mono text-xs break-all text-gray-700 dark:text-gray-300">{jobId}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Status:</span>{" "}
            <span
              className={
                "inline-block rounded px-2 py-0.5 text-xs font-semibold " +
                (jobStatus === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : jobStatus === "FAILED"
                  ? "bg-red-100 text-red-800"
                  : jobStatus === "IN_PROGRESS"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-700")
              }
            >
              {jobStatus || "Checking..."}
            </span>
          </div>
          {jobStatus === "COMPLETED" && output && (
            <div className="mb-2">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Output:</span>
              <pre className="bg-gray-50 dark:bg-gray-800 rounded p-2 mt-1 text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-200 max-h-48 overflow-y-auto">
                {typeof output === "object" ? JSON.stringify(output, null, 2) : output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}