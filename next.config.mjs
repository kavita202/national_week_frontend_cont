export default {
  images: {
    domains: [
      "www.freepnglogos.com",
      "www.logolynx.com",
      "nodejs.org",
      "encrypted-tbn0.gstatic.com",
      "seeklogo.com",
      "pbs.twimg.com",
      "www.smartsheet.com",
      "iconape.com",
      "nimbus-screenshots.s3.amazonaws.com",
      "images.assetsdelivery.com",
    ],
  },
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    API_URL: process.env.API_URL,
  },
};
