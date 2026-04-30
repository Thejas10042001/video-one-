import React from 'react';
import { OnboardingOverlay } from './OnboardingOverlay';
import { OnboardingControls } from './OnboardingControls';

export const OnboardingManager: React.FC = () => {
  return (
    <>
      <OnboardingOverlay />
      <OnboardingControls />
    </>
  );
};
