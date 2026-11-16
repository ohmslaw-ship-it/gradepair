import Link from "next/link";
import { Button } from "@/components/ui/Button";

export type EmptyCasesPanelProps = {
  projectId: string;
  onLoadSamples?: () => void;
};

export function EmptyCasesPanel({
  projectId,
  onLoadSamples,
}: EmptyCasesPanelProps) {
  return (
    <div
      className="mx-gp-2xl my-gp-2xl flex max-w-xl flex-col items-start gap-gp-lg rounded-gp-lg border border-dashed border-border bg-surface p-gp-2xl"
      role="region"
      aria-labelledby="empty-cases-title"
    >
      <div
        className="flex size-12 items-center justify-center rounded-gp-lg bg-surface-recessed text-h2"
        aria-hidden
      >
        ◇
      </div>
      <div>
        <h2 id="empty-cases-title" className="text-h2">
          No test cases yet
        </h2>
        <p className="mt-gp-sm text-body-small text-text-muted">
          Add cases in plain language — what goes in, and what a good answer must
          do. In demo mode, outputs stay pre-generated until you run a live key
          later.
        </p>
      </div>
      <div className="flex flex-wrap gap-gp-md">
        <Link href={`/projects/${projectId}/cases`}>
          <Button>Create your first case</Button>
        </Link>
        {onLoadSamples ? (
          <Button type="button" variant="secondary" onClick={onLoadSamples}>
            Load sample cases
          </Button>
        ) : null}
      </div>
    </div>
  );
}