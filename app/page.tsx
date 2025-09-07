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
  const [clickedIcon, setClickedIcon] = useState<string | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const [thankYou, setThankYou] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const projectsData = [
    {
      title: "Ai Your Ranking Super Power ",
      description: "Designed an intuitive and visually engaging SEO dashboard in Figma to simplify digital marketing workflows. The Project highlights key features such as user-friendly navigation, content evaluation, link optimization, visual reports, smart keyword generation, automated alerts, and competitor analysis. The design focuses on clarity, usability, and modern aesthetics, ensuring marketers can track and optimize SEO performance efficiently.",
      image: "/image_1.png",
      link: "https://www.behance.net/gallery/209632955/AI-SUPER-POWER",
      techTags: [
        { name: "Figma"},
        { name: "Ui/Ux Design" },
        { name: "Prototyping" },
        { name: "WireFraming" },
        { name: "Visual Design" },
      
      ],
    },
    {
      title: "TravelMate",
      description:
        "TravelMate was built with a simple mission: to make travel safer, more social, and more enjoyable for everyone. In a world where solo travel is increasingly popular, we recognized the need for a platform that connects like-minded travelers." +
        "With the rise of solo travel trends, especially among young adults and digital nomads, we identified three key challenges: safety concerns, complex planning, and the desire for authentic connections." +
        "TravelMate solves these problems by creating a secure community of verified travelers, simplifying trip planning with collaborative tools, and facilitating meaningful connections between people who share a passion for exploration.",
      image: "/image_2.png",
      link: "https://v0-travelmate-website.vercel.app/",
      techTags: [
        { name: "React" },
        { name: "Node.js (JavaScript)" },
        { name: "Figma" },
        { name: "UI/UX Design" },
        { name: "Prototyping" },
        { name: "Wireframing" },
        { name: "Visual Design" }
      ],      
    },
    {
      title: "Breast Cancer Classification using Deep Learning (BreakHis Dataset)",
      description: "I developed a deep learning project on Breast Cancer Classification using the BreakHis " +
      "histopathological image dataset, aiming to distinguish between benign and malignant tumor samples. "+
      "The dataset included over 7,900 images across multiple magnification levels (40X, 100X, 200X, 400X), "+
      "introducing challenges in feature extraction and generalization. I implemented and compared multiple "+
      "architectures—ResNet50, VGG16, MobileNetV2, Vision Transformer (ViT), and a custom CNN—and evaluated "+
      "them using metrics such as accuracy, precision, recall, F1-score, Grad-CAM, and SHAP analysis. "+
      "Results showed that ViT achieved the highest accuracy (93.4%), while MobileNetV2 provided an efficient "+
      "lightweight alternative, and the custom CNN performed competitively. The project highlights the " +
      "complementary strengths of CNN- and transformer-based models, offering valuable insights into building "+
      "robust, automated diagnostic tools for breast cancer detection.",
      image: "/project-3.png", // Assuming you have project-3.png
      link: "https://github.com/sneha2422/BREAST-CANCER-CLASSIFICATION-USING-DEEP-LEARNING-MODELS/tree/main",
      techTags: [
        { name: "Python" },
        { name: "PyTorch" },
        { name: "NumPy" },
        { name: "Pandas" },
        { name: "Vision Transformer (ViT)" },
        { name: "Scikit-learn" },
        { name: "CNN" },
        { name: "Matplotlib" },
        { name: "Grad-CAM" },
        { name: "SHAP" },
        { name: "ResNet50" },
        { name: "VGG16" },
        { name: "MobileNetV2" },
       
      ],
    },
    {
      title: "Credit Card Fraud Detection",
      description: "This project focuses on building a robust credit card fraud detection system using machine learning." +
        "It addresses the challenge of a highly imbalanced dataset by employing **undersampling** to create a balanced training environment." +
        "The final model, a fine-tuned XGBoost classifier, was able to effectively detect fraudulent transactions." +
        "Its performance was validated through key metrics like F1-Score and a confusion matrix, which showed strong results in minimizing false negatives.",
      image: "/project-4.png",
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
    },
  ]

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

  const handleSocialClick = (socialId: string, url: string) => {
    setClickedIcon(socialId)

    // Reset the clicked state after animation
    setTimeout(() => {
      setClickedIcon(null)
    }, 600)

    // Open the social media link
    window.open(url, "_blank", "noopener,noreferrer")
  }

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
        <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative flex flex-col items-center justify-center space-y-6 px-7 py-8">            {/* Social Media Icons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-11 -mt-12">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                const isClicked = clickedIcon === social.id

                return (
                  <motion.div
                    key={social.id}
                    className="relative cursor-pointer"
                    onClick={() => handleSocialClick(social.id, social.url)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      isClicked
                        ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, 10, -10, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Glow Effect */}
                    {isClicked && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${social.color}40 0%, ${social.color}20 50%, transparent 70%)`,
                          filter: "blur(8px)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 3, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    {/* Icon Container */}
                    <div
                      className={`relative w-12 h-12 rounded-full flex  items-center justify-center transition-all duration-300 ${
                        isClicked ? "shadow-lg" : "hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: isClicked ? social.color : "transperent",
                        boxShadow: isClicked ? `0 0 20px ${social.color}60` : "none",
                      }}
                    >
                      {social.id === "behance" ? (
                        <span className="text-base font-bold flex flex-col items-center justify-center w-12 h-12" style={{ color: isClicked ? "white" : social.color }}>
                          Be
                        </span>
                      ) : IconComponent ? (
                        <span className="flex flex-col items-center justify-center w-12 h-12">
                          <IconComponent size={22} style={{ color: isClicked ? "white" : social.color }} />
                        </span>
                      ) : null}
                    </div>

                    {/* Popup Label */}
                    {isClicked && (
                      <motion.div
                        className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {social.name}
                      </motion.div>
                    )}
                  </motion.div>
                )
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
                  <BlurText text="Designer. Developer." delay={150} animateBy="words" direction="top" loop={true} loopDelay={6000} />
                </div>

                {/* AI Agent Builder with Oval Vector Background and BlurText animation */}
                <div className="relative flex flex-col items-start">
                  <Image src="/oval-vector.png" alt="Oval Vector" width={400} height={100} className="absolute -left-4 -top-12 object-contain opacity-70" />
                  <div className="relative z-10 leading-tight text-left" style={{ fontFamily: "Kantumruy, sans-serif", fontSize: "48px", fontWeight: "normal" }}>
                    <BlurText
                      text="AI Agent Builder."
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
    className="text-3xl md:text-4xl font-bold text-white mb-16 text-center w-full"
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
  <div className="text-center mb-20">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Jua, sans-serif' }}>
    🚀 Projects
    </h2>
    <p className="text-lg text-white/70" style={{ fontFamily: 'inherit' }}>
      Selected Projects (4)
    </p>
  </div>

  <div className="w-full max-w-6xl mx-auto flex flex-col">
    {projectsData.map((project, index) => (
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
              {index === 0 ? (
                <video src="/AI_video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : index === 1 ? (
                <video src="/Travel_video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : index === 2 ? (
                <video src="/Break_his_video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : index === 3 ? (
                <video src="/credit_card_fraud_detection.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
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
            <p className="text-white/80 leading-relaxed text-base min-h-[8rem]">{project.description}</p>
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
        {index < projectsData.length - 1 && (
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#a259f7]/90 to-transparent my-20"></div>
        )}
      </React.Fragment>
    ))}
  </div>
</section>


{/* Tech Stack Section */}
<section id="tech-stack" className="w-full flex flex-col items-center pt-20 pb-0 relative" style={{ backgroundColor: '#11071F' }}>
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center w-full" 
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
            marqueeText="AI integration with v0 ✦ Bolt ✦ Lovable ✦ Cursor ✦ AI agent building using LangChain ✦ CrewAI ✦ AutoGen ✦ Botpress ✦ AI integration with v0 ✦ Bolt ✦ Lovable ✦ Cursor ✦ AI agent building using LangChain ✦ CrewAI ✦ AutoGen ✦ Botpress ✦"
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
            <StarBorder color="#40305A" speed="3s" thickness={1.5} className="w-full max-w-xl">
              <DecryptedText
                text="I'm that person who actually enjoys getting stuck on a bug at 2am—because I know the 'aha!' moment is coming."
                animateOn="hover"
                className="text-white text-[20px] font-sans text-center leading-snug mb-2"
                parentClassName="w-full"
                encryptedClassName="text-white"
              />
              <ShinyText text="Right now, I'm deep in the world of Computer Science, juggling code, curiosity, and a rotation of coffee by day and cocktails by night as I build, break, and rebuild everything from web apps to wild side projects." speed={4} className="text-[16px] text-center leading-snug" />
              <ShinyText text="For me, design isn't just about making things look good—it's about telling a story. Every project is a chance to blend art and technology, crafting digital experiences that people don't just use, but remember. And when a design finally comes alive through development? That's when the real magic happens—think 'abracadabra, alakazam!' and suddenly, your ideas leap off the screen. It's the kind of moment that makes you grin at your laptop and wonder if you just cast a spell." speed={4.5} className="text-[16px] text-center leading-snug" />
              <ShinyText text="Lately, I've been diving headfirst into the world of AI, building agents and experimenting with new ways to make technology smarter, more creative, and a lot more fun. I love exploring how AI can turn wild ideas into reality and make both work and life a little easier (and a lot more interesting)." speed={5} className="text-[16px] text-center leading-snug" />
              <ShinyText text="Curiosity keeps me experimenting, learning, and always up for a new challenge. If you're into blending ideas, building unforgettable things, and sharing a laugh or two along the way, let's connect." speed={5.5} className="text-[16px] text-center leading-snug" />
            </StarBorder>
          </div>
          {/* Right: Profile Card */}
          <div className="flex justify-center md:justify-start items-center w-full md:w-1/3 md:-ml-8 h-[550px]">
            <ProfileCard
              name="Sneha Venkatesh"
              title="Developer.Designer.Ai.Agent Builder "
              handle="sneha2422"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/profile-picture.jpg"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=snehavenkatesh14@gmail.com', '_blank', 'noopener,noreferrer')}
              behindGradient={undefined}
              innerGradient={undefined}
              miniAvatarUrl="/profile-picture.jpg"
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
          💬Testimonials
        </h2>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-xl mx-auto relative">

            {/* Carousel container */}
            <TestimonialCarousel testimonials={[
              {
                quote: "Working with Sneha as a Product Designer was an absolute pleasure. She brought creativity, dedication, and a collaborative spirit to the table, making the whole process seamless and enjoyable. Her attention to detail and problem-solving abilities truly stood out..",
                author: "Trisha",
                role: "Design Duh,Lead",
                emoji: "💬"
              },
              {
                quote: "Working with Sneha as a Product Designer was an absolute pleasure. She brought creativity, dedication, and a collaborative spirit to the table, making the whole process seamless and enjoyable. Her attention to detail and problem-solving abilities truly stood out..",
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center w-full" style={{ fontFamily: 'Jua, sans-serif', letterSpacing: '0.01em' }}>
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
                  <li className="flex items-center text-white text-base gap-2"><span>💻</span> Developer Roles</li>
                  <li className="flex items-center text-white text-base gap-2"><span>🎨</span> Design Internships</li>
                  <li className="flex items-center text-white text-base gap-2"><span>🤝</span> Side Projects & Collaborations</li>
                  <li className="flex items-center text-white text-base gap-2"><span>💼</span> Freelance UI/UX Work</li>
                  <li className="flex items-center text-white text-base gap-2"><span>🤖</span> AI Agent Building</li>
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
                  <a href="./sneha_venkatesh_resume.pdf" download className="px-6 py-3 rounded-full bg-[#763CAC] text-white font-bold shadow-lg hover:bg-white hover:text-[#763CAC] transition flex items-center gap-2 mt-4 self-center">
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
