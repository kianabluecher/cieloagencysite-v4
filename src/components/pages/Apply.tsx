import React, { useState } from 'react';
import { ArrowRight, Upload, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { ApplicationForm } from '../ApplicationForm';

interface ApplyProps {
  onNavigate: (page: string) => void;
}

export function Apply({ onNavigate }: ApplyProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-light mb-6">Application Submitted!</h1>
          <p className="text-xl text-zinc-400 font-light mb-12 leading-relaxed">
            Thank you for your application. Our team will review it and get back to you soon.
          </p>
          <button
            onClick={() => onNavigate('jobs')}
            className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-700 rounded-full text-white hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-sm font-light tracking-wide"
          >
            Back to Jobs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-32">
        <button
          onClick={() => onNavigate('jobs')}
          className="text-zinc-400 hover:text-white transition-colors mb-12 text-sm font-light"
        >
          ← Back to all positions
        </button>

        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-light mb-6">Apply to CIELO</h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            Join our team of exceptional talent. Fill out the form below to submit your application.
          </p>
        </div>

        <ApplicationForm 
          standalone 
          onSuccess={() => setSubmitSuccess(true)} 
        />
      </div>
    </div>
  );
}