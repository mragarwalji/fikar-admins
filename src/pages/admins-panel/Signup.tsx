import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';



const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required').positive().integer(),
  gender: yup.string().required('Gender is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().matches(/^(\+91)?[6-9]\d{9}$/, 'Enter valid phone number').required(),
  accessCode: yup.string().length(6, 'Access code must be 6 digits').required('Access code is required'),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password required'),
  acceptTerms: yup.bool().oneOf([true], 'Please accept Terms & Policy')
});

export default function AdminSignup() {
    const [accessCodeSent, setAccessCodeSent] = useState(false);
    const [accessCodeVerified, setAccessCodeVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        clearErrors
    } = useForm({
        resolver: yupResolver(schema)
    });

 

    // Watch phone and accessCode fields for enabling/disabling buttons
    const phoneValue = watch('phone');
    const accessCodeValue = watch('accessCode');

    // Check if phone number is valid (10 digits)
    const isPhoneValid = phoneValue && phoneValue.length === 10;

    // Check if access code is valid (6 digits)
    const isAccessCodeValid = accessCodeValue && accessCodeValue.length === 6;

    const onSubmit = async (data) => {
  if (!accessCodeVerified) {
    setError("accessCode", {
      type: "manual",
      message: "Please verify access code first",
    });
    return;
  }

  try {
    const response = await fetch("https://fikar-admins.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        age: data.age,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Account created successfully!");
    //   console.log("User data saved:", result);
      navigate("/admin-login"); // Redirect to login page after success
    } else {
      alert(`${result.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error. Please try again later.");
  }
};


    const sendAccessCode = () => {
        const phone = watch('phone');
        if (!phone || phone.length !== 10) {
            setError('phone', { 
                type: 'manual', 
                message: 'Please enter a valid 10-digit phone number' 
            });
            return;
        }

        setAccessCodeSent(true);
        setAccessCodeVerified(false);
        clearErrors('accessCode');
        
        // In real application, you would send this via SMS
        // console.log(`Access code sent to ${phone}`);
        // alert(`6-digit Access Code sent to your phone!\n\nFor demo use: 202025\n(From fikarplus@2025)`);
    };

    const verifyAccessCode = () => {
        const enteredCode = watch('accessCode');
        
        if (!enteredCode || enteredCode.length !== 6) {
            setError('accessCode', { 
                type: 'manual', 
                message: 'Please enter 6-digit access code' 
            });
            return;
        }

        // For demo purposes, we'll use "202025" as the access code (from fikarplus@2025)
        if (enteredCode === '202025') {
            setAccessCodeVerified(true);
            clearErrors('accessCode');
        } else {
            setAccessCodeVerified(false);
            setError('accessCode', { 
                type: 'manual', 
                message: 'Invalid access code. Use 202025 for demo' 
            });
        }
    };

    // Prevent special characters or letters in age input
    const handleAgeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            [8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode) ||
            ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
        ) {
            return;
        }
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value !== '') {
            const num = Math.min(Number(value), 100);
            e.target.value = num.toString();
        }
    };

    // Only allow numbers and max 10 digits in phone input
    const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            [8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode) ||
            ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
        ) {
            return;
        }
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
        const input = e.currentTarget;
        if (
            /^[0-9]$/.test(e.key) &&
            input.value.replace(/\D/g, '').length >= 10 &&
            input.selectionStart === input.selectionEnd
        ) {
            e.preventDefault();
        }
    };

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    };

    // Only allow numbers and max 6 digits in access code input
    const handleAccessCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            [8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode) ||
            ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
        ) {
            return;
        }
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
        const input = e.currentTarget;
        if (
            /^[0-9]$/.test(e.key) &&
            input.value.replace(/\D/g, '').length >= 6 &&
            input.selectionStart === input.selectionEnd
        ) {
            e.preventDefault();
        }
    };

    const handleAccessCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        e.target.value = value;
    };

    // Only allow alphabets and spaces in name input
    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            [8, 9, 13, 27, 46, 32, 37, 38, 39, 40].includes(e.keyCode) ||
            ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
        ) {
            return;
        }
        if (!/^[a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        e.target.value = value;
    };

    return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-center mb-4">
          <img src="/fikar-logo.svg" alt="Fikar Plus Logo" className="h-20" />
        </div>
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-1">
            Create Admin Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
            Fill in the details below to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                    {...register('name')}
                    type="text"
                    placeholder="Enter your full name"
                    onKeyDown={handleNameKeyDown}
                    onInput={handleNameInput}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Age */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                    {...register('age')}
                    type="text"
                    placeholder="Enter your age"
                    maxLength={3}
                    onInput={handleAgeInput}
                    onKeyDown={handleAgeKeyDown}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                />
                {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age.message}</p>}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex space-x-6">
                    <label className="flex items-center">
                        <input
                            {...register('gender')}
                            type="radio"
                            value="male"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            {...register('gender')}
                            type="radio"
                            value="female"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Female</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            {...register('gender')}
                            type="radio"
                            value="other"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Other</span>
                    </label>
                </div>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="youremail@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="flex">
                    <div className="flex items-center justify-center px-4 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm text-gray-600">
                        +91
                    </div>
                    <input
                        {...register('phone')}
                        type="text"
                        placeholder="**********"
                        maxLength={10}
                        onKeyDown={handlePhoneKeyDown}
                        onInput={handlePhoneInput}
                        className="flex-1 rounded-r-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        inputMode="tel"
                        pattern="^[0-9]{10}$"
                    />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>

            {/* 6-digit Access Code */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6-digit Access Code</label>
                <div className="flex space-x-2">
                    <input
                        {...register('accessCode')}
                        type="text"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        onKeyDown={handleAccessCodeKeyDown}
                        onInput={handleAccessCodeInput}
                        className={`flex-1 rounded-lg border ${
                            accessCodeVerified 
                                ? 'border-green-500 bg-green-50' 
                                : errors.accessCode 
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-300 bg-white'
                        } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        disabled={!accessCodeSent}
                    />
                    <button
                        type="button"
                        onClick={sendAccessCode}
                        disabled={!isPhoneValid}
                        className={`px-1 py-4 rounded-lg text-sm font-medium transition-colors duration-150 min-w-[125px] ${
                            isPhoneValid
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Send Access Code
                    </button>
                    <button
                        type="button"
                        onClick={verifyAccessCode}
                        disabled={!isAccessCodeValid || !accessCodeSent}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 min-w-[80px] ${
                            accessCodeVerified
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : isAccessCodeValid && accessCodeSent
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Verify
                    </button>
                </div>
                {errors.accessCode && <p className="text-xs text-red-500 mt-1">{errors.accessCode.message}</p>}
                {accessCodeVerified && <p className="text-xs text-green-600 mt-1">Access code verified successfully!</p>}
                {/* {accessCodeSent && !accessCodeVerified && (
                    <p className="text-xs text-blue-600 mt-1">
                        Access code sent! Use <strong>202025</strong> for demo
                    </p>
                )} */}
                {!isPhoneValid && phoneValue && (
                    <p className="text-xs text-red-500 mt-1">Please enter a valid 10-digit phone number</p>
                )}
            </div>

            {/* Password */}
           
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("confirmPassword")}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>


            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    {...register('acceptTerms')}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                    I accept the <Link to="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </label>
            </div>
            {errors.acceptTerms && <p className="text-xs text-red-500 mt-1">{errors.acceptTerms.message}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition-colors duration-150 mt-4"
            >
                Create Account
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-700 mt-4">
                Already have an account? <Link to="/login" className="text-blue-700 font-medium hover:underline">Sign In</Link>
            </p>
        </form>
    </div>
</div>
    );
}