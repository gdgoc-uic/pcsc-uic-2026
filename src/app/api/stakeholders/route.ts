import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";

const createStakeholderSchema = z.object({
  email: z.string().email("Invalid email address"),
  full_name: z.string().min(1).max(200),
  is_active: z.boolean().default(true),
});

const updateStakeholderSchema = z.object({
  id: z.uuid(),
  email: z.string().email("Invalid email address").optional(),
  full_name: z.string().min(1).max(200).optional(),
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

    const adminClient = createAdminSupabaseClient();
    const { data, error } = await adminClient
      .from("stakeholders")
      .select("id, email, full_name, is_active, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Unable to load participants." },
        { status: 500 },
      );
    }

    return NextResponse.json({ stakeholders: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected participants API failure.",
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
    const adminClient = createAdminSupabaseClient();

    const { data: existing, error: checkError } = await adminClient
      .from("stakeholders")
      .select("id")
      .eq("email", payload.email.toLowerCase().trim())
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { message: "Unable to check participant uniqueness." },
        { status: 500 },
      );
    }

    if (existing) {
      return NextResponse.json(
        { message: "A participant with this email already exists." },
        { status: 409 },
      );
    }

    const { data: inserted, error: insertError } = await adminClient
      .from("stakeholders")
      .insert({
        email: payload.email.toLowerCase().trim(),
        full_name: payload.full_name.trim(),
        is_active: payload.is_active,
      })
      .select("id, email, full_name, is_active, created_at, updated_at")
      .single();

    if (insertError || !inserted) {
      return NextResponse.json(
        { message: "Unable to create participant." },
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
        message: "Unexpected participant creation failure.",
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
    const adminClient = createAdminSupabaseClient();

    const { data: existing, error: checkError } = await adminClient
      .from("stakeholders")
      .select("id, email")
      .eq("id", payload.id)
      .maybeSingle();

    if (checkError || !existing) {
      return NextResponse.json(
        { message: "Participant not found." },
        { status: 404 },
      );
    }

    if (
      payload.email &&
      payload.email.toLowerCase().trim() !== existing.email
    ) {
      const { data: conflict, error: conflictError } = await adminClient
        .from("stakeholders")
        .select("id")
        .eq("email", payload.email.toLowerCase().trim())
        .neq("id", payload.id)
        .maybeSingle();

      if (conflictError) {
        return NextResponse.json(
          { message: "Unable to verify participant email uniqueness." },
          { status: 500 },
        );
      }

      if (conflict) {
        return NextResponse.json(
          { message: "A participant with this email already exists." },
          { status: 409 },
        );
      }
    }

    const updateData: Database["public"]["Tables"]["stakeholders"]["Update"] =
      {};
    if (payload.email !== undefined) {
      updateData.email = payload.email.toLowerCase().trim();
    }
    if (payload.full_name !== undefined) {
      updateData.full_name = payload.full_name.trim();
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
      .select("id, email, full_name, is_active, created_at, updated_at")
      .single();

    if (updateError || !updated) {
      return NextResponse.json(
        { message: "Unable to update participant." },
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
        message: "Unexpected participant update failure.",
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
        { message: "Participant ID is required." },
        { status: 400 },
      );
    }

    const payload = deleteStakeholderSchema.parse({ id });
    const adminClient = createAdminSupabaseClient();

    const { data: existing, error: checkError } = await adminClient
      .from("stakeholders")
      .select("id, full_name")
      .eq("id", payload.id)
      .maybeSingle();

    if (checkError || !existing) {
      return NextResponse.json(
        { message: "Participant not found." },
        { status: 404 },
      );
    }

    const { data: submissions, error: submissionsError } = await adminClient
      .from("evaluation_submissions")
      .select("id")
      .eq("stakeholder_id", payload.id)
      .limit(1)
      .maybeSingle();

    if (!submissionsError && submissions) {
      const { error: deactivateError } = await adminClient
        .from("stakeholders")
        .update({ is_active: false })
        .eq("id", payload.id);

      if (deactivateError) {
        return NextResponse.json(
          { message: "Unable to deactivate participant (has submissions)." },
          { status: 500 },
        );
      }

      return NextResponse.json({
        message:
          "Participant has existing submissions. Deactivated instead of deleted.",
      });
    }

    const { error: deleteError } = await adminClient
      .from("stakeholders")
      .delete()
      .eq("id", payload.id);

    if (deleteError) {
      return NextResponse.json(
        { message: "Unable to delete participant." },
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
        message: "Unexpected participant deletion failure.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
