module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    // Add any custom rules here
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
