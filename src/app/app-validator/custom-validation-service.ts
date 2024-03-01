import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  getErrorMessage_Name_Validation_With_Min_Lenght(
    control: AbstractControl,
    sms1: string,
    sms2: string,
    sms3: string,
    sms4: string,
    sms5: string
  ): string | null {
    if (control.hasError('required')) {
      //Name is required
      return sms1;
    }
    if (control.hasError('requiredSymbol')) {
      //Symbols are not allowed at the beginning
      return sms2;
    }
    if (control.hasError('requiredNumber')) {
      // Numbers are not allowed
      return sms3;
    }
    if (control.hasError('requiredBlankSpace')) {
      // Leading or trailing spaces are not allowed
      return sms4;
    }
    if (control.hasError('minlength')) {
      // Name must be at least ${minTextLength} characters long
      return sms5;
    }
    return null;
  }

  getErrorMessage_Text_Validation_With_Min_Lenght(
    control: AbstractControl,
    sms1: string,
    sms2: string,
    sms3: string
  ): string | null {
    if (control.hasError('required')) {
      //Name is required
      return sms1;
    }
    if (control.hasError('requiredBlankSpace')) {
      // Leading or trailing spaces are not allowed
      return sms2;
    }
    if (control.hasError('minlength')) {
      // Name must be at least ${minTextLength} characters long
      return sms3;
    }
    return null;
  }

  getErrorMessage_Text_Validation_With_Max_Lenght(
    control: AbstractControl,
    maxWordsMessage: string
  ): string | null {
    if (control.hasError('maxLengthExceeded')) {
      // Maximum length exceeded. Maximum length allowed is ${maxTextLength} characters
      return maxWordsMessage;
    }
    return null;
  }
  getErrorMessage_Email_Validator(
    control: AbstractControl,
    sms1: string,
    sms2: string
  ): string | null {
    if (control.hasError('required')) {
      // Email is required.
      return sms1;
    }
    if (control.hasError('invalidEmail')) {
      // Invalid email format.
      return sms2;
    }
    return null;
  }
  getErrorMessage_Password_Validator(
    control: AbstractControl,
    sms1: string,
    sms2: string
  ): string | null {
    if (control.hasError('required')) {
      // Password is required.
      return sms1;
    }
    if (control.hasError('invalidPassword')) {
      // Password must contain at least 8 characters including uppercase, lowercase, number, and special character.
      return sms2;
    }
    return null;
  }

  getErrorMessage_Nnumber_Validation(
    control: AbstractControl,
    sms1: string,
    sms2: string
  ): string | null {
    if (control.hasError('required')) {
      // Number is required
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      // Only numeric values are allowed
      return sms2;
    }
    return null;
  }

  getErrorMessage_Number_Validation_MinLenght(
    control: AbstractControl,
    sms1: string,
    sms2: string,
    sms3: string
  ): string | null {
    if (control.hasError('required')) {
      // Number is required
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      return sms2;
    }
    if (control.hasError('minlength')) {
      // Number must be at least ${minNumberLength} digits long
      return sms3;
    }
    return null;
  }

  getErrorMessage_Decimal_Number_Validation(
    control: AbstractControl,
    sms1: string,
    sms2: string,
    sms3: string
  ): string | null {
    if (control.hasError('required')) {
      // Number is required
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      // Only numeric values are allowed
      return sms2;
    }
    return null;
  }

  getErrorMessage_Mobile_Number_Validation(
    control: AbstractControl,
    sms1: string,
    sms2: string,
    sms3: string
  ): string | null {
    if (control.hasError('required')) {
      // Mobile number is required
      return sms1;
    }
    if (control.hasError('requiredNumber')) {
      // Only numeric values are allowed
      return sms2;
    }
    if (control.hasError('invalidPhoneNumber')) {
      // Mobile number must be 10 digits long
      return sms3;
    }
    return null;
  }

  getErrorMessage_Date_Validation(
    control: AbstractControl,
    sms1: string,
    sms2: string
  ): string | null {
    if (control.hasError('required')) {
      // Date is required
      return sms1;
    }
    if (control.hasError('invalidDate')) {
      // Invalid date format
      return sms2;
    }
    return null;
  }

  getErrorMessage_Zero_Validation(
    control: AbstractControl,
    sms1: string,
    sms2: string
  ): string | null {
    if (control.hasError('required')) {
      // Number is required
      return sms1;
    }
    if (control.hasError('zeroAmount')) {
      // Number must not be zero
      return sms2;
    }
    return null;
  }

  getErrorMessage_Check_Box_Validation(
    control: AbstractControl,
    sms1: string
  ): string | null {
    if (control.hasError('notChecked')) {
      // The Field is not Selected or checked.
      return sms1;
    }
    return null;
  }

  getErrorMessage_Select_Validation(
    control: AbstractControl,
    sms1: string
  ): string | null {
    if (control.hasError('invalidSelect')) {
      // The Field is required
      return sms1;
    }
    return null;
  }
  getErrorMessage_Radio_Button_Validation(
    control: AbstractControl,
    sms1: string
  ): string | null {
    if (control.hasError('invalidGender')) {
      // Please make a selection
      return sms1;
    }
    return null;
  }
}
