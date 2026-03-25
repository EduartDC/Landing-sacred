// Página de detalles del Tour
import { languageManager } from "../utils/language";
import { Truck, User, Ticket, UtensilsCrossed, Droplets, Camera } from "lucide";
import { executePageTransition } from "../utils/transitions";
import { Contact } from "../components/Contact";

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

		// Función para obtener el HTML del icono de Lucide según el nombre
		const getIconHTML = (iconName: string): string => {
			const iconMap: { [key: string]: any } = {
				truck: Truck,
				user: User,
				ticket: Ticket,
				"utensils-crossed": UtensilsCrossed,
				droplets: Droplets,
				camera: Camera,
			};

			const icon = iconMap[iconName];
			if (!icon) return "";

			// Los iconos de Lucide son arrays de paths
			// Cada elemento es [tag, attributes, children...]
			const paths = icon
				.map((item: any) => {
					if (typeof item === "string") return item;
					const [tag, attrs] = item;
					const attrsStr = Object.entries(attrs || {})
						.map(([k, v]) => `${k}="${v}"`)
						.join(" ");
					return `<${tag} ${attrsStr}/>`;
				})
				.join("");

			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${paths}</svg>`;
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
				<img src="/${tour.image}" alt="${tour.title
			}" class="w-full h-full object-cover" style="object-position: left bottom;">
				
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="text-center text-white px-4">
						<h1 class="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">${tour.title
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
					<h2 class="text-4xl font-bold text-center text-gray-800 mb-4">${tourPageT.included.title
			}</h2>
					<p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
						${tourPageT.included.description}
					</p>
					
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						${tour.includes
				.map(
					(item: any) => `
							<div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
								<div class="w-16 h-16 mx-auto mb-4 text-emerald-600" data-icon="${item.icon}">
									<!-- Icono será insertado aquí -->
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
			${tour.gallery
				? `
			<section class="container mx-auto px-4 py-16">
				<div class="max-w-6xl mx-auto">
					<h2 class="text-4xl font-bold text-center text-gray-800 mb-12">${tourPageT.gallery.title
				}</h2>
					
					<div class="relative">
						<!-- Contenedor del carrusel -->
						<div class="overflow-hidden rounded-2xl shadow-2xl">
							<div class="carousel-container flex transition-transform duration-500 ease-in-out" id="carousel-${tourId}">
								${tour.gallery
					.map(
						(image: string, index: number) => `
									<div class="carousel-slide min-w-full">
										<img src="${image}" alt="Tour imagen ${index + 1
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
								<button onclick="window.goToSlide('${tourId}', ${index})" class="carousel-indicator w-3 h-3 rounded-full bg-gray-300 hover:bg-emerald-600 transition-colors ${index === 0 ? "bg-emerald-600" : ""
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

			<!-- Itinerario (Mapa Pirata) -->
			<section class="container mx-auto px-4 py-20 pb-24">
				<div class="max-w-5xl mx-auto">
					<h2 class="text-4xl lg:text-5xl font-bold text-center text-[#5c4033] mb-6 font-serif tracking-wide drop-shadow-sm">${tourPageT.itinerary.title}</h2>
					<p class="text-center text-[#8b7355] text-lg mb-16 max-w-2xl mx-auto font-medium">
						${tourPageT.itinerary.description}
					</p>
					
					<div class="pirate-map-bg relative max-w-6xl mx-auto p-6 md:p-12 rounded-[2rem] shadow-2xl">
						
						<!-- SVG for winding dashed path -->
						<svg class="absolute inset-0 w-full h-full pointer-events-none z-[1]" id="pirate-path-svg">
							<path id="treasure-path" fill="none" stroke="#6b3518" stroke-width="5" stroke-linecap="round" />
						</svg>
						<div class="relative z-10 space-y-12 md:space-y-20">
							${tour.itinerary
				.map((item: any, index: number) => {
					const isEven = index % 2 === 0;
					const isLast = index === tour.itinerary.length - 1;
					return `
								<div class="itinerary-step flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group">
									
									<!-- Marker (Mobile) -->
									<div class="md:hidden itinerary-dot-mobile w-12 h-12 flex-shrink-0 rounded-full bg-[#faecd4] border-[5px] border-[#6b3518] flex items-center justify-center shadow-lg relative z-20 mt-1">
										${isLast
							? `<svg class="w-6 h-6 text-red-700 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`
							: `<span class="font-bold text-[#6b3518] font-serif text-lg">${index + 1}</span>`
						}
									</div>

									<!-- Content Half -->
									<div class="w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}">
										<div class="bg-[#fcf7ea] rounded-2xl p-6 shadow-xl border-2 border-[#d6b986] hover:-translate-y-2 transition-transform duration-300 relative z-10 hover:shadow-2xl">
											<div class="flex items-center ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-between mb-3 gap-4">
												<h3 class="font-bold text-2xl text-[#6b4c38] font-serif group-hover:text-emerald-700 transition-colors">${item.title}</h3>
												<span class="text-xs font-bold text-red-900 bg-red-100/80 px-3 md:px-4 py-1.5 rounded-full uppercase tracking-widest border border-red-200 shadow-inner whitespace-nowrap flex-shrink-0 text-center">${item.time}</span>
											</div>
											<p class="text-[#8b6b52] leading-relaxed text-lg">${item.description}</p>
										</div>
									</div>
									
									<!-- Marker (Desktop) -->
									<div class="hidden md:flex justify-center w-0 itinerary-dot-desktop flex-shrink-0 relative z-20">
										<div class="w-14 h-14 rounded-full bg-[#faecd4] border-[5px] border-[#6b3518] flex items-center justify-center shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 group-hover:border-emerald-600 transition-all duration-300">
											${isLast
							? `<svg class="w-8 h-8 text-red-700 font-bold group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`
							: `<span class="font-bold text-[#6b3518] font-serif text-xl group-hover:text-emerald-600 transition-colors">${index + 1}</span>`
						}
										</div>
									</div>
									
									<!-- Empty Half -->
									<div class="hidden md:block w-1/2"></div>
								</div>
							`;
				})
				.join("")}
						</div>
					</div>
				</div>
			</section>

			<!-- Galería de Transporte -->
			<section class="container mx-auto px-4 pt-8 pb-16">
				<div class="max-w-6xl mx-auto">
					<div class="text-center mb-12">
						<h2 class="text-4xl font-bold text-[#5c4033] mb-4 font-serif tracking-wide drop-shadow-sm">${tourPageT.transportGallery.title}</h2>
						<p class="text-gray-600 text-lg max-w-2xl mx-auto">
							${tourPageT.transportGallery.description}
						</p>
					</div>
					<div class="mb-10 relative rounded-[2rem] overflow-hidden shadow-2xl border-2 border-[#d6b986]">
						<img src="/transporte.png" alt="Transporte Privado" class="w-full h-[300px] md:h-[450px] object-cover">
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
							<h3 class="text-3xl md:text-5xl font-bold text-white mb-3 font-serif tracking-wide drop-shadow-lg">${tourPageT.transportGallery.bannerTitle}</h3>
							<p class="text-emerald-300 text-lg md:text-2xl font-medium drop-shadow-md">${tourPageT.transportGallery.bannerDesc}</p>
						</div>
					</div>
					
					<div class="grid sm:grid-cols-2 gap-6 md:gap-8">
						<div class="relative group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow aspect-video bg-gray-100 border-2 border-[#d6b986]">
							<img src="/honda_exterior.png" alt="Honda HR-V Exterior" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<p class="text-white p-6 md:p-8 font-semibold shadow-sm text-lg tracking-wide leading-tight">Honda HR-V<br><span class="text-sm font-normal text-emerald-300">${tourPageT.transportGallery.hondaExt}</span></p>
							</div>
						</div>
						<div class="relative group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow aspect-video bg-gray-100 border-2 border-[#d6b986]">
							<img src="/honda_interior.png" alt="Honda HR-V Interior" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<p class="text-white p-6 md:p-8 font-semibold shadow-sm text-lg tracking-wide leading-tight">Honda HR-V<br><span class="text-sm font-normal text-emerald-300">${tourPageT.transportGallery.hondaInt}</span></p>
							</div>
						</div>
						<div class="relative group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow aspect-video bg-gray-100 border-2 border-[#d6b986]">
							<img src="/hiace_exterior.png" alt="Toyota Hiace Exterior" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<p class="text-white p-6 md:p-8 font-semibold shadow-sm text-lg tracking-wide leading-tight">Toyota Hiace<br><span class="text-sm font-normal text-emerald-300">${tourPageT.transportGallery.hiaceExt}</span></p>
							</div>
						</div>
						<div class="relative group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow aspect-video bg-gray-100 border-2 border-[#d6b986]">
							<img src="/hice_interior.png" alt="Toyota Hiace Interior" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<p class="text-white p-6 md:p-8 font-semibold shadow-sm text-lg tracking-wide leading-tight">Toyota Hiace<br><span class="text-sm font-normal text-emerald-300">${tourPageT.transportGallery.hiaceInt}</span></p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Llamado a la acción -->
			<section class="container mx-auto px-4 py-16">
				<div class="max-w-4xl mx-auto">
					<div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
						<div class="absolute inset-0 bg-black/10"></div>
						<div class="relative z-10">
							<h2 class="text-4xl font-bold mb-4" style="color: white !important;">${tourPageT.cta.title
			}</h2>
							<p class="text-xl mb-8 text-emerald-50">
								${tourPageT.cta.description}
							</p>
							<div class="flex flex-col sm:flex-row gap-4 justify-center">
								<a href="#contact" id="book-tour-btn" class="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
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
						<h2 class="text-4xl font-bold text-gray-800 mb-4">${tourPageT.recommendations.title
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
										<h4 class="font-bold text-blue-900 mb-2">${tourPageT.recommendations.importantTitle
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
					<a href="#home" id="back-to-home-btn" class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-lg transition-colors">
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

		// Añadir el formulario de contacto al final
		const container = tourPage.querySelector('.max-w-screen-2xl');
		if (container) {
			const contactForm = Contact(tour.id);
			container.appendChild(contactForm);
		}

		setupStyles();

		// Insertar iconos de Lucide después de renderizar
		setTimeout(() => {
			tour.includes.forEach((item: any) => {
				const iconContainer = tourPage.querySelector(`[data-icon="${item.icon}"]`);
				if (iconContainer) {
					const iconHTML = getIconHTML(item.icon);
					iconContainer.innerHTML = iconHTML;
				}
			});

			// Agregar event listener al botón de reserva para scroll local
			const bookBtn = tourPage.querySelector("#book-tour-btn");
			if (bookBtn) {
				bookBtn.addEventListener("click", (e) => {
					e.preventDefault();
					const contactSection = tourPage.querySelector("#contact");
					if (contactSection) {
						contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
					}
				});
			}

			// Agregar event listener al botón de volver con transición
			const backBtn = tourPage.querySelector("#back-to-home-btn");
			if (backBtn) {
				backBtn.addEventListener("click", async (e) => {
					e.preventDefault();

					await executePageTransition(() => {
						window.location.hash = "#services";
					});
				});
			}

			// Dibujar la línea animada (camino pirata)
			const pirateContainer = tourPage.querySelector('.pirate-map-bg') as HTMLElement;
			if (pirateContainer) {
				const drawPiratePath = () => {
					const path = tourPage.querySelector('#treasure-path') as SVGPathElement;
					if (!pirateContainer || !path) return;

					const isMobile = window.innerWidth < 768;
					const markers = Array.from(tourPage.querySelectorAll(
						isMobile ? '.itinerary-dot-mobile' : '.itinerary-dot-desktop'
					)) as HTMLElement[];

					if (markers.length < 2) return;

					const containerRect = pirateContainer.getBoundingClientRect();
					let d = '';

					markers.forEach((marker, i) => {
						const rect = marker.getBoundingClientRect();
						const x = rect.left + rect.width / 2 - containerRect.left;
						const y = rect.top + rect.height / 2 - containerRect.top;

						if (i === 0) {
							d += `M ${x} ${y} `;
						} else {
							const prevMarker = markers[i - 1];
							const prevRect = prevMarker.getBoundingClientRect();
							const prevX = prevRect.left + prevRect.width / 2 - containerRect.left;
							const prevY = prevRect.top + prevRect.height / 2 - containerRect.top;

							const curviness = isMobile ? 30 : 60;
							const dir = i % 2 === 0 ? 1 : -1;

							const cp1X = prevX + (curviness * dir);
							const cp1Y = prevY + (y - prevY) / 3;
							const cp2X = x + (curviness * dir);
							const cp2Y = prevY + (y - prevY) * 2 / 3;

							d += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y} `;
						}
					});

					path.setAttribute('d', d);
				};

				// Observar cambios para repintar la curva (responsive o transiciones)
				const resizeObserver = new ResizeObserver(() => {
					drawPiratePath();
				});
				resizeObserver.observe(pirateContainer);

				// Disparar en primer plano una vez que la UI haya montado
				setTimeout(drawPiratePath, 150);
			}
		}, 0);
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

				/* CSS para mapa pirata animado */
				.pirate-map-bg {
					background-color: #e3cba8;
					border: 2px solid #a67b5b;
					box-shadow: inset 0 0 60px rgba(107, 53, 24, 0.3), 0 20px 40px rgba(0,0,0,0.15);
					position: relative;
				}
				.pirate-map-bg::before {
					content: "";
					position: absolute;
					inset: 0;
					background-image: url("/pirate_map_bg.png");
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					opacity: 0.70;
					z-index: 0;
					border-radius: inherit;
					pointer-events: none;
				}
				
				#treasure-path {
					stroke-dasharray: 8 12;
					animation: map-march 1s linear infinite reverse;
				}
				
				@keyframes map-march {
					to { stroke-dashoffset: 20; }
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
