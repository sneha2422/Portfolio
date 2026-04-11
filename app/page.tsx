"use client"

import React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// TestimonialCarousel component for animated testimonial carousel
function TestimonialCarousel({ testimonials }: { testimonials: { quote: string, author: string, role: string, emoji: string }[] }) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  useEffect(() => {
    const timer = setTimeout(next, 4000);
    return () => clearTimeout(timer);
  }, [current, testimonials.length]);
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full flex justify-center items-center">
        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="p-2 rounded-full bg-[#181028] hover:bg-[#7127BA] transition-colors text-white mr-2 shadow-md"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#181028] rounded-2xl shadow-xl border border-white/10 px-8 py-8 max-w-md w-full text-center flex flex-col items-center gap-3"
            style={{ minHeight: 150 }}
          >
            <span className="text-3xl mb-2">{testimonials[current].emoji}</span>
            <p className="text-white text-lg font-medium mb-2">“{testimonials[current].quote}”</p>
            <span className="text-[#B6B8D6] text-sm font-semibold">— {testimonials[current].author}{testimonials[current].role ? `, ${testimonials[current].role}` : ''}</span>
          </motion.div>
        </AnimatePresence>
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="p-2 rounded-full bg-[#181028] hover:bg-[#7127BA] transition-colors text-white ml-2 shadow-md"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4 justify-center">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === current ? 'bg-gradient-to-r from-[#7127BA] to-[#B18CFE] shadow-lg' : 'bg-[#40305A]'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
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
  const [activeCategory, setActiveCategory] = useState('Full Stack');

  const projectsData = [
    {
      title: "SpendSmart — Sprout",
      description: "• Designed a minimal finance app for Gen-Z students who overspend and under-save — addressing the emotional and behavioral root causes, not just data tracking.\n\n" +
      "• Key differentiators: Money Journal (emotion-tagged spending to build self-awareness), Vault (goal-locked savings), and gamified habits — features no competitor combines in a student-friendly UI.\n\n" +
      "• Conducted competitive analysis against Walnut, YNAB, and Splitwise; identified a clear white space around journaling + vault saving + habit tracking for students aged 18–26.\n\n" +
      "• Outcome: 91% of task completion rate across all 8 screens in usability testing; 64% of testers reported the Journal feature changed their spending mindset.",
      image: "/spend-smart.png", // Placeholder image
      video: "/case-study.mp4",
      link: "#", // Placeholder link
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
    { label: "Projects", href: "#projects" },
    { label: "Tech Stacks", href: "#tech-stack" },
    { label: "About", href: "#about" },
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
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#11071F" }}>
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

          {/* Gooey Navigation Container - Single animation per session */}
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
        </nav>
      </FadeContent>

      <div id="home" className="flex relative">
        {/* New Social Media Sidebar - only in hero section, not fixed */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="relative flex flex-col items-center justify-center space-y-6 px-7 py-8">           
           {/* Social Media Icons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-11 -mt-12 ml-4">
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
                    className="relative w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    {social.id === "behance" ? (
                      <span className="text-base font-bold" style={{ color: social.color }}>
                        Be
                      </span>
                    ) : IconComponent ? (
                      <IconComponent size={22} style={{ color: social.color }} />
                    ) : null}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
        {/* End Social Media Sidebar */}

        {/* Main Content - Centered Container */}
        <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center relative">
          {/* Arrow Pointer - positioned with tail next to H in Hello */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-40 -translate-y-28 z-20">
            <div className="relative">
              {/* Glowing background layer */}
              <div className="absolute inset-0 pulsing-glow">
                <Image
                  src="/arrow-pointer.png"
                  alt="Arrow Glow"
                  width={100}
                  height={100}
                  className="object-contain opacity-40 blur-sm"
                />
              </div>
              {/* Main arrow with color effects */}
              <Image
                src="/arrow-pointer.png"
                alt="Arrow Pointer"
                width={100}
                height={100}
                className="object-contain relative z-10 arrow-effects"
              />
            </div>
          </div>

          {/* Centered Bitmoji and Text */}
          <div className="flex flex-row items-center justify-center max-w-2xl mx-auto space-x-16">
            {/* Bitmoji */}
            <div className="relative flex items-center justify-center w-64 h-64">
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
                className="relative z-10 flex items-center justify-center w-60 h-60 cursor-grab active:cursor-grabbing"
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
            <div className="space-y-6 max-w-md relative flex flex-col items-start ml-4">
              <div className="space-y-2 flex flex-col items-start">
                <p
                  className="text-white text-left"
                  style={{ fontFamily: "Jua, sans-serif", fontSize: "24px", fontWeight: "normal" }}
                >
                  Hello! I am <span style={{ color: "#7127BA" }}>Sneha Venkatesh</span>
                </p>

                {/* Developer. Designer. with BlurText animation - forced on same line */}
                <div className="text-white leading-tight whitespace-nowrap text-left" style={{ fontFamily: "Kantumruy, sans-serif", fontSize: "48px", fontWeight: "normal" }}>
                  <BlurText text="Product Designer." delay={150} animateBy="words" direction="top" loop={true} loopDelay={6000} />
                </div>

                {/* AI Agent Builder with Oval Vector Background and BlurText animation */}
                <div className="relative flex flex-col items-start">
                  <Image src="/oval-vector.png" alt="Oval Vector" width={400} height={100} className="absolute -left-4 -top-12 object-contain opacity-70" />
                  <div className="relative z-10 leading-tight text-left" style={{ fontFamily: "Kantumruy, sans-serif", fontSize: "48px", fontWeight: "normal" }}>
                    <BlurText
                      text="Full-Stack Developer"
                      delay={200}
                      animateBy="words"
                      direction="bottom"
                      loop={true}
                      loopDelay={6000}
                      style={{
                        background: "linear-gradient(to right, #763CAC, #320F85)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    />
                  </div>
                </div>
              </div>
              <p
                className="text-gray-300 leading-relaxed text-left"
                style={{ fontFamily: "Jua, sans-serif", fontSize: "24px", fontWeight: "normal" }}
              >
                Turning Ideas into smart, beautiful, and functional realities
              </p>
            </div>
          </div>
        </div>
      </div>

{/* MagicBento Section */}
<section
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


{/* Projects Section */}
<section id="projects" className="w-full flex flex-col items-center py-20 px-4" style={{ backgroundColor: '#11071F' }}>
  <div className="text-center mb-4">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Jua, sans-serif' }}>
    🚀 Projects
    </h2>
  </div>

  {/* Project Category Navigation */}
  <div className="flex justify-center gap-48 mt-8 mb-16">
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
    <button
      className={`text-lg font-medium transition-all duration-300 uppercase tracking-wider pb-1 ${
        activeCategory === 'AI/ML' ? 'text-white border-b-2 border-[#7127BA]' : 'text-white/60 hover:text-white'
      }`}
      onClick={() => setActiveCategory('AI/ML')}
    >
      AI/ML
    </button>
  </div>

  <div className="w-full max-w-6xl mx-auto flex flex-col">
    {filteredProjects.map((project, index) => (
      <React.Fragment key={index}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-x-12 gap-y-6">
          {/* Left: Project Number */}
          <div className="text-8xl font-black text-white/10 -mt-2" style={{ fontFamily: 'Jua, sans-serif' }}>
            0{index + 1}
          </div>

          {/* Right: Project Content */}
          <div className="flex flex-col gap-8 md:-mt-2">
            {/* Media (Video/Image) */}
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-2xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-[#7127BA] transition-all duration-500 ease-in-out transform hover:-translate-y-2 h-[36rem] cursor-none"
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
  {/* Push image below heading */}
  <div className="flex justify-center">
    <Image
      src="/Tech.png"
      alt="Tech Stack Section"
      width={1200}
      height={100}
      className="object-contain"
      style={{
        maxWidth: "90vw",
        height: "auto",
      }}
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
          width: '100vw',
          height: '220px',
          transform: 'translateY(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 1920 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,160 Q960,480 1920,160 L1920,320 L0,320 Z" fill="url(#purpleGradient)" />
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="1920" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7127BA" />
                <stop offset="1" stopColor="#B18CFE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* CurvedLoop text */}
        <div className="w-full flex items-center justify-center relative z-10" style={{ minHeight: '100px' }}>
          <CurvedLoop
            marqueeText="AI integration with v0 ✦ Figma ✦ Lovable ✦ Cursor ✦ Node.js ✦ React ✦ AutoGen ✦ Type Script ✦ Java Script ✦ Design Ideology ✦ Agile Methodologies  ✦ AI/ML Fundamentals ✦ User Research ✦ Ui/Ux Principles ✦ Cross Functional Collabration ✦"
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
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-[550px]">
            <StarBorder color="#40305A" speed="3s" thickness={1.5} className="w-full max-w-xl py-4">
              <DecryptedText
                text="I'm that person who actually enjoys wrestling with user insights and refining the design hypothesis until 2 am—because I know the 'aha!' moment is coming."
                animateOn="hover"
                className="text-white text-[20px] font-sans text-center leading-snug mb-2"
                parentClassName="w-full"
                encryptedClassName="text-white"
              />
              <ShinyText text="Right now, I'm deep in the world of Computer Science, juggling User Research, curiosity, and a rotation of coffee by day and cocktails by night , I view the world as a place where imagination meets implementation, and I'm the Conductor who makes the whole show sing!." speed={4} className="text-[16px] text-center leading-snug" />
              <ShinyText text="For me, design isn't just about making things look good—it's about telling a story. Every project is a chance to blend art and technology, crafting digital experiences that people don't just use, but remember. And when a design finally comes alive as a whole Product? That's when the real magic happens—think 'abracadabra, alakazam!' and suddenly, your ideas leap off the screen. It's the kind of moment that makes you grin at your laptop and wonder if you just cast a spell." speed={4.5} className="text-[16px] text-center leading-snug" />
              <ShinyText text="My natural ability to lead and organize—from running student bodies to managing events—is my baseline for Stakeholder Management and Cross-Functional Leadership.I combine this with a Data-Driven Strategy mindset, using Analytics and A/B testing like magic wands to transform complex user pain points into elegant, valuable product solutions. " speed={5} className="text-[16px] text-center leading-snug" />
              <ShinyText text="Curiosity keeps me experimenting, learning, and always up for a new challenge. If you're into blending ideas, building unforgettable things, and sharing a laugh or two along the way, let's connect." speed={5.5} className="text-[16px] text-center leading-snug" />
            </StarBorder>
          </div>
          {/* Right: Profile Card */}
          <div className="flex justify-center md:justify-start items-center w-full md:w-1/3 md:-ml-8 h-[550px]">
            <ProfileCard
              name="Sneha Venkatesh"
              title="Product Designer. Full-Stack Developer"
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
        <div className="relative flex flex-col items-center w-full max-w-3xl mx-auto" style={{minHeight: '700px'}}>
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B18CFE] via-[#7127BA] to-[#763CAC] opacity-70 rounded-full -translate-x-1/2 z-0" style={{ minHeight: '100%' }} />

          {/* 1. SIH Hackathon (Left) */}
          <div className="flex w-full justify-start mb-16 relative z-10 items-center">
            <div className="relative flex flex-col items-end w-1/2 pr-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Top 7 Finalist – SIH Round 1</span>
                  <p className="text-[#B6B8D6] text-sm">Selected from 540+ teams for building an AI-powered solution with clean UX & strong backend.</p>
    </div>
              </StarBorder>
              {/* Emoji marker absolutely centered to card */}
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
            <div className="w-1/2" />
          </div>
          {/* 2. android club (Right) */}
          <div className="flex w-full justify-end mb-16 relative z-10 items-center">
            <div className="w-1/2" />
            <div className="relative flex flex-col items-start w-1/2 pl-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Android Club</span>
                  <p className="text-[#B6B8D6] text-sm">Conducted and managed "Hack-n-Droid," a record-breaking university event with 267 teams (including 73 external teams
                    handled event management and served as part of the design team.</p>
                </div>
              </StarBorder>
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
          {/* 3. CyberTeam Lead (Left) */}
          <div className="flex w-full justify-start mb-16 relative z-10 items-center">
            <div className="relative flex flex-col items-end w-1/2 pr-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Merchandise Volunteer, VIT Vibrance 2025</span>
                  <p className="text-[#B6B8D6] text-sm">Managed merchandise logistics and contributed to the successful execution of VIT's largest annual festival.</p>
                </div>
              </StarBorder>
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
            <div className="w-1/2" />
          </div>
          {/* 4. NGO Volunteer (Right) */}
          <div className="flex w-full justify-end mb-0 relative z-10 items-center">
            <div className="w-1/2" />
            <div className="relative flex flex-col items-start w-1/2 pl-8 justify-center">
              <StarBorder color="#763CAC" speed="3s" thickness={1.5} className="w-full max-w-xs gsap-card">
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-white font-semibold text-lg mb-1">Professional Event Host & Master of Ceremonies</span>
                  <p className="text-[#B6B8D6] text-sm">Building on a passion for the stage since childhood, I have successfully hosted numerous high-profile events and earned media recognition in multiple languages for my public speaking expertise..</p>
                </div>
              </StarBorder>
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
      <section id="testimonial" className="w-full flex flex-col items-center py-20 px-2" style={{ backgroundColor: '#11071F' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
          💬Testimonials
        </h2>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-xl mx-auto relative">

            {/* Carousel container */}
            <TestimonialCarousel testimonials={[
              {
                quote: "Working with Sneha as a Product Designer was an absolute pleasure. She brought creativity, dedication, and a collaborative spirit to the table, making the whole process seamless and enjoyable. Her attention to detail and problem-solving abilities truly stood out..",
                author: "Trisha Mani ",
                role: "Design Duh,Lead",
                emoji: "💬"
              },
              {
                quote: "Sneha worked with us at Altacee, contributing to the design and development of modern web solutions while demonstrating a strong sense of ownership and creativity. She has a sharp eye for detail, a solid understanding of UI/UX principles, and the ability to translate ideas into practical, user-focused products. Sneha’s proactive approach, adaptability, and leadership potential make her someone who can add real value to any team she works with.",
                author: "Aditya Kushwaha",
                role: "Founder of Atlacee",
                emoji: "💬"
              },
              {
                quote: "Sneha interned with AIKO Technologies in 2025, with the responsibility of designing and revamping current UI-UX on AIKO’s Generative AI Social Networking Apps, and Bulk-Image Generator website."+
                        "Sneha is a talented, intelligent, and highly motivated individual with a flexible yet strong understanding of organizational requirements. At AIKO, we also had the opportunity to see her qualities of leadership when Sneha undertook UI/UX design responsibility — her voice is strong, and we are confident that leadership is a strong suit of Sneha’s that can be beneficial to any organization that she may be active with.",
                author: "Soham pal",
                role: "DIRECTOR of AIKO TECHNOLOGY PVT LTD",
                emoji: "💬"
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Side-by-Side Contact & Vertical Resume Section */}
      <section id="contact" className="w-full flex flex-col items-center py-20 px-2" style={{ backgroundColor: '#11071F' }}>
        {/* Main Heading and Subheading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
        🤝 Let's Connect
        </h2>
        <p className="text-lg md:text-xl text-white/80 text-center mb-8 max-w-2xl" style={{ fontFamily: 'inherit' }}>
          If you’d like to work together or have a project in mind, I’d love to hear from you!
        </p>
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-end bg-transparent rounded-2xl shadow-none">
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
                  <a href="./Product_design_dev_sneha.pdf" download className="px-6 py-3 rounded-full bg-[#763CAC] text-white font-bold shadow-lg hover:bg-white hover:text-[#763CAC] transition flex items-center gap-2 mt-4 self-center">
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
