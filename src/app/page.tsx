import type { ReactNode } from "react";
import { FadeIn } from "@/components/layout/FadeIn";
import { Button } from "@/components/ui/Button";
import { ChangeFlag } from "@/components/ui/ChangeFlag";
import { Chip } from "@/components/ui/Chip";
import { GradeTag } from "@/components/ui/GradeTag";
import { MonoBlock } from "@/components/ui/MonoBlock";
import { StatCard } from "@/components/ui/StatCard";
import { SAMPLE_ADSGPT_PROJECT } from "@/data/sample";

const colorSwatches = [
  { name: "bg", className: "bg-bg" },
  { name: "surface", className: "bg-surface border border-border" },
  { name: "surface-recessed", className: "bg-surface-recessed" },
  { name: "accent", className: "bg-accent" },
  { name: "accent-subtle", className: "bg-accent-subtle" },
  { name: "pass / pass-subtle", className: "bg-pass-subtle" },
  { name: "fail / fail-subtle", className: "bg-fail-subtle" },
  { name: "regression", className: "bg-regression" },
  { name: "improved-subtle", className: "bg-improved-subtle" },
  { name: "diff-added", className: "bg-diff-added" },
  { name: "diff-removed", className: "bg-diff-removed" },
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <FadeIn>
      <section className="mb-gp-3xl rounded-gp-lg border border-border bg-surface p-gp-xl">
        <h2 className="text-h2 mb-gp-lg">{title}</h2>
        {children}
      </section>
    </FadeIn>
  );
}

export default function Home() {
  const improved = SAMPLE_ADSGPT_PROJECT.cases.filter(
    (c) => c.flag === "improved",
  ).length;
  const regressed = SAMPLE_ADSGPT_PROJECT.cases.filter(
    (c) => c.flag === "regressed",
  ).length;
  const previewCase = SAMPLE_ADSGPT_PROJECT.cases[0];

  return (
    <div className="bg-bg p-gp-2xl">
      <header className="mb-gp-2xl max-w-3xl">
        <p className="text-label text-text-muted">Stage 3 · Foundations</p>
        <h1 className="text-h1 mt-gp-sm">Gradepair kitchen sink</h1>
        <p className="mt-gp-md text-text-muted">
          Unit tests for your AI feature, built for PMs, not engineers. This
          page validates design tokens, typography, and base components before
          full screens ship.
        </p>
      </header>

      <Section title="Colour tokens">
        <ul className="grid grid-cols-2 gap-gp-md sm:grid-cols-3 lg:grid-cols-4">
          {colorSwatches.map((swatch) => (
            <li key={swatch.name}>
              <div
                className={`h-16 rounded-gp-md ${swatch.className}`}
                aria-hidden
              />
              <p className="mt-gp-xs text-body-small text-text-muted">
                {swatch.name}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Type scale">
        <div className="flex flex-col gap-gp-md">
          <p className="text-display">Display</p>
          <p className="text-h1">Heading 1</p>
          <p className="text-h2">Heading 2</p>
          <p>Body — Hanken Grotesk 14/20</p>
          <p className="font-semibold">Body strong</p>
          <p className="text-body-small text-text-muted">Body small / muted</p>
          <p className="text-note text-text-muted">Note italic</p>
          <p className="text-label text-text-muted">Label caps</p>
          <p className="text-mono bg-surface-recessed rounded-gp-sm p-gp-sm">
            Mono — Geist Mono 13/20
          </p>
          <p className="text-grade text-pass">Grade — Caveat</p>
        </div>
      </Section>

      <Section title="Components">
        <div className="flex flex-wrap gap-gp-md">
          <Button>Run comparison</Button>
          <Button variant="secondary">Edit prompts</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
        <div className="mt-gp-lg flex flex-wrap items-center gap-gp-md">
          <GradeTag grade="pass" />
          <GradeTag grade="fail" />
          <ChangeFlag kind="improved" />
          <ChangeFlag kind="regressed" />
          <Chip>Sample data</Chip>
          <Chip>edge case</Chip>
        </div>
        <div className="mt-gp-lg grid gap-gp-md sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Prompt A passes" value="14/20" detail="70% · v3" />
          <StatCard label="Prompt B passes" value="17/20" detail="85% · v4" />
          <StatCard label="Improved" value={String(improved)} />
          <StatCard label="Regressions" value={String(regressed)} />
        </div>
        <div className="mt-gp-lg max-w-xl">
          <MonoBlock header="Prompt B · v4 · 34 tokens">
            {previewCase.outputB}
          </MonoBlock>
        </div>
        <div className="mt-gp-md max-w-xl text-mono-small">
          <p className="rounded-gp-sm bg-diff-added px-gp-sm py-gp-2xs">
            + {previewCase.outputB}
          </p>
          <p className="mt-gp-2xs rounded-gp-sm bg-diff-removed px-gp-sm py-gp-2xs">
            − {previewCase.outputA}
          </p>
        </div>
      </Section>

      <Section title="Sample data (typed fixture)">
        <p className="mb-gp-md text-body-small text-text-muted">
          <strong className="font-semibold text-text">SAMPLE DATA ONLY</strong>{" "}
          — {SAMPLE_ADSGPT_PROJECT.name} · {SAMPLE_ADSGPT_PROJECT.cases.length}{" "}
          cases · {SAMPLE_ADSGPT_PROJECT.model}
        </p>
        <ul className="divide-y divide-border rounded-gp-md border border-border">
          {SAMPLE_ADSGPT_PROJECT.cases.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap items-center gap-gp-sm px-gp-md py-gp-sm"
            >
              <span className="text-mono-small text-text-muted">
                #{String(c.index).padStart(2, "0")}
              </span>
              {c.flag === "improved" ? (
                <ChangeFlag kind="improved" />
              ) : c.flag === "regressed" ? (
                <ChangeFlag kind="regressed" />
              ) : (
                <Chip>unchanged</Chip>
              )}
              <span className="min-w-0 flex-1 text-body-small">{c.input}</span>
              <GradeTag grade={c.gradeA} />
              <GradeTag grade={c.gradeB} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}