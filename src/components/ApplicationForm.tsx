import React, { useState } from 'react';
import { ArrowRight, Upload, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ApplicationFormProps {
  jobTitle?: string;
  onSuccess?: () => void;
  standalone?: boolean;
}

export function ApplicationForm({ jobTitle, onSuccess, standalone = false }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobOpening: jobTitle || '',
    linkedIn: '',
    portfolio: '',
    experience: '',
    industry: '',
    skills: '',
    softwareTools: '',
    languages: '',
    sideJob: '',
    whyYou: '',
    motivation: '',
    location: '',
    dateOfBirth: '',
  });

  const [files, setFiles] = useState({
    additionalWork: null as File | null,
    cv: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data
      const submissionData = {
        submission_time: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        job_opening: formData.jobOpening,
        linkedin: formData.linkedIn,
        portfolio: formData.portfolio,
        experience: formData.experience,
        industry: formData.industry,
        skills: formData.skills,
        software_tools: formData.softwareTools,
        languages: formData.languages,
        side_job: formData.sideJob,
        why_you: formData.whyYou,
        motivation: formData.motivation,
        location: formData.location,
        date_of_birth: formData.dateOfBirth,
        additional_work_filename: files.additionalWork?.name || '',
        cv_filename: files.cv?.name || '',
      };

      // Submit to server (sends to Google Sheets and Supabase)
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/submit-job-application`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Submission failed: ${errorText}`);
      }

      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobOpening: jobTitle || '',
        linkedIn: '',
        portfolio: '',
        experience: '',
        industry: '',
        skills: '',
        softwareTools: '',
        languages: '',
        sideJob: '',
        whyYou: '',
        motivation: '',
        location: '',
        dateOfBirth: '',
      });
      setFiles({ additionalWork: null, cv: null });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess && standalone) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-4xl font-light mb-6 text-white">Application Submitted!</h2>
        <p className="text-xl text-zinc-400 font-light leading-relaxed">
          Thank you for your application. Our team will review it and get back to you soon.
        </p>
      </div>
    );
  }

  if (submitSuccess && !standalone) {
    return (
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-lg p-12 text-center">
        <h3 className="text-2xl font-light mb-4 text-white">Application Submitted!</h3>
        <p className="text-zinc-400 font-light leading-relaxed">
          Thank you for your application. Our team will review it and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h3 className="text-xl font-light mb-6 text-white">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Job Opening *
            </label>
            <input
              type="text"
              name="jobOpening"
              value={formData.jobOpening}
              onChange={handleInputChange}
              required
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors"
              readOnly={!!jobTitle}
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Portfolio / Website
            </label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://yourportfolio.com"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, Country"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Professional Background */}
      <div>
        <h3 className="text-xl font-light mb-6 text-white">Professional Background</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Years of Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g., 5+ years"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Industry Experience
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="e.g., SaaS, E-commerce, Healthcare"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Key Skills
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              rows={3}
              placeholder="List your key skills and areas of expertise"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors resize-none placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Software & Tools
            </label>
            <textarea
              name="softwareTools"
              value={formData.softwareTools}
              onChange={handleInputChange}
              rows={3}
              placeholder="e.g., Figma, Adobe Creative Suite, React, etc."
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors resize-none placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Languages
            </label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              placeholder="e.g., English (Native), Spanish (Fluent)"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Side Projects / Freelance Work
            </label>
            <textarea
              name="sideJob"
              value={formData.sideJob}
              onChange={handleInputChange}
              rows={3}
              placeholder="Tell us about any side projects or freelance work"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors resize-none placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* Application Questions */}
      <div>
        <h3 className="text-xl font-light mb-6 text-white">About You</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Why you? *
            </label>
            <textarea
              name="whyYou"
              value={formData.whyYou}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Tell us why you're the right fit for this role"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors resize-none placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              What motivates you?
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows={4}
              placeholder="Share what drives you professionally"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white hover:border-white/50 transition-colors resize-none placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* File Uploads */}
      <div>
        <h3 className="text-xl font-light mb-6 text-white">Documents</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              CV / Resume
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'cv')}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center gap-3 w-full bg-black/40 border border-white/10 px-4 py-3 text-zinc-400 cursor-pointer hover:border-white transition-colors"
              >
                <Upload className="w-5 h-5" />
                {files.cv ? files.cv.name : 'Upload your CV'}
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-light text-zinc-400 mb-2">
              Additional Work Samples (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'additionalWork')}
                accept=".pdf,.doc,.docx,.zip"
                className="hidden"
                id="work-upload"
              />
              <label
                htmlFor="work-upload"
                className="flex items-center gap-3 w-full bg-black/40 border border-white/10 px-4 py-3 text-zinc-400 cursor-pointer hover:border-white transition-colors"
              >
                <Upload className="w-5 h-5" />
                {files.additionalWork ? files.additionalWork.name : 'Upload work samples'}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-8 py-4 bg-black border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}