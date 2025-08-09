import { toast } from "sonner"
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from "../../components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "../../hooks/use-auth.actions"
import CardFooterAuth from "../../components/card-footer-uath"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginZodSchema, type LoginZodSchemaType } from "../../lib/zod.schema";
import { Button } from "../../components/ui/button";

const LoginPage = () => {
  const {loading, login} = useAuthActions()// del hook

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: LoginZodSchemaType) =>{
    const response = await login(data)
    console.log('respose', response);

    if (!response.success) {
      if (response.error?.code === 'auth/invalid-login-credentials') {
        // form.setError("email", {
        //   type: "manual",
        //   message: "Invalid email or password.",
        // });

        //  form.setError("password", {
        //   type: "manual",
        //   message: "Invalid email or password.",
        // });
        toast.error('Invalid email or pasword')
      }
    }
    
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Loging</CardTitle>
        <CardContent>
             <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Loggin In...." : "Login"}
            </Button>
          </form>
        </Form>
        </CardContent>
        <CardFooterAuth 
        type="login"
        loading={loading}
        />
      </CardHeader>
    </Card>
  )
}
export default LoginPage