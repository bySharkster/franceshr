"use client";

import { ArrowLeft, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/atoms/ui/button";
import { ButtonGroup } from "@/components/atoms/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import { getServiceByType } from "@/config/services.config";
import type { ServiceType } from "@/types/services.type";

export function ServiceNavigationGroup() {
  const { serviceType } = useParams();
  const service = getServiceByType(serviceType as ServiceType);

  if (!service) {
    return null;
  }

  return (
    <ButtonGroup orientation="horizontal" aria-label="Group Service Button">
      <Button iconLeft={<ArrowLeft />} size="sm" variant="outline" asChild>
        <Link href="/">Volver</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button iconRight={<ChevronDownIcon />} size="sm" variant="outline" className="pl-2!">
            Más Servicios
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            {service?.relatedServices?.map((relatedService) => (
              <DropdownMenuItem key={relatedService.type}>
                <Link href={`/services/${relatedService.type}`}>{relatedService.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
