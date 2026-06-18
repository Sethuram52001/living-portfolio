type ItemStatusBadgeProps = {
  placeholder: boolean;
  status: string;
};

export function ItemStatusBadge({ placeholder, status }: ItemStatusBadgeProps) {
  return (
    <span className="inline-flex rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-1 font-mono text-xs font-bold uppercase text-lp-on-surface">
      {placeholder ? "Placeholder" : status}
    </span>
  );
}
