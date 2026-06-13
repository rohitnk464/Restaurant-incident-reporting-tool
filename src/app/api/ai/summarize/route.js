import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { incidentId } = await request.json();

    if (!incidentId) {
      return NextResponse.json(
        { success: false, error: 'Incident ID is required' },
        { status: 400 }
      );
    }

    const incident = await prisma.incident.findUnique({ where: { id: incidentId } });
    if (!incident) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert restaurant operations analyst for California Burrito, a QSR chain. Analyze the following incident report and provide a concise, actionable summary.

Incident Details:
- Title: ${incident.title}
- Category: ${incident.category}
- Severity: ${incident.severity}
- Store: ${incident.storeLocation}
- Description: ${incident.description}
- Reported: ${incident.reportedAt}

Provide a summary in this format:
📋 **Summary:** (2-3 sentence summary of the incident)
⚠️ **Impact:** (potential business impact)
✅ **Recommended Action:** (specific steps to resolve)
🔄 **Prevention:** (how to prevent recurrence)

Keep the response concise and actionable. Use plain text, no markdown headers.`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    // Save summary to database
    await prisma.incident.update({
      where: { id: incidentId },
      data: { aiSummary: summary },
    });

    return NextResponse.json({ success: true, data: { summary } });
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate AI summary. Please check your API key.' },
      { status: 500 }
    );
  }
}
