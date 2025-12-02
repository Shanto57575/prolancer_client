'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (fd: FormData) => Promise<any>;
};

export default function LoginForm({ action }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Fix the form errors');
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append('email', formData.email);
      fd.append('password', formData.password);

      const result = await action(fd);
      console.log("result from LoginForm", result);

      if (!result.ok) {
        if (result.errors) setErrors(result.errors);
        toast.error(result.message || 'Login failed');
        return;
      }

      toast.success(result.message || 'Logged in successfully');
      // TODO: after login redirect user
      // window.location.href = '/dashboard';
    } catch (err) {
      toast.error('Login failed', {
        description: err instanceof Error ? err.message : 'Unexpected error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Login</FieldLegend>
          <FieldDescription>Enter your credentials to access your account</FieldDescription>

          <FieldSeparator />

          {/* Email */}
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              disabled={isLoading}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          {/* Password */}
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              aria-invalid={!!errors.password}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>

          <FieldSeparator />

          <Field orientation="horizontal">
            <Button disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
