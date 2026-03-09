import { ExternalLink, BookOpen, ShieldCheck, Scale, FileText, Briefcase, AlertTriangle } from 'lucide-react';

export default function ResourcesSection() {
  const resources = [
    { title: 'NR-17 - Ergonomia', icon: <BookOpen />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-17.pdf' },
    { title: 'NR-32 - Saúde em Serviços', icon: <ShieldCheck />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-32-atualizada-2020.pdf' },
    { title: 'CLT - Leis do Trabalho', icon: <Scale />, url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' },
    { title: 'NR-06 - EPI', icon: <AlertTriangle />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-06-atualizada-2020.pdf' },
    { title: 'NR-09 - Riscos', icon: <FileText />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-09-atualizada-2020.pdf' },
    { title: 'NR-07 - PCMSO', icon: <Briefcase />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-07-atualizada-2020.pdf' }
  ];

  return (
    <section id="recursos" className="py-24 bg-[#FDFCFB]">
      <div className="max-w-6xl mx-auto px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-700 mb-3 uppercase tracking-tighter italic">Recursos Técnicos</h2>
          <div className="h-[2px] w-20 bg-[#98FB98] mx-auto rounded-full mb-4"></div>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.4em] font-light">Normas e Fundamentos da Saúde</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resources.map((res, i) => (
            <a 
              key={i} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-white border border-[#98FB98]/30 rounded-[3rem] p-12 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(152,251,152,0.15)] hover:border-[#98FB98] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#F7FAF9] flex items-center justify-center mb-8 text-[#4A7C71] group-hover:bg-[#98FB98]/20 transition-colors shadow-inner rounded-[1.5rem]">
                {res.icon}
              </div>

              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-6 group-hover:text-black px-2 leading-relaxed">
                {res.title}
              </h3>

              <div className="flex items-center gap-2 text-[9px] font-bold text-[#98FB98] uppercase tracking-[0.2em] border-t border-slate-50 pt-6 w-full justify-center group-hover:border-[#98FB98]/20">
                Acessar <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}