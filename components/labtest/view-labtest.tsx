import { LabTest, Patient, Services } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { format } from "date-fns";

interface ExtendedProps extends LabTest {
  patient: Patient;
  services: Services;
}
export const ViewLabTest = ({ data }: { data: ExtendedProps }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"link"}
          className="bg-blue-20 text-blue-500 font-normal"
        >
          View
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lab Test Details</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">
          Patient:{" "}
          <strong>
            {data.patient.first_name} {data.patient.last_name}
          </strong>
        </p>
        <p className="text-gray-600">Service: {data.services.name}</p>
        <p className="text-gray-600">
          Date: {format(data.test_date!, "yyyy-MM-dd h:m a")}
        </p>
        <p className="text-gray-600">
          Note: <span className="italic text-sm">{data?.notes || "N/A"}</span>
        </p>
        <p className="text-gray-600">Status: {data.status}</p>
        <p className="text-gray-600">Result: {data.result || "N/A"}</p>
        <p className="text-gray-600">
          Notes:{" "}
          <span className="italic text-sm">{data.resultNote || "N/A"}</span>
        </p>

        <DialogClose asChild>
          <Button size={"sm"} variant={"outline"} className="mt-4">
            OK
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
