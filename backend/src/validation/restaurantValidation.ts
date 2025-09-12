import * as Yup from "yup";

export const restaurantValidation = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Restaurant must be at least 3 characters")
    .max(50, "Restaurant name cannot be more than 50 characters")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Invalid name format")
    .required("Please enter restaurant name"),

  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address cannot be more than 100 characters")
    .required("Please enter restaurant address"),

  phone: Yup.string()
    .trim()
    .length(10, "Phone number must be exactly 10 digits")
    .matches(/^[6-9][0-9]{9}$/, "Phone must start with 6-9 and be 10 digits")
    .required("Please enter phone number"),

  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Please enter email"),

  hours: Yup.number()
    .typeError("Hours must be a number")
    .min(1, "Hours must be at least 1")
    .max(24, "Hours cannot exceed 24")
    .required("Please enter working hours"),

  cuisine: Yup.string()
    .trim()
    .min(3, "Cuisine must be at least 3 characters")
    .max(30, "Cuisine cannot be more than 30 characters")
    .required("Please enter cuisine type"),
});
