import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidation {
  // Name is required (any text).
  // Symbols are not allowed at the beginning.
  // Numbers are not allowed at the beginning.
  // Leading or trailing spaces are not allowed.
  // Name must be at least 3 characters long.
  static nameValidation(min_text_lenght: number): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const symbolRegex = /^[^\w\s]/;
      const numberRegex = /^\d/;

      if (value === null || value === undefined) {
        return null;
      }
      if (symbolRegex.test(value)) {
        return { requiredSymbol: true };
      }
      if (numberRegex.test(value)) {
        return { requiredNumber: true };
      }
      if (value.trim().length !== value.length) {
        return { requiredBlankSpace: true };
      }
      if (value.trim().length < min_text_lenght) {
        return { minlength: true };
      } else {
        return null;
      }
    };
  }
  // Text is required (any text).
  // Leading or trailing spaces are not allowed.
  // The Validator Indicate min Text Length and Max text Length.
  //  min_length: 5, text min Length 5
  // max_length: 10,  text max Length 10
  static textValidation(min_length: number, max_length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      // Check if the value is null, undefined, or not a string
      if (value === null || value === undefined || typeof value !== 'string') {
        return null;
      }

      // Trim the value to remove leading and trailing spaces
      const trimmedValue = value.trim();
      const length = trimmedValue.length;

      // Check for leading or trailing spaces
      if (length !== value.length) {
        return { requiredBlankSpace: true };
      }

      // Check if min_length and max_length are valid numbers
      if (isNaN(min_length) || isNaN(max_length) || min_length < 0 || max_length < 0) {
        return { invalidLength: true };
      }

      // Check if min_length is greater than max_length
      if (min_length > max_length) {
        return { invalidRange: true };
      }

      // Check if the length exceeds the max_length
      if (max_length > 0 && length > max_length) {
        return { maxLengthExceeded: true };
      }

      // Check if the length is less than the min_length
      if (min_length > 0 && length < min_length) {
        return { minlength: true };
      }

      return null; // Return null if the value passes validation
    };
  }


  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const value = control.value;

      if (value && !emailPattern.test(value)) {
        return { invalidEmail: true }; // Set error if email format is invalid
      }
      return null;
    };
  }
  // Password must contain at least 8 characters including uppercase, lowercase, number, and special character.
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      // Define your password validation rules here
      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      // Check if the password meets all validation criteria
      const valid =
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialCharacter &&
        value.length >= minLength;

      // Return validation result
      return valid ? null : { invalidPassword: true };
    };
  }
  static confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordValue = control.get('password')?.value;
      const confirmPasswordValue = control.get('confirmPassword')?.value;

      if (passwordValue === confirmPasswordValue) {
        return null;
      }
      return { passwordMismatch: true };
    };
  }

  // Number is required  (0-9)
  static idValidation(min_number_length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return { required: 'ID is required' }; 
      }
      if (isNaN(control.value)) {
        return { notANumber: 'ID must be a number' }; 
      }
 
      if (control.value.toString().length < min_number_length) {
        const errorMessage = `ID must be at least ${min_number_length} characters long`;
        return { minLength: { errorMessage } };

      }
      if (control.value <= 0) {
        return { notPositive: 'ID must be a positive number' };    }
      if (!/^\d+$/.test(control.value.toString())) {
        return { notInteger: 'ID must be an integer' }; 
      }
      return null; 
    };
  }
  static numberValidation(min_number_length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return { required: 'Value is required' };
      }
      if (isNaN(control.value)) {
        return { notANumber: 'Value must be a number' }; 
      }
      if (control.value.toString().length < min_number_length) {
        const errorMessage = `Value must be at least ${min_number_length} characters long`;
        return { minLength: { errorMessage } };
      }
      if (control.value < 0) {
        return { notPositive: 'Value must be a positive number' };
      }
      if (!/^\d+$/.test(control.value.toString())) {
        return { notInteger: 'Value must be an integer' };
      }
      return null;
    };
  }

  // Number Or Decimal number is required.
  static decimalValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const invalidCharsRegex = /[^0-9.]+(\.\d+)?$/;
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        isNaN(value)
      ) {
        return { required: true };
      }
      if (invalidCharsRegex.test(value)) {
        return { requiredNumber: true };
      }
      return null;
    };
  }
  // 10 Digit number is required.
  static mobileValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const invalidCharsRegex = /[^0-9]/;
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        isNaN(value)
      ) {
        return { required: true };
      }

      if (invalidCharsRegex.test(value)) {
        return { requiredNumber: true };
      }

      if (value.length !== 10) {
        return { invalidPhoneNumber: true };
      }
      return null;
    };
  }
  //Date is required
  static dateValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      // Check if the value is a valid date
      if (!value || isNaN(Date.parse(value))) {
        return { invalidDate: true };
      }
      return null;
    };
  }
  // !0 is required
  static zeroValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value === 0 || value === '0' || value === 0.0 || value === '0.0') {
        return { zeroAmount: true };
      }
      return null;
    };
  }

  static checkBoxValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== true) {
        return { notChecked: true };
      }
      return null;
    };
  }

  static selectionValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || value === 'default') {
        return { invalidSelect: true };
      }
      return null;
    };
  }

  static radioValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== 'male' && value !== 'female') {
        return { invalidGender: true };
      }
      return null;
    };
  }
}
