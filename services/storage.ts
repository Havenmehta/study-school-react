/**
 * storage.ts  —  Firestore version
 * Replaces the old localStorage-based service.
 * All methods are async and return Promises.
 */

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Notice, Event, Result, Enquiry, AdmissionApplication } from "../types";

/* ─── SEED DATA (shown when Firestore collections are empty) ── */
const SEED_NOTICES: Omit<Notice, "id">[] = [
  { title: "Admissions Open for Session 2026-27", date: "2026-03-01", isImportant: true },
  { title: "Annual Sports Day scheduled for April 15th", date: "2026-03-10", isImportant: false },
  { title: "Parent Teacher Meeting on March 30th", date: "2026-03-20", isImportant: false },
];

const SEED_EVENTS: Omit<Event, "id">[] = [
  {
    title: "Annual Sports Day 2025",
    date: "2025-04-15",
    description: "A day of athletic excellence — track events, team games and prize distribution.",
    image: "https://lh3.googleusercontent.com/d/1QfTt7LEsSW55hweBKX0-_A5ubFwwGqi3",
  },
  {
    title: "Annual Function 2024",
    date: "2024-12-15",
    description: "A grand evening of music, dance, drama and prize distribution.",
    image: "https://lh3.googleusercontent.com/d/1Z9yd5qmuMGNxr0s0SgeRxRYMG4Xfq5YH",
  },
  {
    title: "Staff Felicitation Ceremony",
    date: "2024-09-05",
    description: "Honouring our dedicated teachers on Teachers' Day with awards and appreciation.",
    image: "https://lh3.googleusercontent.com/d/1_AEgihAoRvHN6j0vkl45CJwDD8FQooXB",
  },
];

/* ═══════════════════════════════════════════════
   NOTICES
═══════════════════════════════════════════════ */
export async function getNotices(): Promise<Notice[]> {
  try {
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) {
      // Seed Firestore with initial notices
      for (const n of SEED_NOTICES) {
        await addDoc(collection(db, "notices"), { ...n, createdAt: serverTimestamp() });
      }
      return SEED_NOTICES.map((n, i) => ({ ...n, id: String(i + 1) }));
    }
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Notice, "id">) }));
  } catch (err) {
    console.error("getNotices:", err);
    return SEED_NOTICES.map((n, i) => ({ ...n, id: String(i + 1) }));
  }
}

export async function addNotice(notice: Omit<Notice, "id">): Promise<void> {
  await addDoc(collection(db, "notices"), { ...notice, createdAt: serverTimestamp() });
}

export async function deleteNotice(id: string): Promise<void> {
  await deleteDoc(doc(db, "notices", id));
}

/* ═══════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════ */
export async function getEvents(): Promise<Event[]> {
  try {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) {
      for (const e of SEED_EVENTS) {
        await addDoc(collection(db, "events"), { ...e, createdAt: serverTimestamp() });
      }
      return SEED_EVENTS.map((e, i) => ({ ...e, id: String(i + 1) }));
    }
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Event, "id">) }));
  } catch (err) {
    console.error("getEvents:", err);
    return SEED_EVENTS.map((e, i) => ({ ...e, id: String(i + 1) }));
  }
}

export async function addEvent(event: Omit<Event, "id">): Promise<void> {
  await addDoc(collection(db, "events"), { ...event, createdAt: serverTimestamp() });
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, "events", id));
}

/* ═══════════════════════════════════════════════
   RESULTS
═══════════════════════════════════════════════ */

