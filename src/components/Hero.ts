// Componente Hero
import { languageManager, t } from "../utils/language";

export function Hero(): HTMLElement {
	const hero = document.createElement("section");
	hero.className =
		"w-screen h-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden text-center flex items-center justify-center -mt-16";
	hero.id = "home";

	// Función para renderizar el contenido
	const renderContent = () => {
		hero.innerHTML = `
		<!-- Video de fondo para todas las pantallas -->
		<video
			class="hero-video"
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			controls="false"
			disablepictureinpicture
			controlslist="nodownload nofullscreen noremoteplayback"
			oncontextmenu="return false;">
			<!-- Video principal desde Cloudinary (4K) -->
			<source src="https://res.cloudinary.com/dch1fdirf/video/upload/v1760844737/17145872-uhd_3840_2160_30fps_bcvojt.mp4" type="video/mp4">
			<!-- Video alternativo: playa tropical -->
			<source src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_30fps.mp4" type="video/mp4">
			<!-- Video de respaldo: agua cristalina -->
			<source src="https://videos.pexels.com/video-files/853889/853889-uhd_2560_1440_25fps.mp4" type="video/mp4">
		</video>
		
		<!-- Overlay oscuro para mejorar legibilidad del texto -->
		
		
		<!-- Contenido principal -->
		<div class="relative z-20 max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 w-full">
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 drop-shadow-2xl leading-tight px-2">${t(
				"hero.title"
			)}</h1>
			<p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed drop-shadow-lg px-4">${t(
				"hero.subtitle"
			)}</p>
			<div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
				<button id="hero-services-btn" class="bg-adventure-600 hover:bg-adventure-700 text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto">
					${t("hero.primaryButton")}
				</button>
				<button id="hero-contact-btn" class="border-2 border-white/60 hover:bg-white/15 text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm hover:border-white/80 hover:scale-105 w-full sm:w-auto">
					${t("hero.secondaryButton")}
				</button>
			</div>
		</div>
		`;
	};

	// Renderizar contenido inicial
	renderContent();

	// Configurar navegación de los botones
	const setupButtonNavigation = () => {
		const servicesBtn = hero.querySelector("#hero-services-btn");
		const contactBtn = hero.querySelector("#hero-contact-btn");

		if (servicesBtn) {
			servicesBtn.addEventListener("click", () => {
				const servicesSection = document.getElementById("services");
				if (servicesSection) {
					servicesSection.scrollIntoView({ behavior: "smooth" });
				}
			});
		}

		if (contactBtn) {
			contactBtn.addEventListener("click", () => {
				const contactSection = document.getElementById("contact");
				if (contactSection) {
					contactSection.scrollIntoView({ behavior: "smooth" });
				}
			});
		}
	};

	// Configurar navegación después de renderizar
	setupButtonNavigation();

	// Manejar carga del video
	const setupVideo = () => {
		const video = hero.querySelector(".hero-video") as HTMLVideoElement;
		if (video) {
			// Detectar si es móvil
			const isMobile = window.innerWidth <= 768;
			console.log(
				`🎥 Cargando video 4K desde Cloudinary ${
					isMobile ? "(móvil)" : "(desktop)"
				}...`
			);

			// Optimizar preload según dispositivo
			if (isMobile) {
				video.preload = "metadata"; // Ahorrar datos en móviles
			} else {
				video.preload = "auto"; // Carga completa en desktop
			}

			// Forzar recarga del video
			video.load();

			// Deshabilitar controles y menús contextuales
			video.controls = false;
			video.disablePictureInPicture = true;
			video.setAttribute(
				"controlslist",
				"nodownload nofullscreen noremoteplayback"
			);

			// Prevenir interacciones del usuario
			video.addEventListener("contextmenu", (e) => e.preventDefault());
			video.addEventListener("selectstart", (e) => e.preventDefault());
			video.addEventListener("dragstart", (e) => e.preventDefault());

			video.addEventListener("loadstart", () => {
				console.log("🎥 Cargando video desde Cloudinary (4K)...");
			});

			video.addEventListener("canplay", () => {
				console.log("✅ Video 4K de Cloudinary listo para reproducir");
				console.log("🎬 Fuente actual:", video.currentSrc);
			});

			video.addEventListener("error", (e) => {
				console.error("❌ Error al cargar video desde Cloudinary:", e);
				// Si falla el video, mostrar solo la imagen de fondo
				video.style.display = "none";
			});
		}
	};

	// Configurar video después del renderizado
	setTimeout(setupVideo, 100);

	// Suscribirse a cambios de idioma
	languageManager.subscribe(() => {
		renderContent();
		setupButtonNavigation(); // Re-configurar botones después del re-render
		setTimeout(setupVideo, 100);
	});

	return hero;
}
