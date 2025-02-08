import { z } from "zod";
import { DrugCategory } from "./types/pharmacy";

export const PatientFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(30, "`First name must be at most 30 characters"),
  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(30, "`Last name must be at most 30 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required!" }),
  phone: z.string().min(10, "Enter phone number"), //.max(10, "Enter phone number"),
  email: z.string().email("Invalid email address."),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  marital_status: z.enum(
    ["married", "single", "divorced", "widowed", "separated"],
    { message: "Marital status is required." }
  ),
  emergency_contact_name: z
    .string()
    .min(2, "Emergency contact name is required.")
    .max(50, "Emergency contact must be at most 50 characters"),
  emergency_contact_number: z.string().min(10, "Enter phone number"),
  // .max(10, "Enter phone number"),
  relation: z.enum(["mother", "father", "husband", "wife", "other"], {
    message: "Relations with contact person required",
  }),
  blood_group: z.string().optional(),
  allergies: z.string().optional(),
  medical_conditions: z.string().optional(),
  medical_history: z.string().optional(),
  insurance_provider: z.string().optional(),
  insurance_number: z.string().optional(),
  privacy_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the privacy policy.",
    }),
  service_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the terms of service.",
    }),
  medical_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the medical treatment terms.",
    }),
  img: z.string().optional(),

  primaryPhysician: z.string().optional(),
});

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const ProductFormSchema = z.object({
  name: z.string().min(3, "Product Name must be at least 3 characters long"),
  priceInCedis: z.number().min(0.01, "Price must be greater than 0"),
  description: z.string().min(1, "Description is required").optional(),
  image: z.instanceof(File).optional(),
  stockStatus: z.enum(["AVAILABLE", "OUT_OF_STOCK"]).default("AVAILABLE"),
  isAvailableForPurchase: z.boolean().default(true),
});

// export const ProductFormSchema = z.object({
//   productName: z.string().min(3, { message: "Minimum 3 characters required" }),
//   priceInCedis: z
//     .string()
//     .refine((val) => !isNaN(parseFloat(val)), {
//       message: "Price must be a number",
//     })
//     .transform((val) => parseFloat(val)), // Add the transform here
//   description: z.string().optional(),
//   stockStatus: z.enum(["AVAILABLE", "OUT_OF_STOCK"]),
//   isAvailableForPurchase: z.boolean(),
//   imagePath: z.any().optional(),
// });

// export const ProductFormSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   priceInCedis: z.coerce.number().int().min(1),
//   image: imageSchema.refine((file) => file.size > 0, "Required"),
// });

// export const UserFormSchema = z.object({
//   first_name: z
//     .string()
//     .trim()
//     .min(2, "First name must be at least 2 characters.")
//     .max(30, "`First name must be at most 30 characters"),
//   last_name: z
//     .string()
//     .trim()
//     .min(2, "Last name must be at least 2 characters.")
//     .max(30, "`Last name must be at most 30 characters"),
//   date_of_birth: z.string().optional(), // Optional, in case it's not required for a regular user
//   gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required!" }),
//   phone: z.string().min(10, "Enter phone number"),
//   email: z.string().email("Invalid email address."),
//   address: z
//     .string()
//     .min(5, "Address must be at least 5 characters")
//     .max(500, "Address must be at most 500 characters")
//     .optional(), // Optional for users who do not need delivery information
//   isPatient: z.boolean().default(false), // Flag to indicate if the user is also a patient
//   // Optional emergency contact details for users who are patients
//   emergency_contact_name: z
//     .string()
//     .min(2, "Emergency contact name is required.")
//     .max(50, "Emergency contact must be at most 50 characters")
//     .optional(),
//   emergency_contact_number: z.string().min(10, "Enter phone number").optional(),
//   relation: z.enum(["mother", "father", "husband", "wife", "other"]).optional(), // Optional, for patient users only
//   img: z.string().optional(),
//   // Consent fields - only required for users who are also patients
//   privacy_consent: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, {
//       message: "You must agree to the privacy policy.",
//     })
//     .optional(), // Optional for non-patients
//   service_consent: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, {
//       message: "You must agree to the terms of service.",
//     })
//     .optional(), // Optional for non-patients
//   medical_consent: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, {
//       message: "You must agree to the medical treatment terms.",
//     })
//     .optional(), // Optional for non-patients
// });

export const workingDaySchema = z.object({
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  start_time: z.string(),
  close_time: z.string(),
});

