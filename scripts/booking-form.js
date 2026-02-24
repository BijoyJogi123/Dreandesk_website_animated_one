// Booking Form Submission Handler for "Book Your Free Session" Form
// Google Apps Script URL for booking form submissions
const BOOKING_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzW1Km1rvEeu6cNFmzskgnJ8qhkXU4Sk4PyNQ9opi_Aa0OTLkD1AVGu7c6ctetMWxqIRA/exec';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  const modal = document.getElementById('bookingFormModal');
  const closeButton = document.getElementById('closeModal');
  
  if (!form) {
    console.error('Booking form not found');
    return;
  }
  
  console.log('✅ Booking form handler initialized');
  
  // Close modal when clicking X button
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }
  
  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Form submission handler
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('📝 Form submission started');
    
    // Get form inputs
    const nameInput = document.getElementById('studentName');
    const emailInput = document.getElementById('studentEmail');
    const phoneInput = document.getElementById('studentPhone');
    
    // Validate all fields
    let isValid = true;
    let errorMessage = '';
    
    // Validate name
    const nameValue = nameInput.value.trim();
    if (!nameValue) {
      isValid = false;
      errorMessage = 'Please enter your full name';
      nameInput.style.borderColor = '#f44336';
      nameInput.focus();
    } else if (nameValue.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters';
      nameInput.style.borderColor = '#f44336';
      nameInput.focus();
    }
    
    // Validate email
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      isValid = false;
      errorMessage = 'Please enter your email address';
      emailInput.style.borderColor = '#f44336';
      if (isValid) emailInput.focus();
    } else if (!emailRegex.test(emailValue)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
      emailInput.style.borderColor = '#f44336';
      if (isValid) emailInput.focus();
    }
    
    // Validate phone
    const phoneValue = phoneInput.value.replace(/\D/g, '');
    if (!phoneValue) {
      isValid = false;
      errorMessage = 'Please enter your phone number';
      phoneInput.style.borderColor = '#f44336';
      if (isValid) phoneInput.focus();
    } else if (phoneValue.length < 10 || phoneValue.length > 15) {
      isValid = false;
      errorMessage = 'Phone number must be 10-15 digits';
      phoneInput.style.borderColor = '#f44336';
      if (isValid) phoneInput.focus();
    }
    
    // If validation fails, show error and stop
    if (!isValid) {
      console.log('❌ Validation failed:', errorMessage);
      alert('❌ ' + errorMessage);
      return;
    }
    
    console.log('✅ Validation passed');
    
    // Prepare data
    const data = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      formType: 'Booking Form'
    };
    
    console.log('📤 Sending data:', data);
    
    // Get submit button
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    submitButton.style.opacity = '0.7';
    submitButton.style.cursor = 'not-allowed';
    
    try {
      // Send data to Google Apps Script using no-cors mode
      // Note: no-cors means we can't read the response, but it will work
      await fetch(BOOKING_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      console.log('✅ Data sent successfully (no-cors mode)');
      
      // Show success state (we assume success with no-cors)
      submitButton.textContent = '✓ Submitted!';
      submitButton.style.backgroundColor = '#4CAF50'; // Green color
      submitButton.style.opacity = '1';
      
      // Show success message
      setTimeout(() => {
        alert('🎉 Thank you for booking!\n\nYour free session request has been submitted successfully.\n\nOur team will contact you within 24 hours to confirm your session.\n\nCheck your email for confirmation details.');
        
        // Close modal FIRST (before resetting form to avoid validation errors)
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
        }
        
        // Reset form AFTER closing modal
        setTimeout(() => {
          form.reset();
          
          // Reset input borders
          nameInput.style.borderColor = '';
          emailInput.style.borderColor = '';
          phoneInput.style.borderColor = '';
          
          // Reset button
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = '';
          submitButton.style.opacity = '';
          submitButton.style.cursor = '';
          submitButton.disabled = false;
        }, 300); // Small delay to ensure modal is closed
        
      }, 1000);
      
    } catch (error) {
      console.error('❌ Error submitting booking form:', error);
      
      // Show error state
      submitButton.textContent = '✗ Error';
      submitButton.style.backgroundColor = '#f44336'; // Red color
      submitButton.style.opacity = '1';
      
      // Show error message
      setTimeout(() => {
        alert('❌ Oops! Something went wrong.\n\nPlease try again or contact us directly at:\n📞 +91 9093 9093 56\n📧 info@dreamdesk.in');
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.style.backgroundColor = '';
        submitButton.style.opacity = '';
        submitButton.style.cursor = '';
        submitButton.disabled = false;
      }, 1000);
    }
  });
  
  // Phone number validation - only allow numbers
  const phoneInput = document.getElementById('studentPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Remove any non-digit characters
      let value = e.target.value.replace(/\D/g, '');
      
      // Limit to 15 digits
      if (value.length > 15) {
        value = value.slice(0, 15);
      }
      
      e.target.value = value;
    });
    
    // Add visual feedback for valid/invalid phone
    phoneInput.addEventListener('blur', function(e) {
      const value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 0 && (value.length < 10 || value.length > 15)) {
        e.target.style.borderColor = '#f44336';
        e.target.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
      } else if (value.length >= 10) {
        e.target.style.borderColor = '#4CAF50';
        e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
      } else {
        e.target.style.borderColor = '';
        e.target.style.boxShadow = '';
      }
    });
    
    phoneInput.addEventListener('focus', function(e) {
      e.target.style.borderColor = '#f2d803';
      e.target.style.boxShadow = '0 0 0 3px rgba(242, 216, 3, 0.1)';
    });
  }
  
  // Email validation feedback
  const emailInput = document.getElementById('studentEmail');
  if (emailInput) {
    emailInput.addEventListener('blur', function(e) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (e.target.value && !emailRegex.test(e.target.value)) {
        e.target.style.borderColor = '#f44336';
        e.target.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
      } else if (e.target.value) {
        e.target.style.borderColor = '#4CAF50';
        e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
      } else {
        e.target.style.borderColor = '';
        e.target.style.boxShadow = '';
      }
    });
    
    emailInput.addEventListener('focus', function(e) {
      e.target.style.borderColor = '#f2d803';
      e.target.style.boxShadow = '0 0 0 3px rgba(242, 216, 3, 0.1)';
    });
  }
  
  // Name validation - only allow letters and spaces
  const nameInput = document.getElementById('studentName');
  if (nameInput) {
    nameInput.addEventListener('input', function(e) {
      // Allow only letters, spaces, and common name characters
      e.target.value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
    });
    
    nameInput.addEventListener('blur', function(e) {
      const value = e.target.value.trim();
      
      if (value.length > 0 && value.length < 2) {
        e.target.style.borderColor = '#f44336';
        e.target.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
      } else if (value.length >= 2) {
        e.target.style.borderColor = '#4CAF50';
        e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
      } else {
        e.target.style.borderColor = '';
        e.target.style.boxShadow = '';
      }
    });
    
    nameInput.addEventListener('focus', function(e) {
      e.target.style.borderColor = '#f2d803';
      e.target.style.boxShadow = '0 0 0 3px rgba(242, 216, 3, 0.1)';
    });
  }
  
  console.log('✅ Booking form handler initialized');
});

// Add smooth transitions for form inputs
const style = document.createElement('style');
style.textContent = `
  #bookingForm input {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  #bookingForm .submit-btn {
    transition: all 0.3s ease;
  }
  
  #bookingForm .submit-btn:disabled {
    cursor: not-allowed !important;
  }
`;
document.head.appendChild(style);
