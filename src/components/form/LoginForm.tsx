'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type z from 'zod';
import { loginSchema } from '@/validation';
import { Button } from '../ui/button';

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '../ui/field';

import { Input } from '../ui/input';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    type UserDefaultValues = z.infer<typeof loginSchema>;

    const defaultValues: UserDefaultValues = {
        email: 'sayedrana@srhealthcare.com',
        password: '$2b$12$sAyEd[Rana]5288',
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: loginSchema,
        },

        onSubmit: ({ value }) => {
            console.log(value);
        },
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Login to your account
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            {/* Login Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    {/* Email */}
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                            placeholder="Type your password"
                                        />

                                        <button
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeClosed className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-red-400 underline underline-offset-4"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit">Submit</Button>

                    <FieldSeparator>Or continue with</FieldSeparator>

                    <Field>
                        <div className="flex flex-col gap-2">
                            {/* <GoogleLoginComponent /> */}
                        </div>

                        <FieldDescription className="text-center">
                            Don&apos;t have an account?
                            <Link
                                href="/sign-up"
                                className="font-semibold text-[#ff8a00] underline underline-offset-4 ml-1"
                            >
                                Sign Up
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default LoginForm;
