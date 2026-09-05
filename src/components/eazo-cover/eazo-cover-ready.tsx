"use client";

export function EazoCoverReady({ children }: { children: React.ReactNode }) {
  return <div data-eazo-cover-ready="true">{children}</div>;
}
