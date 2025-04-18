// utils/validation.ts
export const validateRegisterForm = (formData: any) => {
    const errors: any = {};
    if (!formData.fullName.trim()) errors.fullName = "Name is required";
    if (formData.password !== formData.confirmPassword) errors.password = "Passwords do not match";
    if (!/^[0-9]{10}$/.test(formData.phone)) errors.phone = "Invalid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email";
    //if (!formData.experience.trim()) errors.experience = "Experience is required";
    return errors;
  };
  