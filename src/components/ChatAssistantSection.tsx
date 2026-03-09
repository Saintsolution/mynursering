import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Activity, Info, FlameKindling } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { getChatResponse } from '../services/openaiService';

// LISTA DE 30 DICAS TÉCNICAS DA DRA. MARIA YVONE
const DICAS_DA_DOUTORA = [
  "Ao movimentar pacientes, use a força das pernas e mantenha o eixo da coluna preservado.",
  "A NR-32 é sua maior aliada na proteção contra riscos biológicos. Use o EPI sempre!",
  "Pausas ativas de 5 minutos a cada hora reduzem drasticamente o risco de LER/DORT.",
  "A ergonomia não é apenas sobre móveis, é sobre como você adapta o trabalho ao seu corpo.",
  "Lave as mãos antes e depois de cada procedimento. O cuidado começa na higienização.",
  "Mantenha os objetos de uso frequente ao alcance das mãos para evitar torções de tronco.",
  "O uso correto de calçados fechados na enfermagem não é estética, é segurança biomecânica.",
  "Respeite os limites do seu corpo; a fadiga muscular é o primeiro sinal de alerta.",
  "Ao usar computadores, mantenha o topo da tela na altura dos seus olhos.",
  "A hidratação constante ajuda na manutenção da sua concentração e saúde muscular.",
  "O descarte correto de perfurocortantes protege você e toda a equipe de apoio.",
  "Organize seu carrinho de medicação de forma que você não precise se curvar repetidamente.",
  "Flexione os joelhos, nunca a coluna, ao pegar um objeto pesado no chão.",
  "A biossegurança é um ato de amor próprio e de respeito ao próximo.",
  "Ajuste a altura da maca do paciente antes de realizar qualquer procedimento técnico.",
  "Evite movimentos repetitivos bruscos; a suavidade na execução protege suas articulações.",
  "O ambiente de trabalho limpo reduz o estresse mental e o risco de acidentes.",
  "Utilize dispositivos auxiliares (como lençóis móveis) para transferir pacientes pesados.",
  "Mantenha seus punhos em posição neutra (reta) sempre que possível durante o dia.",
  "A ventilação do ambiente é fundamental para a saúde respiratória do profissional.",
  "A postura sentada exige que seus pés estejam totalmente apoiados no chão ou suporte.",
  "Relate sempre qualquer desconforto osteomuscular ao SESMT da sua unidade.",
  "O descanso entre plantões é parte fundamental da sua performance técnica.",
  "A iluminação adequada previne a fadiga visual e erros de dosagem em medicações.",
  "Use a técnica de 'braços de alavanca' curtos ao segurar equipamentos pesados.",
  "Rotacionar as tarefas durante o plantão ajuda a evitar a sobrecarga de grupos musculares específicos.",
  "Sua saúde mental influencia diretamente na sua percepção de dor física. Cuide-se.",
  "A NR-17 ensina: o trabalho deve ser adaptado ao homem, e não o contrário.",
  "Mantenha os ombros relaxados e para baixo enquanto digita ou realiza curativos.",
  "Conhecimento técnico e postura correta são as ferramentas mais fortes de um enfermeiro."
];

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
  const [isTyping, setIsTyping] = useState(false);
  const [dicaAtual, setDicaAtual] = useState(""); // Estado para a dica
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sorteia uma dica nova toda vez que o componente carrega
  useEffect(() => {
    const sorteio = DICAS_DA_DOUTORA[Math.floor(Math.random() * DICAS_DA_DOUTORA.length)];
    setDicaAtual(sorteio);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
    setIsTyping(true);

    try {
      const response = await getChatResponse(userText, history);

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      setHistory(prev => [
        ...prev,
        { role: "user", content: userText },
        { role: "assistant", content: response }
      ]);
    } finally {
      setIsTyping(false);
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
            <div className="bg-white border border-[#98FB98]/30 rounded-[3rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden h-[30rem] flex flex-col justify-end">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('/maria_yvone.png')", 
                  opacity: 0.35,
                }}
              />
              <div className="relative z-10 p-8 bg-gradient-to-t from-white via-white/80 to-transparent pt-12">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-black p-2.5 rounded-xl">
                    <FlameKindling className="text-[#98FB98] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">
                    Maria Yvone
                  </h3>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 font-bold uppercase tracking-widest">
                  Inspiradora da Jornada
                </p>
              </div>
            </div>

            {/* CAIXA DE DICA DINÂMICA */}
            <div className="bg-[#D9EAE6] p-6 rounded-[3rem] border border-[#98FB98]/30 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-[#4A7C71] uppercase tracking-widest mb-2">Dica da Doutora</p>
                <p className="text-xs leading-relaxed text-[#2D4F48] font-medium italic">
                  "{dicaAtual}"
                </p>
              </div>
              <Activity className="absolute -bottom-2 -right-2 w-16 h-16 text-[#4A7C71]/10" />
            </div>
          </aside>

          {/* CHAT CONTAINER */}
          <div className="flex-1 flex flex-col bg-white border border-[#98FB98]/30 rounded-[3rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)]" style={{ height: '700px' }}>
            <header className="p-6 border-b border-black/[0.03] flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">
                Consultoria Virtual
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