import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = response.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/admin/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Public API endpoints
export const publicApi = {
  // Sermons
  getSermons: (params?: { page?: number; page_size?: number; category?: string; speaker?: string }) =>
    api.get("/sermons", { params }),
  getSermon: (id: string) => api.get(`/sermons/${id}`),
  getSermonCategories: () => api.get("/sermons/categories/list"),
  getSpeakers: () => api.get("/sermons/speakers/list"),
  getSeries: () => api.get("/sermons/series/list"),

  // Blogs
  getBlogs: (params?: { page?: number; page_size?: number; category?: string }) =>
    api.get("/blogs", { params }),
  getBlog: (slug: string) => api.get(`/blogs/${slug}`),
  getBlogCategories: () => api.get("/blogs/categories/list"),
  getBlogTags: () => api.get("/blogs/tags/list"),

  // Events
  getEvents: (params?: { page?: number; page_size?: number; event_type?: string; upcoming?: boolean }) =>
    api.get("/events", { params }),
  getEvent: (id: string) => api.get(`/events/${id}`),
  getWeeklySchedule: () => api.get("/events/weekly/schedule"),
  getEventTypes: () => api.get("/events/types/list"),

  // Team
  getTeamMembers: () => api.get("/team"),
  getTeamMember: (id: string) => api.get(`/team/${id}`),

  // Contact
  submitContact: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
    api.post("/contact", data),

  // Subscriptions
  subscribe: (data: { email: string; name?: string }) => api.post("/subscribe", data),
  unsubscribe: (email: string) => api.post("/subscribe/unsubscribe", null, { params: { email } }),

  // Prayer
  submitPrayer: (data: { name?: string; email?: string; request: string; is_private?: boolean }) =>
    api.post("/prayer", data),
};

// Admin API endpoints
export const adminApi = {
  // Auth
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  refresh: (refreshToken: string) => api.post("/auth/refresh", { refresh_token: refreshToken }),
  getMe: () => api.get("/auth/me"),

  // Dashboard
  getDashboardStats: () => api.get("/admin/dashboard/stats"),

  // Sermons
  createSermon: (data: unknown) => api.post("/admin/sermons", data),
  updateSermon: (id: string, data: unknown) => api.put(`/admin/sermons/${id}`, data),
  deleteSermon: (id: string) => api.delete(`/admin/sermons/${id}`),

  // Blogs
  createBlog: (data: unknown) => api.post("/admin/blogs", data),
  updateBlog: (id: string, data: unknown) => api.put(`/admin/blogs/${id}`, data),
  deleteBlog: (id: string) => api.delete(`/admin/blogs/${id}`),

  // Events
  createEvent: (data: unknown) => api.post("/admin/events", data),
  updateEvent: (id: string, data: unknown) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id: string) => api.delete(`/admin/events/${id}`),

  // Team
  createTeamMember: (data: unknown) => api.post("/admin/team", data),
  updateTeamMember: (id: string, data: unknown) => api.put(`/admin/team/${id}`, data),
  deleteTeamMember: (id: string) => api.delete(`/admin/team/${id}`),

  // Messages
  getMessages: (params?: { page?: number; page_size?: number; is_read?: boolean }) =>
    api.get("/admin/contacts", { params }),
  markMessageRead: (id: string) => api.post(`/admin/contacts/${id}/mark-read`),

  // Subscriptions
  getSubscriptions: (params?: { page?: number; page_size?: number; is_active?: boolean }) =>
    api.get("/admin/subscriptions", { params }),

  // Prayers
  getPrayers: (params?: { page?: number; page_size?: number; is_private?: boolean; is_prayed_for?: boolean }) =>
    api.get("/admin/prayers", { params }),
  markPrayerPrayed: (id: string) => api.post(`/admin/prayers/${id}/mark-prayed`),
};
