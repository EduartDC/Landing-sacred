// Sistema de transiciones usando Barba.js y GSAP
import barba from '@barba/core';
import { gsap } from 'gsap';

export class PageTransitions {
  private static instance: PageTransitions;
  private isTransitioning = false;

  private constructor() {
    // No inicializar Barba automáticamente, solo cuando sea necesario
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
              name: 'slide-left-to-right',
              leave: this.slideOutLeft,
              enter: this.slideInRight,
            },
          ],
        });
      } else {
      }
    } catch (error) {
      console.warn('Barba.js no se pudo inicializar:', error);
    }
  }

  // Transición de salida: deslizar hacia la izquierda (para navegación de páginas)
  private slideOutLeft = (data: any): Promise<void> => {
    return new Promise((resolve) => {
      gsap.to(data.current.container, {
        x: '-100%',
        opacity: 0.7,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: resolve,
      });
    });
  };

  // Transición de entrada: deslizar desde la derecha (para navegación de páginas)
  private slideInRight = (data: any): Promise<void> => {
    return new Promise((resolve) => {
      gsap.fromTo(
        data.next.container,
        { x: '100%', opacity: 0.7 },
        {
          x: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: resolve,
        }
      );
    });
  };

  // Crear overlay para transición de pantalla completa estilo cinemático y profesional
  private createSlideOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'slide-transition-overlay';
    overlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: #010a06; /* Fondo de selva ultra profundo */
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		`;

    overlay.innerHTML = `
			<!-- Capa de Palmeras Fotorealistas (Mirando hacia el cielo) -->
			<div style="
				position: absolute; top: -5%; left: -5%; width: 110%; height: 110%;
				background-image: url('/palmeras.jpg');
				background-size: cover;
				background-position: center;
				opacity: 0.45; /* Opacidad para oscurecer la foto brillante y darle el toque de selva oscura */
				filter: contrast(1.2) saturate(1.2);
				animation: canopyBreathe 18s ease-in-out infinite alternate;
				pointer-events: none;
			"></div>

			<!-- Componente Central (Logo aún más Gigante) -->
			<div style="
				position: relative;
				z-index: 10;
				display: flex;
				flex-direction: column;
				align-items: center;
				animation: cinematicBreathe 4s ease-in-out infinite alternate;
			">
				<img src="/LOGO SACRED.png" alt="Sacred Logo" style="
					height: 320px; /* Logo ENORME */
					width: auto;
					filter: drop-shadow(0 20px 50px rgba(16, 185, 129, 0.4));
					opacity: 1;
				"/>
			</div>
			
			<style>
				@keyframes canopyBreathe {
					0% { transform: scale(1) rotate(0deg); }
					100% { transform: scale(1.06) rotate(1.5deg); }
				}
				@keyframes cinematicBreathe {
					0% { 
						transform: scale(0.98) translateY(0); 
						filter: brightness(0.95);
					}
					100% { 
						transform: scale(1.02) translateY(-10px); 
						filter: brightness(1.1) drop-shadow(0 20px 50px rgba(16, 185, 129, 0.5));
					}
				}
			</style>
		`;

    return overlay;
  }

  // Crear overlay para transición diagonal
  private createTransitionOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'language-transition-overlay';
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
    await this.setLanguageWithTransition('', callback);
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
          { x: '-100%', opacity: 0.8 },
          {
            x: '0%',
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
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
          x: '100%',
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
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
      console.error('Error en transición:', error);
      // Fallback sin transición
      callback();
      // Asegurar que se elimine cualquier overlay
      const overlays = document.querySelectorAll('.slide-transition-overlay');
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
      overlay.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%)';
      document.body.appendChild(overlay);

      // Animación de entrada diagonal con clip-path
      await new Promise<void>((resolve) => {
        gsap.to(overlay, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: resolve,
        });
      });

      // Ejecutar callback
      callback();

      // Animación de salida diagonal
      await new Promise<void>((resolve) => {
        gsap.to(overlay, {
          clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%)',
          duration: 0.8,
          ease: 'power2.inOut',
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
          ease: 'power2.out',
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
            ease: 'power2.out',
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

    const mainContent = document.querySelector('main') || document.body;

    try {
      // Slide out hacia la izquierda
      await new Promise<void>((resolve) => {
        gsap.to(mainContent, {
          x: '-100%',
          opacity: 0.5,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: resolve,
        });
      });

      // Ejecutar callback
      callback();

      // Slide in desde la derecha
      await new Promise<void>((resolve) => {
        gsap.fromTo(
          mainContent,
          { x: '100%', opacity: 0.5 },
          {
            x: '0%',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut',
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
      const overlay = document.createElement('div');
      overlay.className = 'wipe-transition-overlay';
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
          y: '0%',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: resolve,
        });
      });

      // Ejecutar callback
      callback();

      // Wipe hacia arriba y salir
      await new Promise<void>((resolve) => {
        gsap.to(overlay, {
          y: '-100%',
          duration: 0.5,
          ease: 'power2.inOut',
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
    } catch (error) {}
  }

  // Método para destruir Barba si es necesario
  public destroy(): void {
    try {
      if (barba.running) {
        barba.destroy();
      }
    } catch (error) {}
  }
}

// Instancia singleton
export const pageTransitions = PageTransitions.getInstance();

// Helper function para ejecutar transición desde cualquier componente
export async function executePageTransition(callback: () => void): Promise<void> {
  await pageTransitions.setLanguageWithTransition('', callback);
}
