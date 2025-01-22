import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Drug, IssuedDrug } from "@prisma/client";

import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";

interface Props extends IssuedDrug {
  drug: Drug;
}

export const IssuedDrugs = ({ data }: { data: Props[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="view-btn">View</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ISSUED DRUGS</DialogTitle>
        </DialogHeader>

        <div>
          <Table>
            <TableHeader>
              <TableRow className="lg:uppercase">
                <TableHead>Drug Id</TableHead>
                <TableHead>Drug Name</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((el, index) => (
                <TableRow key={el.id}>
                  <TableCell>{el?.drugId}</TableCell>
                  <TableCell>{el?.drug.name}</TableCell>
                  <TableCell>{el?.quantity} Items</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
