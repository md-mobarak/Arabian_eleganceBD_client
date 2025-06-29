

// 'use client';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { PulseLoader } from 'react-spinners';
// import { baseUrl } from '@/utils/api';

// const api = axios.create({
//   baseURL: baseUrl,
// });

// export default function SignupPage() {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       await api.post('/auth/register', data);
//       toast.success('Registration Successful! Please login');
//       router.push('/auth/login');
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Registration Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
//           <p className="text-gray-600">Start your journey with us</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//             <input
//               {...register("name", { 
//                 required: 'Name is required',
//                 minLength: {
//                   value: 3,
//                   message: 'Name must be at least 3 characters'
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Full Name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               {...register("email", { 
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="john@example.com"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: { 
//                   value: 6, 
//                   message: "Minimum 6 characters" 
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               {showPassword ? (
//                 <EyeSlashIcon className="w-6 h-6 text-gray-500" />
//               ) : (
//                 <EyeIcon className="w-6 h-6 text-gray-500" />
//               )}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//             <input
//               type={showConfirmPassword ? 'text' : 'password'}
//               {...register("confirmPassword", {
//                 required: "Please confirm your password",
//                 validate: (value) => 
//                   value === watch('password') || "Passwords do not match"
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               {showConfirmPassword ? (
//                 <EyeSlashIcon className="w-6 h-6 text-gray-500" />
//               ) : (
//                 <EyeIcon className="w-6 h-6 text-gray-500" />
//               )}
//             </button>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <PulseLoader size={8} color="#fff" />
//                 <span>Creating Account...</span>
//               </>
//             ) : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-gray-600">
//             Already have an account?{' '}
//             <Link 
//               href="/auth/login" 
//               className="text-blue-600 hover:underline font-semibold"
//             >
//               Login Here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { PulseLoader } from 'react-spinners';
import { baseUrl } from '@/utils/api';

const api = axios.create({
  baseURL: baseUrl,
});

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await api.post('https://arabian-elegance-backend2.vercel.app/api/v1/auth/register', data);
      toast.success('Registration Successful! Please login');
      router.push('/auth/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration Failed');
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

        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-1 rounded-full w-16 h-16 mx-auto mb-4">
            <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Start your journey with us</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              {...register("name", { 
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters'
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
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
                required: "Password is required",
                minLength: { 
                  value: 6, 
                  message: "Minimum 6 characters" 
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12 transition-all"
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

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => 
                  value === watch('password') || "Passwords do not match"
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              {...register("terms", { required: "You must accept the terms and conditions" })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <Link href="/terms" className="text-orange-600 hover:underline">Terms and Conditions</Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <PulseLoader size={8} color="#fff" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="font-semibold text-orange-600 hover:text-orange-800 transition-colors"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}