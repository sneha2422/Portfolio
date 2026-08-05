"use client"

import React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { Linkedin, Github, Instagram, Eye } from "lucide-react"
import BlurText from "../components/BlurText"
import AnimatedContent from "../components/AnimatedContent"
import GooeyNav from "../components/GooeyNav"
import FadeContent from "../components/FadeContent"
import GlareHover from "../components/GlareHover"
import InfiniteScroll from "../components/InfiniteScroll"
import CardSwap, { Card } from "../components/CardSwap"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import ProfileCard from "../components/ProfileCard"
import DecryptedText from "../components/DecryptedText"
import ShinyText from '../components/ShinyText'
import StarBorder from '../components/StarBorder'
import { AnimatePresence } from "framer-motion"
import CircularText from '../components/CircularText';
import CurvedLoop from "../components/CurvedLoop";
import Orb from "../components/Orb";
import MagicBento from "../components/MagicBento";
import { useRef } from "react";
import SplitText from "../components/SplitText";
import NeuralBackground from "../components/NeuralBackground";

import { getTestimonials, createTestimonial } from "../services/testimonialService"
import type { Testimonial } from "../types/testimonial"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Work Experience — fanned card stack data
const AIML_BADGE = { badgeBg: "rgba(139,92,246,0.15)", badgeColor: "#a78bfa", badgeBorder: "0.5px solid rgba(139,92,246,0.3)" };
const DESIGN_BADGE = { badgeBg: "rgba(167,139,250,0.1)", badgeColor: "#c4b5fd", badgeBorder: "0.5px solid rgba(167,139,250,0.25)" };
const DEV_BADGE = { badgeBg: "rgba(96,165,250,0.13)", badgeColor: "#60a5fa", badgeBorder: "0.5px solid rgba(96,165,250,0.3)" };

const fanExperience = [
  {
    company: "Revoltution Labs",
    date: "May 2026 – Present",
    badge: "AI/ML",
    ...AIML_BADGE,
    role: "AI & ML Intern",
    roleColor: "#a78bfa",
    location: "Bangalore · On-site",
    bullets: [
      "Building an AI voice assistant pipeline integrating speech recognition, NLP, and LLM-based response generation.",
      "Applying ML techniques and prompt engineering to optimize voice agent accuracy and response quality.",
    ],
    rotate: -10,
    tx: 50,
  },
  {
    company: "KJ Systems LTD",
    date: "Apr 2026 – Present",
    badge: "AI/ML",
    ...AIML_BADGE,
    role: "Developer (AI/ML Focus)",
    roleColor: "#a78bfa",
    location: "United Kingdom · Remote",
    bullets: [
      "Built production-ready AI expense scanner using Azure Document Intelligence and OCR.",
      "Developed VAT reconciliation logic and automated Excel report generation reducing manual effort significantly.",
    ],
    rotate: -6,
    tx: 30,
  },
  {
    company: "SiteSathi",
    date: "Jan 2026 – Present",
    badge: "Design",
    ...DESIGN_BADGE,
    role: "Product Designer",
    roleColor: "#c4b5fd",
    location: "India · Remote",
    bullets: [
      "Leading end-to-end product design for a construction-tech platform from research to Figma prototypes.",
      "Translating complex construction workflows into intuitive digital experiences for non-technical users.",
    ],
    rotate: -2,
    tx: 10,
  },
  {
    company: "SilicoScientia",
    date: "Mar 2025 – Jul 2025",
    badge: "Dev",
    ...DEV_BADGE,
    role: "Product Developer",
    roleColor: "#93c5fd",
    location: "Bangalore · Remote",
    bullets: [
      "Improved platform usability by 60% and reduced analysis workflow time by 40%.",
      "Developed data-driven dashboards for computational drug discovery tools used by research institutions.",
    ],
    rotate: 2,
    tx: -10,
  },
  {
    company: "BillianceAI",
    date: "Dec 2025 – Jan 2026",
    badge: "AI/ML",
    ...AIML_BADGE,
    role: "Research Assistant",
    roleColor: "#a78bfa",
    location: "Chennai · Remote",
    bullets: [
      "Contributed to building Felina — an AI voice agent that understands context, explains products, and persuades callers like a skilled human would.",
      "Worked on conversational AI systems supporting 16 languages, natural pauses, accented voices, and real-time adaptive responses.",
    ],
    rotate: 6,
    tx: -30,
  },
  {
    company: "AIKO",
    date: "Apr 2024 – Mar 2025",
    badge: "Design",
    ...DESIGN_BADGE,
    role: "Product Designer",
    roleColor: "#c4b5fd",
    location: "New Jersey · Remote",
    bullets: [
      "Boosted user engagement by 45% designing an AI-powered cross-platform app with Generative AI.",
      "Led data-informed design iterations translating user behaviour insights into product improvements.",
    ],
    rotate: 10,
    tx: -50,
  },
];

