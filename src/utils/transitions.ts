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
			background: linear-gradient(135deg, 
				rgba(5, 46, 22, 0.95) 0%, 
				rgba(16, 78, 48, 0.97) 25%, 
				rgba(6, 95, 70, 0.98) 50%, 
				rgba(4, 57, 39, 0.97) 75%,
				rgba(5, 46, 22, 0.95) 100%);
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		`;

		// Añadir contenido al overlay con hojas GRANDES de jungla
		overlay.innerHTML = `
			<div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
				<!-- Hojas GRANDES que cubren la pantalla -->
				<div class="jungle-leaves">
					<!-- Hoja GIGANTE superior izquierda -->
					<svg class="leaf leaf-1" viewBox="0 0 200 300" style="position: absolute; top: -15%; left: -10%; width: 45vw; opacity: 0.7; transform: rotate(-15deg);">
						<ellipse cx="100" cy="150" rx="80" ry="140" fill="#047857" opacity="0.9"/>
						<path d="M100,20 Q60,80 70,150 Q80,220 100,280 Q120,220 130,150 Q140,80 100,20 Z" fill="#059669" />
						<path d="M100,20 L100,280" stroke="#065f46" stroke-width="4" fill="none" />
						<path d="M100,80 Q70,100 75,130" stroke="#065f46" stroke-width="2" fill="none" opacity="0.6"/>
						<path d="M100,150 Q130,170 125,200" stroke="#065f46" stroke-width="2" fill="none" opacity="0.6"/>
					</svg>
					
					<!-- Hoja GIGANTE superior derecha -->
					<svg class="leaf leaf-2" viewBox="0 0 200 300" style="position: absolute; top: -10%; right: -8%; width: 42vw; opacity: 0.65; transform: rotate(20deg);">
						<ellipse cx="100" cy="150" rx="85" ry="145" fill="#10b981" opacity="0.85"/>
						<path d="M100,20 Q60,80 70,150 Q80,220 100,280 Q120,220 130,150 Q140,80 100,20 Z" fill="#34d399" />
						<path d="M100,20 L100,280" stroke="#059669" stroke-width="4" fill="none" />
						<path d="M100,100 Q130,120 125,150" stroke="#059669" stroke-width="2" fill="none" opacity="0.6"/>
						<path d="M100,180 Q70,200 75,230" stroke="#059669" stroke-width="2" fill="none" opacity="0.6"/>
					</svg>
					
					<!-- Hoja GIGANTE inferior izquierda -->
					<svg class="leaf leaf-3" viewBox="0 0 200 300" style="position: absolute; bottom: -12%; left: -5%; width: 48vw; opacity: 0.75; transform: rotate(10deg);">
						<ellipse cx="100" cy="150" rx="90" ry="150" fill="#065f46" opacity="0.9"/>
						<path d="M100,20 Q60,80 70,150 Q80,220 100,280 Q120,220 130,150 Q140,80 100,20 Z" fill="#047857" />
						<path d="M100,20 L100,280" stroke="#064e3b" stroke-width="4" fill="none" />
						<path d="M100,70 Q130,90 125,120" stroke="#064e3b" stroke-width="2" fill="none" opacity="0.6"/>
						<path d="M100,160 Q70,180 75,210" stroke="#064e3b" stroke-width="2" fill="none" opacity="0.6"/>
					</svg>
					
					<!-- Hoja GIGANTE inferior derecha -->
					<svg class="leaf leaf-4" viewBox="0 0 200 300" style="position: absolute; bottom: -18%; right: -12%; width: 50vw; opacity: 0.72; transform: rotate(-25deg);">
						<ellipse cx="100" cy="150" rx="88" ry="148" fill="#059669" opacity="0.88"/>
						<path d="M100,20 Q60,80 70,150 Q80,220 100,280 Q120,220 130,150 Q140,80 100,20 Z" fill="#10b981" />
						<path d="M100,20 L100,280" stroke="#047857" stroke-width="4" fill="none" />
						<path d="M100,90 Q70,110 75,140" stroke="#047857" stroke-width="2" fill="none" opacity="0.6"/>
						<path d="M100,170 Q130,190 125,220" stroke="#047857" stroke-width="2" fill="none" opacity="0.6"/>
					</svg>
					
					<!-- Hoja GRANDE lateral izquierda central -->
					<svg class="leaf leaf-5" viewBox="0 0 180 280" style="position: absolute; top: 25%; left: -8%; width: 38vw; opacity: 0.68; transform: rotate(-35deg);">
						<ellipse cx="90" cy="140" rx="75" ry="135" fill="#10b981" opacity="0.85"/>
						<path d="M90,15 Q55,70 65,140 Q75,210 90,265 Q105,210 115,140 Q125,70 90,15 Z" fill="#34d399" />
						<path d="M90,15 L90,265" stroke="#059669" stroke-width="3" fill="none" />
					</svg>
					
					<!-- Hoja GRANDE lateral derecha central -->
					<svg class="leaf leaf-6" viewBox="0 0 180 280" style="position: absolute; top: 30%; right: -10%; width: 40vw; opacity: 0.7; transform: rotate(30deg);">
						<ellipse cx="90" cy="140" rx="78" ry="138" fill="#047857" opacity="0.87"/>
						<path d="M90,15 Q55,70 65,140 Q75,210 90,265 Q105,210 115,140 Q125,70 90,15 Z" fill="#059669" />
						<path d="M90,15 L90,265" stroke="#065f46" stroke-width="3" fill="none" />
					</svg>
					
					<!-- Hojas medianas de relleno -->
					<svg class="leaf leaf-7" viewBox="0 0 150 220" style="position: absolute; top: 5%; left: 20%; width: 25vw; opacity: 0.5; transform: rotate(5deg);">
						<path d="M75,10 Q50,55 58,110 Q66,165 75,210 Q84,165 92,110 Q100,55 75,10 Z" fill="#10b981" />
						<path d="M75,10 L75,210" stroke="#059669" stroke-width="2" fill="none" />
					</svg>
					
					<svg class="leaf leaf-8" viewBox="0 0 150 220" style="position: absolute; top: 8%; right: 18%; width: 28vw; opacity: 0.52; transform: rotate(-8deg);">
						<path d="M75,10 Q50,55 58,110 Q66,165 75,210 Q84,165 92,110 Q100,55 75,10 Z" fill="#059669" />
						<path d="M75,10 L75,210" stroke="#047857" stroke-width="2" fill="none" />
					</svg>
					
					<svg class="leaf leaf-9" viewBox="0 0 150 220" style="position: absolute; bottom: 8%; left: 25%; width: 22vw; opacity: 0.48; transform: rotate(12deg);">
						<path d="M75,10 Q50,55 58,110 Q66,165 75,210 Q84,165 92,110 Q100,55 75,10 Z" fill="#34d399" />
						<path d="M75,10 L75,210" stroke="#10b981" stroke-width="2" fill="none" />
					</svg>
					
					<svg class="leaf leaf-10" viewBox="0 0 150 220" style="position: absolute; bottom: 5%; right: 22%; width: 26vw; opacity: 0.5; transform: rotate(-10deg);">
						<path d="M75,10 Q50,55 58,110 Q66,165 75,210 Q84,165 92,110 Q100,55 75,10 Z" fill="#047857" />
						<path d="M75,10 L75,210" stroke="#065f46" stroke-width="2" fill="none" />
					</svg>
				</div>
				
				<!-- Logo central -->
				<div style="
					position: relative;
					z-index: 10;
					text-align: center; 
					animation: floatLogo 3s ease-in-out infinite;
					transform-origin: center center;
				">
					<img src="/LOGO SACRED.png" alt="Sacred Logo" style="
						height: 160px;
						width: auto;
						filter: brightness(1.5) drop-shadow(0 15px 45px rgba(255,255,255,0.6));
						transition: all 0.3s ease;
					"/>
				</div>
			</div>
			
			<style>
				@keyframes floatLogo {
					0%, 100% { 
						transform: translateY(0px) scale(1); 
					}
					50% { 
						transform: translateY(-15px) scale(1.04); 
					}
				}
				
				@keyframes swayLeaf {
					0%, 100% { 
						transform: rotate(var(--rotation)) translateX(0px) translateY(0px); 
					}
					50% { 
						transform: rotate(calc(var(--rotation) + 8deg)) translateX(5px) translateY(-3px); 
					}
				}
				
				.leaf {
					animation: swayLeaf 5s ease-in-out infinite;
					filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
				}
				
				.leaf-1 { --rotation: -15deg; animation-delay: 0s; }
				.leaf-2 { --rotation: 20deg; animation-delay: 0.7s; }
				.leaf-3 { --rotation: 10deg; animation-delay: 1.2s; }
				.leaf-4 { --rotation: -25deg; animation-delay: 1.8s; }
				.leaf-5 { --rotation: -35deg; animation-delay: 0.4s; }
				.leaf-6 { --rotation: 30deg; animation-delay: 1s; }
				.leaf-7 { --rotation: 5deg; animation-delay: 1.5s; }
				.leaf-8 { --rotation: -8deg; animation-delay: 2s; }
				.leaf-9 { --rotation: 12deg; animation-delay: 0.8s; }
				.leaf-10 { --rotation: -10deg; animation-delay: 2.2s; }
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

			// Pausa para que se actualice el contenido completamente
			await new Promise<void>((resolve) => {
				setTimeout(resolve, 350);
			});

			// Animación de salida del overlay (desvanecerse mientras se desliza)
			await new Promise<void>((resolve) => {
				gsap.to(overlay, {
					x: "100%",
					opacity: 0,
					duration: 0.9,
					ease: "power2.inOut",
					onComplete: () => {
						// Asegurar que se elimine del DOM
						if (overlay && overlay.parentNode) {
							overlay.parentNode.removeChild(overlay);
						}
						resolve();
					},
				});
			});
		} catch (error) {
			console.error("Error en transición:", error);
			// Fallback sin transición
			callback();
			// Asegurar que se elimine cualquier overlay
			const overlays = document.querySelectorAll(".slide-transition-overlay");
			overlays.forEach((o) => o.remove());
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
