import { loginAction } from '@/actions/auth/loginAction';
import LoginForm from '@/components/modules/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">SkillTrade</h1>
          <p className="mt-2 text-sm text-gray-600">Welcome back — log into your account</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-xl">
          <LoginForm action={loginAction} />
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
