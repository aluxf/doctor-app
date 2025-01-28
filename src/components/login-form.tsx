"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/db/db";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { doc, getDoc } from '@firebase/firestore';
import Redirect from './redirect';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormSchema = z.infer<typeof formSchema>;

function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Success. The user is logged in Firebase");
      console.log(userCredential);

      // Navigate to the home page
      const userRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userRef)
      const role = userDoc.data()?.role;
      if (role === "patient") router.push('/user/home');
      else if (role === "doctor") router.push('/doc/home');
    } catch (error) {
      // An error occurred. Set error message to be displayed to user
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder="m@example.com" {...field} />
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input id="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" onClick={() => router.push("/register")} className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm