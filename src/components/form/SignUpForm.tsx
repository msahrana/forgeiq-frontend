'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type z from 'zod';
import { registerSchema } from '@/validation';
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

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    type CustomerDefaultValues = z.infer<typeof registerSchema>;

    const defaultValues: CustomerDefaultValues = {
        name: 'Tara Mony 1',
        email: 'mosttaramony1@gmail.com',
        phone: '01796837860',
        password: '',
        confirmPassword: '',
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: registerSchema,
        },

        onSubmit: ({ value }) => {
            console.log(value);
        },
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Create your account
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Fill in the form below to create your account
                </p>
            </div>

            {/* SignUp Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    {/* Name */}
                    <form.Field name="name">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="name">
                                        Full Name
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id="name"
                                            name={field.name}
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            autoComplete="name"
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

                    {/* Email */}
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id="email"
                                            name={field.name}
                                            type="email"
                                            placeholder="Enter your email"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            autoComplete="email"
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

                    {/* Email */}
                    <form.Field name="phone">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="phone">
                                        Phone Number
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id="phone"
                                            name={field.name}
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            autoComplete="tel"
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
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id='password'
                                            name={field.name}
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="*********"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            className="pr-10"
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-4" />
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

                    {/* Confirm Password */}
                    <form.Field name="confirmPassword">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="confirm-password">
                                        Confirm Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id="confirm-password"
                                            name={field.name}
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="*********"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            className="pr-10"
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                            aria-label={
                                                showConfirmPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="size-4" />
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

                    <Button type="submit">Submit</Button>

                    <FieldSeparator>Or continue with</FieldSeparator>

                    <Field>
                        <div className="flex flex-col gap-2">
                            {/* <GoogleLoginComponent /> */}
                        </div>

                        <FieldDescription className="text-center">
                            Already have an account?
                            <Link
                                href="/login"
                                className="font-semibold text-[#ff8a00] underline underline-offset-4 ml-1"
                            >
                                Login
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default SignUpForm;
