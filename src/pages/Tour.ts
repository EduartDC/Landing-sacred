import { Truck, User, Ticket, UtensilsCrossed, Droplets, Camera, ChevronDown } from 'lucide';
import { languageManager } from '../utils/language';
import { Contact } from '../components/Contact';

export function Tour(tourId: string): HTMLElement {
	const tourPage = document.createElement('div');
	tourPage.className = 'tour-page min-h-screen bg-[#faf9f6] text-[#3d2e24]';

	const renderContent = () => {
		const translations = languageManager.getTranslations();
		const tours = (translations.services as any).tours;
		const tour = tours.find((t: any) => t.id === tourId);
		const tourPageT = (translations as any).tourPage;

		// Limpiar overlays post-animación
		setTimeout(() => {
			const overlays = document.querySelectorAll('.slide-transition-overlay, .transition-overlay');
			overlays.forEach((overlay) => overlay.remove());
			document.body.style.overflow = '';
		}, 1500);

		const getIconHTML = (iconName: string): string => {
			const iconMap: { [key: string]: any } = {
				truck: Truck,
				user: User,
				ticket: Ticket,
				'utensils-crossed': UtensilsCrossed,
				droplets: Droplets,
				camera: Camera,
				'chevron-down': ChevronDown,
			};

			const icon = iconMap[iconName] || iconMap['truck'];
			const paths = icon
				.map((item: any) => {
					if (typeof item === 'string') return item;
					const [tag, attrs] = item;
					const attrsStr = Object.entries(attrs || {})
						.map(([k, v]) => `${k}="${v}"`)
						.join(' ');
					return `<${tag} ${attrsStr}/>`;
				})
				.join('');

			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${paths}</svg>`;
		};

		if (!tour) {
			tourPage.innerHTML = `
				<div class="container mx-auto px-4 py-32 text-center h-screen flex flex-col items-center justify-center">
					<h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-serif">${tourPageT.notFound.title}</h1>
					<p class="text-gray-600 text-lg md:text-xl mb-10">${tourPageT.notFound.description}</p>
					<a href="#services" class="inline-block bg-[#1a4a38] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all font-semibold" id="back-to-home-btn">
						${tourPageT.notFound.button}
					</a>
				</div>
			`;
			return;
		}

		tourPage.innerHTML = `
			<!-- 1. Hero Section -->
			<section class="relative h-[85vh] min-h-[600px] flex items-end pb-16 lg:pb-24 justify-center overflow-hidden bg-[#2c3e2e]">
				<img src="/${tour.image}" alt="${tour.title}" class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay">
				<div class="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent z-10"></div>
				
				<div class="container relative z-20 px-4 text-center max-w-4xl pt-24 animate-fade-up">
					<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 font-serif drop-shadow-lg leading-tight uppercase tracking-wider">${tour.title}</h1>
					<p class="text-xl md:text-3xl text-gray-200 mb-10 font-light italic opacity-90">"${tour.fullDescription.split('.')[0]}."</p>
					
					<!-- Quick Facts -->
					<div class="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
						<div class="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 text-white shadow-lg">
							<span class="text-xl">⏱️</span>
							<span class="text-sm font-bold tracking-wider uppercase">${tour.duration}</span>
						</div>
						<div class="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 text-white shadow-lg">
							<span class="text-xl">⭐</span>
							<span class="text-sm font-bold tracking-wider uppercase">${tour.activityLevel}</span>
						</div>
						<div class="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 text-white shadow-lg">
							<span class="text-xl">👥</span>
							<span class="text-sm font-bold tracking-wider uppercase">${tour.groupSize}</span>
						</div>
					</div>

					<div class="flex flex-col md:flex-row justify-center items-center gap-4 mx-auto w-full max-w-md md:max-w-xl">
						<button id="hero-book-btn" class="bg-[#25D366] text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-105 hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3 w-full md:w-auto">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.066.381-.057c.106-.123.49-5.7.618-.767.128-.197.256-.164.384-.116.128.048.81.382.949.452s.231.109.264.169c.032.06.032.343-.112.748z"/></svg>
							Consultar Disponibilidad
						</button>
						<button id="hero-contact-btn" class="bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg hover:bg-white/30 hover:scale-105 transition-all flex items-center justify-center gap-3 w-full md:w-auto">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
							Formulario
						</button>
					</div>
				</div>
			</section>

			<!-- 2. Sticky Bar -->
			<div id="sticky-bar" class="fixed top-0 md:top-auto bottom-0 md:top-0 left-0 w-full bg-white/95 backdrop-blur-md border-t md:border-b border-gray-200 z-50 flex justify-between items-center px-4 md:px-8 py-4 transform translate-y-full md:-translate-y-full transition-transform duration-300 shadow-xl opacity-0">
				<div>
					<span class="text-xs text-gray-500 block uppercase tracking-wider font-bold">Desde</span>
					<span class="font-bold text-xl md:text-2xl text-[#2c5228]">$${tour.price} USD</span>
				</div>
				<button id="sticky-book-btn" class="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#20bd5a] transition-colors flex items-center gap-2">
					<span class="hidden md:inline">Reservar por</span> WhatsApp
				</button>
			</div>

			<!-- 3. La Promesa (Descripción) -->
			<section class="py-24 bg-[#faf9f6] relative">
				<div class="container mx-auto px-4 max-w-4xl text-center">
					<h2 class="text-3xl font-serif text-[#3d2e24] mb-8 animate-on-scroll">La Experiencia</h2>
					<p class="text-xl md:text-2xl leading-relaxed text-[#5c4a3d] font-light animate-on-scroll" style="animation-delay: 0.1s;">
						${tour.fullDescription.split('\n').map((para: string) => `<span class="block mb-4">${para}</span>`).join('')}
					</p>
				</div>
			</section>

			<!-- 4. Transporte (Comodidad) -->
			<section class="py-24 bg-white relative">
				<div class="container mx-auto px-4 max-w-6xl">
					<!-- Banner -->
					<div class="w-full h-64 md:h-80 rounded-[2rem] overflow-hidden mb-16 shadow-xl relative animate-on-scroll">
						<img src="/transporte.png" alt="Transporte Banner" class="w-full h-full object-cover">
						<div class="absolute inset-0 bg-black/30 flex items-center justify-center">
							<h2 class="text-4xl md:text-6xl font-bold font-serif text-white drop-shadow-lg">Viaja Cómodo y Seguro</h2>
						</div>
					</div>

					<div class="grid lg:grid-cols-2 gap-16 items-start">
						<div class="space-y-8 animate-on-scroll">
							<p class="text-2xl text-[#5c4a3d] font-light leading-relaxed">Tu confort es nuestra prioridad. Relájate en nuestras unidades modernas y exclusivas mientras te llevamos al corazón de la aventura. Contamos con vehículos Honda y Toyota Hiace de modelo reciente.</p>
							
							<ul class="space-y-4 pt-4">
								<li class="flex items-center gap-4 text-lg text-[#3d2e24] bg-[#f0ece6] p-4 rounded-xl shadow-sm border border-gray-100">
									<div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">✓</div>
									<span>Unidades climatizadas</span>
								</li>
								<li class="flex items-center gap-4 text-lg text-[#3d2e24] bg-[#f0ece6] p-4 rounded-xl shadow-sm border border-gray-100">
									<div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">✓</div>
									<span>Transporte privado y exclusivo</span>
								</li>
								<li class="flex items-center gap-4 text-lg text-[#3d2e24] bg-[#f0ece6] p-4 rounded-xl shadow-sm border border-gray-100">
									<div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">✓</div>
									<span>Seguridad</span>
								</li>
								<li class="flex items-center gap-4 text-lg text-[#3d2e24] bg-[#f0ece6] p-4 rounded-xl shadow-sm border border-gray-100">
									<div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">✓</div>
									<span>Operadores con experiencia</span>
								</li>
							</ul>
						</div>
						
						<!-- Grid de 4 imágenes -->
						<div class="grid grid-cols-2 gap-4 h-[500px] animate-on-scroll" style="animation-delay: 0.2s;">
							<div class="grid grid-rows-2 gap-4">
								<div class="rounded-[2rem] overflow-hidden shadow-md">
									<img src="/honda_exterior.png" alt="Honda Exterior" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
								</div>
								<div class="rounded-[2rem] overflow-hidden shadow-md">
									<img src="/honda_interior.png" alt="Honda Interior" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
								</div>
							</div>
							<div class="grid grid-rows-2 gap-4 mt-8 -mb-8">
								<div class="rounded-[2rem] overflow-hidden shadow-md">
									<img src="/hiace_exterior.png" alt="Hiace Exterior" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
								</div>
								<div class="rounded-[2rem] overflow-hidden shadow-md">
									<img src="/hice_interior.png" alt="Hiace Interior" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 5. Itinerario Visual -->
			<section class="py-24 bg-white relative overflow-hidden">
				<div class="container mx-auto px-4 max-w-4xl">
					<div class="text-center mb-20 animate-on-scroll">
						<h2 class="text-4xl md:text-5xl font-bold text-[#3d2e24] font-serif mb-4">El Recorrido del Día</h2>
						<p class="text-xl text-[#5c4a3d] font-light">De principio a fin, una experiencia coreografiada para sorprenderte.</p>
					</div>

					<div class="relative border-l-4 border-emerald-100 ml-4 md:ml-8 space-y-12">
						${tour.itinerary.map((item: any, index: number) => `
						<div class="relative pl-10 md:pl-16 animate-on-scroll group" style="animation-delay: ${0.1 * index}s;">
							<!-- Circulo -->
							<div class="absolute top-0 w-10 h-10 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 group-hover:bg-emerald-50 transition-all z-10" style="left: -22px;">
								${index + 1}
							</div>
							
							<!-- Badge Tiempo -->
							${item.time ? `<span class="inline-block bg-gray-100 text-[#3d2e24] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm group-hover:bg-emerald-100 transition-colors">${item.time}</span>` : ''}
							
							<!-- Contenido -->
							<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group-hover:border-emerald-100">
								<h3 class="text-2xl font-serif font-bold text-[#3d2e24] mb-3">${item.title}</h3>
								<p class="text-[#5c4a3d] leading-relaxed font-light">${item.description}</p>
							</div>
						</div>
						`).join('')}
					</div>
				</div>
			</section>

			<!-- 6. Galería (Bento Box) -->
			${tour.gallery ? `
			<section class="py-20 bg-[#111]">
				<div class="container mx-auto px-4 max-w-6xl">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
						${tour.gallery.map((img: string, i: number) => {
							let spanClass = '';
							if (i === 0) spanClass = 'col-span-2 row-span-2';
							else if (i === tour.gallery.length - 1 && i % 2 !== 0) spanClass = 'col-span-2 md:col-span-1';
							
							return `
							<div class="${spanClass} rounded-3xl overflow-hidden relative group bg-gray-800 animate-on-scroll" style="animation-delay: ${0.1 * i}s;">
								<img src="${img}" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out">
								<div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
							</div>
							`;
						}).join('')}
					</div>
				</div>
			</section>
			` : ''}

			<!-- 7. Social Proof (Reseñas) -->
			<section class="py-24 bg-[#1e3b1c] text-white">
				<div class="container mx-auto px-4 text-center mb-16">
					<h2 class="text-4xl md:text-5xl font-serif font-bold mb-4">Lo Que Dicen Nuestros Viajeros</h2>
				</div>
				
				<div class="flex overflow-x-auto gap-6 px-4 md:px-[calc((100vw-1200px)/2)] pb-8 snap-x snap-mandatory scrollbar-hide">
					<!-- Tarjeta 1 -->
					<div class="snap-center shrink-0 w-[85vw] md:w-[350px] bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:bg-white/20 transition-colors">
						<div class="text-yellow-400 mb-4 tracking-widest text-xl">★★★★★</div>
						<p class="font-light italic mb-6">"La mejor experiencia de mis vacaciones. El guía un experto y el transporte espectacular."</p>
						<p class="font-bold">- Juan Pérez</p>
					</div>
					<!-- Tarjeta 2 -->
					<div class="snap-center shrink-0 w-[85vw] md:w-[350px] bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:bg-white/20 transition-colors">
						<div class="text-yellow-400 mb-4 tracking-widest text-xl">★★★★★</div>
						<p class="font-light italic mb-6">"Me encantó la atención al detalle, desde el pickup hasta los bocadillos. Altamente recomendados."</p>
						<p class="font-bold">- Sarah Connor</p>
					</div>
					<!-- Tarjeta 3 -->
					<div class="snap-center shrink-0 w-[85vw] md:w-[350px] bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:bg-white/20 transition-colors">
						<div class="text-yellow-400 mb-4 tracking-widest text-xl">★★★★★</div>
						<p class="font-light italic mb-6">"Evitaron todas las multitudes y nos contaron la verdadera historia maya. 10/10."</p>
						<p class="font-bold">- Camila & Carlos</p>
					</div>
				</div>
			</section>


			<!-- 9. FAQ -->
			<section class="pb-24 bg-[#faf9f6]">
				<div class="container mx-auto px-4 max-w-3xl">
					<div class="text-center mb-12 animate-on-scroll">
						<h2 class="text-3xl font-bold text-[#3d2e24] mb-4 font-serif">Preguntas Frecuentes</h2>
					</div>
					
					<div class="space-y-4 animate-on-scroll">
						${tourPageT.faq.questions.map((faq: any) => `
						<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors faq-item group">
							<button class="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" onclick="this.parentElement.classList.toggle('active')">
								<span class="font-bold text-[#3d2e24] text-lg pr-4">${faq.q}</span>
								<div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 group-[.active]:rotate-180 transition-transform">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
								</div>
							</button>
							<div class="px-6 pb-6 pt-0 text-[#5c4a3d] font-light hidden group-[.active]:block">
								${faq.a}
							</div>
						</div>
						`).join('')}
					</div>
				</div>
			</section>
		`;

		setupStyles();

		setTimeout(() => {
			document.querySelectorAll('[data-icon]').forEach((el) => {
				const iconContainer = el as HTMLElement;
				const iconName = iconContainer.dataset.icon;
				if (iconName && !iconContainer.innerHTML.trim()) {
					iconContainer.innerHTML = getIconHTML(iconName);
				}
			});

			const openWhatsapp = () => {
				window.open(`https://wa.me/5219841234567?text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20tour:%20${encodeURIComponent(tour.title)}`, '_blank');
			};

			const heroBtn = tourPage.querySelector('#hero-book-btn');
			if (heroBtn) heroBtn.addEventListener('click', openWhatsapp);

			const heroContactBtn = tourPage.querySelector('#hero-contact-btn');
			if (heroContactBtn) {
				heroContactBtn.addEventListener('click', () => {
					tourPage.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
				});
			}

			const stickyBtn = tourPage.querySelector('#sticky-book-btn');
			if (stickyBtn) stickyBtn.addEventListener('click', openWhatsapp);

			// Sticky Bar Logic
			const stickyBar = tourPage.querySelector('#sticky-bar') as HTMLElement;
			if (stickyBar) {
				window.addEventListener('scroll', () => {
					const currentScroll = window.scrollY;
					if (currentScroll > 600) {
						stickyBar.classList.remove('opacity-0', 'translate-y-full', 'md:-translate-y-full');
						stickyBar.classList.add('opacity-100', 'translate-y-0');
					} else {
						stickyBar.classList.add('opacity-0', 'translate-y-full', 'md:-translate-y-full');
						stickyBar.classList.remove('opacity-100', 'translate-y-0');
					}
				});
			}

			// Intersection Observer for Animations
			const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			}, observerOptions);

			document.querySelectorAll('.animate-on-scroll, .animate-fade-up').forEach((el) => {
				observer.observe(el);
			});
			
			// Solo añadir el Contact form si hemos renderizado completamente el tour
			tourPage.appendChild(Contact(tourId));
		}, 0);
	};

	const setupStyles = () => {
		if (!document.querySelector('#tour-page-styles')) {
			const style = document.createElement('style');
			style.id = 'tour-page-styles';
			style.textContent = `
				@keyframes fade-up {
					0% { opacity: 0; transform: translateY(30px); }
					100% { opacity: 1; transform: translateY(0); }
				}
				.animate-on-scroll, .animate-fade-up {
					opacity: 0;
					transform: translateY(30px);
					transition: opacity 0.8s ease-out, transform 0.8s ease-out;
				}
				.animate-on-scroll.is-visible, .animate-fade-up.is-visible {
					opacity: 1;
					transform: translateY(0);
				}
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
				html { scroll-behavior: smooth; }
			`;
			document.head.appendChild(style);
		}
	};

	renderContent();
	languageManager.subscribe(renderContent);

	return tourPage;
}