export const DoctorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z.string().min(10, "Enter phone number").max(10, "Enter phone number"),
  email: z.string().email("Invalid email address."),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  specialization: z.string().min(2, "Specialization is required."),
  license_number: z.string().min(2, "License number is required"),
  type: z.enum(["FULL", "PART"], { message: "Type is required." }),
  department: z.string().min(2, "Department is required."),
  img: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
});
export const WorkingDaysSchema = z.array(workingDaySchema).optional();

export const StaffSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  role: z.enum(["NURSE", "LABORATORY", "PHARMACY", "ACCOUNT"], {
    message: "Role is required.",
  }),
  phone: z
    .string()
    .min(10, "Contact must be 10-digits")
    .max(10, "Contact must be 10-digits"),
  email: z.string().email("Invalid email address."),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  license_number: z.string().optional(),
  department: z.string().optional(),
  img: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
});

export const AppointmentSchema = z.object({
  doctor_id: z.string().min(1, "Select physician"),
  type: z.string().min(1, "Select type of appointment"),
  appointment_date: z.string().min(1, "Select appointment date"),
  time: z.string().min(1, "Select appointment time"),
  note: z.string().optional(),
});

export const VitalSignsSchema = z.object({
  patient_id: z.string(),
  medical_id: z.string(),

  body_temperature: z.coerce
    .number({
      message: "Enter recorded body temperature",
    })
    .min(1, { message: "Body temperature must be greater than 0" }),

  heartRate: z.string().min(1, "Enter recorded heartbeat rate"),

  systolic: z.coerce
    .number({
      message: "Enter recorded systolic blood pressure",
    })
    .min(1, { message: "Systolic blood pressure must be greater than 0" }),

  diastolic: z.coerce
    .number({
      message: "Enter recorded diastolic blood pressure",
    })
    .min(1, { message: "Diastolic blood pressure must be greater than 0" }),

  respiratory_rate: z.coerce
    .number()
    // .min(1, { message: "Respiratory rate must be greater than 0" })
    .optional(),

  oxygen_saturation: z.coerce
    .number()
    // .min(1, { message: "Oxygen saturation must be greater than 0" })
    .optional(),

  weight: z.coerce
    .number({
      message: "Enter recorded weight (Kg)",
    })
    .min(1, { message: "Weight must be greater than 0" }),

  height: z.coerce
    .number({
      message: "Enter recorded height (Cm)",
    })
    .min(1, { message: "Height must be greater than 0" }),
});

export const DiagnosisSchema = z.object({
  patient_id: z.string(),
  medical_id: z.string(),
  doctor_id: z.string(),
  symptoms: z.string({ message: "Symptoms required" }),
  diagnosis: z.string({ message: "Diagnosis required" }),
  notes: z.string().optional(),
  prescribed_medications: z.string().optional(),
  follow_up_plan: z.string().optional(),
});

export const ServicesSchema = z.object({
  name: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  tat: z.string().min(1, {
    message: "Turn around time is required.",
  }),
  description: z.string().optional(),
  department: z.enum(["GENERAL", "LABORATORY"]).default("GENERAL"),
});

export const PaymentSchema = z.object({
  id: z.string(),
  bill_date: z.coerce.date(),
  discount: z.string({ message: "discount" }),
  total_amount: z.string(),
});

export const PatientBillSchema = z.object({
  payment_id: z.string(),
  service_name: z.string(),
  service_date: z.string(),
  appointment_id: z.string(),
  quantity: z.string({ message: "Quantity is required" }),
  unit_cost: z.string({ message: "Unit cost is required" }),
  total_cost: z.string({ message: "Total cost is required" }),
});

export const LabRequestSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  recordId: z.string().min(1, "Medical ID is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  age: z.string().min(1, "Age must be a positive number"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender",
  }),
  testTypes: z.array(z.string()).min(1, "Please select at least one test type"),
  priority: z.enum(["routine", "urgent", "stat"], {
    required_error: "Please select priority level",
  }),
  requestDate: z.string().min(1, "Request date is required"),
  specialInstructions: z.string().optional(),
});

export const LabResultSchema = z.object({
  testId: z.string().min(1, "Test ID is required"),
  testDate: z.string().min(1, "Test date is required"),
  result: z.string().min(1, "Result is required"),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"], {
    message: "Status is required!",
  }),
  notes: z.string().optional(),
});

export const drugSchema = z.object({
  name: z.string().min(1, "Drug name is required"),
  category: z.nativeEnum(DrugCategory, {
    required_error: "Category is required",
  }),
  batchNumber: z.string().min(1, "Batch number is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  pricePerUnit: z.number().min(0, "Price must be 0 or greater"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  description: z.string().optional(),
});

export const invoiceSchema = z.object({
  providerName: z.string().min(1, "Provider name is required"),
  purchaseDate: z.date(),
  notes: z.string().optional(),
});
