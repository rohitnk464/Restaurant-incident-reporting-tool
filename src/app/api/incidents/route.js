import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/incidents - List all incidents with optional filtering
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where = {};

    // Role-Based Access Control
    if (session?.user?.role === 'manager' && session?.user?.storeLocation) {
      where.storeLocation = session.user.storeLocation;
    }

    if (category) where.category = category;
    if (severity) where.severity = severity;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const incidents = await prisma.incident.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.incident.count();

    return NextResponse.json({
      success: true,
      data: incidents,
      meta: { total, filtered: incidents.length },
    });
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
}

// POST /api/incidents - Create a new incident
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, category, storeLocation, severity, reportedAt, imageUrl } = body;

    // Validation
    const errors = [];
    if (!title || title.length < 5 || title.length > 100) {
      errors.push('Title must be between 5 and 100 characters');
    }
    if (!description || description.length < 10 || description.length > 2000) {
      errors.push('Description must be between 10 and 2000 characters');
    }
    if (!category) errors.push('Category is required');
    if (!storeLocation) errors.push('Store location is required');
    if (!severity) errors.push('Severity level is required');

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        category,
        storeLocation,
        severity,
        imageUrl: imageUrl || null,
        reportedAt: reportedAt ? new Date(reportedAt) : new Date(),
      },
    });

    let emailPreviewUrl = null;

    // Send email notification for High or Critical incidents
    if (severity === 'High' || severity === 'Critical') {
      // Send email asynchronously in the background so we don't block the API response
      (async () => {
        try {
          const nodemailer = require('nodemailer');
          let transporter;

          if (process.env.SMTP_HOST) {
            // Use production SMTP
            transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: parseInt(process.env.SMTP_PORT || '587'),
              secure: process.env.SMTP_SECURE === 'true',
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            });
          } else {
            // Fallback to Ethereal SMTP for development
            // Use global caching if available to avoid creating accounts on every request
            if (!global.etherealAccount) {
              global.etherealAccount = await nodemailer.createTestAccount();
            }
            transporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              secure: false,
              auth: {
                user: global.etherealAccount.user,
                pass: global.etherealAccount.pass,
              },
            });
          }

          const fromEmail = process.env.SMTP_FROM || '"California Burrito Incident Alerts" <noreply@californiaburrito.com>';
          const toEmail = process.env.SMTP_TO || 'manager@californiaburrito.com';

          const info = await transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            subject: `🚨 [${severity}] New Incident: ${title}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #1a1a1a;">
                <h2 style="color: #e61c24; border-bottom: 2px solid #e61c24; padding-bottom: 10px;">New ${severity} Incident Reported</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px;">Store Location:</td>
                    <td style="padding: 8px 0;">${storeLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Category:</td>
                    <td style="padding: 8px 0;">${category}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Severity:</td>
                    <td style="padding: 8px 0; color: #e61c24; font-weight: bold;">${severity}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Description:</td>
                    <td style="padding: 8px 0; white-space: pre-wrap;">${description}</td>
                  </tr>
                </table>
                <div style="margin-top: 25px;">
                  <a href="http://localhost:3000/incident/${incident.id}" style="background: #e61c24; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                    View Incident Dashboard
                  </a>
                </div>
              </div>
            `,
          });

          if (!process.env.SMTP_HOST) {
            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log('\x1b[35m%s\x1b[0m', `✉️  [Email Alert Sent (Dev)] Preview URL: ${previewUrl}`);
          } else {
            console.log(`✉️  [Email Alert Sent (Prod)] Message ID: ${info.messageId}`);
          }
        } catch (err) {
          console.error('Failed to send email alert:', err);
        }
      })();
    }

    return NextResponse.json({ success: true, data: incident, emailPreviewUrl }, { status: 201 });
  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}
