import { Loader2 } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/atoms/ui/card";
import { cn } from "@/lib/utils";

export function AuthLoading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col items-start gap-2">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                priority
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-bold">Cargando...</h1>
              <p className="text-muted-foreground text-balance">Por favor espera un momento</p>
            </div>
            <div className="mt-8 flex items-center justify-center py-12">
              <Loader2 className="text-primary h-12 w-12 animate-spin" />
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login.png"
              alt="Login"
              width={500}
              height={500}
              priority
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="absolute inset-0 container mx-auto flex flex-col items-center justify-center p-6">
              <p className="text-baseground/90 text-center text-2xl font-bold">
                ¡Únete a más de 100 personas que ya usan nuestros servicios para conseguir el
                trabajo de sus sueños!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
