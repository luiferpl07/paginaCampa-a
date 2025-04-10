import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string) {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export async function processFormData(formData: FormData, schema: z.ZodSchema) {
  const rawFormData = Object.fromEntries(formData.entries());

  // Convert string date values to Date objects
  Object.keys(rawFormData).forEach((key) => {
    const value = rawFormData[key];
    if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/)) {
      rawFormData[key] = new Date(value);
    }
  });

  // Parse and validate with Zod
  const validatedData = schema.safeParse(rawFormData);

  if (!validatedData.success) {
    console.error("Form validation error:", validatedData.error);
    return { success: false, data: null, error: validatedData.error.format() };
  }

  return { success: true, data: validatedData.data, error: null };
}

// New utility functions for handling file uploads
export async function handleFileUpload(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const data = await response.json();
  return data.url; // Assuming the API returns the URL of the uploaded file
}

export async function processFileUploads(formData: FormData, fileFieldName: string): Promise<string[]> {
  const files = formData.getAll(fileFieldName) as File[];
  const uploadPromises = files.map(file => handleFileUpload(file));
  return Promise.all(uploadPromises);
}