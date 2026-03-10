import { GraduationCap } from 'lucide-react';

export default function PresentationSection() {
  return (
    <section className="py-24 bg-[#FDFCFB]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        <div className="inline-flex items-center gap-2 bg-[#E8F3F1] text-[#4A7C71] px-5 py-2 rounded-full mb-10 border border-[#98FB98]/20">
  <GraduationCap className="w-4 h-4" />
  <span className="font-bold tracking-widest text-[10px] uppercase">Legado Acadêmico</span>
</div>

        <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-[#98FB98]/30 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter mb-4 text-slate-800 uppercase font-sans break-words leading-tight">
            Dra. Maria Yvone <br className="block md:hidden" /> Chaves Mauro
          </h2>

          <h3 className="text-[10px] md:text-sm font-light tracking-[0.3em] md:tracking-[0.4em] text-slate-400 mb-10 uppercase italic">
            Professora Titular • Livre Docente • Pesquisadora
          </h3>

          <div className="max-w-3xl mx-auto space-y-8">

            <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-light italic text-center px-4">
              "A enfermagem é a ciência do cuidado, e o cuidado começa pela proteção de quem o exerce."
            </p>

            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#98FB98] to-transparent mx-auto"></div>

            <div className="text-sm md:text-base leading-relaxed text-slate-500 font-light text-justify hyphens-auto px-2 md:px-10 space-y-8">
              
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#4A7C71] uppercase mb-3 text-center md:text-left">
                  Pioneirismo e Excelência Acadêmica
                </h4>
                <p>
                  Nascida na região ribeirinha de Ituquí (PA), a Dra. Maria Yvone trilhou um caminho de profunda dedicação ao saber. Tornou-se <strong>Livre Docente e Professora Titular de Cadeira na UFRJ</strong>, instituição onde consolidou sua base científica. Sua expertise a levou a ser convidada pela <strong>UERJ</strong> para um desafio histórico: atuar como uma das <strong>criadoras e coordenadoras do projeto de Mestrado e Doutorado</strong>, onde também exerceu o cargo de Professora Titular, moldando o futuro da pós-graduação em enfermagem no estado.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#4A7C71] uppercase mb-3 text-center md:text-left">
                  Liderança na Saúde do Trabalhador
                </h4>
                <p>
                  Sua trajetória é marcada pelo desenvolvimento da enfermagem do trabalho e da ergonomia no Brasil. Atuou como pesquisadora do CNPq e consultora da CAPES, além de presidir a ANENT-RJ. Sua produção científica focada nas NRs 17 e 32 estabeleceu novos padrões para a proteção biomecânica e saúde ocupacional, integrando comitês internacionais de prestígio como a ISMA (International Stress Management Association).
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#4A7C71] uppercase mb-3 text-center md:text-left">
                  Um Legado para o Futuro
                </h4>
                <p>
                  Viúva de Armando Luis Mauro e mãe de seis filhos, une a vivência prática da saúde pública à vanguarda acadêmica. Hoje, aposentada, dedica-se ao estudo das tecnologias de comunicação para democratizar o conhecimento acumulado em mais de 60 anos de carreira. Este espaço digital é a extensão de seu compromisso: uma ferramenta viva para educar e proteger as futuras gerações da enfermagem brasileira.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}