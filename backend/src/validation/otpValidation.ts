import * as Yup from 'yup';

export const otpValidation = Yup.object({
    email: Yup.string()
        .trim()
        .matches(
            /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        )
        .required('Please enter your email'),

    otp: Yup.string()
        .trim()
        .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
        .required('Please enter the OTP'),
})