"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import {
  ArrowRight,
  GitlabIcon as GitHub,
  Linkedin,
  Send,
  Download,
  ExternalLink,
  SendIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { TypeAnimation } from "react-type-animation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const headerRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the form data to our API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Show success message
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      // Show error message
      toast({
        title: "Error sending message",
        description:
          error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: "JavaScript", level: 99 },
    { name: "TypeScript", level: 99 },
    { name: "React", level: 96 },
    { name: "Next.js", level: 96 },
    { name: "GSAP/Framer Motion", level: 96 },
    { name: "CSS/Tailwind", level: 96 },
    { name: "Supabase", level: 93 },
    { name: "Node.js", level: 85 },
    { name: "Database Management", level: 82 },
    { name: "SaaS Development", level: 82 },
    { name: "Generative AI", level: 80 },
    { name: "DevOps", level: 78 },
  ];

  const projects = [
    {
      title: "Yolo Health (Healthcare)",
      description:
        "Yolohealth is an online platform focused on enhancing wellness in people's lives through collaboration.",
      tags: [
        "Healthcare",
        "Next.js",
        "TailwindCSS",
        "Supabase",
        "Python",
        "FastAPI",
        "Google Cloud Platform",
      ],
      image: "/yolo/2.png",
      screenshots: ["/yolo/2.png", "/yolo/3.png", "/yolo/1.png"],
      link: "https://yolohealth.app/",
      longDescription:
        "Yolohealth is an online platform focused on enhancing wellness in people's lives through collaboration. You can join various communities dedicated to weight loss, nutrition, GLP-1 medication, and healthcare. Share and celebrate achievements with other members, and even create your own community",
    },
    {
      title: "FairPrice (Ecommerce)",
      description:
        "FairPrice Online is the e-commerce portal of NTUC Fairprice Co-operative Ltd, Singapore's largest grocery retailer.",
      tags: [
        "Next.js",
        "Styled Components",
        "SASS",
        "Node.js",
        "Express.js",
        "Amazon Web Service",
        "Stripe",
      ],
      image: "/fairprice/6.png",
      screenshots: [
        "/fairprice/0.png",
        "/fairprice/1.png",
        "/fairprice/2.png",
        "/fairprice/3.png",
        "/fairprice/4.png",
        "/fairprice/5.png",
        "/fairprice/6.png",
        "/fairprice/7.png",
        "/fairprice/8.png",
        "/fairprice/9.png",
      ],
      link: "https://www.fairprice.com.sg/",
      longDescription:
        "FairPrice Online is the e-commerce portal of NTUC Fairprice Co-operative Ltd, Singapore's largest grocery retailer. With FairPrice Online, you can shop for a wide range of your household needs – from fresh produce to quality wines, and home care essentials to baby products and have them delivered to your door.",
    },
    {
      title: "Breakout.LA (Ecommerce)",
      description:
        "BreakoutLA is a consignment store in Los Angeles. We are creating an inventory management system, a seller portal, and buyer portal for them.",
      tags: [
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Python",
        "FastAPI",
        "Docker",
        "Amazon Web Services",
        "PostgreSQL",
        "Stripe",
      ],
      image: "/breakout/1.png",
      screenshots: ["/breakout/1.png", "/breakout/1.png", "/breakout/1.png"],
      link: "https://breakout.la/home",
      longDescription: `
        BreakoutLA is a consignment store in Los Angeles. We are creating an inventory management system, a seller portal, and buyer portal for them.
        
        Inventory Management System for Breakout.LA:
        - Feature Overview:
        * Real-time Inventory Tracking: Allows tracking of each item from consignment to sale.
        * Automated Stock Alerts: Sends notifications when items are low in stock or sold out.

        - User Interface:
        * Dashboard showing current stock levels, recent transactions, and performance metrics.
        * Easy-to-navigate menus for adding new items, setting prices, and viewing sales history.`,
    },
    {
      title: "Vengo AI (Ai Agents)",
      description:
        "Vengo AI is a fully customizable AI sales tool that helps you capture more sales leads, follow up with customers, and earn more revenue.",
      tags: [
        "Next.js",
        "Python",
        "Django",
        "Generative AI",
        "Natural Language Processing",
        "Large Language Model",
      ],
      image: "/vengoai/2.png",
      screenshots: [
        "/vengoai/1.png",
        "/vengoai/2.png",
        "/vengoai/3.png",
        "/vengoai/4.png",
      ],
      link: "https://vengoai.com/",
      longDescription:
        "Vengo AI is a cutting-edge digital companion platform combating loneliness and supporting mental well-being. It offers empathetic, judgment-free AI personas that users can create and monetize. The platform features sophisticated natural language processing, real-time conversation capabilities, and an innovative creator economy system.",
    },
    {
      title: "Aries (Trading Platform)",
      description:
        "Aries is a research, analytics, and trading platform bridging the gap between Wall Street and thousands of retail traders in 130 countries.",
      tags: [
        "Vue.js",
        "TailwindCSS",
        "Trading View",
        "Go",
        "Redis",
        "Tradestation",
      ],
      image: "/aries/1.png",
      screenshots: ["/aries/1.png", "/aries/2.png"],
      link: "https://aries.com/",
      longDescription:
        "Aries offers customers a full service trading experience with access to a range of asset classes including stocks, options, index options, futures and ETFs with the best execution possible at the most competitive prices",
    },
  ];

  return (
    <div className="relative min-h-dvh bg-gradient-to-br from-background to-background overflow-hidden">
      <Analytics />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 backdrop-blur-sm bg-background/80 border-b border-border/40"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
          >
            Maksym Sysoiev
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-6"
          >
            {[
              { name: "About", ref: aboutRef },
              { name: "Skills", ref: skillsRef },
              { name: "Projects", ref: projectsRef },
              { name: "Contact", ref: contactRef },
            ].map((item, index) => (
              <Link
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                onClick={(e) => {
                  e.preventDefault();
                  item.ref.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Link
              href="https://github.com/javajoker0919"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://t.me/incrediblereis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Telegram</span>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="container py-24">
          <div className="grid items-center">
            <motion.div style={{ opacity, scale }} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-sm font-medium text-purple-600 dark:text-purple-300"
              >
                Senior Full Stack Developer
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 inline-block min-w-64 py-2">
                  <TypeAnimation
                    sequence={[
                      "Maksym Sysoiev",
                      2000,
                      "Frontend Engineer",
                      2000,
                      "Backend Engineer",
                      2000,
                      "Animation Talent",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                  />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-md"
              >
                Crafting exceptional digital experiences with 9 years of
                expertise in full stack development.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    onClick={() =>
                      contactRef.current?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-purple-500/20 hover:bg-purple-500/10"
                    onClick={() =>
                      projectsRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    View my work
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center items-start p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="w-1 h-1 rounded-full bg-muted-foreground"
            />
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground mb-6">
              With 9 years of experience in full stack development, I've helped
              businesses transform their digital presence through innovative
              solutions and clean, efficient code.
            </p>
            <p className="text-lg text-muted-foreground">
              I specialize in building scalable web applications using modern
              technologies like React, Next.js, Node.js, and various database
              systems. My approach combines technical expertise with a keen eye
              for design and user experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                description:
                  "Creating responsive, accessible, and performant user interfaces with modern frameworks.",
                icon: "🎨",
              },
              {
                title: "Backend Engineering",
                description:
                  "Building robust APIs, services, and database architectures that scale.",
                icon: "⚙️",
              },
              {
                title: "DevOps & Deployment",
                description:
                  "Implementing CI/CD pipelines and cloud infrastructure for seamless delivery.",
                icon: "🚀",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience section */}
      <section id="experience" className="py-24 bg-muted/30 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground">
              My professional journey across various roles and companies.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 opacity-30"></div>

            {[
              {
                company: "Freelance",
                position: "Software Engineer",
                period: "2024 - 2025",
                location: "Worldwide",
                achievements: [
                  "Led the Development of AI MVPs: Played a key role in designing, developing and deploying innovative AI-based MVP products.",
                  "Full Stack Development: Managed DevOps and back-end development for various applications, ensuring seamless integration and high-quality performance across the board.",
                  "Build AI Engine including Image/Video Generation",
                  "Led the mobile app development using Flutter.",
                ],
                technologies: [
                  "Next.js",
                  "Flutter",
                  "Node.js",
                  "Express.js",
                  "TypeScript",
                  "GCP",
                  "Supabase",
                  "Generative AI",
                ],
                side: "right",
              },
              {
                company: "ELEKS",
                position: "Software Engineer",
                period: "2022 - 2024",
                location: "United Kingdom",
                achievements: [
                  "Led the development of a B2B AI-driven acoustics analysis application using ReactJS, TypeScript, Redux, and Material UI, which contributed to a 35% increase in sales by enhancing the product’s marketability. ",
                  "Collaborated with marketing teams to redesign the application, boosting user experience and brand consistency, leading to a 15% increase in positive customer feedback. ",
                  "Communicated with international teams to develop new features, ensuring quality through code reviews and UX design evaluations.",
                ],
                technologies: [
                  "React.js",
                  "Typescript",
                  "Redux",
                  "Material UI",
                  "Responsive Design",
                  "Team management",
                ],
                side: "left",
              },
              {
                company: "S&P Global",
                position: "Senior Full Stack Developer",
                period: "2019-2022",
                location: "United States",
                achievements: [
                  "Developed microservice-based APIs for a high-traffic e-commerce platform using Node.js, Nest.js, and PostgreSQL, which supported a 50% increase in transaction capacity during peak times. ",
                  "Implemented CI/CD pipelines and optimized databases for improved performance, reducing deployment times by 30%.",
                  "Designed and integrated third-party services, including payment gateways, enhancing functionality and user experience, resulting in a 25% increase in completed transactions.",
                ],
                technologies: [
                  "Node.js",
                  "Nest.js",
                  "PostgreSQL",
                  "WebSocket",
                  "Microservice",
                  "CI/CD",
                  "Docker",
                  "Kubernetes",
                ],
                side: "right",
              },
              {
                company: "Avant",
                position: "Frontend Developer",
                period: "2018 - 2019",
                location: "United States",
                achievements: [
                  "Developed a sophisticated system of React and Vue.js components, ensuring seamless  synchronization with APIs, which improved user experience and contributed to a 20% increase in user engagement. ",
                  "Developed robust REST APIs using Laravel and Node.js, demonstrating proficiency in complex backend functionalities",
                  "Collaborated with teams to design and implement intricate logic and thirdparty integrations, resulting in enhanced platform capabilities and a 10% increase in revenue.",
                ],
                technologies: [
                  "React",
                  "Vue.js",
                  "JavaScript",
                  "REST APIs",
                  "Pixel Perfect",
                  "Team collaboration",
                ],
                side: "left",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: job.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative mb-12 ${
                  job.side === "left"
                    ? "md:pr-12 md:ml-0 md:mr-auto"
                    : "md:pl-12 md:ml-auto md:mr-0"
                } w-full md:w-1/2 z-10`}
              >
                <div
                  className={`absolute top-6 md:top-0 ${
                    index % 2 === 0 ? "left-[-16px]" : "right-[-16px]"
                  } w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg md:shadow-none md:right-0 md:translate-x-1/2`}
                ></div>

                <motion.div
                  className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow duration-300 sticky top-0"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h3 className="text-xl font-bold">{job.position}</h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-sm mt-2 md:mt-0 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="font-medium text-lg">{job.company}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.location}
                    </div>
                  </div>

                  <div className="mb-4">
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section id="skills" ref={skillsRef} className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">My Skills</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground">
              I've honed my skills across the full development stack, allowing
              me to build complete solutions from concept to deployment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{skill.name}</h3>
                  <motion.span
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={projectsRef}
        className="py-24 bg-muted/30 relative"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground mb-8">
              Here are some of the projects I've worked on that showcase my
              skills and expertise.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {projects.map((project: any, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 h-full"
                whileHover={{
                  transition: { duration: 0.2 },
                  cursor: "pointer",
                }}
                key={index}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 object-center group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/80 to-blue-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Project
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" ref={contactRef} className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground">
                I'm currently available for freelance work and full-time
                positions. Let's build something amazing together!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-300">
                    📍
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Odemira, Beja, Portugal
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-300">
                    ✉️
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      webdev0505@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="font-medium mb-3">Connect with me</h4>
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href="https://github.com/javajoker0919"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-purple-500 transition-colors"
                    >
                      <GitHub className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  ></motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href="https://t.me/incrediblereis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-purple-500 transition-colors"
                    >
                      <SendIcon className="h-5 w-5" />
                      <span className="sr-only">Telegram</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="bg-card border-border focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="bg-card border-border focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    required
                    className="min-h-[120px] bg-card border-border focus-visible:ring-purple-500"
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-medium">
              © {new Date().getFullYear()} Maksym Sysoiev. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="max-w-3xl overflow-hidden">
          <DialogHeader className="w-full overflow-hidden">
            <DialogTitle className="text-2xl font-bold">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2 w-full">
              {selectedProject?.longDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6 w-full overflow-visible">
            {selectedProject?.screenshots && (
              <div className="relative rounded-lg pb-4 px-12">
                <Carousel>
                  <CarouselContent>
                    {selectedProject.screenshots.map(
                      (screenshot: string, index: number) => (
                        <CarouselItem key={index}>
                          <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                            <Image
                              src={screenshot || "/placeholder.svg"}
                              alt={`${selectedProject.title} screenshot ${
                                index + 1
                              }`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </CarouselItem>
                      )
                    )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedProject?.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  onClick={() => window.open(selectedProject?.link, "_blank")}
                >
                  Visit Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
