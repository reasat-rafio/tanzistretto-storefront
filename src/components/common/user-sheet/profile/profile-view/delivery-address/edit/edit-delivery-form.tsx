import { updateCustomerShippingAddress } from "@/app/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { customerShippingAddress } from "@/lib/validators";
import useUserStore from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "@medusajs/medusa";
import { RotateCw } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Direction, View } from "../../profile-view";

interface EditFormProps {
  defaultFormValues: Address;
  setView: Dispatch<SetStateAction<View>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}
type FormProps = z.infer<typeof customerShippingAddress>;
type FormResponse = {
  success: boolean | undefined;
  error?: string;
  addressId: string;
};

const EditDeliveryForm: React.FC<EditFormProps> = ({
  defaultFormValues,
  setView,
  setDirection,
}) => {
  const { toast } = useToast();
  const [formState, formAction] = useFormState<FormResponse, FormData>(
    updateCustomerShippingAddress,
    {
      success: undefined,
      addressId: defaultFormValues.id,
    }
  );

  const form = useForm<FormProps>({
    mode: "onBlur",
    resolver: zodResolver(customerShippingAddress),
    defaultValues: {
      address_1: defaultFormValues.address_1 ?? "",
      address_2: defaultFormValues.address_2 ?? "",
      city: defaultFormValues.city ?? "",
      countryCode: defaultFormValues.country_code ?? "",
      phone: defaultFormValues.phone ?? "",
      firstName: defaultFormValues.first_name ?? "",
      lastName: defaultFormValues.last_name ?? "",
      postalCode: defaultFormValues.postal_code ?? "",
    },
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
      toast({ title: "Address updated successfully!" });
      setView("delivery-addresses");
      setDirection("left");
    }
  }, [formState, form, setView, toast, setDirection]);

  return (
    <div className="divide-y-2 divide-dashed space-y-3">
      <Form {...form}>
        <form action={formAction} className="space-y-3">
          <FormFields
            form={form}
            defaultCountryCode={defaultFormValues.country_code}
          />
        </form>
      </Form>
    </div>
  );
};

export default EditDeliveryForm;

const FormFields: React.FC<{
  form: UseFormReturn<FormProps, any, undefined>;
  defaultCountryCode: string | null;
}> = ({ form, defaultCountryCode }) => {
  const { pending } = useFormStatus();
  const { region } = useUserStore();
  const [selectedCountryCode, setSelectedCountryCode] = useState<null | string>(
    defaultCountryCode
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
