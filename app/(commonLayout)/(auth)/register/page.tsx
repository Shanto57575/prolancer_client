import { registerAction } from '@/actions/auth/registerAction';
import RegisterForm from '@/components/modules/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            SkillTrade
          </h1>
          <p className="mt-2 text-sm text-gray-600">Your marketplace for skills and services</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-xl">
          <RegisterForm action={registerAction} />
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
