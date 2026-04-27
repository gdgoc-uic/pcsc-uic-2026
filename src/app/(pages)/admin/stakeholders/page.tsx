"use client";

import { Loader2, Plus, Pencil, Trash2, Upload, Eye, EyeOff, X, Users, AlertCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PageHero from "@/app/components/sections/PageHero";

type Stakeholder = {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type StakeholderFormData = {
  email: string;
  full_name: string;
  is_active: boolean;
};

const parseCSVLine = (line: string): { email: string; name: string } | null => {
  const parts = line.split(",").map((p) => p.trim());
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return {
      email: parts[0],
      name: parts[1],
    };
  }
  return null;
};

export default function AdminStakeholdersPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StakeholderFormData>({
    email: "",
    full_name: "",
    is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const loadStakeholders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stakeholders");
      const payload = (await response.json()) as { stakeholders?: Stakeholder[]; message?: string };
      if (!response.ok) {
        setMessage(payload.message ?? "Unable to load participants.");
        return;
      }
      setStakeholders(payload.stakeholders ?? []);
    } catch {
      setMessage("Unable to load participants right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStakeholders();
  }, [loadStakeholders]);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      email: "",
      full_name: "",
      is_active: true,
    });
    setIsEditing(true);
  };

  const handleEdit = (s: Stakeholder) => {
    setEditingId(s.id);
    setFormData({
      email: s.email,
      full_name: s.full_name,
      is_active: s.is_active,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!formData.email.trim() || !formData.full_name.trim()) {
      setMessage("Email and name are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      if (editingId) {
        const response = await fetch("/api/stakeholders", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            email: formData.email.trim(),
            full_name: formData.full_name.trim(),
            is_active: formData.is_active,
          }),
        });
        const payload = (await response.json()) as { message?: string };
        if (!response.ok) {
          setMessage(payload.message ?? "Failed to update participant.");
          setIsSaving(false);
          return;
        }
        setMessage("Participant updated.");
      } else {
        const response = await fetch("/api/stakeholders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const payload = (await response.json()) as { message?: string };
        if (!response.ok) {
          setMessage(payload.message ?? "Failed to create participant.");
          setIsSaving(false);
          return;
        }
        setMessage("Participant created.");
      }

      setIsEditing(false);
      setEditingId(null);
      await loadStakeholders();
    } catch {
      setMessage("Failed to save participant due to network error.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this participant?")) {
      return;
    }

    try {
      const response = await fetch(`/api/stakeholders?id=${id}`, { method: "DELETE" });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(payload.message ?? "Failed to delete participant.");
        return;
      }
      setMessage(payload.message ?? "Participant deleted.");
      await loadStakeholders();
    } catch {
      setMessage("Failed to delete participant.");
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch("/api/stakeholders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !currentActive }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(payload.message ?? "Failed to toggle status.");
        return;
      }
      await loadStakeholders();
    } catch {
      setMessage("Failed to toggle status.");
    }
  };

  const handleImport = async () => {
    const lines = importText.split("\n").filter((l) => l.trim());
    const parsed = lines.map(parseCSVLine).filter(Boolean) as { email: string; name: string; role: string }[];

    if (parsed.length === 0) {
      setImportError("No valid rows found. Use format: email, name, role");
      return;
    }

    setImportError("");
    setIsImporting(true);

    let created = 0;
    let skipped = 0;
    let failed = 0;

    for (const row of parsed) {
      try {
        const response = await fetch("/api/stakeholders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: row.email,
            full_name: row.name,
            is_active: true,
          }),
        });

        if (response.ok) {
          created++;
        } else if (response.status === 409) {
          skipped++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
    }

    setImportError("");
    setMessage(`Imported ${created} participant(s). Skipped ${skipped}. Failed ${failed}.`);
    setImportText("");
    setShowImport(false);
    await loadStakeholders();
    setIsImporting(false);
  };

  const activeCount = stakeholders.filter((s) => s.is_active).length;
  const inactiveCount = stakeholders.length - activeCount;

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Participants"
        description="Manage participant invitations. Add participants who can submit evaluations and receive certificates."
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <nav className="flex gap-2 mb-2">
          <a
            href="/admin/certificates"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Certificates
          </a>
          <a
            href="/admin/questions"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Questions
          </a>
          <a
            href="/admin/stakeholders"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700"
          >
            Participants
          </a>
          <a
            href="/admin/results"
            className="rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
          >
            Results
          </a>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">Participants</h2>
            <div className="flex gap-3 text-sm">
              <span className="text-emerald-400">{activeCount} active</span>
              {inactiveCount > 0 && (
                <span className="text-white/50">{inactiveCount} inactive</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowImport(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800"
            >
              <Upload className="h-4 w-4" /> Import CSV
            </button>
            <button
              type="button"
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100"
            >
              <Plus className="h-4 w-4" /> Add Participant
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-8 text-center text-white/90">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading participants...
          </div>
        ) : stakeholders.length === 0 ? (
          <div className="rounded-xl border border-brick-red-600 bg-brick-red-800/30 p-8 text-center text-white/90">
            <Users className="h-8 w-8 mx-auto mb-2 text-white/50" />
            <p>No participants configured yet.</p>
            <p className="text-sm text-white/60 mt-1">Click "Add Participant" to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-brick-red-600 bg-brick-red-800/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brick-red-600">
                  <th className="px-4 py-3 text-left font-semibold text-white">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stakeholders.map((s) => (
                  <tr key={s.id} className="border-b border-brick-red-600/50 last:border-b-0">
                    <td className="px-4 py-3 text-white">{s.full_name}</td>
                    <td className="px-4 py-3 text-white/80 font-mono text-xs">{s.email}</td>
                    <td className="px-4 py-3">
                      {s.is_active ? (
                        <span className="rounded-full bg-emerald-600/30 border border-emerald-400/50 px-2 py-0.5 text-xs text-emerald-100">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/10 border border-white/30 px-2 py-0.5 text-xs text-white/60">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(s.id, s.is_active)}
                          className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
                          title={s.is_active ? "Deactivate" : "Activate"}
                        >
                          {s.is_active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(s)}
                          className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id)}
                          className="rounded-md p-1.5 text-rose-400 hover:bg-rose-600/20"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(isEditing || showImport) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-xl border border-brick-red-600 bg-brick-red-900 p-6 space-y-4">
              {isEditing && (
                <>
                  <h3 className="text-lg font-bold text-white">
                    {editingId ? "Edit Participant" : "Add Participant"}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/90 mb-1">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white"
                        placeholder="Juan dela Cruz"
                      />
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="h-4 w-4 rounded border-brick-red-500 bg-brick-red-900 text-white"
                      />
                      <span className="text-sm text-white">Active</span>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
                    >
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {editingId ? "Save Changes" : "Add Participant"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex-1 rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {showImport && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Import Participants</h3>
                    <button
                      type="button"
                      onClick={() => setShowImport(false)}
                      className="rounded-md p-1 text-white/70 hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="rounded-lg border border-brick-red-600 bg-brick-red-900/50 p-3">
                    <p className="text-xs text-white/70 mb-2">
                      Paste CSV data below. Format: <code className="text-rose-300">email, name, role</code> (one per line)
                    </p>
                    <textarea
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      rows={8}
                      className="w-full rounded-md border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white font-mono text-sm"
                      placeholder="juan@example.com,Juan dela Cruz,Speaker&#10;jane@example.com,Jane Doe,Participant"
                    />
                  </div>
                  {importError && (
                    <div className="flex items-center gap-2 text-sm text-rose-400">
                      <AlertCircle className="h-4 w-4" />
                      {importError}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleImport}
                      disabled={isImporting || !importText.trim()}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
                    >
                      {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      Import Participants
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImport(false)}
                      disabled={isImporting}
                      className="flex-1 rounded-lg border border-brick-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brick-red-800 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {message ? <p className="text-sm text-white/85">{message}</p> : null}
      </div>
    </main>
  );
}