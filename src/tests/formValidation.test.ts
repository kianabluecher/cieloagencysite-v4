import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateURL,
  validatePhone,
  validateTextField,
  validatePassword,
  validateSelect,
  validateCheckboxArray,
  validateFullName,
  validateBudget,
  validateCompanyName,
  validateForm,
} from '../utils/formValidation';

describe('validateEmail', () => {
  it('returns error for empty email', () => {
    expect(validateEmail('')).toEqual({ isValid: false, error: 'Email is required' });
    expect(validateEmail('   ')).toEqual({ isValid: false, error: 'Email is required' });
  });

  it('returns error for invalid email format', () => {
    expect(validateEmail('notanemail').isValid).toBe(false);
    expect(validateEmail('missing@domain').isValid).toBe(false);
    expect(validateEmail('@nodomain.com').isValid).toBe(false);
    expect(validateEmail('spaces in@email.com').isValid).toBe(false);
  });

  it('accepts valid emails', () => {
    expect(validateEmail('user@example.com')).toEqual({ isValid: true });
    expect(validateEmail('name.last@domain.org')).toEqual({ isValid: true });
    expect(validateEmail('user+tag@sub.domain.com')).toEqual({ isValid: true });
  });
});

describe('validateURL', () => {
  it('returns error when required and empty', () => {
    expect(validateURL('', true)).toEqual({ isValid: false, error: 'Website URL is required' });
  });

  it('accepts empty when not required', () => {
    expect(validateURL('', false)).toEqual({ isValid: true });
    expect(validateURL('   ', false)).toEqual({ isValid: true });
  });

  it('accepts valid URLs with protocol', () => {
    expect(validateURL('https://example.com').isValid).toBe(true);
    expect(validateURL('http://www.example.com').isValid).toBe(true);
    expect(validateURL('https://sub.domain.co.uk').isValid).toBe(true);
  });

  it('accepts valid URLs without protocol (auto-prepends https)', () => {
    expect(validateURL('example.com').isValid).toBe(true);
    expect(validateURL('www.example.com').isValid).toBe(true);
  });

  it('rejects invalid URLs', () => {
    expect(validateURL('not a url').isValid).toBe(false);
  });
});

describe('validatePhone', () => {
  it('returns error when required and empty', () => {
    expect(validatePhone('', true)).toEqual({ isValid: false, error: 'Phone number is required' });
  });

  it('accepts empty when not required', () => {
    expect(validatePhone('', false)).toEqual({ isValid: true });
    expect(validatePhone('   ', false)).toEqual({ isValid: true });
  });

  it('accepts valid phone numbers', () => {
    expect(validatePhone('1234567890').isValid).toBe(true);
    expect(validatePhone('(123) 456-7890').isValid).toBe(true);
    expect(validatePhone('+1-123-456-7890').isValid).toBe(true);
    expect(validatePhone('123.456.7890').isValid).toBe(true);
  });

  it('rejects phone numbers with too few digits', () => {
    expect(validatePhone('12345').isValid).toBe(false);
    expect(validatePhone('12345').error).toBe('Phone number must be at least 10 digits');
  });

  it('rejects phone numbers with too many digits', () => {
    expect(validatePhone('1234567890123456').isValid).toBe(false);
    expect(validatePhone('1234567890123456').error).toBe('Phone number is too long');
  });
});

describe('validateTextField', () => {
  it('returns error when required and empty', () => {
    const result = validateTextField('', 'Name');
    expect(result).toEqual({ isValid: false, error: 'Name is required' });
  });

  it('accepts empty when not required', () => {
    expect(validateTextField('', 'Name', 2, undefined, false)).toEqual({ isValid: true });
  });

  it('enforces minimum length', () => {
    const result = validateTextField('a', 'Name', 2);
    expect(result).toEqual({ isValid: false, error: 'Name must be at least 2 characters' });
  });

  it('enforces maximum length', () => {
    const result = validateTextField('a'.repeat(101), 'Name', 2, 100);
    expect(result).toEqual({ isValid: false, error: 'Name must be less than 100 characters' });
  });

  it('accepts valid text within bounds', () => {
    expect(validateTextField('Hello', 'Name', 2, 100)).toEqual({ isValid: true });
    expect(validateTextField('Jo', 'Name', 2)).toEqual({ isValid: true });
  });

  it('uses custom minimum length', () => {
    expect(validateTextField('abc', 'Description', 5).isValid).toBe(false);
    expect(validateTextField('abcde', 'Description', 5).isValid).toBe(true);
  });
});

