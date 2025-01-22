"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AppointmentSchema } from "@/lib/schema";
import { generateTimes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewAppointment } from "@/app/actions/appointment";
import { toast } from "sonner";
import { Form, FormField } from "../ui/form";
import { CustomInput } from "../custom-inputs";
import { APPOINTMENT_TYPES } from "../forms/add-appointment";

export const BookAppointmentForm = ({
  name,
  id,
  specialization,
  patient_id,
}: {
  name: string;
  id: string;
  specialization: string;
  patient_id: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const appointmentTimes = generateTimes(8, 17, 30);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      doctor_id: id,
      appointment_date: "",
      time: "",
      type: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AppointmentSchema>> = async (
    values
  ) => {
    try {
      setIsSubmitting(true);
      const newData = { ...values, patient_id: patient_id };

      const data = await createNewAppointment(newData);

      if (data.success) {
        form.reset({});
        router.refresh();
        toast.success("Appointment created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Book Appointment</DialogTitle>

        <div>
          <div>
            <p className="text-sm">
              Book an appointment with{" "}
              <strong className="text-base font-semibold uppercase">
                {name}
              </strong>
              , {specialization}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-5 2xl:mt-10"
            >
              <CustomInput
                type="select"
                selectList={APPOINTMENT_TYPES}
                control={form.control}
                name="type"
                label="Appointment Type"
                placeholder="Select a appointment type"
              />

              <div className="flex items-center gap-2">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="appointment_date"
                  placeholder=""
                  label="Date"
                  inputType="date"
                />
                <CustomInput
                  type="select"
                  control={form.control}
                  name="time"
                  placeholder="Select time"
                  label="Time"
                  selectList={appointmentTimes}
                />
              </div>

              <CustomInput
                type="textarea"
                control={form.control}
                name="note"
                placeholder="Additional note"
                label="Additional Note"
              />

              <Button disabled={isSubmitting} type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
