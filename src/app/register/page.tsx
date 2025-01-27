"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { auth } from '@/db/db'

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterPage() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit: SubmitHandler<FormSchema> = data => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(authUser => {
                console.log("Success. The user is created in Firebase")
                console.log(authUser)

                // Create User in Firestore

                // TODO: Navigate to the home page
            })
            .catch(error => {
                // An error occurred. Set error message to be displayed to user
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
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