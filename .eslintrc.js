module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "es2021": true
    },
    "globals": {
        "UrlFetchApp": "readonly",
        "Logger": "readonly",
        "SpreadsheetApp": "readonly"
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
