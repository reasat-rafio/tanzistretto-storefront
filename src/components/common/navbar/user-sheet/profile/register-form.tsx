import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerPostReq } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [revealPassword, setRevealPassword] = useState(false);

  const form = useForm<z.infer<typeof registerPostReq>>({
    resolver: zodResolver(registerPostReq),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
      rurl: "",
    },
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

          <Button className="mt-2 w-full space-x-1">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
