// src/components/MemoriesSection.tsx

export default function MemoriesSection() {
  // Array com as 20 legendas individuais para você editar uma por uma
  const captions = [
    "Legenda da Foto 01", "Legenda da Foto 02", "Legenda da Foto 03", 
    "Legenda da Foto 04", "Legenda da Foto 05", "Legenda da Foto 06", 
    "Legenda da Foto 07", "Legenda da Foto 08", "Legenda da Foto 09", 
    "Legenda da Foto 10", "Legenda da Foto 11", "Legenda da Foto 12", 
    "Legenda da Foto 13", "Legenda da Foto 14", "Legenda da Foto 15", 
    "Legenda da Foto 16", "Legenda da Foto 17", "Legenda da Foto 18", 
    "Legenda da Foto 19", "Legenda da Foto 20"
  ];

  const photos = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/foto${((i % 10) + 1).toString().padStart(2, '0')}.png`,
    caption: captions[i]
  }));

  return (
    <div className="bg-white py-32 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl font-medium tracking-tighter text-black uppercase mb-2 font-sans">
            Memórias
          </h2>
          <div className="h-[2px] w-20 bg-[#98FB98] mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => {
            // Estilos estáticos para evitar erros de TypeScript no VS Code
            const containerClass = "relative aspect-[3/4] overflow-hidden bg-slate-100 group border border-black/5 shadow-sm";
            const imgClass = "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000";
            const overlayClass = "absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500";
            const textClass = "text-[10px] text-white font-light tracking-[0.2em] uppercase leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]";

            return (
              <div key={photo.id} className={containerClass}>
                <img 
                  src={photo.src} 
                  alt="Histórico" 
                  className={imgClass} 
                />
                <div className={overlayClass}>
                  <span className={textClass}>
                    {photo.caption}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}