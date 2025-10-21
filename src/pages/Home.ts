// Función para crear la página Home
export function Home(): HTMLElement {
	const homeContainer = document.createElement("div");
	homeContainer.className = "home-container";

	homeContainer.innerHTML = `
    <div id="components-container" class="components-container">
      <!-- Aquí se montarán los componentes: Navbar, Hero, AboutUs, Info, Services, Testimonials, Contact, Footer -->
    </div>
  `;

	return homeContainer;
}

// Función para agregar componentes al Home
export function addComponentToHome(component: HTMLElement | string): void {
	const container = document.getElementById("components-container");
	if (container) {
		if (typeof component === "string") {
			const div = document.createElement("div");
			div.innerHTML = component;
			container.appendChild(div);
		} else {
			container.appendChild(component);
		}
	}
}
