import Reveal from "./Reveal";

type Props = {
  index: string;
  title: string;
  kicker?: string;
};

/** Editorial section header: "02 / SELECTED SYSTEMS" */
export default function SectionHeader({ index, title, kicker }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="label text-accent">{index}</span>
        <span className="hairline max-w-[64px] translate-y-[-4px]" aria-hidden />
        <span className="label">{kicker ?? "SECTION"}</span>
      </div>
      <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
