import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Globe,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function ProjectCard({ project }) {
  const [showMore, setShowMore] = useState(false);

  const projectName =
    project.title || project.name || "Untitled Project";

  const description =
    project.description || project.details || "";

  // Support multiple backend field names
  const technologyData =
    project.technologies ??
    project.technologys ??
    project.techStack ??
    "";

  const technologies = Array.isArray(technologyData)
    ? technologyData
    : String(technologyData)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const githubUrl =
    project.githubUrl ||
    project.githubLink ||
    project.gitUrl ||
    project.repositoryUrl ||
    project.repoUrl ||
    "";

  const demoUrl =
    project.demoUrl ||
    project.liveUrl ||
    project.dempUrl ||
    project.demoLink ||
    project.liveLink ||
    "";

  const maxLength = 150;
  const isLongDescription = description.length > maxLength;

  const displayedDescription =
    showMore || !isLongDescription
      ? description
      : `${description.slice(0, maxLength).trimEnd()}...`;

  return (
    <article className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-panel to-slate-950 p-5 shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-300/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.14)] sm:p-6">
      {/* Cursor-following light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.14), transparent 70%)",
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

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 z-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-300/25"
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Project icon and featured badge */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/20 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
            <Code2 size={24} />
          </div>

          {project.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-xs font-medium text-amber-200">
              <Sparkles size={13} />
              Featured
            </span>
          )}
        </div>

        {/* Project title */}
        <h3 className="break-words text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-2xl">
          {projectName}
        </h3>

        {/* Project description */}
        <div className="mt-3 flex-1">
          <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {displayedDescription || "No description available."}
          </p>

          {isLongDescription && (
            <button
              type="button"
              onClick={() => setShowMore((previous) => !previous)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              aria-expanded={showMore}
            >
              {showMore ? (
                <>
                  Show Less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show More
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Tech stack
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex flex-wrap gap-2">
              {technologies.map((technology, index) => (
                <span
                  key={`${technology}-${index}`}
                  className="max-w-full break-words rounded-lg border border-cyan-300/15 bg-cyan-300/5 px-2.5 py-1.5 text-xs text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project links */}
        {(githubUrl || demoUrl) && (
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${projectName} source code on GitHub`}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              >
                <Code2 size={17} className="shrink-0" />
                <span>GitHub</span>
                <ArrowUpRight size={15} className="shrink-0" />
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${projectName} live demo`}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-200/70 hover:bg-cyan-300/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              >
                <Globe size={17} className="shrink-0" />
                <span>Live Demo</span>
                <ExternalLink size={14} className="shrink-0" />
              </a>
            )}
          </div>
        )}

        {/* Bottom accent */}
        <div className="mt-5 h-px w-0 bg-gradient-to-r from-cyan-300 to-transparent transition-all duration-700 group-hover:w-full" />
      </div>
    </article>
  );
}