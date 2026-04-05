import './style.css';
import { Home, addComponentToHome } from './pages/Home';
import { Tour } from './pages/Tour';
import { TermsPage } from './pages/Terms';
import { PrivacyPage } from './pages/Privacy';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Info } from './components/Info';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { languageManager } from './utils/language';

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
  } else if (baseHash === '#terms') {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = '';
      mainContent.appendChild(TermsPage());
      mainContent.appendChild(Footer());
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  } else if (baseHash === '#privacy') {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = '';
      mainContent.appendChild(PrivacyPage());
      mainContent.appendChild(Footer());
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
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

  // ── Botón Scroll To Top ─────────────────────────────────────────────────
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.setAttribute('aria-label', 'Volver arriba');
  scrollBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>`;
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 8rem;
    right: 1.5rem;
    z-index: 9998;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2c5228, #4a8c44);
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(44,82,40,0.4);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease, box-shadow 0.2s ease;
    pointer-events: none;
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    scrollBtn.style.opacity = show ? '1' : '0';
    scrollBtn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
    scrollBtn.style.pointerEvents = show ? 'auto' : 'none';
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.background = 'linear-gradient(135deg, #3a6b35, #5cac56)';
    scrollBtn.style.boxShadow = '0 6px 28px rgba(44,82,40,0.55)';
    scrollBtn.style.transform = 'translateY(-3px)';
  });
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.background = 'linear-gradient(135deg, #2c5228, #4a8c44)';
    scrollBtn.style.boxShadow = '0 4px 20px rgba(44,82,40,0.4)';
    scrollBtn.style.transform = 'translateY(0)';
  });

  // ── Botón WhatsApp flotante ──────────────────────────────────────────────
  // Inyectar animación CSS del pulso
  const waPulseStyle = document.createElement('style');
  waPulseStyle.textContent = `
    @keyframes wa-ripple {
      0%   { transform: scale(1);   opacity: 0.6; }
      70%  { transform: scale(1.9); opacity: 0; }
      100% { transform: scale(1.9); opacity: 0; }
    }
    @keyframes wa-bounce {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-5px); }
    }
    #wa-float-btn { animation: wa-bounce 2.4s ease-in-out infinite; }
    #wa-float-btn::before,
    #wa-float-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #25D366;
      animation: wa-ripple 2s ease-out infinite;
      z-index: -1;
    }
    #wa-float-btn::after { animation-delay: 0.7s; }
    #wa-float-btn:hover  { animation: none; transform: scale(1.1); }
  `;
  document.head.appendChild(waPulseStyle);

  const waBtn = document.createElement('a');
  waBtn.id = 'wa-float-btn';
  waBtn.href = 'https://wa.me/5219841234567?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20sus%20tours.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
  waBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.066.381-.057c.106-.123.49-.573.618-.767.128-.197.256-.164.384-.116.128.048.81.382.949.452s.231.109.264.169c.032.06.032.343-.112.748z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.554 4.1 1.522 5.827L.054 23.5l5.805-1.521A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.872 9.872 0 01-5.031-1.381l-.36-.214-3.742.981.998-3.648-.235-.374A9.865 9.865 0 012.118 12C2.118 6.9 6.9 2.118 12 2.118S21.882 6.9 21.882 12 17.1 21.882 12 21.882z"/>
    </svg>`;
  waBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 1.5rem;
    z-index: 9997;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #25D366;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(37,211,102,0.45);
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  `;
  document.body.appendChild(waBtn);

  // Traducir el texto de estado del splash screen al idioma detectado
  const splashStatus = document.querySelector('.sl-status');
  if (splashStatus) {
    splashStatus.textContent = (languageManager.getTranslations().splash as any)?.status ?? 'Loading...';
  }

  // Montar el navbar en su contenedor específico
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    navbarContainer.appendChild(Navbar());
  }

  // Manejar routing inicial
  handleRouting();

  // Ocultar/mostrar botón WA según la página
  const syncWaBtn = () => {
    const isTourPage = window.location.hash.startsWith('#tour/');
    waBtn.style.display = isTourPage ? 'none' : 'flex';
  };
  syncWaBtn();

  // Escuchar cambios en el hash para routing y sincronizar botón WA
  window.addEventListener('hashchange', () => {
    handleRouting();
    syncWaBtn();
  });

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
