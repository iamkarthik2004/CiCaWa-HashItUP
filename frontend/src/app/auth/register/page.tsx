'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, ArrowLeft, Building, Home, ArrowRight } from 'lucide-react';
import { api, RegisterData } from '@/lib/api';
import Image from 'next/image';

type RegisterFormValues = Omit<RegisterData, 'is_business' | 'latitude' | 'longitude'> & {
  is_business: RegisterData['is_business'] | 'true' | 'false';
  latitude: RegisterData['latitude'] | string;
  longitude: RegisterData['longitude'] | string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RegisterFormValues>({
    defaultValues: {
      is_business: false,
      latitude: 0,
      longitude: 0
    }
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. You can still continue with the default location.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.longitude);
        setIsLocating(false);
      },
      (error: GeolocationPositionError) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location access was denied. You can enable it in your browser settings or proceed with manual address details.'
            : error.code === error.POSITION_UNAVAILABLE
            ? 'We could not determine your location. Please check your connection or enter your address manually.'
            : 'Location request timed out. You can retry or continue with the address you provide.';

        setIsLocating(false);
        setLocationError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const onSubmit = async (formData: RegisterFormValues) => {
    setIsLoading(true);
    setError('');

    const payload: RegisterData = {
      ...formData,
      latitude: typeof formData.latitude === 'string' ? parseFloat(formData.latitude) || 0 : formData.latitude,
      longitude: typeof formData.longitude === 'string' ? parseFloat(formData.longitude) || 0 : formData.longitude,
      is_business:
        typeof formData.is_business === 'string'
          ? formData.is_business === 'true'
          : formData.is_business,
    };

    if (!Number.isFinite(payload.latitude) || !Number.isFinite(payload.longitude)) {
      setIsLoading(false);
      setError('Please provide a valid location (latitude and longitude).');
      return;
    }

    if (payload.password.length > 72) {
      setIsLoading(false);
      setError('Password must be 72 characters or fewer.');
      return;
    }

    try {
      const response = await api.register(payload);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    if (step === 1) {
      getCurrentLocation();
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-50/30 flex-col justify-between p-12 relative overflow-hidden border-r border-gray-100">
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>

        {/* Hero Content */}
        <div className="z-10 mt-12 flex flex-col justify-center h-full">
          <div className="bg-emerald-100/60 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <User className="h-7 w-7 text-emerald-700" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Create Your <br/>
            <span className="text-emerald-700">Account</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-sm mb-12">
            Join CiCaWa and be a part of a cleaner, greener tomorrow.
          </p>

          {/* Illustration */}
          <div className="relative w-full max-w-md mx-auto z-10 flex items-center justify-center">
            <Image
              src="/images/register-illustration.png"
              alt="Sustainable Planet Illustration"
              width={350}
              height={350}
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          {step > 1 ? (
            <button onClick={prevStep} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
          ) : (
            <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          )}
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">Step {step} of 2</span>
            <div className="flex space-x-1">
              <div className={`h-1.5 rounded-full w-8 ${step >= 1 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
              <div className={`h-1.5 rounded-full w-8 ${step >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="bg-emerald-100/60 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <User className="h-7 w-7 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 mt-2">Join for a cleaner tomorrow</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

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
                        placeholder="Create a password"
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

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full mt-8 bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-100 transition-colors flex justify-center items-center group"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-colors"
                        rows={3}
                        placeholder="Enter your full address"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  {locationError && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                      {locationError}
                    </div>
                  )}

                  {isLocating && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                      Detecting your location...
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLocating ? 'Locating...' : 'Retry location detection'}
                  </button>

                  {/* Account Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-emerald-300 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50 transition-colors">
                        <input
                          {...register('is_business')}
                          type="radio"
                          value="false"
                          className="sr-only"
                        />
                        <Home className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Personal</div>
                          <div className="text-xs text-gray-500">Individual user</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-emerald-300 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50 transition-colors">
                        <input
                          {...register('is_business')}
                          type="radio"
                          value="true"
                          className="sr-only"
                        />
                        <Building className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Business</div>
                          <div className="text-xs text-gray-500">Company account</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-8 bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center group"
                  >
                    {isLoading ? 'Creating Account...' : 'Complete Sign Up'}
                  </button>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-8 text-center pb-8 lg:pb-0">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}