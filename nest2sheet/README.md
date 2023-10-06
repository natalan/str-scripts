### Nest thermostat logs in Google Sheets
Based on https://www.benlcollins.com/apps-script/nest-thermostat/

### Setup
Follow the link above
Add GlobalVariables.js with the following content
```javascript
/**
 * Global Variables
 */
const PROJECT_ID = 'XXX';
const OAUTH_CLIENT_ID = 'XXX';
const OAUTH_CLIENT_SECRET = 'XXX';
const THERMOSTAT_ID = 'XXX'
const LOGS_SHEET = 'Logs';
const THERMOSTAT_SHEET = "Thermostat"
```
And then change XXX according to the tutorial above