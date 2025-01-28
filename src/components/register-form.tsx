"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { auth, db } from '@/db/db'
import { User } from "@/db/models"
import { doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    ssn: z.string().min(9, { message: "SSN must be at least 10 characters." }),
    birthDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterForm() {
    const router = useRouter()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: '',
          email: '',
          ssn: '',
          birthDate: '',
          password: '',
          confirmPassword: '',
        },
      });

    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (authUser) => {
                console.log("Success. The user is created in Firebase")
                console.log(authUser)

                // Create User in Firestore
                const user: User = {
                    id: authUser.user.uid,
                    name: data.name,
                    email: data.email,
                    ssn: data.ssn,
                    birthDate: data.birthDate,
                    // Manage in firebase that users can only set patient role
                    role: "patient",
                }

                await setDoc(doc(db, "users", user.id), user);
                console.log("User added to Firestore");

                // TODO: Navigate to the home page
                router.push("/user/home")
            })
            .catch(error => {
                // An error occurred. Set error message to be displayed to user
                console.log(error)
            });
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
            name="ssn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SSN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>
    </div>
    );
}