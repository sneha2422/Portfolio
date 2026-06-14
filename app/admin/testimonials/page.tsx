"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const ADMIN_PASSWORD = "sneha2024";

interface AdminTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  emoji: string;
  approved: boolean;
  createdAt?: { seconds: number };
}

export default function AdminTestimonials() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "testimonials"));
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AdminTestimonial, "id">) }));
      list.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
      setItems(list);
    } catch (e) {
      console.error("Failed to load testimonials:", e);
      alert("Failed to load. Check Firestore rules / connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const tryLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const approve = async (id: string) => {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "testimonials", id), { approved: true });
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, approved: true } : t)));
    } catch (e) {
      console.error(e);
      alert("Could not approve.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Permanently delete this testimonial?")) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "testimonials", id));
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
      alert("Could not delete.");
    } finally {
      setBusyId(null);
    }
  };

  const pending = items.filter((t) => !t.approved);
  const approved = items.filter((t) => t.approved);

  // ── Login gate ──
  if (!authed) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-4" style={{ backgroundColor: "#11071F" }}>
        <div className="w-full max-w-sm bg-[#160d2e] border border-[#7127BA]/40 rounded-3xl p-8 flex flex-col gap-4">
          <h1 className="text-white text-xl font-bold">Testimonials Admin</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && tryLogin()}
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#7127BA] transition"
          />
          {pwError && <p className="text-red-400 text-xs">Incorrect password.</p>}
          <button
            onClick={tryLogin}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7127BA] to-[#B18CFE] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const Card = ({ t }: { t: AdminTestimonial }) => (
    <div className="bg-[#160d2e] border border-[#7127BA]/25 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <span className="text-2xl leading-none">{t.emoji}</span>
        <div>
          <p className="text-[#B18CFE] text-sm font-semibold">{t.author}</p>
          {t.role && <p className="text-white/40 text-xs">{t.role}</p>}
        </div>
      </div>
      <p className="text-white/80 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex gap-2 pt-1">
        {!t.approved && (
          <button
            onClick={() => approve(t.id)}
            disabled={busyId === t.id}
            className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-300 text-xs font-semibold hover:bg-green-500/40 transition disabled:opacity-40"
          >
            {busyId === t.id ? "…" : "Approve"}
          </button>
        )}
        <button
          onClick={() => remove(t.id)}
          disabled={busyId === t.id}
          className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500/40 transition disabled:opacity-40"
        >
          {busyId === t.id ? "…" : t.approved ? "Delete" : "Reject"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] px-4 py-10 md:px-10" style={{ backgroundColor: "#11071F" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Jua, sans-serif" }}>Testimonials Admin</h1>
          <button onClick={load} className="text-[#B18CFE] text-sm border border-[#7127BA]/40 rounded-full px-4 py-2 hover:bg-[#7127BA]/20 transition">
            ⟳ Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-white/40 text-sm py-10">
            <span className="w-6 h-6 rounded-full border-2 border-[#7127BA]/30 border-t-[#B18CFE] animate-spin" />
            Loading…
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-white/90 text-lg font-semibold mb-4">
                Pending Review <span className="text-white/30 text-sm">({pending.length})</span>
              </h2>
              {pending.length === 0 ? (
                <p className="text-white/25 text-sm italic">No pending testimonials.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pending.map((t) => <Card key={t.id} t={t} />)}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-white/90 text-lg font-semibold mb-4">
                Approved <span className="text-white/30 text-sm">({approved.length})</span>
              </h2>
              {approved.length === 0 ? (
                <p className="text-white/25 text-sm italic">No approved testimonials yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {approved.map((t) => <Card key={t.id} t={t} />)}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
