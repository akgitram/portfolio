import SkillsCarousel from "../components/SkillsCarousel";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Code2,
  Database,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Server,
  Phone,
  Sparkles,
} from "lucide-react";

import api from "../api/api";
import Navbar from "../components/Navbar";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";

export default function Portfolio() {
  const [data, setData] = useState({
    projects: [],
    skills: [],
    services: [],
    education: [],
    experiences: [],
    certifications: [],
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let active = true;

    const endpoints = [
      ["projects", "/projects"],
      ["skills", "/skills"],
      ["services", "/services"],
      ["experiences", "/experiences"],
      ["certifications", "/certifications"],
      ["education", "/educations"],
    ];

    async function loadData() {
      const results = await Promise.allSettled(
        endpoints.map(async ([key, endpoint]) => {
          const response = await api.get(endpoint);

          // Support a plain JSON array as well as common Spring response wrappers.
          const payload = response.data;
          const records = Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.content)
              ? payload.content
              : Array.isArray(payload?.data)
                ? payload.data
                : null;

          if (!records) {
            throw new Error(
              `Invalid response from ${endpoint}. Expected an array, { content: [] }, or { data: [] }.`,
            );
          }

          return [key, records];
        }),
      );

      if (!active) return;

      const nextData = {
        projects: [],
        skills: [],
        services: [],
        experiences: [],
        certifications: [],
        education: [],
      };

      const failed = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const [key, records] = result.value;
          nextData[key] = records;
        } else {
          failed.push(endpoints[index][0]);
          console.error(
            `Could not load ${endpoints[index][0]}:`,
            result.reason,
          );
        }
      });

      setData(nextData);
      setErrors(failed);
    }

    loadData();

    // Refresh automatically so newly added admin records appear without
    // requiring a full page reload.
    const refreshTimer = window.setInterval(loadData, 30000);
    window.addEventListener("focus", loadData);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
      window.removeEventListener("focus", loadData);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-white">
      <Navbar />

      <main>
        {/* HERO */}
        <section
          id="home"
          className="container-shell grid min-h-[85vh] items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Available for opportunities
            </div>

            <p className="mb-3 text-lg text-slate-300">Hi, I'm</p>

            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Akram Ali<span className="text-accent">.</span>
            </h1>

            <h2 className="mt-5 text-xl font-semibold text-slate-300 sm:text-2xl">
              Java Full Stack Developer
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
              I build modern, responsive and scalable web applications using
              React, Java, Spring Boot and MySQL. I enjoy turning complex
              problems into simple, reliable digital experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Hire me <ArrowUpRight size={17} />
              </a>

              {data.projects.length > 0 && (
                <a href="#projects" className="btn-secondary">
                  Explore projects <ArrowDown size={16} />
                </a>
              )}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <SocialLink href="https://github.com/akgitram" label="GitHub">
                <Code2 size={18} />
              </SocialLink>

              <SocialLink
                href="https://www.linkedin.com/in/akram-ali-b05331245"
                label="LinkedIn"
              >
                <Globe size={18} />
              </SocialLink>

              <SocialLink href="mailto:aliakram8355@gmail.com" label="Email">
                <Mail size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Decorative hero card — no personal image */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-panel to-slate-950 p-6 shadow-2xl">
              <div className="rounded-2xl border border-white/10 bg-ink/70 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-accent" />
                  <span className="ml-auto text-xs text-slate-500">
                    developer.js
                  </span>
                </div>

                <div className="mt-8 space-y-4 font-mono text-sm sm:text-base">
                  <p className="text-slate-500">
                    {"// A little about my work"}
                  </p>
                  <p>
                    <span className="text-purple-300">const</span>{" "}
                    <span className="text-accent">developer</span> = {"{"}
                  </p>
                  <p className="pl-4 text-slate-300">
                    stack: <span className="text-amber-200">"Full Stack"</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    backend: <span className="text-amber-200">"Java"</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    frontend: <span className="text-amber-200">"React"</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    database: <span className="text-amber-200">"MySQL"</span>
                  </p>
                  <p>{"};"}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["React", "Spring Boot", "MySQL", "REST APIs"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-line px-3 py-2 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {(data.projects.length > 0 ||
                data.skills.length > 0 ||
                data.services.length > 0) && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {data.projects.length > 0 && (
                    <MiniStat value={data.projects.length} label="Projects" />
                  )}
                  {data.skills.length > 0 && (
                    <MiniStat value={data.skills.length} label="Skills" />
                  )}
                  {data.services.length > 0 && (
                    <MiniStat value={data.services.length} label="Services" />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="section-wrap relative overflow-hidden rounded-3xl
             border border-white/10 bg-[#0b1118] px-4 py-10
             sm:px-6 sm:py-14 md:px-8 md:py-16"
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-10
               h-64 w-64 rounded-full bg-cyan-500/[0.08] blur-[100px]"
          />

          <div className="relative z-10">
            <SectionHeading
              eyebrow="About me"
              title="Focused on building useful things"
              description="I am a developer who enjoys working across frontend interfaces, backend APIs and relational databases. I value clean code, responsive design and continuous learning."
            />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3">
              <Feature
                icon={<Code2 size={23} />}
                title="Frontend development"
                text="Responsive interfaces built with React and reusable components."
              />

              <Feature
                icon={<Server size={23} />}
                title="Backend development"
                text="REST APIs, authentication and business logic using Java and Spring Boot."
              />

              <Feature
                icon={<Database size={23} />}
                title="Database design"
                text="SQL schemas, persistence and database integration using MySQL."
              />
            </div>
          </div>
        </section>

        {/* SKILLS - only render when records exist */}
        {data.skills.length > 0 && (
          <section id="skills" className="section-wrap">
            <SectionHeading
              eyebrow="My toolkit"
              title="Skills & technologies"
              description="Technologies I use to design, build and maintain web applications."
            />

            {data.skills.length === 0 ? (
              <EmptyState
                title="Skills will appear here"
                text="Add skills to your database and check the /api/skills endpoint."
              />
            ) : (
              <SkillsCarousel skills={data.skills} />
            )}
          </section>
        )}

        {/* SERVICES - only render when records exist */}
        {data.services.length > 0 && (
          <section
            id="services"
            className="section-wrap relative overflow-hidden"
          >
            <SectionHeading
              eyebrow="What I can do"
              title="Services"
              description="Practical development support from interface to database, turning ideas into reliable digital experiences."
            />

            {data.services.length === 0 ? (
              <EmptyState
                title="Services will appear here"
                text="Add services to your backend to display them here."
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.services.map((service, index) => (
                  <article
                    key={service.id ?? service.name ?? index}
                    className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-panel to-slate-950 p-6 shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-300/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.14)] sm:p-7"
                  >
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

                    {/* Decorative background glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 z-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-300/25"
                    />

                    <div className="relative z-10 flex h-full flex-col">
                      {/* Icon and number */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/20 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                          <Sparkles
                            size={25}
                            className="transition-transform duration-500 group-hover:rotate-12"
                          />
                        </div>

                        <span className="text-sm font-semibold tracking-widest text-slate-600 transition-colors duration-300 group-hover:text-cyan-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Service title */}
                      <h3 className="mt-6 break-words text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-200">
                        {service.name || "Development Service"}
                      </h3>

                      {/* Service description */}
                      <p className="mt-3 flex-1 whitespace-pre-line break-words text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                        {service.description ||
                          "A practical solution tailored to your project requirements."}
                      </p>

                      {/* Bottom accent */}
                      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                        <span className="text-xs font-medium tracking-wide text-slate-500 transition-colors duration-300 group-hover:text-cyan-200">
                          Let's build something
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PROJECTS - only render when records exist */}
        {data.projects.length > 0 && (
          <section id="projects" className="section-wrap">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects I've built"
              description="A selection of projects demonstrating how I solve problems and build useful software."
            />

            {data.projects.length === 0 ? (
              <EmptyState
                title="Projects will appear here"
                text="Check that your GET /api/projects endpoint returns a JSON array."
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {data.projects.map((project) => (
                  <ProjectCard
                    key={project.id ?? project.title}
                    project={project}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* EXPERIENCE - only render when records exist */}
        {data.experiences.length > 0 && (
          <section id="experience" className="section-wrap">
            <SectionHeading
              eyebrow="My journey"
              title="Experience"
              description="Work, internships and professional learning."
            />

            {data.experiences.length === 0 ? (
              <EmptyState
                title="Experience will appear here"
                text="Add experience records when you are ready."
              />
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute bottom-5 left-[9px] top-3 w-px bg-gradient-to-b from-accent via-cyan-400/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

                <div className="space-y-8 sm:space-y-12">
                  {data.experiences.map((item, index) => (
                    <article
                      key={item.id ?? `${item.company}-${item.role}-${index}`}
                      className={`group relative pl-9 sm:w-1/2 sm:pl-0 ${
                        index % 2 === 0
                          ? "sm:pr-10 sm:ml-0"
                          : "sm:ml-auto sm:pl-10"
                      }`}
                    >
                      {/* Glowing timeline marker */}
                      <span
                        className={`absolute left-[2px] top-7 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-ink shadow-[0_0_12px_rgba(34,211,238,0.45)] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] sm:left-auto ${
                          index % 2 === 0 ? "sm:-right-[7px]" : "sm:-left-[7px]"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      </span>

                      {/* Experience card */}
                      <div
                        className="experience-card relative overflow-hidden rounded-2xl border border-line bg-panel/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(34,211,238,0.12)] sm:p-6"
                        onMouseMove={(event) => {
                          const rect =
                            event.currentTarget.getBoundingClientRect();

                          event.currentTarget.style.setProperty(
                            "--mouse-x",
                            `${event.clientX - rect.left}px`,
                          );

                          event.currentTarget.style.setProperty(
                            "--mouse-y",
                            `${event.clientY - rect.top}px`,
                          );
                        }}
                      >
                        {/* Cursor-following glow */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div
                            className="absolute -inset-px"
                            style={{
                              background:
                                "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.13), transparent 65%)",
                            }}
                          />
                        </div>

                        {/* Decorative glow */}
                        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:bg-accent/20" />

                        <div className="relative z-10">
                          {/* Role and dates */}
                          <div className="flex flex-col gap-3">
                            <div>
                              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                                {item.current || item.currentlyWorking
                                  ? "Currently working"
                                  : "Experience"}
                              </span>

                              <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-accent sm:text-xl">
                                {item.role || item.position || "Experience"}
                              </h3>

                              <p className="mt-2 font-medium text-accent">
                                {item.company ||
                                  item.organization ||
                                  "Company not specified"}
                              </p>

                              {item.location && (
                                <p className="mt-1 text-sm text-slate-500">
                                  {item.location}
                                </p>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
                              <span className="rounded-lg border border-line bg-ink/60 px-3 py-1.5">
                                {item.startDate || "Start date not specified"}
                                {" — "}
                                {item.current || item.currentlyWorking
                                  ? "Present"
                                  : item.endDate || "Present"}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-400">
                            {item.description || "No description provided."}
                          </p>

                          {/* Optional technologies */}
                          {(Array.isArray(item.technologies)
                            ? item.technologies
                            : Array.isArray(item.techStack)
                              ? item.techStack
                              : []
                          ).length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {(Array.isArray(item.technologies)
                                ? item.technologies
                                : item.techStack
                              ).map((tech, techIndex) => (
                                <span
                                  key={`${tech}-${techIndex}`}
                                  className="rounded-full border border-line bg-ink/70 px-3 py-1 text-xs text-slate-300 transition-all duration-300 hover:border-accent/40 hover:text-accent"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Bottom accent line */}
                          <div className="mt-6 h-px w-full overflow-hidden bg-line">
                            <div className="h-full w-0 bg-gradient-to-r from-accent to-cyan-300 transition-all duration-700 group-hover:w-full" />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* EDUCATION - only render when records exist */}
        {data.education.length > 0 && (
          <section
            id="education"
            className="section-wrap relative overflow-hidden"
          >
            <SectionHeading
              eyebrow="My academic journey"
              title="Education & Qualifications"
              description="The academic milestones that shaped my technical foundation, problem-solving skills, and passion for software development."
            />

            {data.education.length === 0 ? (
              <EmptyState
                title="Education will appear here"
                text="Add your academic qualifications through the admin dashboard and check the GET /api/education endpoint."
              />
            ) : (
              <div className="relative mx-auto max-w-6xl py-8 sm:py-12">
                {/* Glowing center timeline */}
                <div className="absolute bottom-12 left-5 top-12 w-px bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)] md:left-1/2 md:-translate-x-1/2" />

                <div className="space-y-8 md:space-y-12">
                  {data.education.map((item, index) => {
                    const degree =
                      item.degree ||
                      item.qualification ||
                      "Academic Qualification";

                    const institution =
                      item.institution ||
                      item.school ||
                      item.college ||
                      "Institution not specified";

                    const startYear = item.startYear ?? item.startDate;
                    const endYear = item.endYear ?? item.endDate;
                    const isLeft = index % 2 === 0;

                    return (
                      <article
                        key={item.id ?? `${degree}-${institution}-${index}`}
                        className="group relative pl-14 md:grid md:grid-cols-[1fr_64px_1fr] md:items-center md:gap-3 md:pl-0"
                      >
                        {/* Timeline node and arrow */}
                        <div className="absolute left-0 top-7 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-950 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-125 group-hover:border-cyan-200 group-hover:bg-cyan-300 group-hover:text-slate-950 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.9)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:group-hover:scale-125">
                          <GraduationCap size={20} />
                        </div>

                        {/* Direction arrow */}
                        <div
                          className={`absolute left-10 top-11 z-10 hidden h-px w-5 bg-gradient-to-r from-cyan-300 to-cyan-300/10 md:block ${
                            isLeft
                              ? "md:left-[calc(50%-36px)]"
                              : "md:left-1/2 md:bg-gradient-to-r md:from-cyan-300/10 md:to-cyan-300"
                          }`}
                        />

                        {/* Left card for even items, right card for odd items */}
                        <div
                          className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-panel to-slate-950 p-5 shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-300/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)] sm:p-6 md:col-span-1 ${
                            isLeft
                              ? "md:col-start-1 md:row-start-1"
                              : "md:col-start-3 md:row-start-1"
                          }`}
                        >
                          {/* Cursor-following light */}
                          <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                              background:
                                "radial-gradient(260px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.13), transparent 65%)",
                            }}
                            onMouseMove={(event) => {
                              const rect =
                                event.currentTarget.parentElement.getBoundingClientRect();

                              event.currentTarget.parentElement.style.setProperty(
                                "--mouse-x",
                                `${event.clientX - rect.left}px`,
                              );
                              event.currentTarget.parentElement.style.setProperty(
                                "--mouse-y",
                                `${event.clientY - rect.top}px`,
                              );
                            }}
                          />

                          {/* Soft corner glow */}
                          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-300/20" />

                          <div className="relative z-10">
                            <div className="flex items-start gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                                <BookOpen size={23} />
                              </div>

                              <div className="min-w-0 flex-1">
                                <span className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-2.5 py-1 text-xs font-medium text-cyan-200">
                                  <CalendarDays size={13} />
                                  {startYear || "Year TBD"}
                                  {" — "}
                                  {endYear || "Present"}
                                </span>

                                <h3 className="mt-3 break-words text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-xl">
                                  {degree}
                                </h3>

                                <p className="mt-2 break-words text-sm font-medium leading-6 text-slate-300">
                                  {institution}
                                </p>
                              </div>
                            </div>

                            {item.fieldOfStudy && (
                              <div className="mt-5 border-t border-white/5 pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                  Field of study
                                </p>
                                <p className="mt-1 text-sm text-slate-300">
                                  {item.fieldOfStudy}
                                </p>
                              </div>
                            )}

                            {item.grade && (
                              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-300/15 bg-emerald-300/5 px-3 py-2 transition-colors group-hover:border-emerald-300/30">
                                <Sparkles
                                  size={16}
                                  className="text-emerald-300"
                                />
                                <span className="text-xs text-slate-400">
                                  Grade:
                                </span>
                                <span className="text-sm font-semibold text-emerald-300">
                                  {item.grade}
                                </span>
                              </div>
                            )}

                            {item.description && (
                              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-400">
                                {item.description}
                              </p>
                            )}

                            {/* Card footer */}
                            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                              <span className="text-xs tracking-wide text-slate-500">
                                A milestone in my journey
                              </span>
                              <ArrowUpRight
                                size={17}
                                className="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-300"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Opposite side: subtle timeline label */}
                        <div
                          className={`hidden md:flex ${
                            isLeft
                              ? "md:col-start-3 md:row-start-1 md:justify-start md:pl-6"
                              : "md:col-start-1 md:row-start-1 md:justify-end md:pr-6"
                          }`}
                        >
                          <div className="max-w-[220px] opacity-50 transition-all duration-300 group-hover:opacity-100">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                              {`0${index + 1} / EDUCATION`}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-500 transition-colors group-hover:text-slate-300">
                              Every step builds the foundation for the next.
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CERTIFICATIONS - only render when records exist */}
        {data.certifications.length > 0 && (
          <section id="certifications" className="section-wrap">
            <SectionHeading
              eyebrow="Learning & growth"
              title="Certifications"
              description="Courses and credentials that support my technical journey."
            />

            {data.certifications.length === 0 ? (
              <EmptyState
                title="Certifications will appear here"
                text="Add your certifications to the backend to show them here."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {data.certifications.map((item) => (
                  <article
                    key={item.id ?? item.name}
                    className="surface-card p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="mt-2 text-sm text-slate-400">
                          {item.issuer}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          {item.issueDate || ""}
                          {item.expiryDate
                            ? ` · Expires ${item.expiryDate}`
                            : ""}
                        </p>
                      </div>

                      <span className="rounded-xl bg-accent/10 p-3 text-accent">
                        <Sparkles size={20} />
                      </span>
                    </div>

                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline"
                      >
                        View credential <ArrowUpRight size={15} />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="section-wrap">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Get in touch"
                title="Have a project in mind?"
                description="Have a role, collaboration or project in mind? Send me a message."
              />

              <div className="space-y-4">
                
                <ContactDetail
                  icon={<Mail size={19} />}
                  title="Email"
                  value="aliakram8355@gmail.com"
                  href="mailto:aliakram8355@gmail.com"
                />

                <ContactDetail
                  icon={<Phone size={19} />}
                  title="Phone"
                  value="+91 8005401971"
                  href="tel:+918005401971"
                />

                <ContactDetail
                  icon={<Code2 size={19} />}
                  title="GitHub"
                  value="Visit my GitHub"
                  href="https://github.com/akgitram"
                />

                <ContactDetail
                  icon={<Code2 size={19} />}
                  title="LinkedIn"
                  value="Akram Ali"
                  href="https://www.linkedin.com/in/akram-ali-b05331245"
                />

                <ContactDetail
                  icon={<MapPin size={19} />}
                  title="Location"
                  value="Maharajganj , India"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </section>

        {errors.length > 0 && (
          <div className="container-shell pb-8 text-sm text-slate-500">
            Some sections could not load: {errors.join(", ")}. Check your Spring
            Boot endpoint paths and backend logs.
          </div>
        )}
      </main>

      <footer className="border-t border-line px-5 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Akram Ali. Built with React and Spring
        Boot.
      </footer>
    </div>
  );
}

function SocialLink({ href, label, children }) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-slate-300 transition hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[.03] p-3 text-center">
      <p className="text-xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-[11px] text-slate-400">{label}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="surface-card p-6">
      <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="surface-card p-6">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function ContactDetail({ icon, title, value }) {
  return (
    <div
      className="group flex min-w-0 items-center gap-4 rounded-2xl
                 border border-white/10 bg-slate-900/70 p-4
                 transition-all duration-300
                 hover:border-cyan-400/30 hover:bg-slate-800/80
                 hover:shadow-lg hover:shadow-cyan-950/20
                 sm:gap-5 sm:p-5"
    >
      {/* Icon */}
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center
                   rounded-xl border border-cyan-400/20
                   bg-gradient-to-br from-cyan-400/15 to-blue-500/10
                   text-cyan-300 transition-all duration-300
                   group-hover:border-cyan-400/40
                   group-hover:from-cyan-400/25
                   group-hover:to-blue-500/20
                   group-hover:shadow-md group-hover:shadow-cyan-500/10"
      >
        {icon}
      </span>

      {/* Contact information */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <p
          className="mt-1 break-words text-sm font-medium leading-6
                     text-slate-100 transition-colors duration-200
                     group-hover:text-cyan-300 sm:text-base"
        >
          {value}
        </p>
      </div>
    </div>
  );
}
