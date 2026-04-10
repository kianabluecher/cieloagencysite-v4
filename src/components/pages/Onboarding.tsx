import React from 'react';
import { SEOHead } from '../SEOHead';

export function Onboarding() {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Onboarding | CIELO Agency"
        description="Client onboarding video and resources."
        url="https://www.cielo.agency/onboarding"
      />
      <iframe 
        src="https://drive.google.com/file/d/1IA8b52fcRsx4HYkYHoZ4mUf2glJFdM5b/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="Onboarding Video"
      />
    </div>
  );
}
