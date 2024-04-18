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
import { Eye, EyeOff, RotateCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";
import GoogleIcon from "/public/icons/google.svg";
import FacebookIcon from "/public/icons/facebook.svg";
import { useToast } from "@/components/ui/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { loginUser } from "@/app/actions/auth-actions";

interface LoginFormProps {}

type FormProps = z.infer<typeof loginPostReq>;
type FormResponse = { success: boolean | undefined; error?: string };

const defaultFormValue = {
  email: "",
  password: "",
};

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { toast } = useToast();
  const [value, setValue] = useLocalStorage("login-form", defaultFormValue);
  const [formState, formAction] = useFormState<FormResponse, FormData>(
    loginUser,
    { success: undefined }
  );

  const form = useForm<FormProps>({
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
        title: "You've successfully logged in!",
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

const FormFields: React.FC<{
  form: UseFormReturn<FormProps, any, undefined>;
}> = ({ form }) => {
  const { pending } = useFormStatus();
  const [revealPassword, setRevealPassword] = useState(false);

  return (
    <>
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
                  {revealPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
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
