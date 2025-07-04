"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Mail,
  Linkedin,
  Code,
  Database,
  Wrench,
  GitBranch,
  BookOpen,
  Users,
  User,
  Briefcase,
  Settings,
  GraduationCap,
  Star,
  Moon,
  Sun,
  TrendingUp,
} from "lucide-react"

export default function CVPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("perfil")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    } else {
      // Default to dark mode
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["perfil", "experiencia", "habilidades", "aprendizaje", "formacion", "competencias", "contacto"]
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg z-50 border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/avatar.png" alt="Sofía Gamboa Navarro" className="h-10 sm:h-12 w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {[
              { id: "perfil", label: "Perfil" },
              { id: "experiencia", label: "Experiencia" },
              { id: "habilidades", label: "Habilidades" },
              { id: "aprendizaje", label: "Aprendizaje" },
              { id: "formacion", label: "Formación" },
              { id: "competencias", label: "Competencias" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contacto")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contacto
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? (
                <X size={20} className="text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu size={20} className="text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50">
            {[
              { id: "perfil", label: "Perfil" },
              { id: "experiencia", label: "Experiencia" },
              { id: "habilidades", label: "Habilidades" },
              { id: "aprendizaje", label: "Aprendizaje" },
              { id: "formacion", label: "Formación" },
              { id: "competencias", label: "Competencias" },
              { id: "contacto", label: "Contacto" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 sm:px-6 py-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-32 text-center relative overflow-hidden">
          {/* Tech Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-purple-50/30 to-pink-100/50 dark:from-indigo-900/20 dark:via-purple-900/10 dark:to-pink-900/20" />

          {/* Binary Code Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-xs font-mono text-slate-600 transform rotate-12">
              01001000 01100101 01101100 01101100 01101111
              <br />
              01010111 01101111 01110010 01101100 01100100
              <br />
              01000011 01101111 01100100 01100101
              <br />
            </div>
            <div className="absolute top-20 right-20 text-xs font-mono text-slate-600 transform -rotate-12">
              function developer() {"{"}
              <br />
              &nbsp;&nbsp;return "innovative";
              <br />
              {"}"}
            </div>
            <div className="absolute bottom-32 left-16 text-xs font-mono text-slate-600 transform rotate-6">
              &lt;html&gt;
              <br />
              &nbsp;&nbsp;&lt;body&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Hello World&lt;/h1&gt;
              <br />
              &nbsp;&nbsp;&lt;/body&gt;
              <br />
              &lt;/html&gt;
            </div>
            <div className="absolute bottom-20 right-10 text-xs font-mono text-slate-600 transform -rotate-6">
              SELECT * FROM skills
              <br />
              WHERE expertise = 'high'
              <br />
              ORDER BY experience DESC;
            </div>
            <div className="absolute top-1/2 left-5 text-xs font-mono text-slate-600 transform rotate-90">
              git commit -m "New features"
              <br />
              git push origin main
            </div>
            <div className="absolute top-1/3 right-5 text-xs font-mono text-slate-600 transform -rotate-90">
              npm install success
              <br />
              yarn build --production
            </div>
          </div>

          {/* Circuit Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
              {/* Circuit lines */}
              <path
                d="M100 100 L200 100 L200 200 L300 200"
                stroke="currentColor"
                strokeWidth="2"
                className="text-indigo-400"
              />
              <path
                d="M400 150 L500 150 L500 250 L600 250"
                stroke="currentColor"
                strokeWidth="2"
                className="text-purple-400"
              />
              <path
                d="M150 300 L250 300 L250 400 L350 400"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-400"
              />
              <path
                d="M500 350 L600 350 L600 450 L700 450"
                stroke="currentColor"
                strokeWidth="2"
                className="text-indigo-400"
              />

              {/* Circuit nodes */}
              <circle cx="200" cy="100" r="4" fill="currentColor" className="text-indigo-500" />
              <circle cx="300" cy="200" r="4" fill="currentColor" className="text-purple-500" />
              <circle cx="500" cy="150" r="4" fill="currentColor" className="text-blue-500" />
              <circle cx="600" cy="250" r="4" fill="currentColor" className="text-indigo-500" />
              <circle cx="250" cy="300" r="4" fill="currentColor" className="text-purple-500" />
              <circle cx="350" cy="400" r="4" fill="currentColor" className="text-blue-500" />
              <circle cx="600" cy="350" r="4" fill="currentColor" className="text-indigo-500" />
              <circle cx="700" cy="450" r="4" fill="currentColor" className="text-purple-500" />
            </svg>
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-16 left-1/4 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm">
                {"{}"}
              </div>
            </div>
            <div
              className="absolute top-24 right-1/4 animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm">
                &lt;/&gt;
              </div>
            </div>
            <div
              className="absolute bottom-32 left-1/3 animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "3.5s" }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">
                DB
              </div>
            </div>
            <div
              className="absolute bottom-40 right-1/3 animate-bounce"
              style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white text-sm">
                API
              </div>
            </div>
            <div
              className="absolute top-1/3 left-12 animate-bounce"
              style={{ animationDelay: "1.5s", animationDuration: "3.8s" }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                JS
              </div>
            </div>
            <div
              className="absolute top-1/2 right-12 animate-bounce"
              style={{ animationDelay: "2.5s", animationDuration: "3.2s" }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                C#
              </div>
            </div>
          </div>

          {/* Matrix-style falling code */}
          <div className="absolute inset-0 opacity-5 overflow-hidden">
            <div className="absolute top-0 left-1/4 animate-pulse" style={{ animationDuration: "2s" }}>
              <div className="text-green-500 font-mono text-xs leading-tight">
                1<br />0<br />1<br />1<br />0<br />1<br />0<br />1<br />1<br />0
              </div>
            </div>
            <div
              className="absolute top-0 right-1/4 animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
            >
              <div className="text-blue-500 font-mono text-xs leading-tight">
                0<br />1<br />0<br />1<br />1<br />0<br />1<br />0<br />1<br />1
              </div>
            </div>
            <div
              className="absolute top-0 left-1/2 animate-pulse"
              style={{ animationDuration: "3s", animationDelay: "1s" }}
            >
              <div className="text-purple-500 font-mono text-xs leading-tight">
                1<br />1<br />0<br />0<br />1<br />0<br />1<br />1<br />0<br />1
              </div>
            </div>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 dark:from-slate-200 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-lg leading-tight">
                Sofía Gamboa Navarro
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-light drop-shadow-md">
                Ingeniera en Informática
              </p>
              <div className="mt-6 sm:mt-8 flex justify-center">
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Perfil Section */}
        <section id="perfil" className="py-12 sm:py-16 md:py-20 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-slate-800 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-center sm:text-left">Perfil Profesional</span>
              </span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                  Ingeniera en Informática con formación sólida y experiencia práctica en proyectos académicos de alto
                  impacto. Competente en tecnologías frontend y backend como Java, C#, Spring Boot, .NET, Thymeleaf y
                  Bootstrap, así como en gestión de bases de datos MySQL, SQL Server y Oracle. Destacada en el diseño,
                  codificación, pruebas y documentación de sistemas, con manejo fluido de metodologías ágiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experiencia Section */}
        <section
          id="experiencia"
          className="py-12 sm:py-16 md:py-20 scroll-mt-20 bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/30"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-slate-800 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-center sm:text-left">Experiencia Profesional</span>
              </span>
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-emerald-600 font-semibold mb-2">Proyecto de Graduación</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2 leading-tight">
                          Desarrollo de un Sistema para la Gestión y el Control de Inventario
                        </h3>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                          Universidad Central – Costa Rica
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-medium rounded-full self-start">
                        Sept 2024 – Dic 2024
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-6 sm:mb-8 text-base sm:text-lg">
                    En este proyecto, desarrollé un sistema web completo para la gestión de inventarios de una
                    microempresa, aplicando mis habilidades en un entorno práctico. El proyecto está desarrollado
                    principalmente en <strong>Java (50%)</strong>, <strong>HTML (39.7%)</strong>,
                    <strong>JavaScript (8.7%)</strong> y <strong>CSS (1.6%)</strong>, demostrando un enfoque full-stack
                    en el desarrollo.
                  </p>

                  <div className="flex justify-center mb-6 sm:mb-8">
                    <a
                      href="https://github.com/sofia-gamboa/control_inventario-main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <GitBranch className="w-5 h-5" />
                      Ver Proyecto en GitHub
                    </a>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      "Desarrollo e implementación de un sistema de gestión de inventarios completo.",
                      "Construcción de funcionalidades CRUD para módulos de productos, categorías, usuarios y pedidos.",
                      "Implementación de backend con Spring Boot y MySQL, y frontend con Thymeleaf y Bootstrap.",
                      "Aplicación de la metodología Kanban para la gestión de tareas y entregas.",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Habilidades Section */}
        <section id="habilidades" className="py-12 sm:py-16 md:py-20 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-slate-800 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-center sm:text-left">Habilidades Técnicas</span>
              </span>
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base md:text-lg px-4">
              Esta sección presenta mis habilidades técnicas organizadas por categorías, permitiendo una visión clara y
              rápida de mis competencias.
            </p>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  title: "Lenguajes",
                  icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-red-500 to-pink-500",
                  skills: ["Java", "C#", "C++", "SQL", "HTML", "CSS", "JavaScript"],
                },
                {
                  title: "Frameworks y Tecnologías",
                  icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-blue-500 to-indigo-500",
                  skills: ["Spring Boot", ".NET", "Thymeleaf", "Bootstrap"],
                },
                {
                  title: "Bases de Datos",
                  icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-green-500 to-emerald-500",
                  skills: ["MySQL", "SQL Server", "Oracle"],
                },
                {
                  title: "Herramientas de Desarrollo",
                  icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-purple-500 to-violet-500",
                  skills: ["IntelliJ IDEA", "Visual Studio Code", "Microsoft Visual Studio"],
                },
                {
                  title: "Control de Versiones",
                  icon: <GitBranch className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-orange-500 to-red-500",
                  skills: ["Git", "GitHub"],
                },
                {
                  title: "Metodologías y Otros",
                  icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-teal-500 to-cyan-500",
                  skills: [
                    "Scrum",
                    "Kanban",
                    "Debugging",
                    "Análisis de datos",
                    "Pruebas funcionales",
                    "Documentación técnica",
                  ],
                },
              ].map((category, index) => (
                <div key={index} className="group">
                  <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}
                      >
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 text-slate-800 dark:text-slate-200">
                      {category.title}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-center justify-center">
                          <div
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${category.color} rounded-full mr-2 sm:mr-3`}
                          />
                          <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base text-center">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aprendizaje Section */}
        <section
          id="aprendizaje"
          className="py-12 sm:py-16 md:py-20 scroll-mt-20 bg-gradient-to-r from-emerald-50/30 to-teal-50/30 dark:from-emerald-900/10 dark:to-teal-900/10"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-slate-800 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-center sm:text-left">Aprendizaje Continuo</span>
              </span>
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base md:text-lg px-4">
              Actualmente me encuentro expandiendo mis conocimientos en estas tecnologías y metodologías modernas.
            </p>

            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  title: "APIs REST",
                  icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-blue-500 to-cyan-500",
                  description: "Diseño y consumo de servicios web RESTful",
                },
                {
                  title: "React",
                  icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-cyan-500 to-blue-500",
                  description: "Desarrollo de interfaces modernas y reactivas",
                },
                {
                  title: "Clean Code",
                  icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
                  color: "from-emerald-500 to-teal-500",
                  description: "Buenas prácticas para código limpio y mantenible",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-slate-800 dark:text-slate-200">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base text-center leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full">
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">En progreso</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formación Section */}
        <section
          id="formacion"
          className="py-12 sm:py-16 md:py-20 scroll-mt-20 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/10 dark:to-purple-900/10"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-slate-800 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-center sm:text-left">Formación Académica</span>
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 text-center hover:shadow-2xl transition-all duration-500">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">
                  Ingeniería Informática
                </h3>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-3 sm:mb-2">
                  Universidad Central – Costa Rica
                </p>
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs sm:text-sm font-medium">
                  Mayo 2019 – Junio 2025
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competencias Section */}
        <section id="competencias" className="py-12 sm:py-16 md:py-20 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-slate-800 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-center sm:text-left">Competencias y Más</span>
              </span>
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-slate-800 dark:text-slate-200">
                  Competencias Personales
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Pensamiento lógico y analítico",
                    "Resolución de problemas técnicos",
                    "Planificación y organización",
                    "Comunicación y trabajo en equipo",
                    "Adaptabilidad y aprendizaje continuo",
                    "Orientación a resultados y calidad",
                  ].map((competencia, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4">
                        <span className="text-white text-xs">▪</span>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">{competencia}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-slate-800 dark:text-slate-200">
                  Información Adicional
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Disponibilidad inmediata",
                    "Alta motivación por aprender nuevas tecnologías",
                    "Experiencia práctica en simulación de entornos laborales reales",
                  ].map((info, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer/Contact */}
      <footer
        id="contacto"
        className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white scroll-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Contáctame</h2>
          <p className="max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg md:text-xl text-slate-300 dark:text-slate-400">
            Estoy buscando activamente oportunidades como Desarrolladora. Si mi perfil se ajusta a sus necesidades, no
            dude en ponerse en contacto.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full w-full sm:w-auto justify-center">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">gamboansofia@gmail.com</span>
            </div>
            <a
              href="https://www.linkedin.com/in/sof%C3%ADa-gamboa-537350371"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              LinkedIn
            </a>
            <a
              href="https://github.com/sofia-gamboa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
            >
              <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              GitHub
            </a>
            <a
              href="https://wa.me/50689674891?text=Hola%20Sofía,%20vi%20tu%20CV%20y%20me%20interesa%20contactarte%20para%20una%20oportunidad%20laboral"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              WhatsApp
            </a>
          </div>

          <div className="border-t border-slate-600 dark:border-slate-700 pt-6 sm:pt-8">
            <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
              &copy; 2025 Sofía Gamboa Navarro. Diseñado y desarrollado interactivamente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
