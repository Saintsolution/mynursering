import { GraduationCap } from 'lucide-react';

export default function PresentationSection() {
  return (
    <section className="py-24 bg-[#FDFCFB]">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <div className="inline-flex items-center gap-2 bg-[#E8F3F1] text-[#4A7C71] px-5 py-2 rounded-full mb-10 border border-[#98FB98]/20">
          <GraduationCap className="w-4 h-4" />
          <span className="font-bold tracking-widest text-[10px] uppercase">Legado Acadêmico</span>
        </div>

        <div className="bg-white p-12 rounded-[3rem] border border-[#98FB98]/30 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter mb-4 text-slate-800 uppercase font-sans whitespace-nowrap">
            Dra. Maria Yvone Chaves Mauro
          </h2>

          <h3 className="text-xs md:text-sm font-light tracking-[0.4em] text-slate-400 mb-10 uppercase">
            Professora Enfermeira Doutora
          </h3>

          <div className="max-w-3xl mx-auto space-y-6">

            <p className="text-xl leading-relaxed text-slate-600 font-light italic text-center">
              "A enfermagem é a ciência do cuidado, e o cuidado começa pela proteção de quem o exerce."
            </p>

            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#98FB98] to-transparent mx-auto my-8"></div>

            <div className="text-base leading-relaxed text-slate-500 font-light text-center px-4 md:px-10">
              <p>
                [Aqui você insere o texto sobre a vida e carreira dela. O espaço está pronto para receber sua homenagem com total leveza e doçura.]
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}