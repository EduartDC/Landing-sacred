// Sistema de transiciones usando Barba.js y GSAP
import barba from "@barba/core";
import { gsap } from "gsap";

export class PageTransitions {
	private static instance: PageTransitions;
	private isTransitioning = false;

	private constructor() {
		// No inicializar Barba automáticamente, solo cuando sea necesario
		console.log("Sistema de transiciones creado");
	}

	public static getInstance(): PageTransitions {
		if (!PageTransitions.instance) {
			PageTransitions.instance = new PageTransitions();
		}
		return PageTransitions.instance;
	}

	// Transición de salida (franja diagonal pasando)
	// Inicializar Barba.js solo si es necesario para navegación
	private initBarba(): void {
		try {
			// Solo inicializar si hay múltiples páginas o navegación
			const wrapper = document.querySelector('[data-barba="wrapper"]');
			if (wrapper) {
				barba.init({
					transitions: [
						{
							name: "slide-left-to-right",
							leave: this.slideOutLeft,
							enter: this.slideInRight,
						},
					],
				});
				console.log("Barba.js inicializado correctamente");
			} else {
				console.log("Barba wrapper no encontrado - usando transiciones GSAP puras");
			}
		} catch (error) {
			console.warn("Barba.js no se pudo inicializar:", error);
			console.log("Funcionando en modo de transiciones simples");
		}
	}

	// Transición de salida: deslizar hacia la izquierda (para navegación de páginas)
	private slideOutLeft = (data: any): Promise<void> => {
		return new Promise((resolve) => {
			gsap.to(data.current.container, {
				x: "-100%",
				opacity: 0.7,
				duration: 0.9,
				ease: "power2.out",
				onComplete: resolve,
			});
		});
	};

	// Transición de entrada: deslizar desde la derecha (para navegación de páginas)
	private slideInRight = (data: any): Promise<void> => {
		return new Promise((resolve) => {
			gsap.fromTo(
				data.next.container,
				{ x: "100%", opacity: 0.7 },
				{
					x: "0%",
					opacity: 1,
					duration: 0.9,
					ease: "power2.out",
					onComplete: resolve,
				}
			);
		});
	};

