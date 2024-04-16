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
import { registerPostReq } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setConfirmRevealPassword] = useState(false);
  const [value] = useLocalStorage("register-form", {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const form = useForm<z.infer<typeof registerPostReq>>({
    resolver: zodResolver(registerPostReq),
    defaultValues: {
      firstName: value.firstName ?? "",
      lastName: value.lastName ?? "",
      email: value.email ?? "",
      password: value.password ?? "",
      passwordConfirm: value.passwordConfirm ?? "",
    },
  });

  useFormPersist("register-form", {
    watch: form.watch,
    setValue: form.setValue,
    storage: window.localStorage,
  });

  function onSubmit(values: z.infer<typeof registerPostReq>) {
    console.log("success", { values });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      autoComplete="new-password"
                      type={revealPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-5 top-1/2 z-20 -translate-y-1/2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRevealPassword((prev) => !prev);
                      }}
                    >
                      {revealPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      autoComplete="new-password"
                      type={revealConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-5 top-1/2 z-20 -translate-y-1/2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmRevealPassword((prev) => !prev);
                      }}
                    >
                      {revealConfirmPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-2 w-full space-x-1">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
