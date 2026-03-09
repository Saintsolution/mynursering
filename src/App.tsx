import { useState, useEffect } from 'react';
// Importando com o nome correto do serviço novo
import { initializeAssistant } from './services/openaiService';

import PresentationSection from './components/PresentationSection';
import ResourcesSection from './components/ResourcesSection';
import ChatAssistantSection from './components/ChatAssistantSection';
import MemoriesSection from './components/MemoriesSection';

// --- INICIALIZAÇÃO IMEDIATA DA OPENAI ---
// Use a nova chave que você gerou sk-proj-...
const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;

const systemInstruction = `
  Você é a assistente técnica Dra. Maria Yvone Chaves Mauro.
  Especialista em saúde do trabalhador de enfermagem.
  Ajude profissionais de enfermagem com dúvidas sobre:
  - ergonomia hospitalar
  - postura no cuidado ao paciente
  - NR-17
  - NR-32
  - saúde ocupacional
  Responda de forma clara, educativa e profissional.
`;

if (apiKey) {
  // Chamando a função de inicialização da OpenAI
  initializeAssistant(apiKey, systemInstruction);
} else {
  console.error("ERRO: VITE_OPENAI_API_KEY não encontrada no arquivo .env");
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9F8] font-sans text-black">

      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-500 ${isScrolled ? 'py-4 shadow-xl' : 'py-8'}`}>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-medium text-[#98FB98] tracking-tight mb-4 select-none">
            MYNursering
          </h1>

          <div className="flex gap-10">
            {['APRESENTAÇÃO', 'RECURSOS', 'ASSISTENTE', 'MEMÓRIAS'].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(
                    item
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  )
                }
                className="text-[10px] tracking-[0.3em] font-bold text-white/70 hover:text-[#98FB98] transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* SEÇÕES */}
      <main className="pt-64">
        <section id="apresentacao">
          <PresentationSection />
        </section>

        <section id="recursos">
          <ResourcesSection />
        </section>

        <section id="assistente">
          <ChatAssistantSection />
        </section>

        <section id="memorias">
          <MemoriesSection />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black py-20 border-t border-[#98FB98]/20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-4 text-center">
          <span className="text-2xl font-medium text-[#98FB98] tracking-tighter italic">
            "A enfermagem é a arte de cuidar, e a ergonomia é a ciência de proteger quem cuida."
          </span>
          <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase mt-4">
            © 2026 MYNursering - Dra. Maria Yvone Chaves Mauro
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;