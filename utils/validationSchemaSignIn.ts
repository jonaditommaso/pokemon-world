import * as yup from 'yup';

export const validationSchemaSignIn = yup.object({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username should be of minimum 3 characters length'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
});