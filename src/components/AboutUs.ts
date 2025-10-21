// Componente AboutUs
import { languageManager, t } from "../utils/language";

export function AboutUs(): HTMLElement {
	const aboutUs = document.createElement("section");
	aboutUs.className = "center-component center-component-first";
	aboutUs.id = "about";

	// Función para renderizar el contenido
	const renderContent = () => {
		aboutUs.innerHTML = `
		<div class="grid lg:grid-cols-2 gap-12 items-start">
			<!-- Contenido de texto a la izquierda -->
			<div class="text-left">
				<h2 class="text-3xl font-bold text-ocean-800 mb-6">${t("about.title")}</h2>
				<p class="text-gray-600 text-lg leading-relaxed mb-6">${t(
					"about.description"
				)}</p>
				<p class="text-gray-600 text-lg leading-relaxed mb-8">${t("about.textInfo")}</p>
				
				<!-- Estadísticas -->
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
					<div class="text-center">
						<div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
							</svg>
						</div>
						<div class="text-2xl font-bold text-gray-800 mb-1">50+</div>
						<div class="text-sm text-gray-600">Destinos</div>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
							</svg>
						</div>
						<div class="text-2xl font-bold text-gray-800 mb-1">10k+</div>
						<div class="text-sm text-gray-600">Clientes Felices</div>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
							</svg>
						</div>
						<div class="text-2xl font-bold text-gray-800 mb-1">10</div>
						<div class="text-sm text-gray-600">Años de Experiencia</div>
					</div>
				</div>
			</div>
			<!-- Galería de imágenes a la derecha -->
			<div class="relative">
				<div class="grid grid-cols-2 gap-4">
					<!-- Columna izquierda - más arriba -->
					<div class="space-y-4">
						<div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
							<img src="/about-uno.jpg" alt="Sacred About 1" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" style="object-position: left bottom;">
							<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
						</div>
						<div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
							<img src="/about-tres.jpg" alt="Sacred About 3" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
							<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
						</div>
					</div>
					
					<!-- Columna derecha - más abajo -->
					<div class="space-y-4 pt-8">
						<div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
							<img src="/about-dos.jpg" alt="Sacred About 2" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
							<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
						</div>
						<div class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
							<img src="/about-cuatro.jpg" alt="Sacred About 4" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
							<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(() => {
		renderContent();
	});

	return aboutUs;
}
