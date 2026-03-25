/* ---------------------- SHARED TYPES ---------------------- */

export type ISODateString = string; // e.g. "2024-03-01T10:30:00Z"

export interface BaseEntity {
  readonly id: string;
  readonly date: ISODateString;
}

/* ---------------------- DOMAIN TYPES --------------------- */

export interface Notice extends BaseEntity {
  title: string;
  isImportant: boolean;
}

export interface Event extends BaseEntity {
  title: string;
  description: string;
  image: string;
}

export interface Result extends BaseEntity {
  title: string;
  className: string;
  year: string;
  pdfUrl: string; // simulated link or file path
}

export interface Enquiry extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AdmissionApplication extends BaseEntity {
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  status: "pending" | "reviewed";
}

/* ---------------------- AUTH ----------------------------- */

export type UserRole = "guest" | "admin";
