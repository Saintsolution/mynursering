import { ExternalLink, BookOpen, ShieldCheck, Scale, FileText, Briefcase, AlertTriangle } from 'lucide-react';

export default function ResourcesSection() {
  const resources = [
    { title: 'NR-17 - Ergonomia', icon: <BookOpen size={20} />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-17-nr-17' },
    { title: 'NR-32 - Saúde em Serviços', icon: <ShieldCheck size={20} />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-32-nr-32' },
    { title: 'CLT - Leis do Trabalho', icon: <Scale size={20} />, url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' },
    { title: 'NR-06 - EPI', icon: <AlertTriangle size={20} />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-6-nr-6' },
    { title: 'NR-09 - Riscos', icon: <FileText size={20} />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-9-nr-9' },
    { title: 'NR-07 - PCMSO', icon: <Briefcase size={20} />, url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-7-nr-7' }
  ];

  return (
    <section id="recursos" className="py-16 md:py-20 bg-[#FDFCFB]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-700 mb-2 uppercase tracking-tighter italic">Recursos Técnicos</h2>
          <div className="h-[2px] w-16 bg-[#98FB98] mx-auto rounded-full mb-3"></div>
          <p className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-light">Normas e Fundamentos da Saúde</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {resources.map((res, i) => (
            <a 
              key={i} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              // Reduzi o padding de p-12 para p-6 e arredondamento para rounded-[2rem]
              className="group bg-white border border-[#98FB98]/20 rounded-[2rem] p-6 md:p-8 transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(152,251,152,0.1)] hover:border-[#98FB98]/50 flex flex-col items-center text-center h-full justify-between"
            >
              <div>
                {/* Ícone menor e caixa do ícone reduzida */}
                <div className="w-12 h-12 bg-[#F7FAF9] flex items-center justify-center mb-5 text-[#4A7C71] group-hover:bg-[#98FB98]/20 transition-colors shadow-inner rounded-xl mx-auto">
                  {res.icon}
                </div>

                <h3 className="text-[10px] md:text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-4 group-hover:text-black px-1 leading-snug">
                  {res.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-[8px] font-bold text-[#4A7C71]/50 group-hover:text-[#4A7C71] uppercase tracking-[0.2em] border-t border-slate-50 pt-4 w-full justify-center group-hover:border-[#98FB98]/20 transition-colors">
                Acessar <ExternalLink size={10} className="text-[#98FB98]" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}