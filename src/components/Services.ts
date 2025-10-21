import { languageManager, t } from "../utils/language.ts";

// Componente Services
export function Services(): HTMLElement {
	const services = document.createElement("section");
	services.className = "center-component";
	services.id = "services";

	let currentSlide = 0;
	let autoSlideInterval: number;

	const renderContent = () => {
		const translations = languageManager.getTranslations();
		const tours = (translations.services as any).tours as Array<{
			id: string;
			title: string;
			description: string;
			image: string;
			location: string;
			duration: string;
		}>;

		// Crear array duplicado para carrusel continuo
		const extendedTours = [...tours, ...tours];

		const toursHTML = extendedTours
			.map((tour, index) => {
				// Asignar imágenes específicas según el tour
				let imagePath = "";
				switch (tour.id) {
					case "legacy-chichen":
						imagePath = "/about-uno.jpg";
						break;
					case "mystic-waters":
						imagePath = "/about-dos.jpg";
						break;
					case "bohemian-ritual":
						imagePath = "/about-tres.jpg";
						break;
					case "visual-routes":
						imagePath = "/about-cuatro.jpg";
						break;
					case "tulum-origins":
						imagePath = "/about-uno.jpg"; // Reutilizar imagen
						break;
					default:
						imagePath = "/about-uno.jpg";
				}

				return `
			<div class="tour-slide ${index === 0 ? "active" : ""}" data-index="${index}">
				<div class="tour-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col h-[640px]" data-tour-id="${
					tour.id
				}">
					<div class="tour-image-container relative h-72 overflow-hidden flex-shrink-0">
						<img src="${imagePath}" alt="${tour.title}" class="w-full h-full object-cover">
						<div class="absolute inset-0 bg-black bg-opacity-20"></div>
					</div>
					<div class="p-8 flex-1 flex flex-col">
						<h3 class="text-xl font-bold text-ocean-800 mb-4">${tour.title}</h3>
						<p class="text-gray-600 leading-relaxed mb-6">${tour.description}</p>
						
						<!-- Información de ubicación y duración -->
						<div class="mb-6 space-y-3">
							<div class="flex items-center text-sm text-gray-500">
								<svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
								</svg>
								<span>${tour.location}</span>
							</div>
							<div class="flex items-center text-sm text-gray-500">
								<svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								<span>${tour.duration}</span>
							</div>
						</div>
						
						<div class="flex items-center justify-center mt-auto pt-4 pb-4">
							<button class="bg-emerald-500 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-colors duration-200">
								Ver Detalles
							</button>
						</div>
					</div>
				</div>
			</div>
		`;
			})
			.join("");

		services.innerHTML = `
		<div>
			<h2 class="text-3xl font-bold text-sand-50 mb-4 text-center">${t(
				"services.title"
			)}</h2>
			<p class="text-black text-base leading-relaxed mb-12 text-center max-w-4xl mx-auto">
				${t("services.description")}
			</p>
			
			<div class="tours-carousel-container relative">
				<div class="tours-carousel overflow-hidden">
					<div class="tours-track flex transition-transform duration-500 ease-in-out">
						${toursHTML}
					</div>
				</div>
				
				<!-- Controles del carrusel -->
				<button class="carousel-btn carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10">
					<svg class="w-6 h-6 text-ocean-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>
				
				<button class="carousel-btn carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10">
					<svg class="w-6 h-6 text-ocean-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</button>
				
				<!-- Indicadores -->
				<div class="carousel-indicators flex justify-center mt-6 space-x-2">
					${Array.from(
						{ length: tours.length },
						(_, index) => `
						<button class="indicator w-3 h-3 rounded-full transition-all duration-200 ${
							index === 0 ? "bg-emerald-500" : "bg-gray-300"
						}" data-slide="${index}"></button>
					`
					).join("")}
				</div>
			</div>
		</div>
	`;

		setupCarousel(tours.length);
	};

	const setupCarousel = (originalToursLength: number) => {
		const track = services.querySelector(".tours-track") as HTMLElement;
		const prevBtn = services.querySelector(".carousel-prev") as HTMLElement;
		const nextBtn = services.querySelector(".carousel-next") as HTMLElement;
		const indicators = services.querySelectorAll(
			".indicator"
		) as NodeListOf<HTMLElement>;
		const tourCards = services.querySelectorAll(
			".tour-card"
		) as NodeListOf<HTMLElement>;

		const totalSlides = originalToursLength * 2; // Array extendido

		// Configurar estilos del carrusel
		const setupStyles = () => {
			const style = document.createElement("style");
			style.textContent = `
				.tours-carousel-container {
					max-width: 1200px;
					margin: 0 auto;
					padding: 20px;
				}
				
				.tours-carousel {
					overflow: hidden;
					border-radius: 12px;
					padding: 25px 15px;
					margin: -25px -15px;
				}
				
				.tours-track {
					display: flex;
					transition: transform 0.5s ease-in-out;
				}
				
				.tour-slide {
					flex: 0 0 100%;
					padding: 0 10px;
				}
				
				@media (min-width: 768px) {
					.tour-slide {
						flex: 0 0 33.333%;
					}
				}
				
				.tour-card {
					display: flex;
					flex-direction: column;
				}
				
				.tour-image-container {
					background: linear-gradient(135deg, #0ea5e9 0%, #10b981 100%);
					flex-shrink: 0;
				}
				
				.tour-card .p-6 {
					flex: 1;
					display: flex;
					flex-direction: column;
				}
			`;
			document.head.appendChild(style);
		};

		setupStyles();

		const updateCarousel = () => {
			// Para mostrar 3 cards, cada una debe ocupar 33.333% del contenedor
			const slidesPerView = window.innerWidth >= 768 ? 3 : 1;
			const slideWidth = 100 / slidesPerView;
			track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

			// Actualizar indicadores basado en la posición real en el array original
			const actualPosition = currentSlide % originalToursLength;

			indicators.forEach((indicator, index) => {
				indicator.classList.toggle("bg-emerald-500", index === actualPosition);
				indicator.classList.toggle("bg-gray-300", index !== actualPosition);
			});

			// Resetear posición cuando llegamos al final del primer set
			if (currentSlide >= originalToursLength) {
				setTimeout(() => {
					track.style.transition = "none";
					currentSlide = 0;
					track.style.transform = `translateX(0%)`;
					setTimeout(() => {
						track.style.transition = "transform 0.5s ease-in-out";
					}, 50);
				}, 500);
			}
		};

		const nextSlide = () => {
			if (currentSlide < totalSlides - 1) {
				currentSlide++;
			} else {
				currentSlide = 0;
			}
			updateCarousel();
		};

		const prevSlide = () => {
			if (currentSlide > 0) {
				currentSlide--;
			} else {
				// Ir al final del primer set (antes de que se duplique)
				currentSlide = originalToursLength - 1;
			}
			updateCarousel();
		};

		const goToSlide = (slideIndex: number) => {
			currentSlide = slideIndex;
			updateCarousel();
		};

		// Event listeners
		nextBtn.addEventListener("click", nextSlide);
		prevBtn.addEventListener("click", prevSlide);

		indicators.forEach((indicator, index) => {
			indicator.addEventListener("click", () => goToSlide(index));
		});

		// Auto-slide
		const startAutoSlide = () => {
			autoSlideInterval = window.setInterval(nextSlide, 5000);
		};

		const stopAutoSlide = () => {
			clearInterval(autoSlideInterval);
		};

		// Pausar auto-slide cuando el usuario interactúa
		services.addEventListener("mouseenter", stopAutoSlide);
		services.addEventListener("mouseleave", startAutoSlide);

		// Iniciar auto-slide
		startAutoSlide();

		// Event listeners para las cards
		tourCards.forEach((card) => {
			card.addEventListener("click", (e) => {
				e.stopPropagation();
				const tourId = card.getAttribute("data-tour-id");
				handleTourClick(tourId);
			});
		});
	};

	const handleTourClick = (tourId: string | null) => {
		if (tourId) {
			console.log(`Navegando a tour: ${tourId}`);
			// Navegar a la página del tour con el ID
			window.location.hash = `tour/${tourId}`;
			// Scroll suave al top
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(renderContent);

	return services;
}
