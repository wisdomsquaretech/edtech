// components/Auth/FormFields.tsx
import React from "react";

export const FormFields = ({ formData, errors, isLoginMode, userType, handleChange }: any) => (
  <>
    {!isLoginMode && (
      <>
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="input" required />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </>
    )}
    <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" required />
    {errors.email && <p className="error">{errors.email}</p>}
    {!isLoginMode && (
      <>
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input" required />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </>
    )}
    <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input" required />
    {errors.password && <p className="error">{errors.password}</p>}
    {!isLoginMode && (
      <input name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="input" required />
    )}
    {userType === "tutor" && !isLoginMode && (
      <>
        {/* <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm input"
              required
            >
              <option value="">Select Subject Expertise</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
        {errors.subject && <p className="error">{errors.subject}</p>}
        <input name="experience" placeholder="Years of Experience" type="number" value={formData.experience} onChange={handleChange} className="input" required />
        {errors.experience && <p className="error">{errors.experience}</p>}
        <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} className="input" required />
        {errors.qualification && <p className="error">{errors.qualification}</p>} */}
      </>
    )}
  </>
);
