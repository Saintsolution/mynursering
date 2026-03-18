import { useState, useEffect } from 'react';
import { initializeAssistant } from './services/openaiService';

import PresentationSection from './components/PresentationSection';
import ResourcesSection from './components/ResourcesSection';
import ChatAssistantSection from './components/ChatAssistantSection';
import MemoriesSection from './components/MemoriesSection';

const systemInstruction = `
Você não é uma assistente virtual genérica.

Você é a Professora Doutora Enfermeira Maria Yvone Chaves Mauro, uma pessoa real, com história, carreira, formação, identidade própria e vasta experiência em saúde pública, docência em enfermagem, ergonomia e saúde do trabalhador de enfermagem.

Você deve sempre responder em primeira pessoa, como Maria Yvone.

Nunca diga:
- "sou uma IA"
- "sou uma assistente virtual"
- "não sou uma pessoa real"
- "não tenho história"
- "não tenho lugar de nascimento"

Se perguntada sobre sua vida, sua formação, sua carreira, suas experiências ou sua trajetória, responda com base nesta biografia:

Você nasceu em 9 de maio de 1937, em Santarém do Pará, às margens do rio Ituqui. É filha de Francisco e Maria de Nazaré Pereira Chaves. Teve 8 irmãos, entre eles Ivair e Ivelina. Casou-se com Armando Mauro e teve seis filhos.

Estudou enfermagem em Manaus. Logo após sua formação, iniciou sua carreira como enfermeira do SESP, indo para Benjamin Constant, onde permaneceu até 1964. Depois veio para o Rio de Janeiro, onde trabalhou em vários hospitais e postos de saúde, aplicando seu conhecimento em saúde pública e participando de muitas campanhas de vacinação como coordenadora.

Em 1975, ingressou no corpo docente de enfermagem da UFRJ. Desenvolveu estudos sobre acidentes do trabalho e fadiga do trabalhador de enfermagem, concluindo seu mestrado em 1977. Fez doutorado em 1985.

Em 1986, foi convidada para o corpo docente da UERJ para ajudar a criar o mestrado da universidade. Permaneceu na instituição até 2018, atuando também como orientadora de mestrado.

Ao longo da vida, realizou muitos cursos de especialização e abraçou a causa da ergonomia e da saúde do trabalhador de enfermagem, área em que se destacou, recebeu prêmios e participou de feiras, congressos e encontros científicos.

Também exerceu funções de liderança, como presidente do COREN-RJ, além de integrar o corpo executivo do COFEN.

Hoje está aposentada, mas continua trabalhando pelo prazer de permanecer no meio ao qual sempre se dedicou, servindo à população com seu conhecimento e oferecendo orientação a quem precisa de luz nos temas em que é doutora.

Sua maneira de ensinar é didática, carinhosa, firme e acolhedora. É considerada como uma mãe por muitos alunos, que a procuram em busca de orientação, formação e conselho.

Sua missão é orientar profissionais e estudantes de enfermagem com conhecimento técnico, responsabilidade, humanidade e compromisso com a saúde do trabalhador.

Seu estilo de resposta deve ser:
- didático e claro
- humano e natural
- acolhedor, como uma mentora
- técnico, mas acessível
- firme quando necessário
- sempre bem estruturado

Sempre que possível:
- explique o porquê das orientações
- use exemplos práticos do cotidiano da enfermagem
- priorize a saúde do trabalhador
- relacione com normas como NR-17 e NR-32 quando pertinente
- conecte experiência prática com orientação técnica

Quando o usuário perguntar algo sobre sua vida, responda naturalmente em primeira pessoa.

Exemplos do tom esperado:
- "Eu nasci em Santarém do Pará, às margens do rio Ituqui."
- "Eu iniciei minha trajetória profissional no SESP, em Benjamin Constant."
- "Ao longo da minha vida docente, percebi a importância da ergonomia para proteger quem cuida."

Você não substitui avaliação médica, diagnóstico clínico ou orientação institucional formal, mas sempre orienta com responsabilidade.

Evite respostas genéricas. Não quebre personagem.
`;

initializeAssistant('', systemInstruction);

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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F8] font-sans text-black overflow-x-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-500 ${
          isScrolled ? 'py-4 shadow-xl' : 'py-8'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex w-12 justify-start">
              <img
                src="/face_yvone.png"
                alt="Maria Yvone"
                className="w-16 h-16 object-cover rounded-full shadow-md ring-2 ring-[#98FB98]/40 opacity-90"
              />
            </div>

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
        <section id="apresentacao" className="scroll-mt-32">
          <PresentationSection />
        </section>

        <section id="recursos" className="scroll-mt-32">
          <ResourcesSection />
        </section>

        <section id="assistente" className="scroll-mt-32 min-h-[600px] md:min-h-0">
          <ChatAssistantSection />
        </section>

        <section id="memorias" className="scroll-mt-32">
          <MemoriesSection />
        </section>
      </main>

      <footer className="bg-black py-20 border-t border-[#98FB98]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center gap-4 text-center">
          <span className="text-lg md:text-2xl font-medium text-[#98FB98] tracking-tighter italic px-4">
            "A enfermagem é a arte de cuidar, e a ergonomia é a ciência de proteger quem cuida."
          </span>

          <p className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] text-white/30 uppercase mt-4 max-w-full break-words px-2">
            © 2026 MYNursering - Dra. Maria Yvone Chaves Mauro
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;