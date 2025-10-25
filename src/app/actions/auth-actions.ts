"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/**
 * Sign up a new user with email and password
 */
export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;
  const name = formData.get("name") as string;
  const lastName = formData.get("last-name") as string;

  // Validation
  if (!email || !password || !repeatPassword || !name || !lastName) {
    return {
      error: "Todos los campos son requeridos",
    };
  }

  if (password !== repeatPassword) {
    return {
      error: "Las contraseñas no coinciden",
    };
  }

  if (password.length < 6) {
    return {
      error: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${name} ${lastName}`,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Check if email confirmation is required
  if (data.user && !data.session) {
    return {
      success: true,
      message: "Revisa tu correo para confirmar tu cuenta",
    };
  }

  revalidatePath("/", "layout");
  redirect("/app");
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return {
      error: "Email y contraseña son requeridos",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Credenciales inválidas o usuario registrado con OAuth (Google, Apple, Meta)",
    };
  }

  revalidatePath("/", "layout");
  redirect("/app");
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/auth/login");
}

/**
 * Request a password reset email
 */
export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return {
      error: "El email es requerido",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Revisa tu correo para restablecer tu contraseña",
  };
}

/**
 * Update password (after reset)
 */
export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;

  if (!password || !repeatPassword) {
    return {
      error: "Todos los campos son requeridos",
    };
  }

  if (password !== repeatPassword) {
    return {
      error: "Las contraseñas no coinciden",
    };
  }

  if (password.length < 6) {
    return {
      error: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/protected");
}

/**
 * Sign in with OAuth provider (Google, Apple, Meta)
 */
export async function signInWithOAuth(
  provider: "google" | "apple" | "facebook",
  next: string | null = "/app",
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${next}`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  if (data.url) {
    redirect(data.url);
  }
}
