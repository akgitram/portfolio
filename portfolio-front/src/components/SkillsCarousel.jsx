import { useRef } from "react";
import { ArrowLeft, ArrowRight, Code2, Sparkles } from "lucide-react";

export default function SkillsCarousel({ skills }) {
  const sliderRef = useRef(null);
  const useSlider = skills.length > 3;

  const scrollSkills = (direction) => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.querySelector("[data-skill-card]");
    const distance = card
      ? card.getBoundingClientRect().width + 20
      : 320;

    sliderRef.current.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Glowing slider controls */}
      {useSlider && (
        <div className="mb-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollSkills(-1)}
            aria-label="Previous skills"
            className="group rounded-full border border-cyan-300/20 bg-slate-900/80 p-3 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <ArrowLeft size={19} />
          </button>

          <button
            type="button"
            onClick={() => scrollSkills(1)}
            aria-label="Next skills"
            className="group rounded-full border border-cyan-300/20 bg-slate-900/80 p-3 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <ArrowRight size={19} />
          </button>
        </div>
      )}

      {/* Skills cards */}
      <div
        ref={sliderRef}
        className={
          useSlider
            ? "grid grid-flow-col auto-cols-[85%] gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[calc((100%-1.25rem)/2)] lg:auto-cols-[calc((100%-2.5rem)/3)]"
            : "grid grid-cols-1 gap-5 px-1 pb-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {skills.map((skill, index) => {
          const level = Number(skill.proficiency);

          const validLevel =
            skill.proficiency !== null &&
            skill.proficiency !== undefined &&
            skill.proficiency !== "" &&
            Number.isFinite(level);

          const safeLevel = validLevel
            ? Math.max(0, Math.min(100, level))
            : 0;

          return (
            <article
              key={skill.id ?? skill.name ?? index}
              data-skill-card
              className={`group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-panel to-slate-950 p-5 shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.025] hover:border-cyan-300/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.14)] sm:p-6 ${
                useSlider ? "snap-start" : ""
              }`}
            >
              {/* Cursor-following light */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.14), transparent 70%)",
                }}
                onMouseMove={(event) => {
                  const card = event.currentTarget.parentElement;
                  const rect = card.getBoundingClientRect();

                  card.style.setProperty(
                    "--mouse-x",
                    `${event.clientX - rect.left}px`,
                  );
                  card.style.setProperty(
                    "--mouse-y",
                    `${event.clientY - rect.top}px`,
                  );
                }}
              />

              {/* Decorative corner glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 z-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-300/25"
              />

              {/* Card content */}
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/20 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.2)]">
                      <Code2 size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-200">
                        {skill.name || "Unnamed Skill"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {skill.category || "Technology"}
                      </p>
                    </div>
                  </div>

                  <Sparkles
                    size={17}
                    className="shrink-0 text-slate-600 transition-all duration-300 group-hover:rotate-12 group-hover:text-cyan-300"
                  />
                </div>

                {/* Proficiency */}
                {validLevel && (
                  <div className="mt-7">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-slate-400">
                        Proficiency
                      </span>

                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-2.5 py-1 text-xs font-bold text-cyan-200">
                        {safeLevel}%
                      </span>
                    </div>

                    <div
                      className="h-2 overflow-hidden rounded-full bg-white/[0.07]"
                      role="progressbar"
                      aria-label={`${skill.name || "Skill"} proficiency`}
                      aria-valuenow={safeLevel}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="relative h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-200 transition-all duration-700 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.75)]"
                        style={{ width: `${safeLevel}%` }}
                      >
                        <span className="absolute inset-0 bg-white/20" />
                      </div>
                    </div>

                    <p className="mt-2 text-right text-[11px] text-slate-500">
                      {safeLevel}/100
                    </p>
                  </div>
                )}

                {/* Category footer */}
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/5 pt-5">
                  <span className="inline-flex max-w-full items-center rounded-lg border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5 text-xs text-slate-300 transition-colors group-hover:border-cyan-300/30 group-hover:text-cyan-100">
                    {skill.category || "Technology"}
                  </span>

                  <span className="shrink-0 text-xs text-slate-600 transition-colors group-hover:text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {useSlider && (
        <p className="mt-2 text-center text-xs text-slate-500">
          <span className="text-cyan-300">←</span> Explore your toolkit{" "}
          <span className="text-cyan-300">→</span>
        </p>
      )}
    </div>
  );
}