'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Recycle, Sun, Users, ArrowRight } from 'lucide-react';
import { api, LoginData } from '@/lib/api';
import Image from 'next/image';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.login(data);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect based on role
      switch (response.user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'worker':
          router.push('/worker');
          break;
        case 'ngo':
          router.push('/ngo');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-50/50 flex-col justify-between p-12 relative overflow-hidden">
        {/* Branding */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-emerald-600" />
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none">CiCaWa</div>
              <div className="text-xs text-gray-500">Waste Management Platform</div>
            </div>
          </div>
          <button className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-900 transition-colors">
            <Sun className="h-5 w-5" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="z-10 mt-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Welcome <br />
            <span className="text-emerald-600">Back!</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-sm mt-4">
            Sign in to access your CiCaWa account
          </p>
        </div>

        {/* Illustration */}
        <div className="relative w-full max-w-md mx-auto my-8 z-10 flex-1 flex items-center justify-center">
           <Image
             src="/images/login-illustration.png"
             alt="Waste Management Illustration"
             width={400}
             height={400}
             className="object-contain drop-shadow-xl"
             priority
           />
        </div>

        {/* Bottom Card */}
        <div className="z-10 bg-emerald-100/50 rounded-2xl p-4 flex items-center space-x-4 max-w-md">
          <div className="bg-emerald-600 text-white p-3 rounded-xl shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-emerald-900">
            Join thousands of users making waste management efficient and profitable. 🍃
          </p>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Header (only visible on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <Recycle className="h-8 w-8 text-emerald-600" />
              <div className="text-left">
                <div className="text-xl font-bold text-gray-900 leading-none">CiCaWa</div>
                <div className="text-xs text-gray-500">Waste Management Platform</div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-gray-500 mt-2">Sign in to access your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-100 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex justify-center items-center group"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              {!isLoading && <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-200 bg-white hover:bg-gray-50 py-3 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-200 bg-white hover:bg-gray-50 py-3 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.55.03 2.87.69 3.65 1.83-3.26 2-2.73 6.11.47 7.36-.67 1.63-1.6 3.12-2.79 3.74zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}