describe('validatePassword', () => {
  it('returns error for empty password', () => {
    expect(validatePassword('')).toEqual({ isValid: false, error: 'Password is required' });
  });

  it('returns error for short password', () => {
    expect(validatePassword('Ab1').error).toBe('Password must be at least 8 characters');
  });

  it('requires uppercase letter', () => {
    expect(validatePassword('abcdefg1').error).toBe('Password must contain at least one uppercase letter');
  });

  it('requires lowercase letter', () => {
    expect(validatePassword('ABCDEFG1').error).toBe('Password must contain at least one lowercase letter');
  });

  it('requires a number', () => {
    expect(validatePassword('Abcdefgh').error).toBe('Password must contain at least one number');
  });

  it('accepts valid passwords', () => {
    expect(validatePassword('Password1')).toEqual({ isValid: true });
    expect(validatePassword('Str0ngP@ss')).toEqual({ isValid: true });
    expect(validatePassword('MyP4ssword')).toEqual({ isValid: true });
  });
});

describe('validateSelect', () => {
  it('returns error when required and empty', () => {
    expect(validateSelect('', 'a category')).toEqual({ isValid: false, error: 'Please select a category' });
  });

  it('accepts empty when not required', () => {
    expect(validateSelect('', 'a category', false)).toEqual({ isValid: true });
  });

  it('accepts any non-empty value', () => {
    expect(validateSelect('option1', 'a category')).toEqual({ isValid: true });
  });
});

describe('validateCheckboxArray', () => {
  it('returns error when not enough items selected', () => {
    expect(validateCheckboxArray([], 'service')).toEqual({
      isValid: false,
      error: 'Please select at least 1 service',
    });
  });

  it('returns error with plural when minRequired > 1', () => {
    expect(validateCheckboxArray(['one'], 'service', 2)).toEqual({
      isValid: false,
      error: 'Please select at least 2 services',
    });
  });

  it('accepts when enough items selected', () => {
    expect(validateCheckboxArray(['a'], 'service')).toEqual({ isValid: true });
    expect(validateCheckboxArray(['a', 'b', 'c'], 'service', 2)).toEqual({ isValid: true });
  });
});

describe('validateFullName', () => {
  it('returns error for empty name', () => {
    expect(validateFullName('')).toEqual({ isValid: false, error: 'Full name is required' });
    expect(validateFullName('   ')).toEqual({ isValid: false, error: 'Full name is required' });
  });

  it('returns error for single character', () => {
    expect(validateFullName('A').error).toBe('Name must be at least 2 characters');
  });

  it('requires first and last name (space)', () => {
    expect(validateFullName('John').error).toBe('Please enter your full name (first and last name)');
  });

  it('rejects names with invalid characters', () => {
    expect(validateFullName('John 123').error).toBe('Name can only contain letters, spaces, hyphens, and apostrophes');
    expect(validateFullName('John @Doe').isValid).toBe(false);
  });

  it('accepts valid full names', () => {
    expect(validateFullName('John Doe')).toEqual({ isValid: true });
    expect(validateFullName("Mary-Jane O'Brien")).toEqual({ isValid: true });
    expect(validateFullName('Jean-Pierre du Pont')).toEqual({ isValid: true });
  });
});

describe('validateBudget', () => {
  it('returns error when required and empty', () => {
    expect(validateBudget('')).toEqual({ isValid: false, error: 'Please select a budget range' });
  });

  it('accepts empty when not required', () => {
    expect(validateBudget('', false)).toEqual({ isValid: true });
  });

  it('accepts any non-empty value', () => {
    expect(validateBudget('$5k-$10k')).toEqual({ isValid: true });
  });
});

describe('validateCompanyName', () => {
  it('returns error when required and empty', () => {
    expect(validateCompanyName('', true)).toEqual({ isValid: false, error: 'Company name is required' });
  });

  it('accepts empty when not required', () => {
    expect(validateCompanyName('', false)).toEqual({ isValid: true });
  });

  it('returns error for single character', () => {
    expect(validateCompanyName('A').error).toBe('Company name must be at least 2 characters');
  });

  it('accepts valid company names', () => {
    expect(validateCompanyName('Cielo Agency')).toEqual({ isValid: true });
    expect(validateCompanyName('AB')).toEqual({ isValid: true });
  });
});

describe('validateForm', () => {
  it('returns valid when all rules pass', () => {
    const formData = { email: 'user@example.com', name: 'John Doe' };
    const rules = {
      email: (v: string) => validateEmail(v),
      name: (v: string) => validateFullName(v),
    };
    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns errors for failing fields', () => {
    const formData = { email: '', name: 'A' };
    const rules = {
      email: (v: string) => validateEmail(v),
      name: (v: string) => validateFullName(v),
    };
    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Email is required');
    expect(result.errors.name).toBe('Name must be at least 2 characters');
  });

  it('only includes errors for failing fields', () => {
    const formData = { email: 'valid@test.com', name: '' };
    const rules = {
      email: (v: string) => validateEmail(v),
      name: (v: string) => validateFullName(v),
    };
    const result = validateForm(formData, rules);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeUndefined();
    expect(result.errors.name).toBeDefined();
  });
});
