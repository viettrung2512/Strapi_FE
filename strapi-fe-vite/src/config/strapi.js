// import axios from 'axios';

// // ✅ For Vite - use import.meta.env
// const strapiConfig = {
//   baseURL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337',
//   apiToken: import.meta.env.VITE_STRAPI_API_TOKEN,
// };

// // ✅ Axios instance với authentication
// export const strapiAPI = axios.create({
//   baseURL: strapiConfig.baseURL,
//   headers: {
//     'Authorization': `Bearer ${strapiConfig.apiToken}`,
//     'Content-Type': 'application/json',
//   },
// });

// // ✅ Helper function cho media URLs
// export const getStrapiMedia = (url) => {
//   if (!url) return null;
//   if (url.startsWith('http') || url.startsWith('//')) return url;
//   return `${strapiConfig.baseURL}${url}`;
// };

// // ✅ API endpoints
// export const API_ENDPOINTS = {
//   ARTICLES: '/api/articles',
//   UPLOAD: '/api/upload',
// };

// export default strapiConfig;