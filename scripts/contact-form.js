// Contact Form Submission Handler for "Ping Us @ Dreamdesk" Form
// Replace YOUR_GOOGLE_APPS_SCRIPT_URL with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://docs.google.com/spreadsheets/d/1mUij8nIe2yYpjCsKf2S0zeXSNVF1zuSASRwa5QQZ8sc/edit?gid=0#gid=0';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pingUsForm');
  
  if (!form) {
    console.error('Ping Us form not found');
    return;
  }
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      state: formData.get('state'),
      district: formData.get('district'),
      message: formData.get('message')
    };
    
    // Get submit button
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonCircle = submitButton.querySelector('.framer-lzsu97');
    const arrowIcon = submitButton.querySelector('[data-framer-name="Arrow"]');
    const spinnerIcon = submitButton.querySelector('[data-framer-name="Spinner"]');
    const checkIcon = submitButton.querySelector('[data-framer-name="Check"]');
    const xIcon = submitButton.querySelector('[data-framer-name="X"]');
    
    // Show loading state
    submitButton.disabled = true;
    arrowIcon.style.opacity = '0';
    spinnerIcon.style.opacity = '1';
    spinnerIcon.style.animation = 'spin 1s linear infinite';
    
    try {
      // Send data to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Show success state
      spinnerIcon.style.opacity = '0';
      spinnerIcon.style.animation = 'none';
      checkIcon.style.opacity = '1';
      buttonCircle.style.backgroundColor = '#4CAF50'; // Green color
      
      // Reset form
      form.reset();
      
      // Show success message
      alert('Thank you! Your message has been submitted successfully. We will get back to you soon.');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        checkIcon.style.opacity = '0';
        arrowIcon.style.opacity = '1';
        buttonCircle.style.backgroundColor = 'var(--token-c4d2a39c-ba1b-4ddf-bd4f-3123809edf2a, rgb(255, 255, 255))';
        submitButton.disabled = false;
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error state
      spinnerIcon.style.opacity = '0';
      spinnerIcon.style.animation = 'none';
      xIcon.style.opacity = '1';
      buttonCircle.style.backgroundColor = '#f44336'; // Red color
      
      // Show error message
      alert('Sorry, there was an error submitting your form. Please try again or contact us directly.');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        xIcon.style.opacity = '0';
        arrowIcon.style.opacity = '1';
        buttonCircle.style.backgroundColor = 'var(--token-c4d2a39c-ba1b-4ddf-bd4f-3123809edf2a, rgb(255, 255, 255))';
        submitButton.disabled = false;
      }, 3000);
    }
  });
});

// Add spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