	// Crear overlay para transición de izquierda a derecha
	private createSlideOverlay(): HTMLElement {
		const overlay = document.createElement("div");
		overlay.className = "slide-transition-overlay";
		overlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: linear-gradient(45deg, 
				rgba(12, 74, 110, 0.97) 0%, 
				rgba(6, 95, 70, 0.98) 25%, 
				rgba(8, 145, 178, 1) 50%, 
				rgba(30, 64, 175, 0.98) 75%,
				rgba(12, 74, 110, 0.97) 100%);
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			font-family: inherit;
			backdrop-filter: blur(15px);
			box-shadow: 0 0 50px rgba(0,0,0,0.3);
		`;

		// Añadir contenido al overlay con logo Sacred mejorado
		overlay.innerHTML = `
			<div style="
				text-align: center; 
				animation: elegantFloat 4s ease-in-out infinite;
				transform-origin: center center;
			">
				<img src="/LOGO SACRED.png" alt="Sacred Logo" style="
					height: 130px;
					width: auto;
					filter: brightness(1.3) drop-shadow(0 8px 25px rgba(255,255,255,0.4));
					margin-bottom: 1.2rem;
					transition: all 0.3s ease;
				"/>
				<div style="
					font-size: 1.8rem; 
					font-weight: 700; 
					color: white; 
					opacity: 0.95;
					text-shadow: 0 3px 12px rgba(0,0,0,0.4);
					letter-spacing: 3px;
					font-family: 'Arial', sans-serif;
				">
					SACRED
				</div>
			</div>
			<style>
				@keyframes elegantFloat {
					0%, 100% { 
						transform: translateY(0px) scale(1) rotate(0deg); 
						opacity: 0.95;
					}
					50% { 
						transform: translateY(-8px) scale(1.02) rotate(0.5deg); 
						opacity: 1;
					}
				}
			</style>
		`;

		return overlay;
	}

	// Crear overlay para transición diagonal
	private createTransitionOverlay(): HTMLElement {
		const overlay = document.createElement("div");
		overlay.className = "language-transition-overlay";
		overlay.style.cssText = `
			position: fixed;
			top: -50%;
			left: -50%;
			width: 200vw;
			height: 200vh;
			background: linear-gradient(45deg, 
				transparent 0%, 
				rgba(12, 74, 110, 0.1) 20%, 
				rgba(12, 74, 110, 0.95) 40%, 
				rgba(6, 95, 70, 1) 50%, 
				rgba(8, 145, 178, 1) 60%, 
				rgba(30, 64, 175, 0.95) 80%, 
				transparent 100%);
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			font-family: inherit;
			backdrop-filter: blur(15px);
			will-change: clip-path;
		`;

		// Añadir contenido al overlay con logo Sacred mejorado
		overlay.innerHTML = `
			<div style="
				text-align: center; 
				animation: gentleFloat 3s ease-in-out infinite;
				transform-origin: center center;
			">
				<img src="/LOGO SACRED.png" alt="Sacred Logo" style="
					height: 140px;
					width: auto;
					filter: brightness(1.3) drop-shadow(0 8px 32px rgba(255,255,255,0.4));
					margin-bottom: 1.5rem;
					transition: all 0.3s ease;
				"/>
				<div style="
					font-size: 1.8rem; 
					font-weight: 700; 
					color: white; 
					opacity: 0.95;
					text-shadow: 0 4px 8px rgba(0,0,0,0.4);
					letter-spacing: 3px;
					margin-top: 0.5rem;
				">
					SACRED
				</div>
			</div>
			<style>
				@keyframes gentleFloat {
					0%, 100% { 
						transform: translateY(0px) scale(1); 
						opacity: 0.95; 
					}
					50% { 
						transform: translateY(-8px) scale(1.02); 
						opacity: 1; 
					}
				}
			</style>
		`;

		return overlay;
	}

	// Método de compatibilidad para el sistema existente
	public async curtainTransition(callback: () => void): Promise<void> {
		await this.setLanguageWithTransition("", callback);
	}

	// Método público para cambio de idioma/página con transición de izquierda a derecha
	public async setLanguageWithTransition(
		_newLanguage: string,
		callback: () => void
	): Promise<void> {
		if (this.isTransitioning) return;

		this.isTransitioning = true;

		try {
			// Crear overlay que pase de izquierda a derecha
			const overlay = this.createSlideOverlay();
			document.body.appendChild(overlay);

			// Animación de entrada del overlay (izquierda a derecha) - más suave
			await new Promise<void>((resolve) => {
				gsap.fromTo(
					overlay,
					{ x: "-100%", opacity: 0.8 },
					{
						x: "0%",
						opacity: 1,
						duration: 0.7,
						ease: "power2.out",
						onComplete: resolve,
					}
				);
			});

			// Ejecutar callback para cambiar contenido
			callback();

			// Pausa más larga para que se actualice el contenido completamente
			await new Promise<void>((resolve) => {
				setTimeout(resolve, 300);
			});

			// Animación de salida del overlay (continuar hacia la derecha) - más suave
			await new Promise<void>((resolve) => {
				gsap.to(overlay, {
					x: "100%",
					opacity: 0.8,
					duration: 0.7,
					ease: "power2.in",
					onComplete: () => {
						overlay.remove();
						resolve();
					},
				});
			});
		} catch (error) {
			console.error("Error en transición:", error);
			// Fallback sin transición
			callback();
		} finally {
			this.isTransitioning = false;
		}
	}

	// Transición diagonal con clip-path (alternativa más precisa)
	public async diagonalClipTransition(callback: () => void): Promise<void> {
		if (this.isTransitioning) return;

		this.isTransitioning = true;

		try {
			// Crear overlay con clip-path
			const overlay = this.createTransitionOverlay();
			overlay.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 0%)";
			document.body.appendChild(overlay);

			// Animación de entrada diagonal con clip-path
			await new Promise<void>((resolve) => {
				gsap.to(overlay, {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					duration: 0.8,
					ease: "power2.inOut",
					onComplete: resolve,
				});
			});

			// Ejecutar callback
			callback();

			// Animación de salida diagonal
			await new Promise<void>((resolve) => {
				gsap.to(overlay, {
					clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)",
					duration: 0.8,
					ease: "power2.inOut",
					onComplete: () => {
						overlay.remove();
						resolve();
					},
				});
			});
		} finally {
			this.isTransitioning = false;
		}
	}

	// Transición más sutil para elementos específicos
	public async fadeTransition(
		elements: NodeListOf<Element> | Element[],
		callback: () => void
	): Promise<void> {
		if (this.isTransitioning) return;

		this.isTransitioning = true;

		try {
			// Fade out
			await new Promise<void>((resolve) => {
				gsap.to(elements, {
					opacity: 0,
					y: -20,
					duration: 0.3,
					ease: "power2.out",
					stagger: 0.05,
					onComplete: resolve,
				});
			});

			// Ejecutar callback
			callback();

			// Fade in
			await new Promise<void>((resolve) => {
				gsap.fromTo(
					elements,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						ease: "power2.out",
						stagger: 0.05,
						onComplete: resolve,
					}
				);
			});
		} finally {
			this.isTransitioning = false;
		}
	}

	// Transición tipo "slide" horizontal
	public async slideTransition(callback: () => void): Promise<void> {
		if (this.isTransitioning) return;

		this.isTransitioning = true;

		const mainContent = document.querySelector("main") || document.body;

		try {
			// Slide out hacia la izquierda
			await new Promise<void>((resolve) => {
				gsap.to(mainContent, {
					x: "-100%",
					opacity: 0.5,
					duration: 0.5,
					ease: "power2.inOut",
					onComplete: resolve,
				});
			});

			// Ejecutar callback
			callback();

			// Slide in desde la derecha
			await new Promise<void>((resolve) => {
				gsap.fromTo(
					mainContent,
					{ x: "100%", opacity: 0.5 },
					{
						x: "0%",
						opacity: 1,
						duration: 0.5,
						ease: "power2.inOut",
						onComplete: resolve,
					}
				);
			});
		} finally {
			this.isTransitioning = false;
		}
	}

	// Transición tipo "wipe" vertical (cortina desde abajo)
	public async wipeTransition(callback: () => void): Promise<void> {
		if (this.isTransitioning) return;

		this.isTransitioning = true;

		try {
			// Crear overlay que viene desde abajo
			const overlay = document.createElement("div");
			overlay.className = "wipe-transition-overlay";
			overlay.style.cssText = `
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100vh;
				background: linear-gradient(45deg, #0c4a6e, #065f46);
				z-index: 9999;
				transform: translateY(100%);
				display: flex;
				align-items: center;
				justify-content: center;
			`;

			// Añadir logo al overlay wipe
			overlay.innerHTML = `
				<div style="text-align: center;">
					<img src="/LOGO SACRED.png" alt="Sacred Logo" style="
						height: 100px;
						width: auto;
						filter: brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.4));
					"/>
				</div>
			`;

			document.body.appendChild(overlay);

			// Animación de wipe hacia arriba
			await new Promise<void>((resolve) => {
				gsap.to(overlay, {
					y: "0%",
					duration: 0.5,
					ease: "power2.inOut",
					onComplete: resolve,
				});
			});

			// Ejecutar callback
			callback();

			// Wipe hacia arriba y salir
			await new Promise<void>((resolve) => {
				gsap.to(overlay, {
					y: "-100%",
					duration: 0.5,
					ease: "power2.inOut",
					onComplete: () => {
						overlay.remove();
						resolve();
					},
				});
			});
		} finally {
			this.isTransitioning = false;
		}
	}

	// Verificar si hay una transición en curso
	public isInTransition(): boolean {
		return this.isTransitioning;
	}

	// Método para inicializar manualmente si es necesario
	public init(): void {
		try {
			if (!barba.running) {
				this.initBarba();
			}
		} catch (error) {
			console.log("Inicialización en modo simple sin Barba");
		}
	}

	// Método para destruir Barba si es necesario
	public destroy(): void {
		try {
			if (barba.running) {
				barba.destroy();
			}
		} catch (error) {
			console.log("No hay instancia de Barba que destruir");
		}
	}
}

// Instancia singleton
export const pageTransitions = PageTransitions.getInstance();
