'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { RegisterFormData, UserRole } from '@/app/types/auth';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (formData: FormData) => Promise<any>;
};

export default function RegisterForm({ action }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CLIENT',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Must include uppercase';
    else if (!/[a-z]/.test(formData.password)) newErrors.password = 'Must include lowercase';
    else if (!/[0-9]/.test(formData.password)) newErrors.password = 'Must include a number';
    else if (!/[^A-Za-z0-9]/.test(formData.password)) newErrors.password = 'Must include a special character';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.role) newErrors.role = 'Please select a role';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log("errors from RegisterForm", errors);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('password', formData.password);
      fd.append('confirmPassword', formData.confirmPassword);
      fd.append('role', formData.role);

      const result = await action(fd);

      if (!result?.ok) {
        if (result?.errors) {
          setErrors(result.errors);
          toast.error('Please fix the highlighted errors');
        } else {
          toast.error(result?.message || 'Registration failed');
        }
        return;
      }

      toast.success(result.message || 'Account created successfully!', {
        description: 'Welcome to SkillTrade. Please check your email to verify your account.',
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CLIENT',
      });
      setErrors({});
    } catch (err) {
      toast.error('Registration failed', {
        description: err instanceof Error ? err.message : 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'CLIENT',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Join SkillTrade</FieldLegend>
          <FieldDescription>Create your account to start hiring or offering services</FieldDescription>

          <FieldSeparator />

          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-invalid={!!errors.name}
                disabled={isLoading}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-invalid={!!errors.email}
                disabled={isLoading}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                aria-invalid={!!errors.password}
                disabled={isLoading}
              />
              <FieldDescription>Must be 8+ characters with uppercase, lowercase, number, and special character</FieldDescription>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.confirmPassword}>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                aria-invalid={!!errors.confirmPassword}
                disabled={isLoading}
              />
              {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
            </Field>
          </FieldGroup>

          <FieldSeparator />

          <FieldSet>
            <FieldLabel>I want to</FieldLabel>
            <FieldDescription>Choose your role on SkillTrade</FieldDescription>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
              disabled={isLoading}
            >
              <Field orientation="horizontal">
                <RadioGroupItem value="CLIENT" id="role-client" />
                <FieldContent>
                  <FieldLabel htmlFor="role-client" className="font-normal">
                    Hire Freelancers
                  </FieldLabel>
                  <FieldDescription>Post projects and hire talented professionals</FieldDescription>
                </FieldContent>
              </Field>

              <Field orientation="horizontal">
                <RadioGroupItem value="FREELANCER" id="role-freelancer" />
                <FieldContent>
                  <FieldLabel htmlFor="role-freelancer" className="font-normal">
                    Work as a Freelancer
                  </FieldLabel>
                  <FieldDescription>Find projects and offer your skills</FieldDescription>
                </FieldContent>
              </Field>
            </RadioGroup>
            {errors.role && <FieldError>{errors.role}</FieldError>}
          </FieldSet>

          <FieldSeparator />

          <Field orientation="horizontal">
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Button type="button" variant="outline" disabled={isLoading} onClick={handleReset} className="w-full sm:w-auto">
              Reset
            </Button>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
