import { languageManager, t } from "../utils/language.ts";

export function Testimonials(): HTMLElement {
	const testimonials = document.createElement("section");
	testimonials.className = "center-component";
	testimonials.id = "testimonials";

	let currentSlide = 0;
	let autoSlideInterval: number | null = null;
	let resizeHandler: (() => void) | null = null;

	const renderContent = () => {
		// Limpiar intervalo anterior si existe
		if (autoSlideInterval) {
			clearInterval(autoSlideInterval);
			autoSlideInterval = null;
		}

		// Limpiar event listener de resize anterior si existe
		if (resizeHandler) {
			window.removeEventListener("resize", resizeHandler);
			resizeHandler = null;
		}

		// Resetear slide actual
		currentSlide = 0;

		const translations = languageManager.getTranslations();
		const testimonialsData = (translations.testimonials as any).testimonials;

		const renderStars = (rating: number) => {
			let stars = "";
			for (let i = 0; i < 5; i++) {
				const starClass = i < rating ? "text-yellow-400" : "text-gray-300";
				stars += `<svg class="w-5 h-5 ${starClass}" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
				</svg>`;
			}
			return stars;
		};

		let testimonialsHTML = "";
		for (let i = 0; i < testimonialsData.length; i++) {
			const testimonial = testimonialsData[i];
			const isActive = i === 0 ? "active" : "";

			testimonialsHTML += `
				<div class="testimonial-slide ${isActive}" data-index="${i}">
					<div class="testimonial-card bg-white rounded-2xl shadow-xl p-6 mx-4 min-h-[450px] flex flex-col border border-gray-100 hover:border-emerald-200 transition-all duration-300">
						<div class="flex items-center mb-4">
							<div class="flex mr-3">
								${renderStars(testimonial.rating)}
							</div>
							<span class="text-gray-500 text-sm font-medium">${testimonial.rating}/5</span>
						</div>
						
						<div class="flex-1 mb-4">
							<p class="text-gray-700 leading-relaxed text-sm font-light">
								"${testimonial.text}"
							</p>
						</div>
						
						<div class="mt-auto pt-4 border-t border-gray-100">
							<div class="w-full">
								<h4 class="font-bold text-gray-800 text-base truncate">${testimonial.name}</h4>
								<p class="text-emerald-600 text-sm font-medium mt-1 truncate">${
									testimonial.location
								}</p>
							</div>
						</div>
					</div>
				</div>
			`;
		}

		let indicatorsHTML = "";
		for (let i = 0; i < testimonialsData.length; i++) {
			const isActive = i === 0 ? "bg-emerald-500" : "bg-gray-300";
			indicatorsHTML += `<button class="indicator w-3 h-3 rounded-full transition-all duration-200 ${isActive}" data-slide="${i}"></button>`;
		}

		testimonials.innerHTML = `
			<div>
				<h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">${t(
					"testimonials.title"
				)}</h2>
				<p class="text-gray-600 text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto">
					${t("testimonials.subtitle")}
				</p>
				
				<div class="testimonials-carousel-container relative max-w-6xl mx-auto">
					<div class="testimonials-carousel overflow-hidden">
						<div class="testimonials-track flex transition-transform duration-500 ease-in-out">
							${testimonialsHTML}
						</div>
					</div>
					
					<button class="carousel-btn carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10">
						<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
					
					<button class="carousel-btn carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10">
						<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</button>
					
					<div class="carousel-indicators flex justify-center mt-6 space-x-2">
						${indicatorsHTML}
					</div>
				</div>
			</div>
		`;

		setupCarousel(testimonialsData.length);
		setupStyles();
	};

	const setupStyles = () => {
		if (!document.querySelector("#testimonials-styles")) {
			const style = document.createElement("style");
			style.id = "testimonials-styles";
			style.textContent = `
				.testimonials-carousel-container {
					padding: 20px;
				}
				
				.testimonials-carousel {
					overflow: hidden;
					border-radius: 16px;
					padding: 25px 15px;
					margin: -25px -15px;
				}
				
				.testimonials-track {
					display: flex;
					transition: transform 0.5s ease-in-out;
				}
				
				.testimonial-slide {
					flex: 0 0 100%;
					padding: 0 12px;
				}
				
				@media (min-width: 768px) {
					.testimonial-slide {
						flex: 0 0 50%;
					}
				}
				
				@media (min-width: 1024px) {
					.testimonial-slide {
						flex: 0 0 33.333%;
					}
				}
				
				.testimonial-card {
					box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
					transition: all 0.3s ease;
					position: relative;
					background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
				}
				
				.testimonial-card:hover {
					transform: translateY(-8px);
					box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.12), 0 25px 25px -5px rgba(0, 0, 0, 0.06);
				}
				
				.testimonial-card::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					height: 4px;
					background: linear-gradient(90deg, #10b981, #059669);
					border-radius: 16px 16px 0 0;
				}
				
				/* Asegurar que el texto sea legible */
				.testimonial-card h4,
				.testimonial-card p {
					word-wrap: break-word;
					overflow-wrap: break-word;
				}
				
				.truncate {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.carousel-btn {
					backdrop-filter: blur(10px);
					box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
					transition: all 0.3s ease;
				}
				
				.carousel-btn:hover {
					transform: translateY(-50%) scale(1.1);
					box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.2);
				}
				
				.carousel-btn:active {
					transform: translateY(-50%) scale(0.95);
				}
				
				.indicator {
					cursor: pointer;
					transition: all 0.3s ease;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
				
				.indicator:hover {
					transform: scale(1.3);
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
				}
				
				.indicator.bg-emerald-500 {
					background: linear-gradient(135deg, #10b981, #059669);
				}
				
				/* Animaciones de entrada */
				.testimonial-slide {
					animation: fadeInUp 0.8s ease-out;
					animation-fill-mode: both;
				}
				
				.testimonial-slide:nth-child(1) { animation-delay: 0.1s; }
				.testimonial-slide:nth-child(2) { animation-delay: 0.2s; }
				.testimonial-slide:nth-child(3) { animation-delay: 0.3s; }
				
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				
				/* Responsive improvements */
				@media (max-width: 768px) {
					.testimonials-carousel-container {
						padding: 10px;
					}
					
					.testimonial-card {
						min-height: 400px;
						padding: 1.5rem;
					}
					
					.carousel-btn {
						padding: 0.75rem;
					}
					
					.carousel-btn svg {
						width: 1.25rem;
						height: 1.25rem;
					}
				}
			`;
			document.head.appendChild(style);
		}
	};

	const setupCarousel = (total: number) => {
		const track = testimonials.querySelector(
			".testimonials-track"
		) as HTMLElement;
		const prevBtn = testimonials.querySelector(".carousel-prev") as HTMLElement;
		const nextBtn = testimonials.querySelector(".carousel-next") as HTMLElement;
		const indicators = testimonials.querySelectorAll(
			".indicator"
		) as NodeListOf<HTMLElement>;

		const updateCarousel = () => {
			const slidesPerView =
				window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
			const slideWidth = 100 / slidesPerView;
			track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

			indicators.forEach((indicator, index) => {
				if (index === currentSlide) {
					indicator.classList.add("bg-emerald-500");
					indicator.classList.remove("bg-gray-300");
				} else {
					indicator.classList.add("bg-gray-300");
					indicator.classList.remove("bg-emerald-500");
				}
			});
		};

		const nextSlide = () => {
			const slidesPerView =
				window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
			const maxSlide = Math.max(0, total - slidesPerView);

			if (currentSlide < maxSlide) {
				currentSlide++;
			} else {
				currentSlide = 0;
			}
			updateCarousel();
		};

		const prevSlide = () => {
			const slidesPerView =
				window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
			const maxSlide = Math.max(0, total - slidesPerView);

			if (currentSlide > 0) {
				currentSlide--;
			} else {
				currentSlide = maxSlide;
			}
			updateCarousel();
		};

		const startAutoSlide = () => {
			if (autoSlideInterval) {
				clearInterval(autoSlideInterval);
			}
			autoSlideInterval = window.setInterval(nextSlide, 6000);
		};

		const stopAutoSlide = () => {
			if (autoSlideInterval) {
				clearInterval(autoSlideInterval);
				autoSlideInterval = null;
			}
		};

		// Event listeners
		nextBtn.addEventListener("click", nextSlide);
		prevBtn.addEventListener("click", prevSlide);

		indicators.forEach((indicator, index) => {
			indicator.addEventListener("click", () => {
				currentSlide = index;
				updateCarousel();
			});
		});

		// Auto-slide con pausa en hover
		testimonials.addEventListener("mouseenter", stopAutoSlide);
		testimonials.addEventListener("mouseleave", startAutoSlide);

		// Actualizar en resize
		resizeHandler = updateCarousel;
		window.addEventListener("resize", resizeHandler);

		// Iniciar auto-slide
		startAutoSlide();
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(renderContent);

	return testimonials;
}
