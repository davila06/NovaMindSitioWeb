"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackNovaEvent } from "@/lib/nova-analytics";

type Props = ComponentProps<typeof Link> & {
  event: "nova_assist_segment_selected" | "service_cta_clicked";
  segment: "home" | "business";
  serviceId?: string;
  position?: "hero" | "detail" | "catalog" | "comparison";
};

export function TrackedLink({ event, segment, serviceId, position, onClick, ...props }: Props) {
  return <Link {...props} onClick={(click) => {
    trackNovaEvent(event, { segment, ...(serviceId ? { service_id: serviceId } : {}), ...(position ? { cta_position: position } : {}) });
    onClick?.(click);
  }} />;
}
