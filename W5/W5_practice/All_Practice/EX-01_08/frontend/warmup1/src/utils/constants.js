// API Configuration and Constants
export const API_CONFIG = {
  BASE_URL: "http://localhost:5000",
  TIMEOUT: 10000,
};

export const ROUTES = {
  HOME: "/",
  ARTICLE_DETAIL: "/articles/:id",
  ARTICLE_EDIT: "/articles/:id/edit",
};

export const MESSAGES = {
  LOADING: "Loading...",
  ERROR: "Error occurred",
  SUCCESS: "Success!",
  DELETE_CONFIRM: (title) => `Delete "${title}"?`,
};
