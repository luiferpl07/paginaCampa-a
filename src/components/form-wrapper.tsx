"use client";

import { type ReactNode, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface FormWrapperProps<T extends z.ZodSchema> {
  title: string;
  description?: string;
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => Promise<any>;
  children: ReactNode;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  onCancel?: () => void;
  disabled?: boolean;
}

export function FormWrapper<T extends z.ZodSchema>({
  title,
  description,
  schema,
  defaultValues,
  onSubmit,
  children,
  submitButtonLabel = "Guardar",
  cancelButtonLabel = "Cancelar",
  onCancel,
  disabled = false,
}: FormWrapperProps<T>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(data: z.infer<T>) {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success("Datos guardados correctamente");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar los datos");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            {children}
          </CardContent>
          <CardFooter className="flex justify-between">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {cancelButtonLabel}
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting || disabled}>
              {isSubmitting ? "Guardando..." : submitButtonLabel}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
