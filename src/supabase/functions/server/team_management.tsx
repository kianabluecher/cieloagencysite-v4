// Team management endpoints

import { Context } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Get all team members
export async function getTeamMembers(c: Context) {
  try {
    // Get all users from Supabase Auth
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      throw error;
    }
    
    // Get permissions for each user
    const members = await Promise.all(users.map(async (user) => {
      const permissionsData = await kv.get(`team:permissions:${user.id}`);
      
      return {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
        role: user.user_metadata?.role || 'team',
        status: user.email_confirmed_at ? 'active' : 'pending',
        created_at: user.created_at,
        permissions: permissionsData || null,
      };
    }));
    
    return c.json({ members });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return c.json({ error: 'Failed to fetch team members' }, 500);
  }
}

// Get pending invitations
export async function getPendingInvitations(c: Context) {
  try {
    const invitations = await kv.getByPrefix('team:invitation:');
    
    // Filter out expired invitations
    const validInvitations = invitations.filter(inv => {
      const expiresAt = new Date(inv.expires_at);
      return expiresAt > new Date();
    });
    
    return c.json({ invitations: validInvitations });
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return c.json({ error: 'Failed to fetch invitations' }, 500);
  }
}

// Invite team member
export async function inviteTeamMember(c: Context, invitedBy: string) {
  try {
    const { email, role, permissions } = await c.req.json();
    
    if (!email || !role) {
      return c.json({ error: 'Email and role are required' }, 400);
    }
    
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users.some(u => u.email === email);
    
    if (userExists) {
      return c.json({ error: 'User already exists' }, 400);
    }
    
    // Create invitation token
    const invitationToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days
    
    // Generate a temporary password for the user
    const temporaryPassword = crypto.randomUUID();
    
    // Create the user account immediately with a temporary password
    const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
      email,
      password: temporaryPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: email.split('@')[0], // Temporary name until they complete signup
        role,
        pending_invitation: true, // Mark as pending invitation
      },
    });
    
    if (createUserError || !userData.user) {
      console.error('Error creating user:', createUserError);
      return c.json({ error: 'Failed to create user account' }, 500);
    }
    
    // Create user profile in database
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: userData.user.id,
        email: email,
        full_name: email.split('@')[0],
        role: role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Continue even if profile fails
    }
    
    // Save permissions
    if (permissions) {
      await kv.set(`team:permissions:${userData.user.id}`, permissions);
    }
    
    const invitation = {
      email,
      role,
      permissions: permissions || {},
      invited_by: invitedBy,
      invited_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
      token: invitationToken,
      user_id: userData.user.id,
      temporary_password: temporaryPassword, // Store for the email
    };
    
    await kv.set(`team:invitation:${email}`, invitation);
    
    // Send invitation email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return c.json({ error: 'Email service not configured. Please contact administrator.' }, 500);
    }

    try {
      const inviteUrl = `https://cielo.agency/team-login?invitation=${invitationToken}&email=${encodeURIComponent(email)}`;
      
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #18181b; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f4f4f5; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: white; color: black; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .credentials { background: white; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #06b6d4; }
            .footer { text-align: center; margin-top: 20px; color: #71717a; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 CIELO Agency Team Invitation</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>You've been invited to join the <strong>CIELO Agency</strong> team dashboard as a <strong>${role}</strong>.</p>
              <p>Your account has been created. Use these temporary credentials to sign in:</p>
              <div class="credentials">
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${temporaryPassword}</p>
              </div>
              <p><strong>Important:</strong> Please change your password immediately after your first login.</p>
              <div style="text-align: center;">
                <a href="${inviteUrl}" class="button">Access Dashboard</a>
              </div>
              <p style="color: #71717a; font-size: 14px;">Or copy and paste this link into your browser:<br>${inviteUrl}</p>
              <p style="color: #71717a; font-size: 14px; margin-top: 30px;">This invitation will expire in 7 days.</p>
            </div>
            <div class="footer">
              <p>CIELO Agency • cielo.agency</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CIELO Agency <noreply@cielo.agency>',
          to: email,
          subject: '🎨 You\'re invited to join CIELO Agency team',
          html: emailHtml,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.text();
        console.error('Resend API error:', errorData);
        throw new Error(`Failed to send email: ${errorData}`);
      }

      const emailResult = await emailResponse.json();
      console.log('Invitation email sent successfully:', emailResult);
    } catch (emailError) {
      console.error('Error sending invitation email:', emailError);
      // Don't clean up the user - they can still be manually given access
      return c.json({ 
        warning: 'User created but email failed to send. Please share credentials manually.',
        user: userData.user,
        temporary_password: temporaryPassword 
      }, 201);
    }
    
    return c.json({ 
      message: 'Invitation sent successfully', 
      token: invitationToken,
      user_id: userData.user.id 
    });
  } catch (error) {
    console.error('Error inviting team member:', error);
    return c.json({ error: 'Failed to send invitation' }, 500);
  }
}

