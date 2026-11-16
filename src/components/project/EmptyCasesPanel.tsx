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
    <section
      className="lab-grid py-gp-3xl"
      aria-labelledby="empty-cases-title"
    >
      <div className="col-span-12 max-w-xl lg:col-span-6">
        <p className="text-label text-text-muted">Case set · 00</p>
        <h2 id="empty-cases-title" className="mt-gp-md text-display">
          Start with one test case.
        </h2>
        <p className="mt-gp-lg text-body-small text-text-muted">
          Write the input and what a good answer must do. Demo mode keeps outputs
          pre-generated until you connect a live run later.
        </p>
        <div className="mt-gp-xl flex flex-wrap gap-gp-sm">
          <Link href={`/projects/${projectId}/cases`}>
            <Button>Create case</Button>
          </Link>
          {onLoadSamples ? (
            <Button type="button" variant="secondary" onClick={onLoadSamples}>
              Add blank row
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}