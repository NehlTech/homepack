"use client";

import { createDrug, updateDrug } from "@/app/actions/pharmacy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { drugSchema } from "@/lib/schema";
import { DrugCategory } from "@/lib/types/pharmacy";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { DrugFormData } from "../pharmacy/drugs/add-drug-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Edit } from "lucide-react";

type DrugFormData = {
  id: string;
  name: string;
  category: DrugCategory;
  batchNumber: string;
  manufacturer: string;
  quantity: number;
  pricePerUnit: number;
  expiryDate: string | Date;
  created_at: Date;
  updatedAt: Date;
  description?: string;
};

export const EditDrugForm = ({ data }: { data: DrugFormData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DrugFormData>({
    resolver: zodResolver(drugSchema),
    defaultValues: {
      name: data.name,
      category: data.category,
      batchNumber: data.batchNumber,
      manufacturer: data.manufacturer,
      quantity: data.quantity,
      pricePerUnit: data.pricePerUnit,
      expiryDate: new Date(data.expiryDate).toISOString().split("T")[0],
      description: data.description,
    },
  });

  const onSubmit = async (values: DrugFormData) => {
    setIsLoading(true);

    const result = await updateDrug(data.id, {
      ...values,
      expiryDate: new Date(values.expiryDate),
    });
    setIsLoading(false);
    if (result.drug) {
      toast.success("Drug updated successfully");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Drug</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Drug Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setValue("category", value as DrugCategory)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent defaultValue={data.category}>
                  {Object.values(DrugCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input id="batchNumber" {...register("batchNumber")} />
              {errors.batchNumber && (
                <p className="text-sm text-destructive">
                  {errors.batchNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input id="manufacturer" {...register("manufacturer")} />
              {errors.manufacturer && (
                <p className="text-sm text-destructive">
                  {errors.manufacturer.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                readOnly
                type="number"
                id="quantity"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="text-sm text-destructive">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerUnit">Price per Unit</Label>
              <Input
                type="number"
                step="0.01"
                id="pricePerUnit"
                {...register("pricePerUnit", { valueAsNumber: true })}
              />
              {errors.pricePerUnit && (
                <p className="text-sm text-destructive">
                  {errors.pricePerUnit.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input type="date" id="expiryDate" {...register("expiryDate")} />
              {errors.expiryDate && (
                <p className="text-sm text-destructive">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button disabled={isLoading} type="submit">
              Add Drug
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
