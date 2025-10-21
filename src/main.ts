import "./style.css";
import { Home, addComponentToHome } from "./pages/Home";
import { Tour } from "./pages/Tour";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutUs } from "./components/AboutUs";
import { Info } from "./components/Info";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

// Layout principal
function createLayout(): HTMLDivElement {
	const app = document.querySelector<HTMLDivElement>("#app")!;

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
	const mainContent = document.getElementById("main-content");
	if (mainContent) {
		if (typeof component === "string") {
			mainContent.innerHTML = component;
		} else {
			mainContent.innerHTML = "";
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
	const mainContent = document.getElementById("main-content");
	if (mainContent) {
		mainContent.innerHTML = "";
		const tourPage = Tour(tourId);
		mainContent.appendChild(tourPage);
		mainContent.appendChild(Footer());
	}
}

// Router simple basado en hash
function handleRouting() {
	const hash = window.location.hash;

	if (hash.startsWith("#tour/")) {
		const tourId = hash.replace("#tour/", "");
		loadTourPage(tourId);
	} else {
		loadHomePage();
	}
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", async () => {
	createLayout();

	// Montar el navbar en su contenedor específico
	const navbarContainer = document.getElementById("navbar-container");
	if (navbarContainer) {
		navbarContainer.appendChild(Navbar());
	}

	// Manejar routing inicial
	handleRouting();

	// Escuchar cambios en el hash para routing
	window.addEventListener("hashchange", handleRouting);

	// Inicializar sistema de transiciones después de que se monte todo
	setTimeout(async () => {
		try {
			const { pageTransitions } = await import("./utils/transitions");
			pageTransitions.init();
			console.log("Sistema de transiciones inicializado");
		} catch (error) {
			console.error("Error al inicializar transiciones:", error);
		}
	}, 800);
});
