# Google Apps Script Setup Guide

This guide will help you deploy the Google Apps Script to handle both Contact Form and Booking Form submissions.

## 📋 What This Script Does

The script handles two types of forms:
1. **Booking Form** - Collects: Name, Email, Phone
2. **Contact Form** - Collects: First Name, Last Name, Phone, State, District, Message

Each form type is saved to a separate sheet in your Google Spreadsheet.

## 🚀 Deployment Steps

### Step 1: Create a Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "DreamDesk Form Submissions" (or any name you prefer)
4. Keep this tab open

### Step 2: Open Apps Script Editor
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. This opens the script editor in a new tab
3. Delete any default code in the editor

### Step 3: Add the Script Code
1. Copy the entire contents of `google-apps-script.js` file
2. Paste it into the Apps Script editor
3. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
4. Name your project "DreamDesk Forms Handler"

### Step 4: Test the Script (Optional but Recommended)
1. In the script editor, select `testBookingForm` from the function dropdown
2. Click **Run** (▶️)
3. You'll be asked to authorize the script - click **Review Permissions**
4. Choose your Google account
5. Click **Advanced** → **Go to DreamDesk Forms Handler (unsafe)**
6. Click **Allow**
7. Check your spreadsheet - you should see a new "Booking Forms" sheet with test data
8. Repeat with `testContactForm` function to test contact form

### Step 5: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: "DreamDesk Forms Handler v1"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. Click **Authorize access** if prompted
7. **IMPORTANT**: Copy the **Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 6: Update Your Website Forms
1. Open `scripts/booking-form.js`
2. Replace the `BOOKING_SCRIPT_URL` with your new Web App URL
3. Open `scripts/contact-form.js`
4. Replace the `GOOGLE_SCRIPT_URL` with the same Web App URL
5. Save both files

## 📊 How Data is Organized

### Booking Forms Sheet
| Timestamp | Name | Email | Phone | Form Type |
|-----------|------|-------|-------|-----------|
| 2024-01-15 10:30 | John Doe | john@example.com | 1234567890 | Booking Form |

### Contact Forms Sheet
| Timestamp | First Name | Last Name | Phone | State | District | Message | Form Type |
|-----------|------------|-----------|-------|-------|----------|---------|-----------|
| 2024-01-15 11:45 | Jane | Smith | 9876543210 | Maharashtra | Mumbai | Hello... | Contact Form |

## 🔧 Troubleshooting

### Issue: "Authorization required"
**Solution**: Run the test functions first to authorize the script before deploying.

### Issue: "Script function not found"
**Solution**: Make sure you saved the script after pasting the code.

### Issue: Forms not submitting
**Solution**: 
1. Check that you copied the correct Web App URL (ends with `/exec`)
2. Make sure you selected "Anyone" for "Who has access"
3. Check browser console for errors

### Issue: Data not appearing in spreadsheet
**Solution**:
1. Check the "Executions" log in Apps Script (View → Executions)
2. Look for error messages
3. Make sure the script has permission to edit the spreadsheet

## 🔄 Updating the Script

If you need to make changes:
1. Edit the code in Apps Script editor
2. Save the changes
3. Click **Deploy** → **Manage deployments**
4. Click the pencil icon ✏️ next to your deployment
5. Change the version to "New version"
6. Click **Deploy**
7. The Web App URL stays the same - no need to update your website

## 📧 Email Notifications (Optional Enhancement)

To receive email notifications when forms are submitted, add this function:

```javascript
function sendEmailNotification(formType, data) {
  const recipient = "your-email@example.com"; // Change this
  const subject = "New " + formType + " Submission - DreamDesk";
  
  let body = "New form submission received:\n\n";
  body += "Form Type: " + formType + "\n";
  body += "Timestamp: " + new Date().toString() + "\n\n";
  
  for (let key in data) {
    body += key + ": " + data[key] + "\n";
  }
  
  MailApp.sendEmail(recipient, subject, body);
}
```

Then call it in `handleBookingForm` and `handleContactForm`:
```javascript
sendEmailNotification("Booking Form", data);
```

## ✅ Verification Checklist

- [ ] Spreadsheet created
- [ ] Script code pasted and saved
- [ ] Test functions run successfully
- [ ] Script authorized
- [ ] Web app deployed with "Anyone" access
- [ ] Web App URL copied
- [ ] booking-form.js updated with URL
- [ ] contact-form.js updated with URL
- [ ] Test submission from website works
- [ ] Data appears in correct sheet

## 🎉 You're Done!

Your forms are now connected to Google Sheets and will automatically save all submissions!