const SEED_RESULTS: Omit<Result, "id">[] = [
  {
    title: "Class X Board Result 2025 — Topper: Yaminee Yadav 98.17%",
    className: "Class X",
    year: "2024-25",
    date: "2025-06-01",
    pdfUrl: "",
  },
  {
    title: "Class XII Arts Result 2025 — Topper: Diya Chouhan 98.20%",
    className: "Class XII Arts",
    year: "2024-25",
    date: "2025-06-01",
    pdfUrl: "",
  },
  {
    title: "Class XII Science Result 2025 — Topper: Tanisha 95.8%",
    className: "Class XII Science",
    year: "2024-25",
    date: "2025-06-01",
    pdfUrl: "",
  },
  {
    title: "Class X Board Result 2024 — District Topper: Krishraj 98.50%",
    className: "Class X",
    year: "2023-24",
    date: "2024-06-01",
    pdfUrl: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/Previous-Results.pdf",
  },
  {
    title: "Class XII Arts Result 2024 — Topper: Himanshi 91.60%",
    className: "Class XII Arts",
    year: "2023-24",
    date: "2024-06-01",
    pdfUrl: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/Previous-Results.pdf",
  },
];

export async function getResults(): Promise<Result[]> {
  try {
    const q = query(collection(db, "results"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) {
      for (const r of SEED_RESULTS) {
        await addDoc(collection(db, "results"), { ...r, createdAt: serverTimestamp() });
      }
      const snap2 = await getDocs(q);
      return snap2.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Result, "id">) }));
    }
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Result, "id">) }));
  } catch (err) {
    console.error("getResults:", err);
    return [];
  }
}

export async function addResult(result: Omit<Result, "id">): Promise<void> {
  await addDoc(collection(db, "results"), { ...result, createdAt: serverTimestamp() });
}

export async function deleteResult(id: string): Promise<void> {
  await deleteDoc(doc(db, "results", id));
}

/* ═══════════════════════════════════════════════
   ENQUIRIES
═══════════════════════════════════════════════ */
export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Enquiry, "id">) }));
  } catch (err) {
    console.error("getEnquiries:", err);
    return [];
  }
}

export async function addEnquiry(enquiry: Omit<Enquiry, "id">): Promise<void> {
  await addDoc(collection(db, "enquiries"), { ...enquiry, createdAt: serverTimestamp() });
}

export async function deleteEnquiry(id: string): Promise<void> {
  await deleteDoc(doc(db, "enquiries", id));
}

/* ═══════════════════════════════════════════════
   ADMISSIONS
═══════════════════════════════════════════════ */
export async function getAdmissions(): Promise<AdmissionApplication[]> {
  try {
    const q = query(collection(db, "admissions"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<AdmissionApplication, "id">) }));
  } catch (err) {
    console.error("getAdmissions:", err);
    return [];
  }
}

export async function addAdmission(app: Omit<AdmissionApplication, "id">): Promise<void> {
  await addDoc(collection(db, "admissions"), { ...app, createdAt: serverTimestamp() });
}

export async function deleteAdmission(id: string): Promise<void> {
  await deleteDoc(doc(db, "admissions", id));
}

export async function updateAdmissionStatus(id: string, status: string): Promise<void> {
  await updateDoc(doc(db, "admissions", id), { status });
}

/* ═══════════════════════════════════════════════
   HOMEWORK
═══════════════════════════════════════════════ */
export type Homework = {
  id: string;
  subject: string;
  className: string;
  description: string;
  dueDate: string;
};

export async function getHomework(): Promise<Homework[]> {
  try {
    const q = query(collection(db, "homework"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Homework, "id">) }));
  } catch (err) {
    console.error("getHomework:", err);
    return [];
  }
}

export async function addHomework(hw: Omit<Homework, "id">): Promise<void> {
  await addDoc(collection(db, "homework"), { ...hw, createdAt: serverTimestamp() });
}

export async function deleteHomework(id: string): Promise<void> {
  await deleteDoc(doc(db, "homework", id));
}

/* ═══════════════════════════════════════════════
   storageService export — backward compatibility
   (Old imports like: storageService.getNotices()
    still work without touching every file)
═══════════════════════════════════════════════ */
export const storageService = {
  getNotices,
  addNotice,
  deleteNotice,
  getEvents,
  addEvent,
  deleteEvent,
  getResults,
  addResult,
  deleteResult,
  getEnquiries,
  addEnquiry,
  deleteEnquiry,
  getAdmissions,
  addAdmission,
  deleteAdmission,
  updateAdmissionStatus,
  getHomework,
  addHomework,
  deleteHomework,
};