import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Twitter, Instagram, PenTool, Video, Megaphone, MonitorPlay, ArrowRight, Moon, Sun, Globe } from 'lucide-react';
import AIChat from './components/AIChat';

const TRANSLATIONS = {
  tr: {
    nav: { about: "Hakkımda", projects: "Projeler", contact: "İletişim" },
    hero: {
      subtitle: "Yeni Medya ve İletişim Öğrencisi",
      title1: "Dijital dünyada",
      titleHighlight: "anlamlı hikayeler",
      title2: "anlatıyorum.",
      desc: "Merhaba, ben Mehmet Kader. Üsküdar Üniversitesi'nde Yeni Medya ve İletişim okuyorum. Dijital içerik üretimi, sosyal medya stratejileri ve modern iletişim trendleri üzerine çalışıyorum.",
      btnProjects: "Projelerimi Gör",
      btnContact: "İletişime Geç"
    },
    projectsSection: {
      title: "Seçili Çalışmalarım",
      desc: "Üniversite projelerim, staj deneyimlerim ve kişisel içerik üretimlerimden oluşan bazı örnekler.",
      viewDetails: "Detayları İncele"
    },
    skillsSection: {
      title: "Yetenekler & Odak Alanları",
      desc: "Yeni medya sadece platformları kullanmak değil, o platformların dilini konuşabilmektir. Eğitimim ve kişisel çabalarımla kendimi geliştirdiğim temel alanlar:",
      eduTitle: "Eğitim",
      eduDate: "2023 - Günümüz",
      eduUni: "Üsküdar Üniversitesi",
      eduDept: "İletişim Fakültesi, Yeni Medya ve İletişim",
      eduDesc: "Akademik eğitimimi pratik projelerle destekliyor, dijital çağın iletişim dinamiklerini yakından takip ediyorum. Gelecekte dijital iletişim stratejisti olarak markalara ve kurumlara değer katmayı hedefliyorum."
    },
    footer: {
      title: "Birlikte Çalışalım",
      desc: "Staj imkanları, freelance projeler veya sadece yeni medya üzerine sohbet etmek için bana ulaşabilirsiniz.",
      rights: "Tüm hakları saklıdır."
    },
    projects: [
      {
        id: 1,
        title: "Dijital İletişim Kampanyası",
        category: "Sosyal Medya",
        description: "Yerel bir marka için Instagram ve TikTok odaklı, etkileşim artırma hedefli içerik stratejisi ve yönetimi.",
        icon: <Megaphone className="w-6 h-6" />,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      },
      {
        id: 2,
        title: "Üniversite Podcast Serisi",
        category: "İçerik Üretimi",
        description: "Yeni medya trendleri ve dijital kültür üzerine haftalık podcast yayınlarının kurgusu ve sunumu.",
        icon: <MonitorPlay className="w-6 h-6" />,
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      },
      {
        id: 3,
        title: "Veri Gazeteciliği İncelemesi",
        category: "Araştırma / Haber",
        description: "Z kuşağının haber tüketim alışkanlıkları üzerine veri analizi ve dijital haber bülteni tasarımı.",
        icon: <PenTool className="w-6 h-6" />,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      },
      {
        id: 4,
        title: "Kısa Belgesel Kurgusu",
        category: "Video Prodüksiyon",
        description: "Kampüs hayatını konu alan 5 dakikalık kısa belgeselin çekim ve Adobe Premiere üzerinden kurgu süreçleri.",
        icon: <Video className="w-6 h-6" />,
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      }
    ],
    skills: [
      "Sosyal Medya Yönetimi", "İçerik Stratejisi", "Metin Yazarlığı (Copywriting)",
      "Video Kurgu (Premiere Pro)", "Dijital Pazarlama", "SEO Temelleri",
      "Kriz İletişimi", "Podcast Prodüksiyonu"
    ]
  },
  en: {
    nav: { about: "About", projects: "Projects", contact: "Contact" },
    hero: {
      subtitle: "New Media and Communication Student",
      title1: "I tell",
      titleHighlight: "meaningful stories",
      title2: "in the digital world.",
      desc: "Hi, I'm Mehmet Kader. I study New Media and Communication at Üsküdar University. I focus on digital content creation, social media strategies, and modern communication trends.",
      btnProjects: "View Projects",
      btnContact: "Get in Touch"
    },
    projectsSection: {
      title: "Selected Works",
      desc: "Some examples of my university projects, internship experiences, and personal content creation.",
      viewDetails: "View Details"
    },
    skillsSection: {
      title: "Skills & Focus Areas",
      desc: "New media is not just about using platforms, but speaking their language. Key areas I've developed through education and personal effort:",
      eduTitle: "Education",
      eduDate: "2023 - Present",
      eduUni: "Üsküdar University",
      eduDept: "Faculty of Communication, New Media and Communication",
      eduDesc: "I support my academic education with practical projects and closely follow the communication dynamics of the digital age. I aim to add value to brands and institutions as a digital communication strategist in the future."
    },
    footer: {
      title: "Let's Work Together",
      desc: "You can reach out to me for internship opportunities, freelance projects, or just to chat about new media.",
      rights: "All rights reserved."
    },
    projects: [
      {
        id: 1,
        title: "Digital Communication Campaign",
        category: "Social Media",
        description: "Content strategy and management focused on Instagram and TikTok for a local brand, aiming to increase engagement.",
        icon: <Megaphone className="w-6 h-6" />,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      },
      {
        id: 2,
        title: "University Podcast Series",
        category: "Content Creation",
        description: "Editing and hosting weekly podcast broadcasts on new media trends and digital culture.",
        icon: <MonitorPlay className="w-6 h-6" />,
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      },
      {
        id: 3,
        title: "Data Journalism Review",
        category: "Research / News",
        description: "Data analysis on the news consumption habits of Generation Z and digital newsletter design.",
        icon: <PenTool className="w-6 h-6" />,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      },
      {
        id: 4,
        title: "Short Documentary Edit",
        category: "Video Production",
        description: "Shooting and editing processes of a 5-minute short documentary about campus life using Adobe Premiere.",
        icon: <Video className="w-6 h-6" />,
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      }
    ],
    skills: [
      "Social Media Management", "Content Strategy", "Copywriting",
      "Video Editing (Premiere Pro)", "Digital Marketing", "SEO Basics",
      "Crisis Communication", "Podcast Production"
    ]
  }
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif font-bold text-xl tracking-tight">MK.</span>
          
          <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <a href="#about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">{t.nav.about}</a>
            <a href="#projects" className="hover:text-neutral-900 dark:hover:text-white transition-colors">{t.nav.projects}</a>
            <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-neutral-500 dark:text-neutral-400 font-medium tracking-wider uppercase text-sm mb-6">
              {t.hero.subtitle}
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-white mb-8">
              {t.hero.title1} <br/>
              <span className="text-neutral-400 dark:text-neutral-500 italic font-normal">{t.hero.titleHighlight}</span> {t.hero.title2}
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                {t.hero.btnProjects}
              </a>
              <a href="#contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                {t.hero.btnContact}
              </a>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-white dark:bg-[#0a0a0a] py-32 border-y border-neutral-100 dark:border-neutral-900 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t.projectsSection.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-xl">{t.projectsSection.desc}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {t.projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-all hover:shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${project.color}`}>
                    {project.icon}
                  </div>
                  <div className="text-xs font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <a href="#" className="inline-flex items-center text-sm font-semibold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.projectsSection.viewDetails} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & About Section */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">{t.skillsSection.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                {t.skillsSection.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-sm font-medium border border-neutral-200 dark:border-neutral-800 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neutral-900 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white p-10 rounded-3xl transition-colors"
            >
              <h3 className="font-serif text-2xl font-bold mb-6">{t.skillsSection.eduTitle}</h3>
              <div className="mb-8">
                <div className="text-neutral-400 text-sm font-medium mb-1">{t.skillsSection.eduDate}</div>
                <div className="text-xl font-bold mb-1">{t.skillsSection.eduUni}</div>
                <div className="text-neutral-300">{t.skillsSection.eduDept}</div>
              </div>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {t.skillsSection.eduDesc}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-neutral-900 dark:bg-[#050505] border-t border-transparent dark:border-neutral-900 text-white py-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">{t.footer.title}</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
              {t.footer.desc}
            </p>
            
            <div className="flex justify-center gap-4 mb-16">
              <a href="mailto:memo.tem@hotmail.com" className="w-12 h-12 rounded-full bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-neutral-900 dark:hover:bg-white dark:hover:text-neutral-900 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-neutral-900 dark:hover:bg-white dark:hover:text-neutral-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/kader10mehmet10" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-neutral-900 dark:hover:bg-white dark:hover:text-neutral-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-neutral-900 dark:hover:bg-white dark:hover:text-neutral-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} Mehmet Kader. {t.footer.rights}
            </div>
          </motion.div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChat lang={lang} />
    </div>
  );
}
