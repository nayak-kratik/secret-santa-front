// Get the base API URL from the environment variables.
const BASE_URL = process.env.REACT_APP_API_URL || "";
console.log("API URL:", process.env.REACT_APP_API_URL);

// Generic wrapper for all HTTP methods
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, body, ...rest } = options;

  // Prepare fetch options with defaults
  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  };

  // If a body is provided, stringify it for JSON payloads
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  // Perform the actual fetch call using the full URL
  const res = await fetch(`${BASE_URL}${url}`, fetchOptions);

  // Handle non-2xx responses by throwing a proper err
  if (!res.ok) {
    let error;
    try {
      error = await res.json();
    } catch {
      error = { message: "Unknown error" };
    }
    throw new Error(error.message || "API Error");
  }

  // Return the JSON response
  return res.json();
}

export const api = {
  // Make a GET request
  get: (url, options) => apiFetch(url, { ...options, method: "GET" }),

  // Make a POST request
  post: (url, body, options) =>
    apiFetch(url, { ...options, method: "POST", body }),

  // Make a PUT request
  put: (url, body, options) =>
    apiFetch(url, { ...options, method: "PUT", body }),

  // Make a DELETE request
  delete: (url, options) => apiFetch(url, { ...options, method: "DELETE" }),
};
