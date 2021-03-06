module.exports = {
    "extends": ["airbnb-base", "plugin:react/recommended"],
    "env": {
      "jest": true,
      "browser": true,
      "node": true
    },
    "rules": {
      "no-underscore-dangle": "off",
      "import/no-extraneous-dependencies": "off"
    }
};