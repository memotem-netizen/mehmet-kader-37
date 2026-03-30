import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Lazy initialization for Gemini AI to prevent app crash if API key is missing
let aiClient: GoogleGenAI | null = null;
const getAIClient = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      throw new Error("API_KEY_MISSING");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function AIChat({ lang }: { lang: 'tr' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    tr: {
      title: "Asensio",
      placeholder: "Mehmet hakkında bir şey sorun...",
      initialMessage: "Merhaba! Ben Asensio, Mehmet'in yapay zeka asistanıyım. Onun eğitimi, yetenekleri veya projeleri hakkında bana sorular sorabilirsiniz.",
      error: "Üzgünüm, bir bağlantı hatası oluştu. Lütfen tekrar deneyin.",
      missingKey: "Sistem Hatası: Gemini API Anahtarı bulunamadı. Lütfen Vercel ayarlarından GEMINI_API_KEY değişkenini ekleyip projeyi yeniden deploy edin."
    },
    en: {
      title: "Asensio",
      placeholder: "Ask something about Mehmet...",
      initialMessage: "Hi! I'm Asensio, Mehmet's AI assistant. You can ask me questions about his education, skills, or projects.",
      error: "Sorry, a connection error occurred. Please try again.",
      missingKey: "System Error: Gemini API Key not found. Please add the GEMINI_API_KEY environment variable in Vercel settings and redeploy."
    }
  }[lang];

  // Initialize chat and initial message
  useEffect(() => {
    try {
      if (!chatRef.current) {
        const ai = getAIClient();
        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `Senin adın Asensio. Sen Mehmet Kader'in dijital portfolyosundaki yapay zeka asistanısın. 
            Mehmet, Üsküdar Üniversitesi'nde Yeni Medya ve İletişim okuyor (2023-Günümüz). 
            Yetenekleri: Sosyal Medya Yönetimi, İçerik Stratejisi, Metin Yazarlığı (Copywriting), Video Kurgu (Premiere Pro), Dijital Pazarlama, SEO Temelleri, Kriz İletişimi, Podcast Prodüksiyonu.
            Ziyaretçilerin Mehmet hakkında sorduğu sorulara kibar, profesyonel, samimi ve kısa cevaplar ver. 
            Sadece Mehmet ile ilgili soruları yanıtla, genel konularda "Ben Asensio, sadece Mehmet'in portfolyo asistanıyım" şeklinde kibarca reddet.
            Kullanıcı hangi dilde (Türkçe veya İngilizce) yazarsa o dilde yanıt ver.`
          }
        });
      }
      setIsError(false);
    } catch (error: any) {
      if (error.message === "API_KEY_MISSING") {
        setIsError(true);
      }
    }
    
    // Set initial message based on language if chat is empty
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: isError ? t.missingKey : t.initialMessage }]);
    } else if (messages.length === 1 && messages[0].role === 'model') {
      // Update initial message if language changes and no user messages yet
      setMessages([{ role: 'model', text: isError ? t.missingKey : t.initialMessage }]);
    }
  }, [lang, t.initialMessage, t.missingKey, isError, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg flex items-center justify-center z-40 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-neutral-900 dark:bg-[#050505] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">{t.title}</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-[#0a0a0a]">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-tr-sm' 
                      : 'bg-white border border-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-tl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.placeholder}
                  className="flex-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-shadow"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
