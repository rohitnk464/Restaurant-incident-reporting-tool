import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/incidents/[id] - Get single incident
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const incident = await prisma.incident.findUnique({ where: { id } });

    if (!incident) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: incident });
  } catch (error) {
    console.error('Error fetching incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch incident' },
      { status: 500 }
    );
  }
}

// PUT /api/incidents/[id] - Update incident
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.incident.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    const incident = await prisma.incident.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, data: incident });
  } catch (error) {
    console.error('Error updating incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update incident' },
      { status: 500 }
    );
  }
}

// DELETE /api/incidents/[id] - Delete incident
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existing = await prisma.incident.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    await prisma.incident.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Incident deleted' });
  } catch (error) {
    console.error('Error deleting incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete incident' },
      { status: 500 }
    );
  }
}

// PATCH /api/incidents/[id] - Partial update (e.g., status updates from frontend)
export async function PATCH(request, { params }) {
  return PUT(request, { params });
}