// Shared inner content for a fan card
function ExpCardInner({ exp }: { exp: (typeof fanExperience)[number] }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-bold leading-tight" style={{ fontFamily: "Jua, sans-serif", fontSize: "18px" }}>{exp.company}</h3>
        <span className="text-white/40 text-[11px] whitespace-nowrap mt-1 flex-shrink-0">{exp.date}</span>
      </div>
      <span
        className="inline-block w-fit text-xs font-semibold px-2.5 py-1 rounded-full mt-3"
        style={{ backgroundColor: exp.badgeBg, color: exp.badgeColor, border: exp.badgeBorder }}
      >
        {exp.badge}
      </span>
      <p className="text-base font-bold mt-3" style={{ color: exp.roleColor }}>{exp.role}</p>
      <p className="text-white/40 mt-1" style={{ fontSize: "11px" }}>{exp.location}</p>
      <ul className="flex flex-col gap-1 mt-2">
        {exp.bullets.map((b, bi) => (
          <li key={bi} style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            • {b}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Portfolio() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [navAnimated, setNavAnimated] = useState(true) // Default to true to prevent flash
  const [emailCopied, setEmailCopied] = useState(false)
  const [thankYou, setThankYou] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCategory, setActiveCategory] = useState('AI/ML');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  // ── Testimonials (Supabase) ─────────────────────────────────────────
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([]);
  const [loadingT, setLoadingT] = useState(true);
  const [errorT, setErrorT] = useState(false);
  const [showTForm, setShowTForm] = useState(false);
  const [tForm, setTForm] = useState({ quote: '', author: '', role: '', emoji: '💬' });
  const [tSubmitting, setTSubmitting] = useState(false);
  const [tSubmitted, setTSubmitted] = useState(false);

  // Fetch approved testimonials, newest first (ordering handled in the service)
  const loadTestimonials = useCallback(async () => {
    setLoadingT(true);
    setErrorT(false);
    try {
      const list = await getTestimonials();
      setDbTestimonials(list);
    } catch (e) {
      console.error('Failed to load testimonials:', e);
      setErrorT(true);
    } finally {
      setLoadingT(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const openAddForm = () => {
    setTForm({ quote: '', author: '', role: '', emoji: '💬' });
    setTSubmitted(false);
    setShowTForm(true);
  };

  const submitTForm = async () => {
    if (!tForm.quote.trim() || !tForm.author.trim() || tSubmitting) return;
    setTSubmitting(true);
    try {
      const created = await createTestimonial(tForm);
      // Show it immediately (newest first) — no refresh needed. It is already
      // persisted in Supabase, so it also survives reloads.
      setDbTestimonials((prev) => [created, ...prev]);
      setTSubmitted(true);
      setTForm({ quote: '', author: '', role: '', emoji: '💬' });
    } catch (e) {
      // Surface the real Supabase/Postgres error instead of "[object Object]"
      console.error('Failed to submit testimonial:', JSON.stringify(e, null, 2));
      const err = e as { message?: string; details?: string; hint?: string; code?: string };
      if (err?.message) console.error('message:', err.message);
      if (err?.details) console.error('details:', err.details);
      if (err?.hint) console.error('hint:', err.hint);
      if (err?.code) console.error('code:', err.code);
      alert('Could not submit your testimonial. Please try again.');
    } finally {
      setTSubmitting(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────

  const projectsData = [
    {
      title: "SpendSmart — Sprout",
      description: "• Designed a minimal finance app for Gen-Z students who overspend and under-save — addressing the emotional and behavioral root causes, not just data tracking.\n\n" +
      "• Key differentiators: Money Journal (emotion-tagged spending to build self-awareness), Vault (goal-locked savings), and gamified habits — features no competitor combines in a student-friendly UI.\n\n" +
      "• Conducted competitive analysis against Walnut, YNAB, and Splitwise; identified a clear white space around journaling + vault saving + habit tracking for students aged 18–26.\n\n" +
      "• Outcome: 91% of task completion rate across all 8 screens in usability testing; 64% of testers reported the Journal feature changed their spending mindset.",
      image: "/spend-smart.png", // Placeholder image
      video: "/case-study.mp4",
      link: "https://smart-spend-indol.vercel.app/", // Placeholder link
      techTags: [
        { name: "UI/UX Design" },
        { name: "Figma" },
        { name: "Competitive Analysis" },
        { name: "User Research" },
        { name: "Prototyping" },
        { name: "Usability Testing" },
      ],
      category: "UI/UX",
    },
    {
      title: "TravelMate",
      description: "• Recognized the difficulties that solo travelers have to face safety issues, trouble locating reliable travel companions, and the difficulty of organizing trips using various platforms.\n\n" +
      "• TravelMate was created as a social travel companion platform with an eye on providing a smooth experience that allows users to share plans, connect with verified travelers, and work together on trips through a single interface.\n\n" +
      "• Developed the entire UI/UX design process in Figma, including wireframing, prototyping, user research, and high-fidelity interface design, guaranteeing user-friendly navigation and a community-driven experience.\n\n" +
      "• TravelMate's focus on verified traveler communities and cooperative trip planning, integrating social networking and travel planning into a single platform to facilitate safer and more meaningful travel connections, is what makes it unique.",
      image: "/image_2.png",
      video: "/Travel_video.mp4",
      link: "https://v0-travelmate-website.vercel.app/",
      techTags: [
        { name: "Figma" },
        { name: "UX Research" },
        { name: "Wireframing" },
        { name: "Prototyping" },
        { name: "UI Design" },
        { name: "Interaction Design" }
      ],
      category: "UI/UX",
    },
    {
      title: "Ai Your Ranking Super Power ",
      description: "• Recognized that managing SEO performance across various tools presents a challenge for marketers, as it frequently necessitates switching between intricate platforms to track rankings, analyze competitors, and optimize content.\n\n" +
      "• Using a user-friendly interface, structured data visualization, and easy navigation, I created an AI-powered SEO dashboard in Figma that streamlines digital marketing workflows.\n\n" +
      "• Developed interactive wireframes and prototypes that highlighted features like competitor insights, automated alerts, smart keyword generation, visual analytics reports, and keyword performance tracking.\n\n" +
      "• This project is unique in that it focuses on integrating AI-driven insights with an easy-to-use interface, allowing marketers to quickly comprehend SEO performance and make data-driven decisions without technical complexity.",
      image: "/image_1.png",
      video: "/AI_video.mp4",
      link: "https://www.behance.net/gallery/209632955/AI-SUPER-POWER",
      techTags: [
        { name: "Figma"},
        { name: "Ui/Ux Design" },
        { name: "Prototyping" },
        { name: "WireFraming" },
        { name: "Visual Design" },
      
      ],
      category: "UI/UX",
    },
    {
      title: "Terminal Voice Agent — Hands-Free AI Coding Interface",
      description:
        "• Built a fully hands-free voice interface that wraps aider, capturing spoken commands via microphone, transcribing in real-time using Groq Whisper (whisper-large-v3), and piping output directly to the AI coding agent's stdin — eliminating keyboard dependency entirely for developer workflows.\n\n" +
        "• Engineered a modular three-component architecture — mic capture with push-to-talk and VAD modes, a subprocess bridge managing aider's stdin pipeline, and an orchestration loop with a voice-to-slash-command substitution table — all independently extensible.\n\n" +
        "• Optimised end-to-end voice-to-action latency across the full pipeline; supports multiple LLMs including GPT-4o and Claude Sonnet, with zero API cost on Groq's free tier and full test coverage via mocked network calls.",
      image: "/project-3.png",
      video: "/voice agent.mp4",
      link: "https://github.com/sneha2422/voice-agent",
      techTags: [
        { name: "Python" },
        { name: "Groq Whisper" },
        { name: "sounddevice" },
        { name: "pynput" },
        { name: "subprocess" },
        { name: "aider-chat" },
        { name: "PyTest" },
        { name: "GPT-4o" },
        { name: "Claude Sonnet" },
      ],
      category: "AI/ML",
    },
    {
      title: "Explainable Hybrid Clinical Decision Support System (CDSS)",
      description:
        "• Identified that ICU clinicians are buried in false-positive alerts — a known patient-safety risk caused by ML models that optimise for accuracy rather than clinical relevance.\n\n" +
        "• Built an end-to-end predictive pipeline on MIMIC-III/IV and UCI clinical datasets using an ensemble of Logistic Regression, Random Forest, and Decision Tree models, engineered for high-stakes healthcare environments.\n\n" +
        "• Evaluated across Precision, Recall, and F1-Score with a fusion layer that validates every ML output against clinical guidelines before it surfaces as an alert — reducing noise without sacrificing sensitivity.\n\n" +
        "• Applied SHAP and Grad-CAM for explainability — measurably reduced false-positive alerts and produced feature-level justifications that make predictions trustworthy to clinicians, not just interpretable to engineers.",
      image: "/project-3.png",
      video: "/cdci.mp4",
      link: "https://github.com/sneha2422/CLINICAL-DECISION-SUPPORT-SYSTEM-CDSS-",
      techTags: [
        { name: "Python" },
        { name: "Scikit-learn" },
        { name: "Pandas" },
        { name: "NumPy" },
        { name: "MIMIC-III/IV" },
        { name: "UCI Datasets" },
        { name: "Logistic Regression" },
        { name: "Random Forest" },
        { name: "Decision Tree" },
        { name: "XAI" },
        { name: "SHAP" },
        { name: "Grad-CAM" },
      ],
      category: "AI/ML",
    },
    {
      title: "Breast Cancer Classification using Deep Learning (BreakHis Dataset)",
      description: "• Developed a deep learning system to classify breast cancer histopathology images using the BreakHis dataset, which contains over 7,900 images across multiple magnification levels (40X, 100X, 200X, 400X).\n\n" +
      "• Implemented and compared multiple architectures including ResNet50, VGG16, MobileNetV2, Vision Transformer (ViT), and a custom CNN using PyTorch, evaluating model performance with metrics such as accuracy, precision, recall, and F1-score.\n\n" +
      "• Vision Transformer achieved the highest accuracy of 93.4%, while MobileNetV2 provided an efficient lightweight alternative; model interpretability was further analyzed using Grad-CAM and SHAP techniques.",
      image: "/project-3.png", // Assuming you have project-3.png
      video: "/Break_his_video.mp4",
      link: "https://github.com/sneha2422/BREAST-CANCER-CLASSIFICATION-USING-DEEP-LEARNING-MODELS/tree/main",
      techTags: [
        { name: "Python" },
        { name: "PyTorch" },
        { name: "NumPy" },
        { name: "Pandas" },
        { name: "ResNet50" },
        { name: "VGG16" },
        { name: "MobileNetV2" },
        { name: "Vision Transformer" },
        { name: "Grad-CAM" },
        { name: "SHAP" },  
      ],
      category: "AI/ML",
    },
    {
      title: "Credit Card Fraud Detection",
      description: "• Worked on the problem of accurately identifying fraudulent credit card transactions in a highly imbalanced financial dataset, where legitimate transactions significantly outnumber fraudulent ones.\n\n" +
          "• Built a machine learning pipeline in Python using libraries such as Scikit-learn, Pandas, and NumPy, applying data preprocessing and undersampling techniques to balance the dataset and train a refined XGBoost classifier.\n\n" +
          "• Evaluated the model using performance metrics including F1-Score and a confusion matrix, achieving strong results in detecting fraudulent transactions while effectively reducing false negatives.",
      image: "/project-4.png",
      video: "/credit_card_fraud_detection.mp4",
      link: "https://github.com/sneha2422/Credit_card_fraud_detection",
      techTags: [
        { name: "Python" },
        { name: "XGBoost" },
        { name: "Scikit-learn" },
        { name: "NumPy" },
        { name: "Pandas" },
        { name: "Matplotlib" },
        { name: "Data Preprocessing" },
        { name: "Undersampling" },
        { name: "Confusion Matrix" },
      ],
      category: "AI/ML",
    },
    {
      title: "YourFirstStep: Career Guidance Platform",
      description: "• Due to a lack of guidance, floating resources, and a lack of awareness of actual job market opportunities and skill requirements, many students find it difficult to select the best career path.\n\n" +
      "• YourFirstStep is a full-stack web platform designed to assist students in navigating career uncertainty. It addresses course selection confusion by offering structured, interactive assessments—based on authorized Coursera material—and personalized domain recommendations.\n\n" +
      "• The platform features a fully client-side quiz for instant, zero-latency evaluation, a dynamic dashboard for results, and a modern UI built with shadcn/ui and Tailwind CSS.\n\n" +
      "• It bridges the gap between academic interests and real-world job market data, acting as an intelligent and accessible tool for career exploration.",
      image: "/project-5.png", // Placeholder image
      video: "/Your first step.mp4",
      link: "https://your-first-step.vercel.app/",
      techTags: [
        { name: "Next.js 15" },
        { name: "Next.js API Routes" },
        { name: "React 19" },
        { name: "TypeScript" },
        { name: "React Hooks" },
        { name: "Tailwind CSS" },
        { name: "shadcn/ui" },
        { name: "next-themes" },
        { name: "cmdk" },
        { name: "Lucide React" },
        { name: "Node.js" },
        { name: "pnpm" },
        { name: "UI/UX Design" },
        { name: "Coursera API" },
      ],
      category: "Full Stack",
    },
  ]

  const filteredProjects = projectsData.filter((project) => project.category === activeCategory);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY

    // Convert mouse position to rotation values
    const rotY = (mouseX / rect.width) * 60 // Max 60 degrees rotation
    const rotX = -(mouseY / rect.height) * 60 // Max 60 degrees rotation (negative for natural feel)

    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  // Navigation items
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Tech Stacks", href: "#tech-stack" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Highlights", href: "#highlights" },
    { label: "Testimonial", href: "#testimonial" },
    { label: "Contact", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    // Find the closest anchor link that was clicked
    const link = target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      // Ensure it's an internal anchor link
      if (href && href.startsWith('#')) {
        e.preventDefault(); // Prevent the default jump
        gsap.to(window, {
          duration: 1,
          ease: 'power2.inOut',
          scrollTo: href,
        });
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const st = ScrollTrigger.create({
        trigger: video,
        start: "top bottom", // When the top of the video is at the bottom of the viewport
        end: "bottom top",   // When the bottom of the video is at the top of the viewport
        onEnter: () => video.play().catch(() => {}), // Play when it enters
        onLeave: () => video.pause(), // Pause when it leaves
        onEnterBack: () => video.play().catch(() => {}), // Play when it enters again scrolling up
        onLeaveBack: () => video.pause(), // Pause when it leaves again scrolling up
      });

      return () => {
        st.kill(); // Cleanup ScrollTrigger instance on component unmount
      };
    }
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // Check if animation has already played using sessionStorage
  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("nav-animated")
    if (hasAnimated === "true") {
      setNavAnimated(true)
    } else {
      setNavAnimated(false)
      // Set flag after animation completes
      const timer = setTimeout(() => {
        sessionStorage.setItem("nav-animated", "true")
        setNavAnimated(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const gooeyNav = (
    <div style={{ position: "relative" }}>
      <GooeyNav
        items={navItems}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />
    </div>
  );
  // Social media data
  const socialLinks = [
    {
      id: "linkedin",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/-sneha-",
      color: "#ffffff",
      name: "LinkedIn",
    },
    {
      id: "github",
      icon: Github,
      url: "https://github.com/sneha2422",
      color: "#ffffff",
      name: "GitHub",
    },
    {
      id: "instagram",
      icon: Instagram,
      url: "https://www.instagram.com/sneha.aa__/",
      color: "#ffffff",
      name: "Instagram",
    },
    {
      id: "behance",
      icon: null, // We'll use "Be" text for Behance
      url: "https://www.behance.net/snehavenkatesh4",
      color: "#ffffff",
      name: "Behance",
    },
  ]

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("snehavenkatesh14@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setThankYou(false);
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setThankYou(true);
        formRef.current.reset();
      } else {
        setThankYou(false);
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      setThankYou(false);
      alert('Failed to send message. Please try again.');
    }
  };

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".gsap-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 10%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#11071F" }}>
      {/* Gooey Navigation Bar */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
        <nav className="flex items-center justify-between px-8 py-4" onClick={handleNavClick}>
          {/* Logo - Left Side */}
          <div className="flex items-center z-30">
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              style={{ width: '28px', height: '28px', borderRadius: '0', background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
            >
              <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </GlareHover>
          </div>

          {/* Gooey Navigation Container - Desktop only */}
          <div className="hidden md:block">
            {!navAnimated ? (
              <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false}
                duration={1}
                ease="bounce.out"
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.1}
                delay={0.3}
              >
                {gooeyNav}
              </AnimatedContent>
            ) : (
              gooeyNav
            )}
          </div>

          {/* Hamburger - Mobile only */}
          <div className="md:hidden relative z-40">
            <button
              aria-label="Toggle menu"
              onClick={(e) => { e.stopPropagation(); setMobileNavOpen((o) => !o); }}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                {mobileNavOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
            <AnimatePresence>
              {mobileNavOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl border border-[#7127BA]/40 bg-[#160d2e] shadow-2xl overflow-hidden"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-3 text-white/80 text-sm hover:bg-[#7127BA]/30 hover:text-white transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </FadeContent>

      <div id="home" className="flex relative" style={{ overflowX: 'hidden' }}>
        <NeuralBackground />
        {/* Social Media Sidebar — fixed to left edge, vertically centred (desktop only) */}
        <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-5">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
              >
                {social.id === "behance" ? (
                  <span className="text-base font-bold" style={{ color: social.color }}>Be</span>
                ) : IconComponent ? (
                  <IconComponent size={22} style={{ color: social.color }} />
                ) : null}
              </motion.a>
            );
          })}
        </div>
        {/* End Social Media Sidebar */}

        {/* Main Content - Centered Container */}
        <div className="w-full py-6 md:py-0 md:min-h-[calc(100dvh-80px)] flex items-center justify-center relative">
          {/* Centered Bitmoji and Text */}
          <div className="flex flex-col md:flex-row items-center justify-center max-w-2xl mx-auto space-y-10 md:space-y-0 md:space-x-16">
            {/* Bitmoji */}
            <div className="relative flex items-center justify-center w-44 h-44 md:w-64 md:h-64">
              {/* Arrow on the left side of the gradient circle */}
              <div className="absolute z-20" style={{ right: '-45px', top: '30%', transform: 'translateY(-50%)' }}>
                <div className="relative">
                  <div className="absolute inset-0 pulsing-glow">
                    <Image src="/arrow-pointer.png" alt="Arrow Glow" width={100} height={100} className="object-contain opacity-40 blur-sm" />
                  </div>
                  <Image src="/arrow-pointer.png" alt="Arrow Pointer" width={100} height={100} className="object-contain relative z-10 arrow-effects" />
                </div>
              </div>
              {/* Large glowing gradient absolutely centered */}
              <div
                className="pointer-events-none select-none"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 350,
                  height: 350,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                }}
              >
                <Image
                  src="/gradient-circle.png"
                  alt="Gradient Background"
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>
              <div
                className="relative z-10 flex items-center justify-center w-40 h-40 md:w-60 md:h-60 cursor-grab active:cursor-grabbing"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  animate={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image
                    src="/bimoji-character.png"
                    alt="3D Character - Sneha Venkatesh"
                    width={240}
                    height={240}
                    className="object-contain select-none"
                    draggable={false}
                  />
                </motion.div>
              </div>
            </div>
            {/* Text */}
            <div className="space-y-6 relative flex flex-col items-center text-center md:items-start md:text-left md:ml-4">
              <div className="space-y-2 flex flex-col items-center md:items-start">
                <p
                  className="text-white whitespace-normal md:whitespace-nowrap"
                  style={{ fontFamily: "Jua, sans-serif", fontSize: "clamp(18px, 5.5vw, 30px)", fontWeight: "normal" }}
                >
                  <span style={{ color: "#7127BA" }}>Hello! I am </span><span style={{ color: "#ffffff" }}>Sneha Venkatesh</span>
                </p>

                {/* AI/ML Engineer - Main highlighted role */}
                <div className="relative flex flex-col items-start mt-2" style={{ lineHeight: 1.1 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/oval-vector.png"
                    alt="Oval Vector"
                    style={{ position: 'absolute', left: '-10px', top: '10px', opacity: 0.7, width: 'min(1000px, 170vw)', height: 'auto' }}
                  />
                  <div className="relative z-10 flex flex-col items-start">
                    {/* AI & ML — white */}
                    <SplitText
                      text="AI & ML"
                      tag="span"
                      splitType="chars"
                      delay={80}
                      duration={0.8}
                      ease="power3.out"
                      from={{ opacity: 0, y: 50 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.2}
                      rootMargin="0px"
                      textAlign="left"
                      className="text-white"
                      style={{
                        fontFamily: "Kantumruy, sans-serif",
                        fontSize: "clamp(38px, 11vw, 64px)",
                        fontWeight: "normal",
                        lineHeight: 1.15,
                        display: "block",
                      }}
                    />
                    {/* Engineer — purple */}
                    <SplitText
                      text="Engineer"
                      tag="span"
                      splitType="chars"
                      delay={80}
                      duration={0.8}
                      ease="power3.out"
                      from={{ opacity: 0, y: 50 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.2}
                      rootMargin="0px"
                      textAlign="left"
                      style={{
                        fontFamily: "Kantumruy, sans-serif",
                        fontSize: "clamp(38px, 11vw, 64px)",
                        fontWeight: "normal",
                        color: "#B18CFE",
                        lineHeight: 1.15,
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                {/* Secondary roles as pill buttons */}
                <div className="flex gap-3 mt-1">
                  <span className="text-sm text-white/80 border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                    Full Stack
                  </span>
                  <span className="text-sm text-white/80 border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                    Product Designer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* MagicBento Section */}
<section
  id="skills"
  className="w-full flex flex-col items-center justify-center py-20  mx-auto px-4"
  style={{ backgroundColor: '#11071F' }}
>
  <h2
    className="text-3xl md:text-4xl font-bold text-white mb-4 text-center w-full"
    style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}
  >
    🎯 My Skills & Expertise
  </h2>

  {/* Wrapper to center MagicBento */}
  <div className="w-full flex flex-col items-center justify-center max-w-[90rem]">
    <MagicBento
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={12}
      glowColor="132, 0, 255"
    />
  </div>
</section>


{/* Work Experience Section — fanned card stack */}
<section id="experience" className="w-full flex flex-col items-center py-20 px-4" style={{ backgroundColor: '#11071F' }}>
  <h2 className="text-3xl md:text-4xl font-bold text-white text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
    💼 Work Experience
  </h2>
  <span className="text-white/40 text-sm mt-2 mb-4 text-center">Where I've worked</span>

  {/* Desktop: fanned card stack */}
  <div className="hidden md:flex relative w-full mx-auto h-[480px] justify-center items-center overflow-x-clip">
    {fanExperience.map((exp, index) => {
      const isHovered = hoveredExp === index;
      const dimmed = hoveredExp !== null && !isHovered;
      return (
        <motion.div
          key={index}
          onMouseEnter={() => setHoveredExp(index)}
          onMouseLeave={() => setHoveredExp(null)}
          initial={{ opacity: 0, x: exp.tx, rotate: exp.rotate }}
          animate={{
            opacity: dimmed ? 0.7 : 1,
            x: exp.tx,
            y: isHovered ? -20 : 0,
            rotate: isHovered ? 0 : exp.rotate,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex-shrink-0 flex flex-col p-5 cursor-pointer"
          style={{
            width: 320,
            minHeight: 340,
            height: 'auto',
            marginLeft: index === 0 ? 0 : -95,
            transformOrigin: 'bottom center',
            zIndex: isHovered ? 50 : index,
            backgroundColor: '#1a0d30',
            border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <ExpCardInner exp={exp} />
        </motion.div>
      );
    })}
  </div>

  {/* Mobile: stacked single column, no rotation */}
  <div className="flex md:hidden flex-col gap-5 w-full max-w-sm mx-auto mt-4">
    {fanExperience.map((exp, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
        className="w-full flex flex-col p-5"
        style={{
          minHeight: 280,
          backgroundColor: '#1a0d30',
          border: '0.5px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <ExpCardInner exp={exp} />
      </motion.div>
    ))}
  </div>
</section>


{/* Projects Section */}
<section id="projects" className="w-full flex flex-col items-center py-20 px-4" style={{ backgroundColor: '#11071F' }}>
  <div className="text-center mb-4">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Jua, sans-serif' }}>
    🚀 Projects
    </h2>
  </div>

  {/* Project Category Navigation */}
  <div className="flex flex-wrap justify-center gap-6 sm:gap-16 md:gap-48 mt-8 mb-16">
    <button
      className={`text-lg font-medium transition-all duration-300 uppercase tracking-wider pb-1 ${
        activeCategory === 'AI/ML' ? 'text-white border-b-2 border-[#7127BA]' : 'text-white/60 hover:text-white'
      }`}
      onClick={() => setActiveCategory('AI/ML')}
    >
      AI/ML
    </button>
    <button
      className={`text-lg font-medium transition-all duration-300 uppercase tracking-wider pb-1 ${
        activeCategory === 'Full Stack' ? 'text-white border-b-2 border-[#7127BA]' : 'text-white/60 hover:text-white'
      }`}
      onClick={() => setActiveCategory('Full Stack')}
    >
      Full Stack
    </button>
    <button
      className={`text-lg font-medium transition-all duration-300 uppercase tracking-wider pb-1 ${
        activeCategory === 'UI/UX' ? 'text-white border-b-2 border-[#7127BA]' : 'text-white/60 hover:text-white'
      }`}
      onClick={() => setActiveCategory('UI/UX')}
    >
      UI/UX
    </button>
  </div>

  <div className="w-full max-w-6xl mx-auto flex flex-col">
    {filteredProjects.map((project, index) => (
      <React.Fragment key={index}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-x-12 gap-y-6">
          {/* Left: Project Number */}
          <div className="text-6xl md:text-8xl font-black text-white/10 -mt-2" style={{ fontFamily: 'Jua, sans-serif' }}>
            0{index + 1}
          </div>

          {/* Right: Project Content */}
          <div className="flex flex-col gap-8 md:-mt-2">
            {/* Media (Video/Image) */}
            <a
              href={project.link || undefined}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className="block rounded-2xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-[#7127BA] transition-all duration-500 ease-in-out transform hover:-translate-y-2 h-[20rem] md:h-[36rem] cursor-none"
              onMouseEnter={() => setCursorVariant("project")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {project.video ? (
                <video src={project.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  width={800} 
                  height={450} 
                  className="w-full h-full object-cover" 
                />
              )}
            </a>
          
          {/* Details */}
          <div className="flex flex-col gap-4 px-2">
            <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'Jua, sans-serif' }}>{project.title}</h3>
            <p className="text-white/80 leading-relaxed text-base min-h-[8rem] whitespace-pre-line">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="mt-4 px-2">
            <h4 className="text-sm font-semibold text-white/70 mb-4">Tech Stack:</h4>
            <div
              className="flex flex-wrap gap-4 items-center tech-tags-container"
              style={{ justifyContent: 'flex-start' }}
            >
              {project.techTags.map((tag, tagIndex) => (
                <StarBorder key={tagIndex} color="#40305A" speed={`${4 + tagIndex * 0.2}s`} thickness={1}>
                  <span className="text-white text-xs font-medium whitespace-nowrap">
                    {tag.name}
                  </span>
                </StarBorder>
              ))}
            </div>
            <style jsx>{`
              .tech-tags-container :global(.inner-content) {
                padding: 0.5rem 1rem !important;
              }
            `}</style>
          </div>
        </div>
        </div>
        {index < filteredProjects.length - 1 && (
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#a259f7]/90 to-transparent my-20"></div>
        )}
      </React.Fragment>
    ))}
  </div>
</section>


{/* Tech Stack Section */}
<section id="tech-stack" className="w-full flex flex-col items-center pt-20 pb-0 relative" style={{ backgroundColor: '#11071F' }}>
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center w-full"
      style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
        💻 Tech Stack's
  </h2>
  <div className="flex justify-center" style={{ background: 'transparent' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/tech5.jpeg"
      alt="Tech Stack Section"
      className="max-w-[85vw] md:max-w-[65vw]"
      style={{ height: "auto", background: "transparent", display: "block", border: "1.5px solid rgba(177, 140, 254, 0.4)", borderRadius: "16px", padding: "0" }}
    />
  </div>
</section>

      {/* New Full-Width AI Tech Stack Section with Infinite Scroll */}
      <section className="w-full pt-0 pb-20 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#11071F' }}>
        {/* Curved purple background */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '100%',
          height: '320px',
          transform: 'translateY(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 1920 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,120 Q960,420 1920,120 L1920,320 L0,320 Z" fill="url(#purpleGradient)" />
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="1920" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7127BA" />
                <stop offset="1" stopColor="#B18CFE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* CurvedLoop text */}
        <div className="w-full flex items-center justify-center relative z-10" style={{ minHeight: '100px', transform: 'translateY(40px)' }}>
          <CurvedLoop
            marqueeText="Large Language Models ✦ RAG Pipelines ✦ PyTorch ✦ TensorFlow ✦ Scikit-learn ✦ HuggingFace ✦ LangChain ✦ Fine-Tuning ✦ Prompt Engineering ✦ Vector Databases ✦ SHAP ✦ Grad-CAM ✦ Transformer Architecture ✦ Model Deployment ✦ Next.js ✦ React ✦ TypeScript ✦ Node.js ✦ REST APIs ✦ Vercel ✦ Git ✦ Python ✦ Deep Learning ✦ Neural Networks ✦ XAI ✦"
            speed={2}
            curveAmount={400}
            direction="left"
            interactive={true}
            className="text-5xl md:text-6xl font-bold tracking-wider text-white"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="w-full flex flex-col items-center py-20 px-2" style={{ backgroundColor: '#11071F' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
        ✨ About Me
        </h2>
        <div className="container mx-auto max-w-7xl w-full flex flex-col md:flex-row items-center md:items-stretch gap-7 justify-center">
          {/* Left: About Text */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-auto py-8 md:py-0 md:h-[550px]">
            <StarBorder color="#40305A" speed="3s" thickness={1.5} className="w-full max-w-xl py-4">
              <DecryptedText
                text="I build AI/ML systems end-to-end — from raw data and model architecture all the way to deployment to the user's screen."
                animateOn="hover"
                className="text-white text-[20px] font-sans text-center leading-snug mb-2"
                parentClassName="w-full"
                encryptedClassName="text-white"
              />
              <ShinyText text="I've worked across AI product companies, research-grade datasets, and fast-moving startup environments. My stack spans PyTorch, Scikit-learn, LangChain, RAG pipelines, and full-stack web — React, Next.js, Node.js — so I can own a feature from the model layer to the interface without handing off." speed={4} className="text-[16px] text-center leading-snug" />
              <ShinyText text="When I'm not training models or building interfaces, I'm usually reading research papers, breaking things in Jupyter notebooks, or prototyping something new in Figma. I care about explainability — SHAP, Grad-CAM, and interpretable outputs matter to me as much as raw accuracy." speed={4.5} className="text-[16px] text-center leading-snug" />
              <ShinyText text="I think in systems, not silos. Most people optimise for one layer — I hold the model, the backend, and the user experience in mind simultaneously. That cross-domain thinking means I catch problems others miss and ship solutions that actually hold together." speed={5} className="text-[16px] text-center leading-snug" />
              <ShinyText text="Curiosity is my default state. If you are building something at the intersection of AI and real-world impact, let's talk." speed={5.5} className="text-[16px] text-center leading-snug" />
            </StarBorder>
          </div>
          {/* Right: Profile Card */}
          <div className="flex justify-center md:justify-start items-center w-full md:w-1/3 md:-ml-8 h-auto md:h-[550px]">
            <ProfileCard
              name="Sneha Venkatesh"
              title="AI/ML Engineer. Full-Stack Developer"
              handle="sneha2422"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/new_profile_picture.jpeg"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=snehavenkatesh14@gmail.com', '_blank', 'noopener,noreferrer')}
              behindGradient={undefined}
              innerGradient={undefined}
              miniAvatarUrl="/new_profile_picture.jpeg"
            />
          </div>
        </div>
      </section>

      {/* Highlights & What Drives Me Section */}
      <section id="highlights" className="w-full flex flex-col items-center py-20 px-2" style={{ backgroundColor: '#11071F' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
        🌟 Highlights & What Drives Me
        </h2>
        {/* Centered Zig-Zag Timeline with GlareHover Emojis on Line and StarBorder Cards */}
        <div className="relative flex flex-col items-center w-full max-w-3xl mx-auto min-h-0 md:min-h-[700px]">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B18CFE] via-[#7127BA] to-[#763CAC] opacity-70 rounded-full -translate-x-1/2 z-0" style={{ minHeight: '100%' }} />

          {/* 1. SIH Hackathon (Left) */}
          <div className="flex w-full justify-start mb-8 md:mb-16 relative z-10 items-center">
            <div className="relative flex flex-col items-center md:items-end w-full md:w-1/2 px-2 md:pr-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-full md:max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Top 7 Finalist – SIH Round 1</span>
                  <p className="text-[#B6B8D6] text-sm">Selected from 540+ teams for building an AI-powered solution with clean UX & strong backend.</p>
    </div>
              </StarBorder>
              {/* Emoji marker absolutely centered to card */}
              <div className="hidden md:block">
              <GlareHover
                width="48px"
                height="48px"
                background="#181028"
                borderRadius="50%"
                borderColor="#B18CFE"
                glareColor="#B18CFE"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
              >
                <span className="text-2xl">🏆</span>
              </GlareHover>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </div>
          {/* 2. android club (Right) */}
          <div className="flex w-full justify-end mb-8 md:mb-16 relative z-10 items-center">
            <div className="hidden md:block md:w-1/2" />
            <div className="relative flex flex-col items-center md:items-start w-full md:w-1/2 px-2 md:pl-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-full md:max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Android Club</span>
                  <p className="text-[#B6B8D6] text-sm">Conducted and managed "Hack-n-Droid," a record-breaking university event with 267 teams (including 73 external teams
                    handled event management and served as part of the design team.</p>
                </div>
              </StarBorder>
              <div className="hidden md:block">
              <GlareHover
                width="48px"
                height="48px"
                background="#181028"
                borderRadius="50%"
                borderColor="#763CAC"
                glareColor="#763CAC"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                style={{ position: 'absolute', left: '0%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
              >
                <span className="text-2xl">🤖</span>
              </GlareHover>
              </div>
            </div>
          </div>
          {/* 3. CyberTeam Lead (Left) */}
          <div className="flex w-full justify-start mb-8 md:mb-16 relative z-10 items-center">
            <div className="relative flex flex-col items-center md:items-end w-full md:w-1/2 px-2 md:pr-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-full md:max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Merchandise Volunteer, VIT Vibrance 2025</span>
                  <p className="text-[#B6B8D6] text-sm">Managed merchandise logistics and contributed to the successful execution of VIT's largest annual festival.</p>
                </div>
              </StarBorder>
              <div className="hidden md:block">
              <GlareHover
                width="48px"
                height="48px"
                background="#181028"
                borderRadius="50%"
                borderColor="#B18CFE"
                glareColor="#B18CFE"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
              >
                <span className="text-2xl">🎨</span>
              </GlareHover>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </div>
          {/* 4. NGO Volunteer (Right) */}
          <div className="flex w-full justify-end mb-0 relative z-10 items-center">
            <div className="hidden md:block md:w-1/2" />
            <div className="relative flex flex-col items-center md:items-start w-full md:w-1/2 px-2 md:pl-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-full md:max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Professional Event Host & Master of Ceremonies</span>
                  <p className="text-[#B6B8D6] text-sm">Building on a passion for the stage since childhood, I have successfully hosted numerous high-profile events and earned media recognition in multiple languages for my public speaking expertise..</p>
                </div>
              </StarBorder>
              <div className="hidden md:block">
              <GlareHover
                width="48px"
                height="48px"
                background="#181028"
                borderRadius="50%"
                borderColor="#40305A"
                glareColor="#40305A"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                style={{ position: 'absolute', left: '0%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
              >
                <span className="text-2xl">🎤</span>
              </GlareHover>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full flex flex-col items-center py-20 px-2" style={{ backgroundColor: '#11071F' }}>
        <div className="flex flex-col items-center w-full">
          <span className="text-6xl md:text-7xl text-white/70 mb-4" style={{ fontFamily: 'serif', lineHeight: 1 }}>
           <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="40" fontSize="48" fontWeight="bold" fill="currentColor">“”</text>
              {/* <circle cx="54" cy="36" r="10" fill="currentColor" opacity="0.3" /> */}
            </svg> 
          </span>
          <p className="text-2xl md:text-3xl text-white/90 italic font-medium text-center mb-4" style={{ fontFamily: 'inherit' }}>
            "It's not over ,until i Win."
          </p>
          <span className="text-[#B6B8D6] text-base mt-2" style={{ fontFamily: 'inherit' }}>— Me</span>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonial" className="w-full flex flex-col items-center py-20 px-4" style={{ backgroundColor: '#11071F' }}>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
          💬 Testimonials
        </h2>
        <p className="text-white/40 text-sm mb-10 text-center">Worked with me? Leave a note.</p>

        {/* Button */}
        <motion.button
          onClick={openAddForm}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#7127BA] to-[#B18CFE] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition mb-12"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Leave a Testimonial
        </motion.button>

        {/* Cards */}
        {loadingT ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="w-9 h-9 rounded-full border-2 border-[#7127BA]/30 border-t-[#B18CFE] animate-spin" />
            <span className="text-white/40 text-sm">Loading testimonials…</span>
          </div>
        ) : errorT ? (
          <div className="flex flex-col items-center gap-4 py-10">
            <p className="text-white/60 text-sm">Couldn&apos;t load testimonials right now.</p>
            <button
              onClick={loadTestimonials}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7127BA] to-[#B18CFE] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Retry
            </button>
          </div>
        ) : dbTestimonials.length === 0 ? (
          <p className="text-white/40 text-sm py-10 text-center">No testimonials yet. Be the first to leave one!</p>
        ) : (
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {dbTestimonials.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.28 }}
                  className="relative flex flex-col gap-4 bg-[#160d2e] border border-[#7127BA]/25 rounded-2xl p-6 hover:border-[#7127BA]/60 transition-all"
                >
                  <span className="text-3xl leading-none">{t.emoji}</span>
                  <p className="text-white/80 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-[#B18CFE] text-sm font-semibold">&mdash; {t.author}</p>
                    {t.role && <p className="text-white/35 text-xs mt-0.5">{t.role}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Centered modal */}
        <AnimatePresence>
          {showTForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
              onClick={e => { if (e.target === e.currentTarget) setShowTForm(false); }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full max-w-md bg-[#110828] border border-[#7127BA]/50 rounded-3xl p-7 flex flex-col gap-5 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'Jua, sans-serif' }}>
                    Leave a Testimonial
                  </h3>
                  <button onClick={() => setShowTForm(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition text-sm">
                    ✕
                  </button>
                </div>

                {tSubmitted ? (
                  <div className="flex flex-col items-center text-center gap-4 py-6">
                    <div className="w-14 h-14 rounded-full bg-[#7127BA]/20 flex items-center justify-center text-3xl">🎉</div>
                    <p className="text-white font-semibold">Thank you! Your testimonial has been added.</p>
                    <p className="text-white/40 text-sm">Thanks for sharing your experience.</p>
                    <button onClick={() => setShowTForm(false)}
                      className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7127BA] to-[#B18CFE] text-white text-sm font-semibold hover:opacity-90 transition">
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      {['💬','⭐','🚀','🔥','💡','🎯','🤝','🌟'].map(em => (
                        <button key={em} onClick={() => setTForm(f => ({ ...f, emoji: em }))}
                          className={`text-lg p-1.5 rounded-lg transition-all ${tForm.emoji === em ? 'bg-[#7127BA]/60 scale-110 ring-1 ring-[#B18CFE]/50' : 'hover:bg-white/10'}`}>
                          {em}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={tForm.quote}
                      onChange={e => setTForm(f => ({ ...f, quote: e.target.value }))}
                      placeholder="Share your experience working with Sneha..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 resize-none focus:outline-none focus:border-[#7127BA] transition"
                    />
                    <input value={tForm.author} onChange={e => setTForm(f => ({ ...f, author: e.target.value }))}
                      placeholder="Your name *"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#7127BA] transition"
                    />
                    <input value={tForm.role} onChange={e => setTForm(f => ({ ...f, role: e.target.value }))}
                      placeholder="Your role / company (optional)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#7127BA] transition"
                    />
                    <div className="flex gap-3">
                      <button onClick={() => setShowTForm(false)}
                        className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40 text-sm hover:bg-white/5 transition">
                        Cancel
                      </button>
                      <button onClick={submitTForm} disabled={!tForm.quote.trim() || !tForm.author.trim() || tSubmitting}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#7127BA] to-[#B18CFE] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {tSubmitting && <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
                        {tSubmitting ? 'Submitting…' : 'Submit'}
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* Side-by-Side Contact & Vertical Resume Section */}
      <section id="contact" className="w-full flex flex-col items-center py-20 px-2" style={{ backgroundColor: '#11071F' }}>
        {/* Main Heading and Subheading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
        🤝 Let's Connect
        </h2>
        <p className="text-lg md:text-xl text-white/80 text-center mb-8 max-w-2xl" style={{ fontFamily: 'inherit' }}>
          If you'd like to work together or have a project in mind, I'd love to hear from you!
        </p>
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-end bg-transparent rounded-2xl shadow-none">
         {/* Right: Open For Section */}
          <div className="flex-1 flex flex-col justify-center h-full items-center px-8 py-8">
            <div className="flex flex-col items-center h-full justify-center w-full">
              <div className="flex flex-col items-center gap-6 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3md:mb-3" style={{ fontFamily: 'inherit', minHeight: '40px', marginTop: 0 }}>
                  Open For
                </h3>
                <ul className="flex flex-col gap-2 w-full items-center">
                  <li className="flex items-center text-white text-base gap-2"><span>💻</span> Product design</li>
                  <li className="flex items-center text-white text-base gap-2"><span>🎨</span> Full-Stack Development</li>
                  <li className="flex items-center text-white text-base gap-2"><span>🤝</span> Side Projects & Collaborations</li>
                  <li className="flex items-center text-white text-base gap-2"><span>💼</span> Freelance Work</li>

                </ul>
                <div className="flex flex-col items-center mt-2 mb-0">
                  <div className="relative flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                    <Orb
                      hoverIntensity={0.5}
                      rotateOnHover={true}
                      hue={0}
                      forceHoverState={false}
                    />
                            <span className="pointer-events-none animate-bounce bg-[#181028] rounded-full flex items-center justify-center absolute top-1/3 left-1/3 transform -translate-x-1/3 -translate-y-1/3" style={{ width: '24px', height: '24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#763CAC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </span>
                  </div>
                  <a href="./Sneha_resume_ml_updated.pdf" download className="px-6 py-3 rounded-full bg-[#763CAC] text-white font-bold shadow-lg hover:bg-white hover:text-[#763CAC] transition flex items-center gap-2 mt-4 self-center">
                    <span className="text-xl">Resume</span>
                  </a>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Footer */}
      <footer className="w-full py-6 px-4 md:px-8 text-white/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-6 md:gap-y-0">
          {/* Left: Name and Copyright */}
          <div className="text-center md:text-left">
            <FadeContent blur={false} duration={1500} easing="ease-in-out" initialOpacity={0}>
              <h3 className="text-3xl font-bold text-white mb-2">
                SNEHA VENKATESH 🤍
              </h3>
            </FadeContent>
            <p className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>

          {/* Right: Animation Video */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            <video
              ref={videoRef}
              src="/animated.mp4"
              loop
              muted
              playsInline
              className="w-full h-full object-contain" style={{ mixBlendMode: 'screen' }}
            />
          </div>
        </div>
      </footer>

{/* Custom Cursor */}
<motion.div
  className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
  variants={{
    default: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    project: {
      opacity: 1,
      scale: 1,
      x: mousePosition.x - 65, // half of 130
      y: mousePosition.y - 65,
      width: 100, // reduced size
      height: 100, // reduced size
      backgroundColor: "rgba(113, 39, 186, 0.2)",
    },
  }}
  animate={cursorVariant}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
  style={{
    borderRadius: "50%",
    backdropFilter: cursorVariant === "project" ? "blur(8px)" : "none",
  }}
>
  <AnimatePresence>
    {cursorVariant === "project" && (
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Circular text with more spacing */}
        <CircularText
          text="VIEW DETAILS • VIEW DETAILS • "
          spinDuration={10}
          className="circular-text-md circular-text-thin tracking-[0.25em]" 
        />

        {/* Centered Eye */}
        <Eye
          className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size={28} // slightly smaller for balance
        />
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
    </div>
  );
}
