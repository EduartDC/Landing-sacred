import './style.css';
import { Home, addComponentToHome } from './pages/Home';
import { Tour } from './pages/Tour';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Info } from './components/Info';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Layout principal
function createLayout(): HTMLDivElement {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  app.innerHTML = `
    <div class="app-layout">
      <main class="main-content" id="main-content">
        <!-- Aquí se montará el Home y sus componentes -->
      </main>
    </div>
  `;

  return app;
}

// Función para montar componentes en el main
export function mountComponent(component: HTMLElement | string): void {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    if (typeof component === 'string') {
      mainContent.innerHTML = component;
    } else {
      mainContent.innerHTML = '';
      mainContent.appendChild(component);
    }
  }
}

// Función para cargar la Home page
function loadHomePage() {
  mountComponent(Home());
  setTimeout(() => {
    addComponentToHome(Hero());
    addComponentToHome(AboutUs());
    addComponentToHome(Info());
    addComponentToHome(Services());
    addComponentToHome(Testimonials());
    addComponentToHome(Contact());
    addComponentToHome(Footer());
  }, 100);
}

// Función para cargar la página del Tour
function loadTourPage(tourId: string) {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = '';
    const tourPage = Tour(tourId);
    mainContent.appendChild(tourPage);
    mainContent.appendChild(Footer());
  }
}

// Router simple basado en hash
function handleRouting() {
  const fullHash = window.location.hash;
  const baseHash = fullHash.split('?')[0]; // Ignorar parámetros de búsqueda para el selector

  if (baseHash.startsWith('#tour/')) {
    const tourId = baseHash.replace('#tour/', '');
    loadTourPage(tourId);
  } else {
    // Si no es una ruta de tour, cargar home
    const currentPage = document.querySelector('.tour-page');
    const isInTourPage = currentPage !== null;
    const mainContent = document.getElementById('main-content');
    const hasHomeContent = mainContent && mainContent.querySelector('.home-container');

    if (isInTourPage || !hasHomeContent) {
      // Si estamos en tour O si no hay contenido de home, cargar home
      loadHomePage();

      // Después de cargar home, hacer scroll a la sección si hay hash
      setTimeout(() => {
        if (baseHash && baseHash !== '#home') {
          try {
            const targetSection = document.querySelector(baseHash);
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } catch (e) {}
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 500);
    } else if (baseHash && baseHash !== '#' && baseHash !== '#home') {
      // Si ya estamos en home, solo hacer scroll a la sección
      try {
        const targetSection = document.querySelector(baseHash);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (e) {}
    }
  }
}

// ── Splash screen ───────────────────────────────────────────────────────────
function dismissLoader() {
  const loader = document.getElementById('sacred-loader');
  if (!loader || loader.classList.contains('hidden')) return;

  // Llevar la barra al 100% antes del fade
  const bar = loader.querySelector('.sl-progress-bar') as HTMLElement | null;
  if (bar) {
    bar.style.animation = 'none';
    bar.style.transition = 'width 0.3s ease';
    bar.style.width = '100%';
  }

  // Pequeña pausa para que se vea el 100%, luego fade out
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');

    // Eliminar del DOM después de la transición para liberar memoria
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 300);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
  const LOADER_MIN_MS = 1800;  // Mínimo que se muestra el loader (ms)
  const LOADER_MAX_MS = 4000;  // Máximo de espera aunque el video no cargue
  const startTime = Date.now();

  createLayout();

  // Montar el navbar en su contenedor específico
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    navbarContainer.appendChild(Navbar());
  }

  // Manejar routing inicial
  handleRouting();

  // Escuchar cambios en el hash para routing
  window.addEventListener('hashchange', handleRouting);

  // Inicializar sistema de transiciones después de que se monte todo
  setTimeout(async () => {
    try {
      const { pageTransitions } = await import('./utils/transitions');
      pageTransitions.init();
    } catch (error) {
      console.error('Error al inicializar transiciones:', error);
    }
  }, 800);

  // ── Lógica de cierre del loader ─────────────────────────────────────────
  // Solo mostrar loader en la home (no en páginas de tour)
  const isHomePage = !window.location.hash.startsWith('#tour/');

  if (!isHomePage) {
    // En páginas de tour: cerrar loader inmediatamente
    dismissLoader();
    return;
  }

  // Función que respeta el tiempo mínimo
  const dismissAfterMinTime = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, LOADER_MIN_MS - elapsed);
    setTimeout(dismissLoader, remaining);
  };

  // Hard timeout: cerrar sí o sí después de MAX_MS
  const hardTimeout = setTimeout(dismissLoader, LOADER_MAX_MS);

  // Escuchar el video del hero para cerrar cuando esté listo
  const waitForVideo = () => {
    const video = document.querySelector('.hero-video') as HTMLVideoElement | null;
    if (!video) {
      // Video aún no está en el DOM, reintentar
      setTimeout(waitForVideo, 150);
      return;
    }

    const onReady = () => {
      clearTimeout(hardTimeout);
      dismissAfterMinTime();
    };

    if (video.readyState >= 3) {
      // HAVE_FUTURE_DATA o más: el video ya tiene suficientes datos
      onReady();
    } else {
      video.addEventListener('canplay', onReady, { once: true });
      video.addEventListener('error', dismissAfterMinTime, { once: true });
    }
  };

  // Esperar un tick para que el DOM del hero esté montado
  setTimeout(waitForVideo, 200);
});
