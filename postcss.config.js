const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssNesting = require("postcss-nesting");
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.jsx", "./public/index.html"],

  // defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  }
});

module.exports = {
  plugins: [
    tailwind,
    autoprefixer,
    postcssNesting,
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
