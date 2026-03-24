'use client';

import React, { useEffect, useRef, useState } from "react";
import { jetbrainsMono } from '@/app/font';
import { GraduationCap } from "lucide-react";

const timelineData = [
  {
    title: "Vidya Niketan, Dombivli - SSC Board",
    date: "2018 - 2020",
    description:
      "Completed my Secondary School with an aggregate of 82%. Actively participated in extracurricular activities such as debates, quizzes, and science exhibitions, gaining leadership, teamwork, and communication skills.",
  },
  {
    title: "Jana Gana Mana Vidyamandir - HSC Board",
    date: "2021 - 2023",
    description:
      "Completed my Higher Secondary School (HSC Board) with an aggregate of 82%. During this time, I developed a strong interest in coding. I also actively participated in seminars, and cultural events, which helped enhance my critical thinking, and organizational skills.",
  },
  {
    title: "Don Bosco Institute of Technology (DBIT)",
    date: "2023 - present",
    description:
      "During my college years, I started to explore coding, web development, and software engineering. It was fascinating to build things from scratch and understand how technology powers the world.",
  },
];

export default function Education() {
  const timelineRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Observer for fading in the cards
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
        } else {
          entry.target.classList.add("opacity-0", "translate-y-8");
          entry.target.classList.remove("opacity-100", "translate-y-0");
        }
      });
    }, observerOptions);

    timelineRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Scroll listener for the animated orange line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startPoint = windowHeight * 0.6; 
      
      let progress = (startPoint - rect.top) / rect.height;
      
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="education" className={`${jetbrainsMono.className} w-full max-w-4xl mx-auto px-6 py-16 md:py-24 text-foreground`}>
      
      {/* Title Section */}
      <div className="mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <GraduationCap className="inline-block mr-2" size={40} /> Education
        </h2>
      </div>

      <div className="relative w-full" ref={containerRef}>
        
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2 rounded z-0"></div>
        
        {/* The Animated Vertical Line (Orange) */}
        <div 
          className="absolute left-[15px] md:left-1/2 top-0 w-[2px] bg-[#e8390d] md:-translate-x-1/2 rounded z-0 transition-all duration-75 ease-out shadow-[0_0_10px_#e8390d]" 
          style={{ height: `${scrollProgress}%` }}
        ></div>

        {/* Timeline Items */}
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => { timelineRef.current[index] = el; }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 
                         opacity-0 translate-y-8 transition-all duration-[800ms] ease-out
                         ${isLeft ? "md:flex-row-reverse" : ""}`}
            >
              {/* Spacer for desktop layout */}
              <div className="hidden md:block w-5/12"></div>

              <div className="absolute left-[-2px] md:left-1/2 w-8 h-8 rounded-full bg-background border-4 border-[#e8390d] z-10 md:-translate-x-1/2 shadow-lg transition-all duration-300 hover:scale-125"></div>

              <div className={`w-full md:w-5/12 pl-10 md:pl-0 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>                
                <div className="bg-background text-left p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#e8390d]/10 hover:border-[#e8390d]/60 relative z-20 group flex flex-col gap-2">                  
                  <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#e8390d]">
                    {item.title}
                  </h3>
                  <span className={`${jetbrainsMono.className} text-sm font-semibold text-[#e8390d]`}>
                    {item.date}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                    {item.description}
                  </p>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}