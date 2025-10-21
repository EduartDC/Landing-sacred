// Componente Footer
export function Footer(): HTMLElement {
	const footer = document.createElement("footer");
	footer.className =
		"w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gray-900/95 backdrop-blur-md border-t border-blue-500 py-8";

	footer.innerHTML = `
    <div class="max-w-screen-xl mx-auto px-2">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-bold text-blue-500 mb-4">Sacred Project</h3>
          <p class="text-white/70 text-sm leading-relaxed">
            Creando experiencias web excepcionales desde 2025.
          </p>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Enlaces Rápidos</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#home" class="text-white/70 hover:text-blue-400 transition-colors duration-200">Inicio</a></li>
            <li><a href="#about" class="text-white/70 hover:text-blue-400 transition-colors duration-200">Acerca de</a></li>
            <li><a href="#services" class="text-white/70 hover:text-blue-400 transition-colors duration-200">Servicios</a></li>
            <li><a href="#contact" class="text-white/70 hover:text-blue-400 transition-colors duration-200">Contacto</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Servicios</h4>
          <ul class="space-y-2 text-sm text-white/70">
            <li>Desarrollo Web</li>
            <li>Aplicaciones Móviles</li>
            <li>Diseño UI/UX</li>
            <li>Consultoría</li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Síguenos</h4>
          <div class="flex flex-col space-y-2">
            <a href="#" class="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm">📘 Facebook</a>
            <a href="#" class="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm">🐦 Twitter</a>
            <a href="#" class="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm">💼 LinkedIn</a>
            <a href="#" class="text-white/70 hover:text-blue-400 transition-colors duration-200 text-sm">📸 Instagram</a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-white/10 pt-6 text-center">
        <p class="text-white/60 text-sm">&copy; 2025 Sacred Project. Todos los derechos reservados.</p>
      </div>
    </div>
  `;

	// Agregar funcionalidad de scroll suave para los enlaces
	const links = footer.querySelectorAll("a[href^='#']");
	links.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const href = link.getAttribute("href");
			if (href) {
				const targetElement = document.querySelector(href);
				targetElement?.scrollIntoView({ behavior: "smooth" });
			}
		});
	});

	return footer;
}
