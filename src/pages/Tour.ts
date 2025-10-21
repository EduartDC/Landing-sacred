// Página de detalles del Tour
import { languageManager } from "../utils/language";

export function Tour(tourId: string): HTMLElement {
	const tourPage = document.createElement("div");
	tourPage.className = "tour-page min-h-screen";

	// Aplicar el patrón de fondo al contenedor principal
	tourPage.style.cssText = `
		background-color: #ebe7e1;
		background-image: url('/background-maya.png');
		background-size: auto;
		background-position: center;
		background-repeat: repeat;
		background-attachment: fixed;
		background-blend-mode: soft-light;
	`;

	const renderContent = () => {
		const translations = languageManager.getTranslations();
		const tours = (translations.services as any).tours;
		const tour = tours.find((t: any) => t.id === tourId);
		const tourPageT = (translations as any).tourPage;

		// Limpiar overlays DESPUÉS de que el contenido se haya renderizado
		// Esto evita que se eliminen durante la animación de transición
		setTimeout(() => {
			const overlays = document.querySelectorAll(
				".slide-transition-overlay, .transition-overlay"
			);
			overlays.forEach((overlay) => overlay.remove());

			// Asegurar que el scroll esté habilitado
			document.body.style.overflow = "";
		}, 1500); // Esperar a que termine la transición completa

		// Función para convertir emojis a iconos SVG
		const getIconSVG = (emoji: string) => {
			const icons: { [key: string]: string } = {
				"🚐": `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
				</svg>`,
				"👨‍🏫": `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
				</svg>`,
				"🎫": `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
				</svg>`,
				"🌮": `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
				</svg>`,
				"💧": `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
				</svg>`,
				"📸": `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
				</svg>`,
			};
			return icons[emoji] || emoji;
		};

		if (!tour) {
			tourPage.innerHTML = `
				<div class="container mx-auto px-4 py-20 text-center">
					<h1 class="text-4xl font-bold text-gray-800 mb-4">${tourPageT.notFound.title}</h1>
					<p class="text-gray-600 mb-8">${tourPageT.notFound.description}</p>
					<a href="#home" class="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
						${tourPageT.notFound.button}
					</a>
				</div>
			`;
			return;
		}

		tourPage.innerHTML = `
			<!-- Hero Section con imagen del tour - Ancho completo -->
			<section class="tour-hero relative h-[60vh] min-h-[500px] overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
				<img src="/${tour.image}" alt="${
			tour.title
		}" class="w-full h-full object-cover" style="object-position: left bottom;">
				
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="text-center text-white px-4">
						<h1 class="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">${
							tour.title
						}</h1>
						<p class="text-xl md:text-2xl text-gray-200 mb-6">${tour.location}</p>
						<div class="flex items-center justify-center gap-6 text-lg">
							<span class="flex items-center gap-2">
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
								</svg>
								${tour.duration}
							</span>
							<span class="flex items-center gap-2">
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
								</svg>
								${tour.location}
							</span>
						</div>
					</div>
				</div>
			</section>

			<!-- Contenedor con fondo blanco y márgenes para el resto del contenido -->
			<div class="max-w-screen-2xl mx-auto bg-white shadow-2xl">
				<!-- Descripción del Tour -->
				<section class="container mx-auto px-4 py-16">
					<div class="max-w-4xl mx-auto">
						<div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 -mt-32 relative z-10 border border-gray-100">
							<h2 class="text-3xl font-bold text-gray-800 mb-6">${tourPageT.aboutTour}</h2>
							<p class="text-gray-700 text-lg leading-relaxed mb-8">
								${tour.fullDescription}
							</p>
						
						<div class="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
							<div class="text-center">
								<div class="w-12 h-12 mx-auto mb-3 text-emerald-600">
									<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
									</svg>
								</div>
								<div class="font-semibold text-gray-800">${tour.activityLevel}</div>
								<div class="text-sm text-gray-600">${tourPageT.activityLevel}</div>
							</div>
							<div class="text-center">
								<div class="w-12 h-12 mx-auto mb-3 text-emerald-600">
									<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
									</svg>
								</div>
								<div class="font-semibold text-gray-800">${tour.ageRestriction}</div>
								<div class="text-sm text-gray-600">${tourPageT.ages}</div>
							</div>
							<div class="text-center">
								<div class="w-12 h-12 mx-auto mb-3 text-emerald-600">
									<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
									</svg>
								</div>
								<div class="font-semibold text-gray-800">${tourPageT.transportType}</div>
								<div class="text-sm text-gray-600">${tourPageT.transport}</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Lo que incluye el tour -->
			<section class="container mx-auto px-4 py-16 bg-gradient-to-b from-emerald-50 to-white">
				<div class="max-w-6xl mx-auto">
					<h2 class="text-4xl font-bold text-center text-gray-800 mb-4">${
						tourPageT.included.title
					}</h2>
					<p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
						${tourPageT.included.description}
					</p>
					
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						${tour.includes
							.map(
								(item: any) => `
							<div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
								<div class="w-16 h-16 mx-auto mb-4 text-emerald-600">
									${getIconSVG(item.icon)}
								</div>
								<h3 class="font-bold text-xl text-gray-800 mb-2">${item.title}</h3>
								<p class="text-gray-600">${item.description}</p>
							</div>
						`
							)
							.join("")}
					</div>
				</div>
			</section>

			<!-- Carrusel de Imágenes -->
			${
				tour.gallery
					? `
			<section class="container mx-auto px-4 py-16">
				<div class="max-w-6xl mx-auto">
					<h2 class="text-4xl font-bold text-center text-gray-800 mb-12">${
						tourPageT.gallery.title
					}</h2>
					
					<div class="relative">
						<!-- Contenedor del carrusel -->
						<div class="overflow-hidden rounded-2xl shadow-2xl">
							<div class="carousel-container flex transition-transform duration-500 ease-in-out" id="carousel-${tourId}">
								${tour.gallery
									.map(
										(image: string, index: number) => `
									<div class="carousel-slide min-w-full">
										<img src="${image}" alt="Tour imagen ${
											index + 1
										}" class="w-full h-[500px] object-cover" style="object-position: left bottom;">
									</div>
								`
									)
									.join("")}
							</div>
						</div>
						
						<!-- Botones de navegación -->
						<button onclick="window.previousSlide('${tourId}')" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>
						</button>
						<button onclick="window.nextSlide('${tourId}')" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</button>
						
						<!-- Indicadores -->
						<div class="flex justify-center gap-2 mt-6">
							${tour.gallery
								.map(
									(_: any, index: number) => `
								<button onclick="window.goToSlide('${tourId}', ${index})" class="carousel-indicator w-3 h-3 rounded-full bg-gray-300 hover:bg-emerald-600 transition-colors ${
										index === 0 ? "bg-emerald-600" : ""
									}" data-carousel="${tourId}" data-index="${index}"></button>
							`
								)
								.join("")}
						</div>
					</div>
				</div>
			</section>
			`
					: ""
			}

			<!-- Itinerario -->
			<section class="container mx-auto px-4 py-16">
				<div class="max-w-4xl mx-auto">
					<h2 class="text-4xl font-bold text-center text-gray-800 mb-4">${
						tourPageT.itinerary.title
					}</h2>
					<p class="text-center text-gray-600 text-lg mb-12">
						${tourPageT.itinerary.description}
					</p>
					
					<div class="space-y-6">
						${tour.itinerary
							.map(
								(item: any, index: number) => `
							<div class="flex gap-6 group">
								<div class="flex-shrink-0">
									<div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
										${index + 1}
									</div>
								</div>
								<div class="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
									<div class="flex items-center justify-between mb-2">
										<h3 class="font-bold text-xl text-gray-800">${item.title}</h3>
										<span class="text-emerald-600 font-semibold">${item.time}</span>
									</div>
									<p class="text-gray-600">${item.description}</p>
								</div>
							</div>
						`
							)
							.join("")}
					</div>
				</div>
			</section>

			<!-- Llamado a la acción -->
			<section class="container mx-auto px-4 py-16">
				<div class="max-w-4xl mx-auto">
					<div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
						<div class="absolute inset-0 bg-black/10"></div>
						<div class="relative z-10">
							<h2 class="text-4xl font-bold mb-4" style="color: white !important;">${
								tourPageT.cta.title
							}</h2>
							<p class="text-xl mb-8 text-emerald-50">
								${tourPageT.cta.description}
							</p>
							<div class="flex flex-col sm:flex-row gap-4 justify-center">
								<a href="#contact" class="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
									${tourPageT.cta.bookButton}
								</a>
								<a href="https://wa.me/529841234567" target="_blank" class="bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
									<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
									</svg>
									${tourPageT.cta.whatsappButton}
								</a>
							</div>
							<p class="text-emerald-100 mt-6 text-sm">
								${tourPageT.cta.guarantee}
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Recomendaciones -->
			<section class="container mx-auto px-4 py-16 bg-gradient-to-b from-amber-50 to-white">
				<div class="max-w-4xl mx-auto">
					<div class="text-center mb-12">
						<h2 class="text-4xl font-bold text-gray-800 mb-4">${
							tourPageT.recommendations.title
						}</h2>
						<p class="text-gray-600 text-lg">
							${tourPageT.recommendations.description}
						</p>
					</div>
					
					<div class="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
						<div class="grid md:grid-cols-2 gap-4">
							${tour.recommendations
								.map(
									(item: string) => `
								<div class="flex items-start gap-3 p-4 rounded-lg hover:bg-amber-50 transition-colors">
									<svg class="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
									</svg>
									<span class="text-gray-700">${item}</span>
								</div>
							`
								)
								.join("")}
						</div>
						
						<div class="mt-8 pt-8 border-t border-gray-200">
							<div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
								<div class="flex items-start gap-3">
									<svg class="w-8 h-8 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
									</svg>
									<div>
										<h4 class="font-bold text-blue-900 mb-2">${
											tourPageT.recommendations.importantTitle
										}</h4>
										<p class="text-blue-800 text-sm">
											${tourPageT.recommendations.importantText.replace("{area}", tour.pickupArea)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Botón volver -->
			<section class="container mx-auto px-4 py-8 pb-16">
				<div class="text-center">
					<a href="#home" class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-lg transition-colors">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
						</svg>
						${tourPageT.backButton}
					</a>
				</div>
			</section>
			</div>
			<!-- Fin contenedor con fondo blanco -->
		`;

		setupStyles();
	};

	const setupStyles = () => {
		if (!document.querySelector("#tour-page-styles")) {
			const style = document.createElement("style");
			style.id = "tour-page-styles";
			style.textContent = `
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 1s ease-out;
				}

				.tour-hero img {
					transition: transform 0.3s ease;
				}

				.tour-hero:hover img {
					transform: scale(1.05);
				}

				/* Scroll suave */
				html {
					scroll-behavior: smooth;
				}

				/* Mejora de hover en tarjetas */
				.group:hover .flex-shrink-0 > div {
					transform: scale(1.1) rotate(5deg);
				}
			`;
			document.head.appendChild(style);
		}

		// Funcionalidad del carrusel
		const carouselStates = new Map<string, number>();

		(window as any).nextSlide = (tourId: string) => {
			const carousel = document.getElementById(`carousel-${tourId}`);
			if (!carousel) return;

			const slides = carousel.querySelectorAll(".carousel-slide");
			const currentIndex = carouselStates.get(tourId) || 0;
			const nextIndex = (currentIndex + 1) % slides.length;

			carousel.style.transform = `translateX(-${nextIndex * 100}%)`;
			carouselStates.set(tourId, nextIndex);
			updateIndicators(tourId, nextIndex);
		};

		(window as any).previousSlide = (tourId: string) => {
			const carousel = document.getElementById(`carousel-${tourId}`);
			if (!carousel) return;

			const slides = carousel.querySelectorAll(".carousel-slide");
			const currentIndex = carouselStates.get(tourId) || 0;
			const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;

			carousel.style.transform = `translateX(-${prevIndex * 100}%)`;
			carouselStates.set(tourId, prevIndex);
			updateIndicators(tourId, prevIndex);
		};

		(window as any).goToSlide = (tourId: string, index: number) => {
			const carousel = document.getElementById(`carousel-${tourId}`);
			if (!carousel) return;

			carousel.style.transform = `translateX(-${index * 100}%)`;
			carouselStates.set(tourId, index);
			updateIndicators(tourId, index);
		};

		function updateIndicators(tourId: string, activeIndex: number) {
			const indicators = document.querySelectorAll(`[data-carousel="${tourId}"]`);
			indicators.forEach((indicator, index) => {
				if (index === activeIndex) {
					indicator.classList.add("bg-emerald-600");
					indicator.classList.remove("bg-gray-300");
				} else {
					indicator.classList.remove("bg-emerald-600");
					indicator.classList.add("bg-gray-300");
				}
			});
		}

		// Inicializar el estado del primer slide
		carouselStates.set(tourId, 0);
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(renderContent);

	return tourPage;
}
