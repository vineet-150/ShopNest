const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = (endpoint, options = {}) => {
    return fetch(`${API_URL}${endpoint}`, options);
};

export default API_URL;