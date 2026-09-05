type FieldCardProps = {
  label: string;
  value: string;
  detail?: string;
  active?: boolean;
  multiline?: boolean;
  onClick?: () => void;
};

export function FieldCard({ label, value, detail, active, multiline, onClick }: FieldCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-el="card-field-block"
      className={`group w-full rounded-3xl border p-4 text-left shadow-[var(--shadow-sm)] transition duration-200 ${
        active
          ? "border-primary/50 bg-card/90 text-foreground"
          : "border-border/70 bg-card/58 text-foreground hover:border-primary/35 hover:bg-card/75"
      }`}
    >
      <span className="block text-xs font-semibold tracking-[0.18em] text-primary">{label}</span>
      <span className={`mt-2 block ${multiline ? "text-sm leading-6" : "truncate text-base font-medium"}`}>{value}</span>
      {detail && <span className="mt-2 block text-xs leading-5 text-muted-foreground">{detail}</span>}
    </button>
  );
}
