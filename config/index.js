// export const API_URL = process.env.NEXT_PUBLIC_API_URL;
const dev = process.env.NODE_ENV !== "production";
export const API_URL = dev
  ? "http://localhost:5000"
  : "https://national-project2.herokuapp.com";
