export function DemoBanner() {
  return (
    <div
      role="status"
      className="border-b border-border bg-accent-subtle px-gp-2xl py-gp-sm text-body-small text-text"
    >
      <span className="font-semibold">Demo mode</span>
      <span className="text-text-muted">
        {" "}
        — All model outputs are pre-generated sample data. Grades and edits save
        locally in this browser only.
      </span>
    </div>
  );
}