export default interface SignupFormData {
  username: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  passwordConfirmation: FormDataEntryValue;
  dob: FormDataEntryValue;
  message: string;
  error: boolean;
  weakPassword: boolean;
  noPasswordMatch: boolean;
  usernameExists: boolean;
  emailExists: boolean;
  [key: string]: unknown;
}
