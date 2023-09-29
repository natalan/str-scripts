## Overview

This script automatically fetches iCal data from Airbnb, VRBO, and Booking.com and updates it into a Google Spreadsheet. The spreadsheet includes booking details like UID, Check-In and Check-Out dates, and Status (Tentative, Confirmed, Cleaning Completed).

<img width="1512" alt="image" src="https://github.com/natalan/str-scripts/assets/276187/c47ec8a4-a896-448e-9162-7db2d778618a">


## Requirements

- Google Apps Script environment
- Google Spreadsheet
- Access to Airbnb, VRBO, and Booking.com iCal URLs

## Setup

1. Open Google Apps Script Editor.
2. Copy and paste the code into the editor.
3. Save and run the script.

## How to Use

1. Update the URLs in the `fetchICal` function with your Airbnb, VRBO, and Booking.com iCal URLs.
2. Uncomment the trigger setup lines at the end of the script if you want the script to run automatically at a set interval.
3. Run the main function to execute the script manually.

## Features
- Fetch iCal data from multiple sources.
- Parse iCal dates.
- Add new booking records to a Google Spreadsheet.
- Update existing booking records.
- Handle the case when bookings are cancelled and consequently not included in future iCal payloads.
- Validate and format data in Google Spreadsheet.


##Notes
1. The script fetches and updates the data in batches.
2. You can modify the `parseICal` function to add more fields from the iCal data.
