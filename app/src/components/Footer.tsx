"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-black/60 backdrop-blur-md border-t border-[#222] py-20 px-6 md:px-20 z-40 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        <div className="md:w-1/2">
           <h2 className="text-4xl font-heading font-black text-white uppercase mb-6">F1 2025</h2>
           <p className="text-sm font-mono text-silver mb-8 max-w-sm decoration-silver">
             A conceptual scrollytelling experience exploring the pinnacle of motorsport data and aesthetics.
           </p>
           
           <button className="bg-white text-black font-heading uppercase font-bold py-3 px-8 rounded hover:bg-ferrari hover:text-white transition-colors">
              Build Fantasy Grid
           </button>
        </div>

        <div className="md:w-1/2 flex gap-12 font-mono text-sm">
           <div>
             <h3 className="text-white font-bold mb-4 uppercase tracking-widest border-b border-[#333] pb-2">Glossary</h3>
             <ul className="space-y-4 text-silver">
               <li><strong className="text-white">DRS:</strong> Drag Reduction System</li>
               <li><strong className="text-white">ERS:</strong> Energy Recovery System</li>
               <li><strong className="text-white">Undercut:</strong> Pitting early to gain track position.</li>
               <li><strong className="text-white">Slipstream:</strong> Following a car to reduce aerodynamic drag.</li>
             </ul>
           </div>
           
           <div>
             <h3 className="text-white font-bold mb-4 uppercase tracking-widest border-b border-[#333] pb-2">Links</h3>
             <ul className="space-y-4 text-silver">
               <li className="hover:text-white cursor-pointer transition-colors">Standings</li>
               <li className="hover:text-white cursor-pointer transition-colors">Calendar</li>
               <li className="hover:text-white cursor-pointer transition-colors">Teams</li>
               <li className="hover:text-white cursor-pointer transition-colors">Rules 2025</li>
             </ul>
           </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#111] text-center font-mono text-xs text-silver/50">
         © 2025 Formula One Conceptual Design. Not affiliated with FOM.
      </div>
    </footer>
  );
}
