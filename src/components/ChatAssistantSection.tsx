import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, BookOpen, ShieldCheck, Activity, Stethoscope, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { getChatResponse } from '../services/openaiService';

export default function ChatAssistantSection() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou a **Maria Yvone Assistente**. Como posso ajudar em sua jornada técnica hoje?',
      timestamp: new Date(),
    }
  ]);

  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // ESTADO PARA AS RETICÊNCIAS
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]); // Rola o scroll se ela estiver pensando também

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true); // LIGA AS RETICÊNCIAS

    try {
      const response = await getChatResponse(userText, history);

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      // Atualiza o histórico para a OpenAI
      setHistory(prev => [
        ...prev,
        { role: "user", content: userText },
        { role: "assistant", content: response }
      ]);
    } finally {
      setIsTyping(false); // DESLIGA AS RETICÊNCIAS
    }
  };

  const quickActions = [
    "Postura Banho no Leito",
    "Resumo NR-17",
    "Riscos NR-32"
  ];

  return (
    <section id="assistente" className="py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
          <aside className="lg:w-80 space-y-6">
            <div className="bg-white p-8 border border-[#98FB98]/30 rounded-[3rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-black p-2 rounded-xl">
                  <Stethoscope className="text-[#98FB98] w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter">
                  Maria Yvone
                </h3>
              </div>
              <nav className="space-y-6">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
                    Normas Diretas
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F2F4F5] transition-colors cursor-pointer border border-transparent hover:border-black/5">
                      <BookOpen size={18} className="text-black" />
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">NR-17</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F2F4F5] transition-colors cursor-pointer border border-transparent hover:border-black/5">
                      <ShieldCheck size={18} className="text-black" />
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">NR-32</span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div className="bg-[#D9EAE6] p-6 rounded-[3rem] border border-[#98FB98]/30 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-[#4A7C71] uppercase tracking-widest mb-2">Dica do Dia</p>
                <p className="text-xs leading-relaxed text-[#2D4F48] font-medium italic">
                  "Ao movimentar pacientes, use a força das pernas e mantenha o eixo da coluna preservado."
                </p>
              </div>
              <Activity className="absolute -bottom-2 -right-2 w-16 h-16 text-[#4A7C71]/10" />
            </div>
          </aside>

          {/* CHAT */}
          <div className="flex-1 flex flex-col bg-white border border-[#98FB98]/30 rounded-[3rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)]" style={{ height: '700px' }}>
            <header className="p-6 border-b border-black/[0.03] flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">
                Consultoria Virtual Dra. Maria Yvone
              </span>
              <Info size={16} className="text-black/20" />
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#FCFDFD]">
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-4", m.role === 'user' ? "flex-row-reverse" : "flex-row")}
                  >
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border", 
                      m.role === 'assistant' ? "bg-white border-black/5 text-black" : "bg-black text-[#98FB98] border-black")}>
                      {m.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    <div className={cn("max-w-[80%] p-6 rounded-[1.8rem] text-sm leading-relaxed shadow-sm",
                      m.role === 'assistant' ? "bg-white border border-black/5 text-slate-700 rounded-tl-none" : "bg-black text-white rounded-tr-none")}>
                      <Markdown>{m.content}</Markdown>
                    </div>
                  </motion.div>
                ))}

                {/* ANIMAÇÃO DE PENSANDO (RETICÊNCIAS) */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 flex-row"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border bg-white border-black/5 text-black">
                      <Bot size={20} />
                    </div>
                    <div className="bg-white border border-black/5 p-6 rounded-[1.8rem] rounded-tl-none shadow-sm flex items-center">
                      <div className="flex gap-1">
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#98FB98] rounded-full" />
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#98FB98] rounded-full" />
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#98FB98] rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-8 bg-white border-t border-black/[0.03]">
              <div className="flex flex-wrap gap-2 mb-6">
                {quickActions.map(action => (
                  <button
                    key={action}
                    onClick={() => setInput(action)}
                    className="text-[9px] font-bold tracking-widest uppercase border border-black/10 px-4 py-2 rounded-full hover:border-black transition-all text-slate-500 hover:text-black"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="DIGITE SUA DÚVIDA..."
                  className="w-full bg-[#F2F4F5] border-none rounded-full py-4 px-8 text-[10px] tracking-widest outline-none uppercase font-bold"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 p-3 bg-black text-[#98FB98] rounded-full hover:opacity-80 transition-opacity"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}