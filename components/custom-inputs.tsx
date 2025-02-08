import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Control } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

interface CustomInputProps {
  type:
    | "input"
    | "number"
    | "select"
    | "checkbox"
    | "switch"
    | "radio"
    | "textarea"
    | "file";
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  inputType?: "text" | "email" | "password" | "date" | "number";
  inputKind?: "text" | "number";
  selectList?: { label: string; value: string }[];
  defaultValue?: string;
  accept?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomInputProps;
}) => {
  switch (props.type) {
    case "input":
      return (
        <FormControl>
          <Input
            type={props.inputType}
            placeholder={props.placeholder}
            {...field}
            step={props.inputType === "number" ? props.step : undefined}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (props.inputType === "number") {
                const value = parseFloat(e.target.value);
                field.onChange(value);
              } else {
                field.onChange(e);
              }
              props.onChange?.(e);
            }}
          />
        </FormControl>
      );

    case "number":
      return (
        <FormControl>
          <Input
            type="number"
            placeholder={props.placeholder}
            {...field}
            step={props.step || "0.01"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseFloat(e.target.value);
              field.onChange(value);
              props.onChange?.(e);
            }}
          />
        </FormControl>
      );

    case "select":
      return (
        <Select onValueChange={field.onChange} value={field?.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {props.selectList?.map((i, id) => (
              <SelectItem key={id} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <div className="w-full">
          <FormLabel>{props.label}</FormLabel>
          <RadioGroup
            defaultValue={props.defaultValue}
            value={field.value}
            onValueChange={field.onChange}
            className="flex gap-4 flex-wrap"
          >
            {props?.selectList?.map((i, id) => (
              <div className="flex items-center w-[140px]" key={id}>
                <RadioGroupItem
                  value={i.value}
                  id={i.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={i.value}
                  className="flex flex-1 items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-600"
                >
                  {i.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    case "switch":
      return (
        <div className="">
          {props?.selectList?.map((i, id) => (
            <div
              className="w-full flex items-center space-x-3 border-t border-t-gray-200 py-5"
              key={id}
            >
              {/* <Switch
                id={i.value}
                className="data-[state=checked]:bg-yellow-600 peer"
                checked={field.value}
                onCheckedChange={(checked: boolean) => {
                  field.onChange(checked);
                  props.onChange?.({
                    target: { value: checked, name: field.name },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
              /> */}
              <Label htmlFor={i.value} className="w-20">
                {i.label}
              </Label>

              <Label className="text-gray-400 font-normal italic peer-data-[state=checked]:hidden pl-10">
                Not working on this day
              </Label>

              <div className="hidden peer-data-[state=checked]:flex items-center gap-2 pl-6">
                <Input
                  name={`${props.name}.start_time`}
                  type="time"
                  defaultValue="09:00"
                  onChange={field.onChange}
                />
                <Input
                  name={`${props.name}.close_time`}
                  type="time"
                  defaultValue="17:00"
                  onChange={field.onChange}
                />
              </div>
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className="items-top flex space-x-2">
          {/* <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={(checked: boolean) => {
              field.onChange(checked);
              props.onChange?.({
                target: { value: checked, name: field.name },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          /> */}
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={props.name}
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {props.label}
            </label>
            <p className="text-sm text-muted-foreground">{props.placeholder}</p>
          </div>
        </div>
      );

    case "textarea":
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              field.onChange(e);
              props.onChange?.(
                e as unknown as React.ChangeEvent<HTMLInputElement>
              );
            }}
          />
        </FormControl>
      );

    case "file":
      return (
        <FormControl>
          <input
            type="file"
            accept={props.accept || "*"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] || null;
              field.onChange(file);
              props.onChange?.(e);
            }}
            className="border rounded-md p-2 text-sm file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:cursor-pointer"
          />
        </FormControl>
      );

    default:
      return null;
  }
};

export const CustomInput = (props: CustomInputProps) => {
  const { name, label, control, type, inputType, step } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {type !== "radio" && type !== "checkbox" && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Day = {
  day: string;
  start_time?: string;
  close_time?: string;
};
interface SwitchProps {
  data: { label: string; value: string }[];
  setWorkSchedule: React.Dispatch<React.SetStateAction<Day[]>>;
  // workSchedule: Day[];
}

export const SwitchInput = ({ data, setWorkSchedule }: SwitchProps) => {
  const handleChange = (day: string, field: any, value: string) => {
    setWorkSchedule((prevDays) => {
      const dayExists = prevDays.find((d) => d.day === day);

      if (dayExists) {
        return prevDays.map((d) =>
          d.day === day ? { ...d, [field]: value } : d
        );
      } else {
        if (field === true) {
          return [
            ...prevDays,
            { day, start_time: "06:00", close_time: "00:00" },
          ];
        } else return [...prevDays, { day, [field]: value }];
      }
    });
  };

  return (
    <div className="">
      {data?.map((i, id) => (
        <div
          className="w-full flex items-center space-x-3 border-t border-t-gray-200 dark:border-gray-800 py-5"
          key={id}
        >
          <Switch
            id={i.value}
            className="data-[state=checked]:bg-yello-600 peer"
            onCheckedChange={(e) => handleChange(i.value, true, "09:00")}
          />
          <Label htmlFor={i.value} className="w-20">
            {i.label}
          </Label>

          {/* <div> */}
          <Label className="text-gray-400 font-normal italic peer-data-[state=checked]:hidden pl-10">
            Not working on this day
          </Label>

          <div className="hidden peer-data-[state=checked]:flex items-center gap-2 pl-6">
            <Input
              name={`${i.label}."start_time"`}
              type="time"
              defaultValue="09:00"
              onChange={(e) =>
                handleChange(i.value, "start_time", e.target.value)
              }
            />
            <Input
              name={`${i.label}."close_time"`}
              type="time"
              defaultValue="17:00"
              onChange={(e) =>
                handleChange(i.value, "close_time", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};
