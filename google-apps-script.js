/**
 * Google Apps Script for DreamDesk Forms
 * Handles both Contact Form and Booking Form submissions
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and use it in your forms
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    // Prevent concurrent writes from overwriting each other
    lock.waitLock(30000);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType || "Unknown";
    
    // Route to appropriate handler based on form type
    if (formType === "Booking Form") {
      handleBookingForm(ss, data);
    } else if (formType === "Contact Form" || data.firstName) {
      handleContactForm(ss, data);
    } else {
      // Fallback: try to detect form type by fields present
      if (data.name && data.email && data.phone && !data.firstName) {
        handleBookingForm(ss, data);
      } else {
        handleContactForm(ss, data);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        "result": "success",
        "message": "Form submitted successfully",
        "formType": formType
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error: " + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        "result": "error", 
        "error": error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle Booking Form submissions
 * Fields: name, email, phone
 */
function handleBookingForm(ss, data) {
  let sheet = ss.getSheetByName("Booking Forms");
  
  if (!sheet) {
    sheet = ss.insertSheet("Booking Forms");
    // Add headers
    sheet.appendRow([
      "Timestamp", 
      "Name", 
      "Email", 
      "Phone",
      "Form Type"
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 5);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f2d803");
    headerRange.setFontColor("#000000");
  }
  
  // Append data row
  const row = [
    new Date(),           // Timestamp
    data.name || "",      // Name
    data.email || "",     // Email
    data.phone || "",     // Phone
    "Booking Form"        // Form Type
  ];
  
  sheet.appendRow(row);
  
  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, 5);
  
  Logger.log("Booking form submitted: " + data.name);
}

/**
 * Handle Contact Form submissions (Ping Us form)
 * Fields: firstName, lastName, phone, state, district, message
 */
function handleContactForm(ss, data) {
  let sheet = ss.getSheetByName("Contact Forms");
  
  if (!sheet) {
    sheet = ss.insertSheet("Contact Forms");
    // Add headers
    sheet.appendRow([
      "Timestamp", 
      "First Name", 
      "Last Name", 
      "Phone", 
      "State", 
      "District", 
      "Message",
      "Form Type"
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f2d803");
    headerRange.setFontColor("#000000");
  }
  
  // Append data row
  const row = [
    new Date(),              // Timestamp
    data.firstName || "",    // First Name
    data.lastName || "",     // Last Name
    data.phone || "",        // Phone
    data.state || "",        // State
    data.district || "",     // District
    data.message || "",      // Message
    "Contact Form"           // Form Type
  ];
  
  sheet.appendRow(row);
  
  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, 8);
  
  Logger.log("Contact form submitted: " + data.firstName + " " + data.lastName);
}

/**
 * Optional: Test function to verify script works
 * Run this from the script editor to test
 */
function testBookingForm() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        formType: "Booking Form"
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

function testContactForm() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        phone: "9876543210",
        state: "Test State",
        district: "Test District",
        message: "This is a test message",
        formType: "Contact Form"
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
