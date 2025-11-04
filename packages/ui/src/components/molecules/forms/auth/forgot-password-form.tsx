import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent } from "@/components/atoms/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/atoms/ui/field";
import { Input } from "@/components/atoms/ui/input";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-start gap-2">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  priority
                  className="h-8 w-8"
                />
                <h1 className="text-2xl font-bold">Recupera tu contraseña</h1>
                <p className="text-muted-foreground text-balance">
                  Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id={useId()} type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <Button type="submit">Enviar enlace de recuperación</Button>
              </Field>
              <FieldDescription className="text-center">
                ¿Recordaste tu contraseña? <Link href="/auth/login">Inicia sesión</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login.png"
              alt="Forgot password"
              width={500}
              height={500}
              priority
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="container absolute inset-0 mx-auto flex flex-col items-center justify-center p-6">
              <p className="text-baseground/90 text-center text-2xl font-bold">
                No te preocupes, recuperar tu acceso es fácil y rápido. ¡Estamos aquí para ayudarte!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al hacer clic en continuar, aceptas nuestros <Link href="/terms">Términos de Servicio</Link>{" "}
        y <Link href="/privacy">Política de Privacidad</Link>.
      </FieldDescription>
    </div>
  );
}
