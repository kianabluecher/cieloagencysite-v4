// Email templates for Brand Audit system

export function formatAuditEmail(
  focusArea: string,
  companyName: string,
  industry: string,
  website: string,
  audit: string
): string {
  // Format audit content with HTML styling
  const formattedAudit = audit.split('\n').map(line => {
    if (line.startsWith('## ')) {
      return `<h2 style="color: #111827; font-size: 20px; font-weight: 700; margin: 30px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #10b981;">${line.replace('## ', '')}</h2>`;
    } else if (line.startsWith('### ')) {
      return `<h3 style="color: #111827; font-size: 17px; font-weight: 600; margin: 25px 0 12px 0;">${line.replace('### ', '')}</h3>`;
    } else if (line.startsWith('- ')) {
      return `<div style="padding: 8px 12px; border-left: 3px solid #10b981; margin: 6px 0; background: #f0fdf4;"><span style="color: #374151;">${line.replace('- ', '• ')}</span></div>`;
    } else if (line.trim() === '') {
      return '<div style="height: 10px;"></div>';
    } else {
      return `<p style="color: #374151; margin: 10px 0; line-height: 1.7;">${line}</p>`;
    }
  }).join('');

  const focusTitle = focusArea.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 40px 30px; border-radius: 8px 8px 0 0;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="display: inline-block; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 8px 16px;">
            <span style="color: #10b981; font-size: 12px; font-weight: 600;">✨ AI-POWERED ANALYSIS</span>
          </div>
        </div>
        <h1 style="color: #ffffff; margin: 20px 0 10px 0; font-size: 28px; font-weight: 700; text-align: center; line-height: 1.3;">
          Your ${focusTitle} Audit
        </h1>
        <p style="color: #b4b4b4; text-align: center; font-size: 16px; margin: 0;">Personalized Strategy for ${companyName}</p>
      </div>
      <div style="padding: 40px 30px; background: #ffffff;">
        <p style="color: #111827; font-size: 16px; margin: 0 0 15px 0;">Hi there,</p>
        <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 30px 0;">
          Thank you for requesting your brand audit from <strong>CIELO</strong>. We've analyzed your business, researched your industry, and created a personalized strategy to help ${companyName} stand out and grow.
        </p>
        <div style="background: #f9fafb; border-left: 4px solid #10b981; padding: 20px 24px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #111827; font-size: 14px; font-weight: 700; text-transform: uppercase; margin: 0 0 15px 0;">Your Information</h3>
          <p style="margin: 6px 0; color: #6b7280; font-size: 14px;"><strong>Company:</strong> ${companyName}</p>
          <p style="margin: 6px 0; color: #6b7280; font-size: 14px;"><strong>Industry:</strong> ${industry}</p>
          ${website ? `<p style="margin: 6px 0; color: #6b7280; font-size: 14px;"><strong>Website:</strong> <a href="${website}" style="color: #10b981;">${website}</a></p>` : ''}
        </div>
        <div style="background: #ffffff; border: 2px solid #e5e7eb; padding: 30px; border-radius: 8px; margin: 30px 0;">
          ${formattedAudit}
        </div>
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center; border: 1px solid #d1fae5;">
          <h3 style="color: #111827; font-size: 20px; font-weight: 700; margin: 0 0 12px 0;">Ready to Implement?</h3>
          <p style="color: #374151; font-size: 15px; margin: 0 0 20px 0;">
            This audit is just the beginning. Let's turn these strategies into reality and drive real growth for ${companyName}.
          </p>
          <a href="https://cielo.agency" style="display: inline-block; background: #10b981; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">Work With CIELO →</a>
        </div>
        <div style="margin: 30px 0;">
          <h4 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">What's Next?</h4>
          <div style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <span style="color: #10b981; font-weight: 700;">1.</span> Review your personalized audit above
          </div>
          <div style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <span style="color: #10b981; font-weight: 700;">2.</span> Identify 2-3 quick wins to implement immediately
          </div>
          <div style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <span style="color: #10b981; font-weight: 700;">3.</span> Book a call with CIELO to discuss full implementation
          </div>
          <div style="padding: 12px 0;">
            <span style="color: #10b981; font-weight: 700;">4.</span> Let us handle the execution while you focus on your business
          </div>
        </div>
        <p style="color: #374151; font-size: 14px; margin: 30px 0 0 0;">Have questions? Reply to this email - we're here to help.</p>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 13px; margin: 0 0 15px 0;">
          This audit was generated by CIELO's AI-powered brand analysis system,<br />combining industry research, competitive analysis, and strategic expertise.
        </p>
        <div style="margin: 20px 0;">
          <a href="https://cielo.agency" style="color: #111827; text-decoration: none; font-weight: 700; font-size: 18px;">CIELO</a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Creative Growth for Fast-Moving Founders</p>
      </div>
    </div>
  `;
}

export function formatAdminEmail(
  focusArea: string,
  companyName: string,
  industry: string,
  website: string,
  email: string,
  targetAudience: string,
  currentChallenges: string,
  competitors: string,
  uniqueValue: string,
  goals: string,
  submissionId: string
): string {
  const focusTitle = focusArea.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Brand Audit Lead</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Someone just completed a brand audit!</p>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
        <h2 style="color: #111827; margin-top: 0; font-size: 20px;">Lead Information</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #6b7280; width: 140px;">Company</td>
            <td style="padding: 12px 0; color: #111827;">${companyName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Industry</td>
            <td style="padding: 12px 0; color: #111827;">${industry}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
          </tr>
          ${website ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Website</td>
            <td style="padding: 12px 0;"><a href="${website}" style="color: #10b981; text-decoration: none;" target="_blank">${website}</a></td>
          </tr>
          ` : ''}
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Focus Area</td>
            <td style="padding: 12px 0; color: #111827;">
              <span style="background: #f0fdf4; color: #059669; padding: 4px 12px; border-radius: 16px; font-size: 14px;">
                ${focusTitle}
              </span>
            </td>
          </tr>
        </table>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827; font-size: 16px;">Target Audience</h3>
          <p style="margin: 0; color: #374151; line-height: 1.6;">${targetAudience}</p>
        </div>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827; font-size: 16px;">Current Challenges</h3>
          <p style="margin: 0; color: #374151; line-height: 1.6;">${currentChallenges}</p>
        </div>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827; font-size: 16px;">Main Competitors</h3>
          <p style="margin: 0; color: #374151; line-height: 1.6;">${competitors}</p>
        </div>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827; font-size: 16px;">Unique Value</h3>
          <p style="margin: 0; color: #374151; line-height: 1.6;">${uniqueValue}</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #111827; font-size: 16px;">Goals</h3>
          <p style="margin: 0; color: #374151; line-height: 1.6; font-weight: 500;">${goals}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            <strong>Next Steps:</strong><br />
            1. Review the full audit in Supabase dashboard<br />
            2. Follow up within 24 hours at <a href="mailto:${email}" style="color: #10b981;">${email}</a><br />
            3. Reference their specific challenges in your outreach<br />
            4. Book a discovery call to discuss implementation
          </p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 500;">
            Email ${companyName}
          </a>
        </div>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          Submission ID: ${submissionId}<br />
          Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  `;
}
