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
import { loginPostReq } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";
import GoogleIcon from "/public/icons/google.svg";
import FacebookIcon from "/public/icons/facebook.svg";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [revealPassword, setRevealPassword] = useState(false);
  const [value] = useLocalStorage("login-form", {
    email: "",
    password: "",
  });

  const form = useForm<z.infer<typeof loginPostReq>>({
    resolver: zodResolver(loginPostReq),
    defaultValues: {
      email: value.email ?? "",
      password: value.password ?? "",
    },
  });

  useFormPersist("login-form", {
    watch: form.watch,
    setValue: form.setValue,
    storage: window.localStorage,
  });

  function onSubmit(values: z.infer<typeof loginPostReq>) {
    console.log("success", { values });
  }

  return (
    <div className="divide-y-2 divide-dashed space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

          <Button className="mt-2 w-full space-x-1">Submit</Button>
        </form>
      </Form>

      <div className="space-y-3 pt-3">
        <Button className="bg-[#1877F2] shadow w-full flex justify-center items-center space-x-1.5 hover:bg-[#1877F2]/90">
          <Image
            src={FacebookIcon}
            alt="Facebook Icon"
            width={20}
            height={20}
          />
          <span>Continue With Facebook</span>
        </Button>
        <Button className="bg-muted hover:bg-muted/90 shadow text-primary w-full flex justify-center items-center space-x-1.5">
          <Image src={GoogleIcon} alt="Google Icon" width={20} height={20} />
          <span>Continue With Google</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
