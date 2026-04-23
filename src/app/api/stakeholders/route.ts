import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const createStakeholderSchema = z.object({
  email: z.string().email("Invalid email address"),
  full_name: z.string().min(1).max(200),
  stakeholder_role: z.string().max(100).optional(),
  is_active: z.boolean().default(true),
});

const updateStakeholderSchema = z.object({
  id: z.uuid(),
  email: z.string().email("Invalid email address").optional(),
  full_name: z.string().min(1).max(200).optional(),
  stakeholder_role: z.string().max(100).optional(),
  is_active: z.boolean().optional(),
});

const deleteStakeholderSchema = z.object({
  id: z.uuid(),
});

export async function GET() {
  try {
    const adminCheck = await requireAdmin();

    if (!adminCheck.ok) {
      return NextResponse.json(
        { message: adminCheck.message },
        { status: adminCheck.status },
      );
    }

    const adminClient = createAdminSupabaseClient() as any;
    const { data, error } = await adminClient
      .from("stakeholders")
      .select("id, email, full_name, stakeholder_role, is_active, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Unable to load stakeholders." },
        { status: 500 },
      );
    }

    return NextResponse.json({ stakeholders: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected stakeholders API failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const adminCheck = await requireAdmin();

  if (!adminCheck.ok) {
    return NextResponse.json(
      { message: adminCheck.message },
      { status: adminCheck.status },
    );
  }

  try {
    const body = await request.json();
    const payload = createStakeholderSchema.parse(body);
    const adminClient = createAdminSupabaseClient() as any;

    const { data: existing, error: checkError } = await adminClient
      .from("stakeholders")
      .select("id")
      .eq("email", payload.email.toLowerCase().trim())
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { message: "Unable to check stakeholder uniqueness." },
        { status: 500 },
      );
    }

    if (existing) {
      return NextResponse.json(
        { message: "A stakeholder with this email already exists." },
        { status: 409 },
      );
    }

    const { data: inserted, error: insertError } = await adminClient
      .from("stakeholders")
      .insert({
        email: payload.email.toLowerCase().trim(),
        full_name: payload.full_name.trim(),
        stakeholder_role: payload.stakeholder_role?.trim() || null,
        is_active: payload.is_active,
      })
      .select("id, email, full_name, stakeholder_role, is_active, created_at, updated_at")
      .single();

    if (insertError || !inserted) {
      return NextResponse.json(
        { message: "Unable to create stakeholder." },
        { status: 500 },
      );
    }

    return NextResponse.json({ stakeholder: inserted }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected stakeholder creation failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const adminCheck = await requireAdmin();

  if (!adminCheck.ok) {
    return NextResponse.json(
      { message: adminCheck.message },
      { status: adminCheck.status },
    );
  }

  try {
    const body = await request.json();
    const payload = updateStakeholderSchema.parse(body);
    const adminClient = createAdminSupabaseClient() as any;

    const { data: existing, error: checkError } = await adminClient
      .from("stakeholders")
      .select("id, email")
      .eq("id", payload.id)
      .maybeSingle();

    if (checkError || !existing) {
      return NextResponse.json(
        { message: "Stakeholder not found." },
        { status: 404 },
      );
    }

    if (payload.email && payload.email.toLowerCase().trim() !== existing.email) {
      const { data: conflict, error: conflictError } = await adminClient
        .from("stakeholders")
        .select("id")
        .eq("email", payload.email.toLowerCase().trim())
        .neq("id", payload.id)
        .maybeSingle();

      if (conflictError) {
        return NextResponse.json(
          { message: "Unable to verify stakeholder email uniqueness." },
          { status: 500 },
        );
      }

      if (conflict) {
        return NextResponse.json(
          { message: "A stakeholder with this email already exists." },
          { status: 409 },
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (payload.email !== undefined) {
      updateData.email = payload.email.toLowerCase().trim();
    }
    if (payload.full_name !== undefined) {
      updateData.full_name = payload.full_name.trim();
    }
    if (payload.stakeholder_role !== undefined) {
      updateData.stakeholder_role = payload.stakeholder_role?.trim() || null;
    }
    if (payload.is_active !== undefined) {
      updateData.is_active = payload.is_active;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields to update." },
        { status: 400 },
      );
    }

    const { data: updated, error: updateError } = await adminClient
      .from("stakeholders")
      .update(updateData)
      .eq("id", payload.id)
      .select("id, email, full_name, stakeholder_role, is_active, created_at, updated_at")
      .single();

    if (updateError || !updated) {
      return NextResponse.json(
        { message: "Unable to update stakeholder." },
        { status: 500 },
      );
    }

    return NextResponse.json({ stakeholder: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected stakeholder update failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const adminCheck = await requireAdmin();

  if (!adminCheck.ok) {
    return NextResponse.json(
      { message: adminCheck.message },
      { status: adminCheck.status },
    );
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Stakeholder ID is required." },
        { status: 400 },
      );
    }

    const payload = deleteStakeholderSchema.parse({ id });
    const adminClient = createAdminSupabaseClient() as any;

    const { data: existing, error: checkError } = await adminClient
      .from("stakeholders")
      .select("id, full_name")
      .eq("id", payload.id)
      .maybeSingle();

    if (checkError || !existing) {
      return NextResponse.json(
        { message: "Stakeholder not found." },
        { status: 404 },
      );
    }

    const { data: submissions, error: submissionsError } = await adminClient
      .from("evaluation_submissions")
      .select("id")
      .eq("stakeholder_id", payload.id)
      .limit(1)
      .maybe();

    if (!submissionsError && submissions && submissions.length > 0) {
      const { error: deactivateError } = await adminClient
        .from("stakeholders")
        .update({ is_active: false })
        .eq("id", payload.id);

      if (deactivateError) {
        return NextResponse.json(
          { message: "Unable to deactivate stakeholder (has submissions)." },
          { status: 500 },
        );
      }

      return NextResponse.json({
        message: "Stakeholder has existing submissions. Deactivated instead of deleted.",
      });
    }

    const { error: deleteError } = await adminClient
      .from("stakeholders")
      .delete()
      .eq("id", payload.id);

    if (deleteError) {
      return NextResponse.json(
        { message: "Unable to delete stakeholder." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected stakeholder deletion failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}