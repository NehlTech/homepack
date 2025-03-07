"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createNewPatient, updatePatient } from "@/app/actions/patient";
import { PatientFormSchema } from "@/lib/schema";
import { GENDER, MARITAL_STATUS, RELATION } from "@/utils";
import { Doctor, Patient } from "@prisma/client";
import { CustomInput } from "../custom-inputs";
import { ImageUploader } from "../image-uploader";
import { ProfileImage } from "../profile-image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataProps {
  data?: Patient;
  type: "create" | "update";
  physiciansData: Doctor[];
}

type M_STATUS = "married" | "single" | "divorced" | "widowed" | "separated";
type RELATION_TYPE = "mother" | "father" | "husband" | "wife" | "other";

export const NewPatientForm = ({ data, type, physiciansData }: DataProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imgURL, setImgURL] = useState<any>();

  const userData = {
    first_name: user?.firstName! || "",
    last_name: user?.lastName! || "",
    email: user?.emailAddresses[0].emailAddress || "",
    phone: user?.phoneNumbers.toString() || "",
  };

  const userId = user?.id;

  const form = useForm<z.infer<typeof PatientFormSchema>>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      ...userData,
      date_of_birth: new Date().toISOString().split("T")[0],
      gender: "MALE",
      marital_status: "single" as M_STATUS,
      address: "",
      emergency_contact_name: "",
      emergency_contact_number: "",
      relation: "mother" as RELATION_TYPE,
      blood_group: "",
      allergies: "",
      medical_conditions: "",
      medical_history: "",
      insurance_provider: "",
      insurance_number: "",

      primaryPhysician: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof PatientFormSchema>> = async (
    values
  ) => {
    setLoading(true);
    const res =
      type === "create"
        ? await createNewPatient(
            { ...values, img: imgURL?.secure_url || "" },
            userId!
          )
        : await updatePatient(
            { ...values, img: imgURL?.secure_url || "" },
            userId!
          );

    setLoading(false);
    if (res?.success) {
      toast.success(res?.msg);
      form.reset();
      router.push("/");
    } else {
      console.log(res);
      toast.error("Failed to register, Try again.");
    }
  };

  useEffect(() => {
    if (type === "create") {
      userData && form.reset({ ...userData });
    } else if (type === "update") {
      data &&
        form.reset({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          date_of_birth: new Date(data.date_of_birth)
            .toISOString()
            .split("T")[0],
          gender: data.gender,
          marital_status: data.marital_status as M_STATUS,
          address: data.address,
          emergency_contact_name: data.emergency_contact_name,
          emergency_contact_number: data.emergency_contact_number,
          relation: data.relation as RELATION_TYPE,

          blood_group: data?.blood_group!,
          allergies: data?.allergies! || "",
          medical_conditions: data?.medical_conditions! || "",
          medical_history: data?.medical_history! || "",
          insurance_number: data.insurance_number! || "",
          insurance_provider: data.insurance_provider! || "",

          medical_consent: data.medical_consent,
          privacy_consent: data.privacy_consent,
          service_consent: data.service_consent,
        });
    }
  }, [user, type]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-[#181A1E]">Patient Registration</CardTitle>
        <CardDescription className="text-[#4E545F]">
          Please provide all the information below to help us understand better
          and provide good and quality service to you.
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-lg font-semibold text-[#DAA520]">
              Personal Information
            </h3>
            <>
              {/* PROFILE IMAGE */}

              <ImageUploader
                imgURL={imgURL?.secure_url || data?.img}
                setImgURL={setImgURL}
              />
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-x-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="first_name"
                  placeholder="John"
                  label="First Name"
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="last_name"
                  placeholder="Doe"
                  label="Last Name"
                />
              </div>
              <CustomInput
                type="input"
                control={form.control}
                name="email"
                placeholder="john@example.com"
                label="Email Address"
              />
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-x-4">
                <CustomInput
                  type="select"
                  control={form.control}
                  name="gender"
                  placeholder="Select gender"
                  label="Gender"
                  selectList={GENDER!}
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="date_of_birth"
                  placeholder="01-05-2000"
                  label="Date of Birth"
                  inputType="date"
                />
              </div>
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-x-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="phone"
                  placeholder="9225600735"
                  label="Contact Number"
                />
                <CustomInput
                  type="select"
                  control={form.control}
                  name="marital_status"
                  placeholder="Select marital status"
                  label="Marital Status"
                  selectList={MARITAL_STATUS!}
                />
              </div>
              <CustomInput
                type="input"
                control={form.control}
                name="address"
                placeholder="1479 Street, Apt 1839-G, NY"
                label="Address"
              />
            </>

            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-[#DAA520]">
                Family Information
              </h3>
              <CustomInput
                type="input"
                control={form.control}
                name="emergency_contact_name"
                placeholder="Anne Smith"
                label="Emergency contact name"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="emergency_contact_number"
                placeholder="675444467"
                label="Emergency contact"
              />
              <CustomInput
                type="select"
                control={form.control}
                name="relation"
                placeholder="Select relation with contact person"
                label="Relation"
                selectList={RELATION}
              />
            </div>

            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-[#DAA520]">
                Medical Information
              </h3>

              <CustomInput
                type="input"
                control={form.control}
                name="blood_group"
                placeholder="A+"
                label="Blood group"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="allergies"
                placeholder="Milk"
                label="Allergies"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="medical_conditions"
                placeholder="Medical conditions"
                label="Medical conditions"
              />
              <CustomInput
                type="input"
                control={form.control}
                name="medical_history"
                placeholder="Medical history"
                label="Medical history"
              />
              <div className="flex flex-col lg:flex-row  gap-y-6 items-center gap-2 md:gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="insurance_provider"
                  placeholder="Insurance provider"
                  label="Insurance provider"
                />{" "}
                <CustomInput
                  type="input"
                  control={form.control}
                  name="insurance_number"
                  placeholder="Insurance number"
                  label="Insurance number"
                />
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="primaryPhysician"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E545F]">
                      Primary Physician
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a primary physician" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        {physiciansData?.map((i, id) => (
                          <SelectItem key={id} value={i.id} className="p-2">
                            <div className="flex flex-row gap-2 p-2">
                              <ProfileImage
                                url={i?.img!}
                                name={i?.name}
                                bgColor={i?.colorCode!}
                                textClassName="text-black"
                              />
                              <div>
                                <p className="font-medium text-start ">
                                  {i.name}
                                </p>
                                <span className="text-sm text-gray-600">
                                  {i?.specialization}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {type !== "update" && (
              <div className="">
                <h3 className="text-lg font-semibold mb-2 text-[#DAA520]">
                  Consent
                </h3>

                <div className="space-y-6">
                  <CustomInput
                    name="privacy_consent"
                    label=" Privacy Policy Agreement "
                    placeholder=" I consent to the collection, storage, and use of my
                      personal and health information as outlined in the Privacy
                      Policy. I understand how my data will be used, who it may
                      be shared with, and my rights regarding access,
                      correction, and deletion of my data."
                    type="checkbox"
                    control={form.control}
                  />

                  <CustomInput
                    control={form.control}
                    type="checkbox"
                    name="service_consent"
                    label=" Terms of Service Agreement"
                    placeholder=" I agree to the Terms of Service, including my
                      responsibilities as a user of this healthcare management
                      system, the limitations of liability, and the dispute
                      resolution process. I understand that continued use of
                      this service is contingent upon my adherence to these
                      terms."
                  />

                  <CustomInput
                    control={form.control}
                    type="checkbox"
                    name="medical_consent"
                    label="Informed Consent for Medical Treatment"
                    placeholder="I provide informed consent to receive medical treatment
                      and services through this healthcare management system. I
                      acknowledge that I have been informed of the nature,
                      risks, benefits, and alternatives to the proposed
                      treatments and that I have the right to ask questions and
                      receive further information before proceeding."
                  />
                </div>
              </div>
            )}

            <Button
              disabled={loading}
              type="submit"
              className="w-full md:w-fit px-6 bg-[#DAA520]"
            >
              {type === "create" ? "Submit" : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// import { useUser } from "@clerk/nextjs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// import { createNewPatient, updatePatient } from "@/app/actions/patient";
// import { PatientFormSchema, UserFormSchema } from "@/lib/schema"; // Adjust schema imports
// import { GENDER, MARITAL_STATUS, RELATION } from "@/utils";
// import { Doctor, Patient } from "@prisma/client";
// import { CustomInput } from "../custom-inputs";
// import { ImageUploader } from "../image-uploader";
// import { ProfileImage } from "../profile-image";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { createNewUser, updateUser } from "@/app/actions/new-user";

// interface DataProps {
//   data?: Patient | null;
//   type: "create" | "update";
//   physiciansData: Doctor[];
// }

// type M_STATUS = "married" | "single" | "divorced" | "widowed" | "separated";
// type RELATION_TYPE = "mother" | "father" | "husband" | "wife" | "other";

// export const NewUserForm = ({ data, type, physiciansData }: DataProps) => {
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [imgURL, setImgURL] = useState<any>();
//   const [isPatient, setIsPatient] = useState(true);

//   const userData = {
//     first_name: user?.firstName! || "",
//     last_name: user?.lastName! || "",
//     email: user?.emailAddresses[0].emailAddress || "",
//     phone: user?.phoneNumbers.toString() || "",
//   };

//   const userId = user?.id;

//   // Determine the schema based on the isPatient state
//   const schema = isPatient ? PatientFormSchema : UserFormSchema;

//   // Initialize form with the appropriate schema and default values
//   const form = useForm({
//     resolver: zodResolver(schema), // Dynamically choose schema
//     defaultValues: {
//       ...userData,
//       date_of_birth: new Date().toISOString().split("T")[0],
//       gender: "MALE",
//       marital_status: "single" as M_STATUS,
//       address: "",
//       emergency_contact_name: "",
//       emergency_contact_number: "",
//       relation: "mother" as RELATION_TYPE,
//       blood_group: "",
//       allergies: "",
//       medical_conditions: "",
//       medical_history: "",
//       insurance_provider: "",
//       insurance_number: "",
//       primaryPhysician: "",
//       isPatient: isPatient,
//     },
//   });

//   const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
//     setLoading(true);

//     // Ensure imgURL?.secure_url is either a string or an empty string for img
//     const imgURLString = imgURL?.secure_url || "";

//     // Prepare the values for submission
//     const submissionData = { ...values, img: imgURLString };

//     let res;

//     if (type === "create") {
//       // Handle creation for patient or user
//       res = isPatient
//         ? await createNewPatient(submissionData, userId!)
//         : await createNewUser(submissionData, userId!);
//     } else {
//       // Handle update for patient or user
//       res = isPatient
//         ? await updatePatient(submissionData, userId!)
//         : await updateUser(submissionData, userId!);
//     }

//     setLoading(false);

//     if (res?.success) {
//       toast.success(res?.msg);
//       form.reset();
//       router.push("/");
//     } else {
//       toast.error("Failed to register, Try again.");
//     }
//   };

//   useEffect(() => {
//     if (type === "create") {
//       userData && form.reset({ ...userData });
//     } else if (type === "update") {
//       data &&
//         form.reset({
//           first_name: data.first_name,
//           last_name: data.last_name,
//           email: data.email,
//           phone: data.phone,
//           date_of_birth: new Date(data.date_of_birth)
//             .toISOString()
//             .split("T")[0],
//           gender: data.gender,
//           marital_status: data.marital_status as M_STATUS,
//           address: data.address,
//           emergency_contact_name: data.emergency_contact_name,
//           emergency_contact_number: data.emergency_contact_number,
//           relation: data.relation as RELATION_TYPE,
//           blood_group: data?.blood_group!,
//           allergies: data?.allergies! || "",
//           medical_conditions: data?.medical_conditions! || "",
//           medical_history: data?.medical_history! || "",
//           insurance_number: data.insurance_number! || "",
//           insurance_provider: data.insurance_provider! || "",
//           medical_consent: data.medical_consent,
//           privacy_consent: data.privacy_consent,
//           service_consent: data.service_consent,
//         });
//     }
//   }, [user, type]);

//   return (
//     <Card className="w-full h-full">
//       <CardHeader>
//         <CardTitle className="text-[#181A1E]">
//           {isPatient ? "Patient" : "User"} Registration
//         </CardTitle>
//         <CardDescription className="text-[#4E545F]">
//           Please provide all the information below to help us understand better
//           and provide good service to you.
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="pb-8">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <h3 className="text-lg font-semibold text-[#DAA520]">
//               Personal Information
//             </h3>

//             {/* Toggle between Patient and User */}
//             <Select
//               onValueChange={(value) => setIsPatient(value === "patient")}
//               defaultValue={isPatient ? "patient" : "user"}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select User Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="patient">Patient</SelectItem>
//                 <SelectItem value="user">User</SelectItem>
//               </SelectContent>
//             </Select>

//             <ImageUploader
//               imgURL={imgURL?.secure_url || data?.img}
//               setImgURL={setImgURL}
//             />
//             <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
//               <CustomInput
//                 type="input"
//                 control={form.control}
//                 name="first_name"
//                 placeholder="John"
//                 label="First Name"
//               />
//               <CustomInput
//                 type="input"
//                 control={form.control}
//                 name="last_name"
//                 placeholder="Doe"
//                 label="Last Name"
//               />
//             </div>
//             <CustomInput
//               type="input"
//               control={form.control}
//               name="email"
//               placeholder="john@example.com"
//               label="Email Address"
//             />
//             <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
//               <CustomInput
//                 type="select"
//                 control={form.control}
//                 name="gender"
//                 placeholder="Select gender"
//                 label="Gender"
//                 selectList={GENDER!}
//               />
//               <CustomInput
//                 type="input"
//                 control={form.control}
//                 name="date_of_birth"
//                 placeholder="01-05-2000"
//                 label="Date of Birth"
//                 inputType="date"
//               />
//             </div>

//             {isPatient && (
//               <>
//                 <div className="space-y-8">
//                   <h3 className="text-lg font-semibold text-[#DAA520]">
//                     Medical Information
//                   </h3>
//                   <CustomInput
//                     type="input"
//                     control={form.control}
//                     name="blood_group"
//                     placeholder="A+"
//                     label="Blood group"
//                   />
//                   <CustomInput
//                     type="input"
//                     control={form.control}
//                     name="allergies"
//                     placeholder="Milk"
//                     label="Allergies"
//                   />
//                   <CustomInput
//                     type="input"
//                     control={form.control}
//                     name="medical_conditions"
//                     placeholder="Medical conditions"
//                     label="Medical conditions"
//                   />
//                   <CustomInput
//                     type="input"
//                     control={form.control}
//                     name="medical_history"
//                     placeholder="Medical history"
//                     label="Medical history"
//                   />
//                 </div>
//               </>
//             )}

//             <div className="pt-6">
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };
