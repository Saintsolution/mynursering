import { useState, useEffect } from 'react';
import { initializeAssistant } from './services/openaiService';

import PresentationSection from './components/PresentationSection';
import ResourcesSection from './components/ResourcesSection';
import ChatAssistantSection from './components/ChatAssistantSection';
import MemoriesSection from './components/MemoriesSection';

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
  initializeAssistant(apiKey, systemInstruction);
} else {
  console.error('ERRO: VITE_OPENAI_API_KEY não encontrada no arquivo .env');
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-500 ${
          isScrolled ? 'py-4 shadow-xl' : 'py-8'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* FOTO ESQUERDA - some no celular */}
            <div className="hidden md:flex w-12 justify-start">
             <img
  src="/face_yvone.png"
  alt="Maria Yvone"
  className="w-16 h-16 object-cover rounded-full shadow-md ring-2 ring-[#98FB98]/40 opacity-90"
/>
            </div>

            {/* CENTRO */}
            <div className="flex flex-col items-center flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#98FB98] tracking-tight mb-4 select-none">
                MYNursering
              </h1>

              <div className="flex flex-wrap justify-center gap-4 md:gap-10 px-4">
                {['APRESENTAÇÃO', 'RECURSOS', 'ASSISTENTE', 'MEMÓRIAS'].map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        item
                          .toLowerCase()
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                      )
                    }
                    className="text-[10px] tracking-[0.3em] font-bold text-white/70 hover:text-[#98FB98] transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* LOGO DIREITA - some no celular */}
            <div className="hidden md:flex w-12 justify-end">
              <img
  src="/logo_enf.png"
  alt="Logo enfermagem"
  className="w-14 h-14 object-contain drop-shadow-md opacity-90"
/>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-40 md:pt-64">
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

      <footer className="bg-black py-20 border-t border-[#98FB98]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center gap-4 text-center">
          <span className="text-lg md:text-2xl font-medium text-[#98FB98] tracking-tighter italic px-4">
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