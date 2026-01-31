import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    address: z.string().optional(),
  }),
});

const createDoctorValidationSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().nonempty("Contact number is required"),
    address: z.string().optional(),
    registrationNumber: z.string().nonempty("Registration number is required"),
    experience: z.number().int(),
    gender: z.string().nonempty("Gender is required"),
    appointmentFee: z.number().int(),
    qualification: z.string().nonempty("Qualification is required"),
    currentWorkingPlace: z
      .string()
      .nonempty("Current working place is required"),
    designation: z.string().nonempty("Designation is required"),
  }),
});

export const UserValidation = {
  createPatientValidationSchema,
  createDoctorValidationSchema,
};
