import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidation {  
  // Name is required (any text).
  // Symbols are not allowed at the beginning.
  // Numbers are not allowed at the beginning.
  // Leading or trailing spaces are not allowed.
  // Name must be at least 3 characters long.
    static name_Validation_With_Min_Lenght(min_text_lenght:number): ValidatorFn {
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
    // Text must be at least 1 character long.
    static text_Validation_With_Min_Lenght(min_number:number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        
        const value = control.value;
        if (value === null || value === undefined || typeof value !== 'string') {
          return null; 
        }
        if (value.trim().length !== value.length) {
          return { requiredBlankSpace: true };
        }
        if (value.trim().length < min_number) {
          return { minlength: true };
        } else {
          return null;
        }
      };
    }

  
    // Text is required (any text).
    // Leading or trailing spaces are not allowed.
    // Text must be at least 1 character long.
static text_Validation_With_Max_Lenght(min_text_lenght:number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === null || value === undefined || typeof value !== 'string') {
      return null; 
    }
    if (value.trim().length > min_text_lenght) {
      return { maxLengthExceeded: true };
    }
    return null;
  };
}

static email_Validator(): ValidatorFn {
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
static password_Validator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    // Define your password validation rules here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Check if the password meets all validation criteria
    const valid = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter && value.length >= minLength;

    // Return validation result
    return valid ? null : { invalidPassword: true };
  };
}
// Number is required  (0-9)
    static number_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9]/; 
        if (value === null || value === undefined || value === '' || isNaN(value)) {
          return { required: true };
        }
        if (invalidCharsRegex.test(value)) {
          return { requiredNumber: true };
        }
        return null;
      };
    }
    // Number is required  (0-9)
    // The Number must be at 1 digits long.
    static number_Validation_MinLenght(min_number_lenght:number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9]/; 
    
        if (value === null || value === undefined || value === '' || isNaN(value) || value < min_number_lenght) {
          return { required: true};
        }
    
        if (invalidCharsRegex.test(value)) {
          return { requiredNumber: true };
        }
    
        return null;
      };
    }
    
    // Number Or Decimal number is required.  
    static decimal_Number_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9.]+(\.\d+)?$/;
        if (value === null || value === undefined || value === '' || isNaN(value)) {
          return { required: true };
        }
        if (invalidCharsRegex.test(value)) {
          return { requiredNumber: true };
        }
        return null;
      };
    }
  // 10 Digit number is required.  
    static mobile_Number_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const invalidCharsRegex = /[^0-9]/;
        if (value === null || value === undefined || value === '' || isNaN(value)) {
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
    static date_Validation(): ValidatorFn {
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
    static zero_Number_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;

        if (value === 0 || value === '0' || value === 0.0 || value === '0.0') {
          return { zeroAmount: true };
        }
        return null;
      };
    }
  
    static check_Box_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value !== true) {
          return { notChecked: true };
        }
        return null;
      };
    }

    static select_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (!value || value === 'default') {
          return { invalidSelect: true };
        }
        return null;
      };
    }

    
  
    static radio_Button_Validation(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value !== 'male' && value !== 'female') {
          return { invalidGender: true };
        }
        return null;
      };
    }
  }
  