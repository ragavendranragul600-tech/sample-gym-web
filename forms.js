/* ========================================
   IRONFORGE FITNESS - FORMS HANDLER
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.log('Contact form not found on page');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleContactFormSubmit(this);
    });
}

/**
 * Handle Contact Form Submission
 */
async function handleContactFormSubmit(form) {
    const statusEl = document.getElementById('formStatus');
    
    // Collect form data
    const formData = {
        name: form.querySelector('#name').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        email: form.querySelector('#email').value.trim(),
        interested_program: form.querySelector('#program').value.trim(),
        message: form.querySelector('#message').value.trim()
    };
    
    // Reset status display
    statusEl.style.display = 'none';
    statusEl.className = 'form-status';
    
    // Validate form fields
    const validation = validateContactForm(formData);
    if (!validation.valid) {
        showFormError(statusEl, validation.message);
        return;
    }
    
    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    
    try {
        // Check if Supabase is configured
        if (!window.DatabaseService.isConfigured()) {
            // Demo mode - just show success message
            showFormSuccess(
                statusEl,
                'Demo mode: Form submitted successfully. In production, this would be saved to our database.'
            );
            form.reset();
            return;
        }
        
        // Submit to Supabase
        await window.DatabaseService.submitContactEnquiry(formData);
        
        // Show success message
        showFormSuccess(
            statusEl,
            'Thank you! Your enquiry has been received. Our team will contact you within 2 hours.'
        );
        
        // Clear form
        form.reset();
        
        // Log for analytics
        console.log('✓ Contact enquiry submitted:', formData);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError(statusEl, getErrorMessage(error));
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'SEND ENQUIRY →';
    }
}

/**
 * Validate Contact Form
 */
function validateContactForm(data) {
    // Check required fields
    if (!data.name) {
        return {
            valid: false,
            message: 'Please enter your full name'
        };
    }
    
    if (data.name.length < 2) {
        return {
            valid: false,
            message: 'Please enter a valid name (at least 2 characters)'
        };
    }
    
    if (!data.phone) {
        return {
            valid: false,
            message: 'Please enter your phone number'
        };
    }
    
    // Validate phone (at least 10 digits)
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
        return {
            valid: false,
            message: 'Please enter a valid phone number (at least 10 digits)'
        };
    }
    
    if (!data.email) {
        return {
            valid: false,
            message: 'Please enter your email address'
        };
    }
    
    // Validate email format
    if (!isValidEmailFormat(data.email)) {
        return {
            valid: false,
            message: 'Please enter a valid email address'
        };
    }
    
    // Message is optional but if provided, minimum length check
    if (data.message && data.message.length > 500) {
        return {
            valid: false,
            message: 'Message is too long (maximum 500 characters)'
        };
    }
    
    return {
        valid: true,
        message: 'Validation passed'
    };
}

/**
 * Validate Email Format
 */
function isValidEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Get User-Friendly Error Message
 */
function getErrorMessage(error) {
    if (!error) {
        return 'An unknown error occurred. Please try again.';
    }
    
    const message = error.message || error.toString();
    
    if (message.includes('Invalid email')) {
        return 'Please enter a valid email address';
    }
    
    if (message.includes('phone')) {
        return 'Please enter a valid phone number';
    }
    
    if (message.includes('network') || message.includes('fetch')) {
        return 'Network error. Please check your connection and try again.';
    }
    
    if (message.includes('Supabase')) {
        return 'Database error. Please try again later or contact support.';
    }
    
    return `Error: ${message}`;
}

/**
 * Show Form Success Message
 */
function showFormSuccess(statusEl, message) {
    statusEl.className = 'form-status success';
    statusEl.textContent = message;
    statusEl.style.display = 'block';
    
    // Scroll to message
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Show Form Error Message
 */
function showFormError(statusEl, message) {
    statusEl.className = 'form-status error';
    statusEl.textContent = message;
    statusEl.style.display = 'block';
    
    // Scroll to message
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Format Phone Input (auto-format as user types)
 */
function formatPhoneInput(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 15) {
        value = value.slice(0, 15);
    }
    
    // Apply formatting (e.g., +91 98765 43210)
    if (value.length > 0) {
        if (value.startsWith('91') && value.length === 12) {
            event.target.value = `+${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 10)} ${value.slice(10)}`;
        } else if (value.length >= 10) {
            event.target.value = `+91 ${value.slice(-10, -5)} ${value.slice(-5)}`;
        } else {
            event.target.value = value;
        }
    }
}

/**
 * Add phone input event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneInput);
    });
});

/**
 * Handle Trial Request
 * This can be called from the CTA button
 */
function submitTrialRequest() {
    const contact = document.getElementById('contactForm');
    if (contact) {
        // Scroll to form
        contact.scrollIntoView({ behavior: 'smooth' });
        // Focus on name field
        contact.querySelector('#name').focus();
    }
}

// Expose globally
window.submitTrialRequest = submitTrialRequest;
window.validateContactForm = validateContactForm;