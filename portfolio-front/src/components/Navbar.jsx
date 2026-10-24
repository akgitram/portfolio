
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Certifications", "#certifications"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-400/10 bg-[#0b1118]/90 shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="container-shell flex h-[68px] items-center justify-between gap-3 sm:h-[76px]">
        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-[#111820] p-2 text-slate-200 transition duration-300 hover:border-cyan-400/50 hover:text-cyan-400 lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* Logo */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group text-lg font-black tracking-tight text-white sm:text-xl lg:mr-auto"
        >
          Portfolio
          <span className="text-cyan-400 transition group-hover:text-cyan-300">
            .
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="relative py-2 text-sm font-medium text-slate-300 transition duration-300 hover:text-cyan-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact button */}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-500/5 transition duration-300 hover:border-cyan-300 hover:bg-cyan-400 hover:text-[#071018] sm:px-4 sm:text-sm lg:ml-5"
        >
          Let's talk
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-cyan-400/10 bg-[#0b1118] p-4 shadow-xl shadow-black/20 lg:hidden">
          <div className="container-shell grid grid-cols-2 gap-2 sm:grid-cols-3">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-slate-300 transition duration-200 hover:border-cyan-400/20 hover:bg-[#111820] hover:text-cyan-400"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
