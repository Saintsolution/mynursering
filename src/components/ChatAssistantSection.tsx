import { useState, useRef, useEffect } from 'react';
import { Send, User, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { getChatResponse } from '../services/openaiService';

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

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type HistoryItem = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatAssistantSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou a **Maria Yvone Assistente**. Como posso ajudar em sua jornada técnica hoje?',
      timestamp: new Date(),
    }
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dicaAtual, setDicaAtual] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const sorteio = DICAS_DA_DOUTORA[Math.floor(Math.random() * DICAS_DA_DOUTORA.length)];
    setDicaAtual(sorteio);
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const containers = document.querySelectorAll('.msg-group');
        const last = containers[containers.length - 1];
        if (last) last.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = '0px';
    const nextHeight = Math.min(textarea.scrollHeight, 140);
    textarea.style.height = `${nextHeight}px`;
  }, [input]);

  const handleSend = async () => {
    const userText = input.trim();
    if (!userText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(userText, history);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: userText },
        { role: 'assistant', content: response },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = ['Postura Banho no Leito', 'Resumo NR-17', 'Riscos NR-32'];

  return (
    <section id="assistente" className="py-12 md:py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white border border-[#98FB98]/30 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden h-[20rem] md:h-[30rem] flex flex-col justify-end">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/face_yvone.png')", opacity: 0.35 }}
              />
              <div className="relative z-10 p-6 md:p-8 bg-gradient-to-t from-white via-white/80 to-transparent pt-12">
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logo_enf.png" alt="Logo Enfermagem" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 uppercase tracking-tighter">Maria Yvone</h3>
                </div>
                <p className="text-[10px] md:text-[11px] leading-relaxed text-slate-600 font-bold uppercase tracking-widest">Inspiradora da Jornada</p>
              </div>
            </div>

            <div className="bg-[#D9EAE6] p-6 rounded-[2.5rem] md:rounded-[3rem] border border-[#98FB98]/30 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-[#4A7C71] uppercase tracking-widest mb-2">Dica da Doutora</p>
                <p className="text-xs leading-relaxed text-[#2D4F48] font-medium italic">"{dicaAtual}"</p>
              </div>
              <Activity className="absolute -bottom-2 -right-2 w-16 h-16 text-[#4A7C71]/10" />
            </div>
          </aside>

          {/* AJUSTE MOBILE: min-h-[500px] e h-[80vh] garantem que o container não achate */}
          <div className="flex-1 flex flex-col bg-white border border-[#98FB98]/30 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] min-h-[500px] h-[80vh] md:h-[700px] mx-1 md:mx-0">
            <header className="p-5 md:p-6 border-b border-black/[0.03] flex items-center justify-between bg-white shrink-0">
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">Consultoria Virtual</span>
              <Info size={16} className="text-black/20" />
            </header>

            {/* O SEGREDO: flex-grow + h-0 força o scroll a funcionar em containers flex */}
            <div className="flex-grow h-0 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#FCFDFD] scroll-smooth">
              <div className="flex flex-col gap-6">
                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      className={cn('flex gap-3 md:gap-4 msg-group', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={cn(
                          'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border shrink-0 overflow-hidden',
                          m.role === 'assistant' ? 'bg-white border-black/5' : 'bg-black text-[#98FB98] border-black'
                        )}>
                        {m.role === 'assistant' ? (
                          <img src="/yvone_assist.png" alt="Assistente" className="w-full h-full object-cover" />
                        ) : (
                          <User size={18} />
                        )}
                      </div>

                      <div className={cn(
                          'max-w-[88%] md:max-w-[80%] p-4 md:p-6 rounded-[1.5rem] md:rounded-[1.8rem] text-sm leading-relaxed shadow-sm break-words',
                          m.role === 'assistant' ? 'bg-white border border-black/5 text-slate-700 rounded-tl-none' : 'bg-black text-white rounded-tr-none'
                      )}>
                        <div className={cn("prose prose-sm max-w-none", m.role === 'user' ? "prose-invert text-white" : "prose-slate")}>
                          <Markdown>{m.content}</Markdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 md:gap-4 flex-row">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border bg-white border-black/5 shrink-0 overflow-hidden">
                        <img src="/yvone_assist.png" alt="Assistente" className="w-full h-full object-cover opacity-50 animate-pulse" />
                      </div>
                      <div className="bg-white border border-black/5 p-4 md:p-6 rounded-[1.5rem] rounded-tl-none shadow-sm">
                        <p className="text-xs md:text-sm text-slate-500 italic">Dra. Maria Yvone está elaborando...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-4 shrink-0" />
              </div>
            </div>

            <div className="p-4 md:p-8 bg-white border-t border-black/[0.03] shrink-0">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => setInput(action)}
                    className="text-[8px] md:text-[9px] font-bold tracking-widest uppercase border border-black/10 px-3 py-2 rounded-full hover:border-black transition-all text-slate-500 hover:text-black"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <div className="relative flex items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Sua dúvida técnica..."
                  rows={1}
                  className="w-full resize-none overflow-y-auto bg-[#F2F4F5] border-none rounded-2xl py-3 pr-14 pl-5 text-sm outline-none font-medium leading-relaxed max-h-[120px]"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    'absolute right-1.5 bottom-1.5 p-2.5 rounded-full transition-all',
                    input.trim() ? 'bg-black text-[#98FB98]' : 'bg-black/10 text-white/40'
                  )}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}