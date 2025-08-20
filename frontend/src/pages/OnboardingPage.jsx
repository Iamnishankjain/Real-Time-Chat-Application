import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';

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

  return (
    <div>
      On boarding Page
    </div>
  )
}

export default OnboardingPage
