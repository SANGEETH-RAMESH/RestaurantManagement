import * as Yup from 'yup';

export const signUpValidation = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, 'Name must be atleast 3 characters')
        .max(15, 'Name cannot be more than 15 characters')
        .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'Invalid name format')
        .required("Please enter your name"),
    
    email:Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Please enter your email'),

    mobile:Yup.string()
    .trim()
    .length(10 ,"Mobile number must be exactly 10 digits")
    .matches(/^[6-9][0-9]{9}$/, "Mobile number must start with a digit between 6 and 9 and be 10 digits long")
		.test('no-consecutive-zeros', 'Mobile number cannot contain more than 5 consecutive zeros', value => {
			if (value) {
				return !/^0{6,}$/.test(value);
			}
			return true;
		})
        .required("Please enter you mobile"),

        password:Yup.string()
        .trim()
        .min(8,"Password must be atlease 8 characters")
        .max(15 ,"Password cannot be more than 15 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.matches(/[\W_]/, "Password must contain at least one special character")
        .required("Please enter you password")
})

export const signInValidation = Yup.object({
	email: Yup.string()
		.trim()
		.matches(/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
		.required("Please enter your email"),

	password: Yup.string()
		.trim()
		.required("Please enter your password"),
});

export const forgotPasswordValidation = Yup.object({
	email: Yup.string()
		.trim()
		.matches(/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
		.required("Please enter your email"),
});