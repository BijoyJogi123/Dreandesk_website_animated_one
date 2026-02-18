# Contact Form Setup Instructions

## Overview
The "Ping Us @ Dreamdesk" contact form in `contact_us.html` collects user information and submits it to a Google Sheets spreadsheet via Google Apps Script.

## Form Location
The form is located in the black section with the heading "PING US @ DREAMDESK" on the contact page.

## Form Fields
The form collects the following information:
- First Name (required)
- Last Name (required)
- Phone Number (required) - Format: +91 9876543210
- State (required)
- District (required)
- Message (required)

## Setup Steps

### 1. Create a Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Dreamdesk Contact Form Submissions" (or any name you prefer)
4. In the first row, add these column headers:
   - A1: Timestamp
   - B1: First Name
   - C1: Last Name
   - D1: Phone
   - E1: State
   - F1: District
   - G1: Message

### 2. Set Up Google Apps Script
1. In your Google Spreadsheet, click on **Extensions** > **Apps Script**
2. Delete any existing code in the script editor
3. Copy the code from `scripts/New Text Document.js` and paste it into the script editor
4. Click **Save** (disk icon) and name your project (e.g., "Contact Form Handler")

### 3. Deploy the Script as a Web App
1. Click on **Deploy** > **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the deployment settings:
   - **Description**: Contact Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Review and authorize the permissions when prompted
6. Copy the **Web app URL** that appears (it will look like: `https://script.google.com/macros/s/...../exec`)

### 4. Update the JavaScript File
1. Open `scripts/contact-form.js`
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with your actual Web app URL from step 3
4. Save the file

Example:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxx.../exec';
```

### 5. Test the Form
1. Open `contact_us.html` in a web browser
2. Scroll to the newsletter/contact section
3. Fill in all the required fields
4. Click the Submit button
5. Check your Google Spreadsheet to see if the data was recorded

## Troubleshooting

### Form doesn't submit
- Check the browser console for errors (F12 > Console tab)
- Verify the Google Apps Script URL is correct in `contact-form.js`
- Make sure the Google Apps Script is deployed with "Anyone" access

### Data not appearing in spreadsheet
- Check that the column headers in your spreadsheet match exactly
- Verify the Apps Script code is saved and deployed
- Check the Apps Script execution logs: Apps Script Editor > Executions

### Phone number shows as formula error
- The script automatically adds a single quote prefix to phone numbers starting with +
- This prevents Google Sheets from interpreting them as formulas

## Button States
The submit button shows different states:
- **Default**: Arrow icon (ready to submit)
- **Loading**: Spinning icon (submitting)
- **Success**: Check icon with green background (submitted successfully)
- **Error**: X icon with red background (submission failed)

## Security Notes
- The form uses `mode: 'no-cors'` which is required for Google Apps Script
- All form data is sent securely over HTTPS
- The Google Apps Script should be deployed with appropriate access controls
- Consider adding reCAPTCHA for production use to prevent spam

## Customization
To modify the form fields:
1. Update the HTML in `contact_us.html` (add/remove input fields)
2. Update the JavaScript in `scripts/contact-form.js` (modify the data object)
3. Update the Google Apps Script (modify the rowData array)
4. Update the spreadsheet column headers accordingly
