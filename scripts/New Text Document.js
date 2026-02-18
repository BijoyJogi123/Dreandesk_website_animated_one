function doPost(e) {
  try {
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    
    // Format phone number as plain text by adding a single quote prefix
    // This prevents Google Sheets from interpreting the + as a formula
    let phoneNumber = data.phone;
    if (phoneNumber && phoneNumber.startsWith('+')) {
      phoneNumber = "'" + phoneNumber; // Add single quote to prevent formula interpretation
    }
    
    // Prepare row data
    const rowData = [
      new Date(), // Timestamp
      data.firstName,
      data.lastName,
      phoneNumber, // Now with single quote prefix
      data.state,
      data.district,
      data.message
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}