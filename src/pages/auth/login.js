

'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { PulseLoader } from 'react-spinners';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://your-api-domain.com';
const api = axios.create({ baseURL: baseUrl });

// Demo credentials
const DEMO_CREDENTIALS = {
  admin: {
    email: 'rohimAdmin4321@gmail.com',
    password: 'Admin@4321',
    role: 'admin',
    name: 'Admin Account'
  },
  manager: {
    email: 'fahimManager4321@gmail.com',
    password: 'Manager@4321',
    role: 'manager',
    name: 'Manager Account'
  },
  user: {
    email: 'mobarakUser4321@gmail.com',
    password: 'User@4321',
    role: 'user',
    name: 'Regular User'
  }
};

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) router.push('/dashboard');
  }, [router]);

  // Auto-fill credentials based on selected role
  const handleRoleSelect = (role) => {
    const credentials = DEMO_CREDENTIALS[role];
    setValue('email', credentials.email);
    setValue('password', credentials.password);
    setActiveRole(role);
    toast.success(`${credentials.name} credentials filled!`);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await api.post('https://arabian-elegance-backend2.vercel.app/api/v1/auth/login', data);

      localStorage.setItem('accessToken', response.data.accessToken);
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/; secure; sameSite=strict`;
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userId', response.data.user._id);

      const redirectPath = response.data.user.role === 'admin' 
        ? '/dashboard' 
        : response.data.user.role === 'manager'
          ? '/dashboard'
          : '/';
          
      toast.success(`Welcome, ${response.data.user.name || response.data.user.role}!`);
      router.push(redirectPath);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
        <button 
          onClick={() => router.push('/')} 
          className="btn btn-xs bg-blue-500 rounded-full text-white px-4 py-2 mb-4 transition-transform hover:scale-105"
        >
          ← Back to home
        </button>
        
        <div className="text-center mb-5">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-1 rounded-full w-16 h-16 mx-auto mb-4">
            <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(DEMO_CREDENTIALS).map(([role, { name }]) => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                activeRole === role
                  ? 'border-orange-500 bg-orange-50 shadow-inner'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full mb-2 ${
                activeRole === role ? 'bg-orange-500' : 'bg-gray-300'
              }`}></div>
              <span className="text-xs font-medium capitalize">{role}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              {...register("email", { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password", { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:text-orange-800">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <PulseLoader size={8} color="#fff" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
        {"Don't have an account?"}
            <Link 
              href="/auth/signup" 
              className="font-semibold text-orange-600 hover:text-orange-800 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;