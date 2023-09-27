// Fetch iCal content from Airbnb, VRBO, and Booking.com
const fetchICal = () => {
   try {
    const airbnbContent = UrlFetchApp.fetch("AIRBNB_iCAL").getContentText();
    const vrboContent = UrlFetchApp.fetch("VRBO_iCAL").getContentText();
    const bookingContent = UrlFetchApp.fetch("BOOKING_iCAL").getContentText();
    return {
      Airbnb: parseICal(airbnbContent),
      VRBO: parseICal(vrboContent),
      Booking: parseICal(bookingContent),
    };
  } catch (error) {
    Logger.log('Error in fetchICal: ' + error.toString());
    return null;
  }
};

const parseICalDate = (dateStr, hours) => {
  const year = dateStr.substring(0, 4);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is 0-based
  const day = parseInt(dateStr.substring(6, 8), 10);

  const date = new Date(year, month, day);
  date.setHours(hours);

  return date;
};

const parseICal = (icalContent) => {
  const lines = icalContent.split('\n');
  const events = [];
  let currentEvent = null;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    switch (true) {
      case trimmedLine === 'BEGIN:VEVENT':
        currentEvent = {};
        break;
      case trimmedLine.startsWith('DTSTART'):
        currentEvent.checkIn = parseICalDate(trimmedLine.split(':')[1], 16);
        break;
      case trimmedLine.startsWith('DTEND'):
        currentEvent.checkOut = parseICalDate(trimmedLine.split(':')[1], 11);
        break;
      case trimmedLine.startsWith('UID'):
        currentEvent.uid = trimmedLine.split(':')[1];
        break;
      case trimmedLine === 'END:VEVENT':
        events.push(currentEvent);
        currentEvent = null;
        break;
      default:
        break;
    }
  });

  return events;
};

// Add this function to set up Conditional Formatting
const setConditionalFormatting = (sheet, startRow, numRows) => {
  const range = sheet.getRange(startRow, 5, numRows, 1); // Column 5 is the "Status" column

  const rule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Tentative')
    .setBackground('#FFFFCC')
    .setRanges([range])
    .build();

  const rule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Confirmed')
    .setBackground('#CCFFCC')
    .setRanges([range])
    .build();

  const rule3 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Cleaning Completed')
    .setBackground('#CCCCFF')
    .setRanges([range])
    .build();

  const rules = sheet.getConditionalFormatRules();
  rules.push(rule1, rule2, rule3);
  sheet.setConditionalFormatRules(rules);
};

// Update Google Spreadsheet
const updateSpreadsheet = (data) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Source', 'UID', 'Check In', 'Check Out', 'Status']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const existingData = sheet.getRange(2, 1, sheet.getLastRow(), 5).getValues();
  const newData = [];

  for (const [source, bookings] of Object.entries(data)) {
    for (const booking of bookings) {
      const uid = booking.uid;
      const existingRow = existingData.find(row => row[1] === uid);
      if (!existingRow) {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);

        newData.push([source, uid, checkIn, checkOut, 'Tentative']);
      }
    }
  }

  if (newData.length > 0) {
    const startRow = sheet.getLastRow() + 1;
    const addedRange = sheet.getRange(startRow, 1, newData.length, 5);
    addedRange.setValues(newData);

    // Set DateTime formatting for new rows
    sheet.getRange(startRow, 3, newData.length, 2).setNumberFormat("dddd, mmmm d, yyyy, h:mm AM/PM");

    // Add data validation for Status column for new rows
    const rule = SpreadsheetApp.newDataValidation()
                                .requireValueInList(['Tentative', 'Confirmed', 'Cleaning Completed'])
                                .build();
    sheet.getRange(startRow, 5, newData.length, 1).setDataValidation(rule);

    // Call the function to set conditional formatting
    setConditionalFormatting(sheet, startRow, newData.length);
  }

  // Sort records by Check-In date (Column 3)
  sheet.sort(3, true);

  Logger.log(`Updated ${newData.length} new records.`);
};

// Main function
const main = () => {
  const data = fetchICal();
  updateSpreadsheet(data);
};

ScriptApp.newTrigger('main')
  .timeBased()
  .everyMinutes(60)
  .create();
