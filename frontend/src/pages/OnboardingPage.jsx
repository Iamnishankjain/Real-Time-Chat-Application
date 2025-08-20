import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, Shuffle, ShuffleIcon } from 'lucide-react';

const OnboardingPage = () => {
  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    profilePicture: authUser?.profilePicture || '',
  });

  const {mutate: onboardingMutation,isPending}=useMutation({
    mutateFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarding successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the mutation to complete onboarding
    onboardingMutation(formState);
  }

  const handleRandomAvtar = () =>{
    
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl '>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:test-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* profile pic */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* Image Preview*/}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePicture ? (
                  <img src={formState.profilePicture} alt="profile preview" className='w-full h-full object-cover' />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40'/>
                  </div>
                )}


              </div>
              {/*generate random avtar*/}
              <div className="flex items-center gap-2">
                <button type='button' onClick={handleRandomAvtar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2' />
                  Generate Random Avatar
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default OnboardingPage
