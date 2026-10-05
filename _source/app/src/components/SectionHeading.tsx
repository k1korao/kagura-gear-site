type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-sakura">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black leading-tight text-bone sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-5 text-base leading-7 text-steel sm:text-lg">{body}</p> : null}
    </div>
  );
}
