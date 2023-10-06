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

### Result
<img width="1624" alt="image" src="https://github.com/natalan/str-scripts/assets/276187/f8862f8a-d067-4509-b691-49ebb6b6d7c4">
<img width="1624" alt="image" src="https://github.com/natalan/str-scripts/assets/276187/624441a7-8a33-40cc-8e38-b75fd2a99a57">
