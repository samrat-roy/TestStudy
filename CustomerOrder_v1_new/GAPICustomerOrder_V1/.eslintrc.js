module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "no-console": 1,
    "import/no-unresolved":[ 1 , { "commonjs": true, "amd": true}],
    "import/namespace":1,
    "import/default":1,
    "import/export":1,
    "import/named":1,
    "no-unused-vars":1,
    "no-irregular-whitespace":0,
    "no-var":1,
    "indent": [ "error","tab"],
    "quotes": ["error","single"],
    "semi": ["error","always"]
    }
}