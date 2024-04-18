import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const AuthView: React.FC<{}> = ({}) => {
  return (
    <>
      <h2 className="text-2xl font-bold">
        Manage address, contact info and personal preferences
      </h2>
      <h3 className="text-lg">
        To create an account, please enter your email and choose a password
        below.
      </h3>

      <Tabs defaultValue="login" className="mx-auto mt-2">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AuthView;
