// Form Validation Utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

// URL validation
export const validateURL = (url: string, required: boolean = true): ValidationResult => {
  if (!url.trim()) {
    if (required) {
      return { isValid: false, error: 'Website URL is required' };
    }
    return { isValid: true };
  }
  
  try {
    // Add protocol if missing
    const urlToValidate = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
    
    new URL(urlToValidate);
    
    // Check for valid domain pattern
    const domainRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
    if (!domainRegex.test(urlToValidate)) {
      return { isValid: false, error: 'Please enter a valid website URL' };
    }
    
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid website URL (e.g., https://example.com)' };
  }
};

// Phone number validation
export const validatePhone = (phone: string, required: boolean = true): ValidationResult => {
  if (!phone.trim()) {
    if (required) {
      return { isValid: false, error: 'Phone number is required' };
    }
    return { isValid: true };
  }
  
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it has at least 10 digits
  if (digitsOnly.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' };
  }
  
  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number is too long' };
  }
  
  return { isValid: true };
};

// Text field validation
export const validateTextField = (
  value: string, 
  fieldName: string, 
  minLength: number = 2, 
  maxLength?: number,
  required: boolean = true
): ValidationResult => {
  if (!value.trim()) {
    if (required) {
      return { isValid: false, error: `${fieldName} is required` };
    }
    return { isValid: true };
  }
  
  if (value.trim().length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (maxLength && value.trim().length > maxLength) {
    return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }
  
  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

// Select/dropdown validation
export const validateSelect = (value: string, fieldName: string, required: boolean = true): ValidationResult => {
  if (!value && required) {
    return { isValid: false, error: `Please select ${fieldName}` };
  }
  
  return { isValid: true };
};

// Checkbox array validation (at least one required)
export const validateCheckboxArray = (
  values: string[], 
  fieldName: string, 
  minRequired: number = 1
): ValidationResult => {
  if (values.length < minRequired) {
    return { 
      isValid: false, 
      error: `Please select at least ${minRequired} ${fieldName}${minRequired > 1 ? 's' : ''}` 
    };
  }
  
  return { isValid: true };
};

// Full name validation
export const validateFullName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: 'Full name is required' };
  }
  
  // Check if it has at least 2 characters
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  // Check if it contains at least one space (first and last name)
  if (!name.includes(' ')) {
    return { isValid: false, error: 'Please enter your full name (first and last name)' };
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  return { isValid: true };
};

// Budget validation
export const validateBudget = (budget: string, required: boolean = true): ValidationResult => {
  if (!budget && required) {
    return { isValid: false, error: 'Please select a budget range' };
  }
  
  return { isValid: true };
};

// Company name validation
export const validateCompanyName = (companyName: string, required: boolean = true): ValidationResult => {
  if (!companyName.trim() && required) {
    return { isValid: false, error: 'Company name is required' };
  }
  
  if (companyName.trim().length > 0 && companyName.trim().length < 2) {
    return { isValid: false, error: 'Company name must be at least 2 characters' };
  }
  
  return { isValid: true };
};

// Form data validator - validates entire form object
export const validateForm = (
  formData: Record<string, any>,
  validationRules: Record<string, (value: any) => ValidationResult>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.keys(validationRules).forEach(field => {
    const result = validationRules[field](formData[field]);
    if (!result.isValid && result.error) {
      errors[field] = result.error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
