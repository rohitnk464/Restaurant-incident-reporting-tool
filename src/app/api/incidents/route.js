import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/incidents - List all incidents with optional filtering
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Access is restricted to authenticated users.' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where = {};

    // Role-Based Access Control
    if (session.user.role === 'manager' && session.user.storeLocation) {
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

    return NextResponse.json({ success: true, data: incident }, { status: 201 });
  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}
