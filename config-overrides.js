const { override } = require("customize-cra");
// const { override, addBabelPlugin, addWebpackAlias } = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");
module.exports = override(addReactRefresh());
// module.exports = override(addReactRefresh({ disableRefreshCheck: true }));
// module.exports = override(
//   addBabelPlugin("react-hot-loader/babel"),
//   addWebpackAlias({
//     "react-dom":
//       process.env.NODE_ENV === "production"
//         ? "react-dom"
//         : "@hot-loader/react-dom"
//   })
// );

// const { addReactRefresh } = require("customize-cra-react-refresh");
// module.exports = override(addReactRefresh({ disableRefreshCheck: true }));
