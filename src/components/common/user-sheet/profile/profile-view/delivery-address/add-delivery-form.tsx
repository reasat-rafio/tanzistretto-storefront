import { Input } from "@/components/ui/input";
import { customerShippingAddress } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSessionStorage } from "usehooks-ts";
import { addCustomerShippingAddress } from "@/app/actions/user-actions";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUserStore from "@/stores/user-store";

interface AddFormProps {}

type FormProps = z.infer<typeof customerShippingAddress>;
type FormResponse = { success: boolean | undefined; error?: string };
const formKey = "delivery-address-form";

const defaultFormValue: FormProps = {
  address_1: "",
  address_2: "",
  city: "",
  countryCode: "",
  phone: "",
  firstName: "",
  lastName: "",
  postalCode: "",
};

const AddDeliveryForm: React.FC<AddFormProps> = ({}) => {
  const { toast } = useToast();
  const [value, setValue] = useSessionStorage(formKey, defaultFormValue);
  const [formState, formAction] = useFormState<FormResponse, FormData>(
    addCustomerShippingAddress,
    { success: undefined }
  );

  const form = useForm<FormProps>({
    mode: "onBlur",
    resolver: zodResolver(customerShippingAddress),
    defaultValues: {
      address_1: value.address_1 ?? "",
      address_2: value.address_2 ?? "",
      city: value.city ?? "",
      countryCode: value.countryCode ?? "",
      phone: value.phone ?? "",
      firstName: value.firstName ?? "",
      lastName: value.lastName ?? "",
      postalCode: value.postalCode ?? "",
    },
  });

  useFormPersist(formKey, {
    watch: form.watch,
    setValue: form.setValue,
  });

  useEffect(() => {
    if (formState.success === undefined) return;

    if (!formState.success) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: formState?.error,
      });
    } else {
      form.reset();
      setValue(defaultFormValue);
      toast({
        title: "Address added successfully!",
      });
    }
  }, [formState, toast, form, setValue]);

  return (
    <div className="divide-y-2 divide-dashed space-y-3">
      <Form {...form}>
        <form action={formAction} className="space-y-3">
          <FormFields form={form} />
        </form>
      </Form>
    </div>
  );
};

export default AddDeliveryForm;

const FormFields: React.FC<{
  form: UseFormReturn<FormProps, any, undefined>;
}> = ({ form }) => {
  const { pending } = useFormStatus();
  const { region, user } = useUserStore();
  const [selectedCountryCode, setSelectedCountryCode] = useState<null | string>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address_1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address_2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Apartment, suite, etc. </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-12 gap-3">
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="col-span-8">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <input
        className="hidden"
        name="countryCode"
        type="text"
        value={selectedCountryCode as string}
      />

      <FormField
        control={form.control}
        name="countryCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <Select
              onValueChange={(e) => {
                field.onChange(e);
                setSelectedCountryCode(e);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger id="countryCode">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {region?.countries.map(({ iso_2, display_name, id }) => (
                  <SelectItem key={id} value={iso_2}>
                    {display_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        disabled={pending || !form.formState.isValid}
        className="mt-2 w-full space-x-1"
      >
        {pending && <RotateCw size={18} className="animate-spin" />}
        <span>Submit</span>
      </Button>
    </>
  );
};
