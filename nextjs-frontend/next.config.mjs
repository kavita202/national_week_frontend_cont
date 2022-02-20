// import withAntdLess from "next-plugin-antd-less";
// import withPlugins from "next-compose-plugins";

// export default withPlugins(
//   [
//     withAntdLess({
//       modifyVars: {
//         "@THEME--DARK": "theme-dark",
//       },
//       lessVarsFilePath: "./pages/app.less",
//       cssLoaderOptions: {
//         esModule: true,
//         sourceMap: false,
//         modules: {
//           mode: "local",
//           localIdentName: "[hash:2]",
//         },
//       },
//     }),
//   ],
//   {
//     webpack: (config, { isServer }) => {
//       if (isServer) {
//         const antStyles = /antd\/.*?\/style.*?/;
//         const origExternals = [...config.externals];
//         config.externals = [
//           (context, request, callback) => {
//             if (request.match(antStyles)) return callback();
//             if (typeof origExternals[0] === "function") {
//               origExternals[0](context, request, callback);
//             } else {
//               callback();
//             }
//           },
//           ...(typeof origExternals[0] === "function" ? [] : origExternals),
//         ];

//         config.module.rules.unshift({
//           test: antStyles,
//           use: "null-loader",
//         });
//       }

//       const builtInLoader = config.module.rules.find((rule) => {
//         if (rule.oneOf) {
//           return (
//             rule.oneOf.find((deepRule) => {
//               return deepRule.test && deepRule.test.toString().includes("/a^/");
//             }) !== undefined
//           );
//         }
//         return false;
//       });

//       if (typeof builtInLoader !== "undefined") {
//         config.module.rules.push({
//           oneOf: [
//             ...builtInLoader.oneOf.filter((rule) => {
//               return (
//                 (rule.test && rule.test.toString().includes("/a^/")) !== true
//               );
//             }),
//           ],
//         });
//       }

//       config.resolve.alias["@"] = path.resolve(__dirname);
//       return config;
//     },

export default {
  images: {
    domains: [
      "www.freepnglogos.com",
      "images.ukdissertations.com",
      "www.kindpng.com",
      "cdn.vectorstock.com",
      "pluginicons.craft-cdn.com",
      "upload.wikimedia.org",
      "seeklogo.com",
      "encrypted-tbn0.gstatic.com",
      "nodejs.org",
      "www.logolynx.com",
      "miro.medium.com",
    ],
  },
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  },
};
// );