// Update team member permissions
export async function updateMemberPermissions(c: Context, memberId: string) {
  try {
    const { permissions } = await c.req.json();
    
    if (!permissions) {
      return c.json({ error: 'Permissions are required' }, 400);
    }
    
    // Save permissions to KV store
    await kv.set(`team:permissions:${memberId}`, permissions);
    
    return c.json({ message: 'Permissions updated successfully' });
  } catch (error) {
    console.error('Error updating permissions:', error);
    return c.json({ error: 'Failed to update permissions' }, 500);
  }
}

// Get team member permissions
export async function getMemberPermissions(c: Context, memberId: string) {
  try {
    // Get permissions from KV store
    const permissions = await kv.get(`team:permissions:${memberId}`);
    
    return c.json({ permissions: permissions || null });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return c.json({ error: 'Failed to fetch permissions' }, 500);
  }
}

// Remove team member
export async function removeTeamMember(c: Context, memberId: string) {
  try {
    // Delete user from Supabase Auth
    const { error } = await supabase.auth.admin.deleteUser(memberId);
    
    if (error) {
      throw error;
    }
    
    // Delete permissions
    await kv.del(`team:permissions:${memberId}`);
    
    return c.json({ message: 'Team member removed successfully' });
  } catch (error) {
    console.error('Error removing team member:', error);
    return c.json({ error: 'Failed to remove team member' }, 500);
  }
}

// Revoke invitation
export async function revokeInvitation(c: Context, email: string) {
  try {
    await kv.del(`team:invitation:${email}`);
    return c.json({ message: 'Invitation revoked successfully' });
  } catch (error) {
    console.error('Error revoking invitation:', error);
    return c.json({ error: 'Failed to revoke invitation' }, 500);
  }
}

// Accept invitation and create account
export async function acceptInvitation(c: Context) {
  try {
    const { token, email, password, full_name } = await c.req.json();
    
    if (!token || !email || !password || !full_name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Get invitation
    const invitation = await kv.get(`team:invitation:${email}`);
    
    if (!invitation || invitation.token !== token) {
      return c.json({ error: 'Invalid invitation' }, 400);
    }
    
    // Check if invitation has expired
    const expiresAt = new Date(invitation.expires_at);
    if (expiresAt < new Date()) {
      await kv.del(`team:invitation:${email}`);
      return c.json({ error: 'Invitation has expired' }, 400);
    }
    
    // Create user account
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        role: invitation.role,
      },
    });
    
    if (error) {
      throw error;
    }
    
    if (!data.user) {
      throw new Error('User creation failed');
    }
    
    // Create user profile in database
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        email: email,
        full_name: full_name,
        role: invitation.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Don't fail the whole operation if profile creation fails
      // The trigger should handle this, but we're being extra safe
    }
    
    // Save permissions
    if (invitation.permissions && data.user) {
      await kv.set(`team:permissions:${data.user.id}`, invitation.permissions);
    }
    
    // Delete invitation
    await kv.del(`team:invitation:${email}`);
    
    return c.json({ 
      message: 'Account created successfully',
      user: data.user 
    });
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
}

// Create user directly (admin only - no invitation needed)
export async function createUser(c: Context) {
  try {
    const { email, password, full_name, role, permissions } = await c.req.json();
    
    if (!email || !password || !full_name || !role) {
      return c.json({ error: 'Email, password, full name, and role are required' }, 400);
    }
    
    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400);
    }
    
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users.some(u => u.email === email);
    
    if (userExists) {
      return c.json({ error: 'User with this email already exists' }, 400);
    }
    
    // Create user account
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        role,
      },
    });
    
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    
    if (!data.user) {
      throw new Error('User creation failed');
    }
    
    // Create user profile in database
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        email: email,
        full_name: full_name,
        role: role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Continue even if profile creation fails - the trigger should handle it
    }
    
    // Save permissions if provided
    if (permissions && data.user) {
      await kv.set(`team:permissions:${data.user.id}`, permissions);
    }
    
    console.log(`✅ User created successfully: ${email} (${role})`);
    
    return c.json({ 
      message: 'User created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: full_name,
        role: role,
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
}