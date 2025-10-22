// Componente Navbar con estilo Flowbite
import { languageManager, t } from "../utils/language";
import { executePageTransition } from "../utils/transitions";

export function Navbar(): HTMLElement {
	const navbar = document.createElement("nav");
	navbar.className =
		"w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg transition-all duration-300";

	// Asegurar que el navbar sea fixed (permanece siempre visible)
	navbar.style.position = "fixed";
	navbar.style.top = "0";
	navbar.style.left = "0";
	navbar.style.right = "0";
	navbar.style.zIndex = "9999";
	navbar.style.width = "100%";

	// Configuración centralizada de idiomas
	const languages = {
		en: {
			code: "EN",
			name: "English (US)",
			flag: `<svg class="h-3.5 w-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				<defs>
					<clipPath id="circle-clip-en">
						<circle cx="50" cy="50" r="50"/>
					</clipPath>
				</defs>
				<g clip-path="url(#circle-clip-en)">
					<rect width="100" height="100" fill="#b22234"/>
					<rect width="100" height="7.69" y="7.69" fill="#fff"/>
					<rect width="100" height="7.69" y="23.08" fill="#fff"/>
					<rect width="100" height="7.69" y="38.46" fill="#fff"/>
					<rect width="100" height="7.69" y="53.85" fill="#fff"/>
					<rect width="100" height="7.69" y="69.23" fill="#fff"/>
					<rect width="100" height="7.69" y="84.62" fill="#fff"/>
					<rect width="40" height="53.85" fill="#3c3b6e"/>
				</g>
			</svg>`,
		},
		es: {
			code: "ES",
			name: "Español (ES)",
			flag: `<svg class="h-3.5 w-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				<defs>
					<clipPath id="circle-clip-es">
						<circle cx="50" cy="50" r="50"/>
					</clipPath>
				</defs>
				<g clip-path="url(#circle-clip-es)">
					<rect width="100" height="100" fill="#c60b1e"/>
					<rect width="100" height="50" y="25" fill="#ffc400"/>
				</g>
			</svg>`,
		},
		fr: {
			code: "FR",
			name: "Français (FR)",
			flag: `<svg class="h-3.5 w-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				<defs>
					<clipPath id="circle-clip-fr">
						<circle cx="50" cy="50" r="50"/>
					</clipPath>
				</defs>
				<g clip-path="url(#circle-clip-fr)">
					<rect width="33.33" height="100" fill="#002395"/>
					<rect width="33.33" height="100" x="33.33" fill="#fff"/>
					<rect width="33.34" height="100" x="66.66" fill="#ed2939"/>
				</g>
			</svg>`,
		},
		de: {
			code: "DE",
			name: "Alemán (DE)",
			flag: `<svg class="h-3.5 w-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				<defs>
					<clipPath id="circle-clip-de">
						<circle cx="50" cy="50" r="50"/>
					</clipPath>
				</defs>
				<g clip-path="url(#circle-clip-de)">
					<rect width="100" height="33.33" fill="#000000"/>
					<rect width="100" height="33.33" y="33.33" fill="#dd0000"/>
					<rect width="100" height="33.34" y="66.66" fill="#ffce00"/>
				</g>
			</svg>`,
		},
	};

	// Función para renderizar el contenido
	const renderContent = () => {
		const currentLang = languageManager.getCurrentLanguage();
		const currentLanguageInfo = languages[currentLang];

		navbar.innerHTML = `
		<div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
			<a href="#home" class="flex items-center space-x-3">
				<img src="/LOGO SACRED.png" class="h-10" alt="Sacred Logo" />
				<span class="self-center text-2xl font-bold whitespace-nowrap text-gray-800">${t(
					"navbar.brand"
				)}</span>
			</a>
			
			<div class="flex items-center md:order-2 space-x-1 md:space-x-0 relative">
				<!-- Language Dropdown -->
				<div class="relative">
					<button type="button" data-dropdown-toggle="language-dropdown-menu" class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-ocean-800 rounded-lg cursor-pointer hover:bg-jungle-100 transition-colors duration-200">
						${currentLanguageInfo.flag}
						${currentLanguageInfo.code}
						<svg class="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
						</svg>
					</button>
					
					<!-- Dropdown -->
					<div class="z-50 hidden absolute right-0 mt-2 w-44 text-base list-none bg-white divide-y divide-gray-100 rounded-lg border border-gray-200 shadow-lg" id="language-dropdown-menu">
						<ul class="py-2 font-medium" role="none">
							${Object.entries(languages)
								.map(
									([code, lang]) => `
								<li>
									<a href="#" data-lang="${code}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200" role="menuitem">
										<div class="inline-flex items-center">
											${lang.flag}
											${lang.name}
										</div>
									</a>
								</li>
							`
								)
								.join("")}
						</ul>
					</div>
				</div>
				
				<!-- Mobile menu button -->
				<button data-collapse-toggle="navbar-language" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-ocean-800 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200" aria-controls="navbar-language" aria-expanded="false">
					<span class="sr-only">Open main menu</span>
					<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
					</svg>
				</button>
			</div>
			
			<!-- Navigation Menu -->
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
				<ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-200 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
					<li>
						<a href="#home" data-nav-link="home" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
							"navbar.home"
						)}</a>
					</li>
					<li>
						<a href="#about" data-nav-link="about" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
							"navbar.about"
						)}</a>
					</li>
					<li>
						<a href="#services" data-nav-link="services" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
							"navbar.services"
						)}</a>
					</li>
					<li>
						<a href="#contact" data-nav-link="contact" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
							"navbar.contact"
						)}</a>
					</li>
				</ul>
			</div>
		</div>
		`;
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(() => {
		renderContent();
		setupEventListeners();
	});

	// Función para actualizar el estado activo basado en la sección visible
	const updateActiveNavLink = () => {
		const sections = ["home", "about", "services", "contact"];
		const scrollPosition = window.scrollY + 150; // Offset para activar antes
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		let currentSection = "home"; // Por defecto

		// Solo cambiar de sección si hay scroll significativo
		if (window.scrollY > 10) {
			// Si estamos cerca del final de la página, activar contact
			if (scrollPosition + windowHeight >= documentHeight - 100) {
				currentSection = "contact";
			} else {
				// Encontrar qué sección está actualmente visible
				for (let i = sections.length - 1; i >= 0; i--) {
					const sectionId = sections[i];
					const element = document.getElementById(sectionId);
					if (element) {
						const offsetTop = element.offsetTop;

						if (scrollPosition >= offsetTop - 100) {
							currentSection = sectionId;
							break;
						}
					}
				}
			}
		}

		// Debug: mostrar qué sección se detectó
		console.log(
			"Current section detected:",
			currentSection,
			"ScrollPosition:",
			scrollPosition
		);

		// Actualizar todos los links considerando si el navbar está translúcido
		const isTranslucent = navbar.classList.contains("bg-black/30");
		const navLinks = navbar.querySelectorAll(".nav-link");

		navLinks.forEach((link) => {
			const linkSection = link.getAttribute("data-nav-link");

			if (linkSection === currentSection) {
				// Activar link con mejor visibilidad
				link.classList.remove("text-gray-700", "text-white", "text-white/80");
				link.setAttribute("aria-current", "page");

				if (isTranslucent) {
					// En modo translúcido, link activo con fondo semitransparente y borde
					link.classList.add(
						"text-white",
						"bg-white/20",
						"md:bg-white/10",
						"border-b-2",
						"border-white/80",
						"font-bold",
						"md:border-b-2"
					);
					link.classList.remove("bg-ocean-600", "md:bg-transparent");
				} else {
					// En modo sólido, usar el estilo estándar con borde
					link.classList.add(
						"text-white",
						"bg-ocean-600",
						"md:bg-transparent",
						"md:text-ocean-600",
						"md:border-b-2",
						"md:border-ocean-600",
						"font-bold"
					);
					link.classList.remove("bg-white/20", "md:bg-white/10", "border-white/80");
				}
			} else {
				// Desactivar link
				link.classList.remove(
					"text-white",
					"bg-ocean-600",
					"md:bg-transparent",
					"md:text-ocean-600",
					"bg-white/20",
					"md:bg-white/10",
					"border-b-2",
					"border-white/80",
					"md:border-ocean-600",
					"font-bold",
					"md:border-b-2"
				);
				link.removeAttribute("aria-current");

				if (isTranslucent) {
					// En modo translúcido, links inactivos con menor opacidad
					link.classList.add("text-white/80");
				} else {
					// En modo sólido, usar color estándar
					link.classList.add("text-gray-700");
				}
			}
		});
	};

	// Función para configurar event listeners
	const setupEventListeners = () => {
		// Dropdown functionality
		const dropdownButton = navbar.querySelector(
			'[data-dropdown-toggle="language-dropdown-menu"]'
		);
		const dropdownMenu = navbar.querySelector("#language-dropdown-menu");

		if (dropdownButton && dropdownMenu) {
			// Remover listeners anteriores clonando el elemento
			const newDropdownButton = dropdownButton.cloneNode(true);
			dropdownButton.parentNode?.replaceChild(newDropdownButton, dropdownButton);

			newDropdownButton.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				dropdownMenu.classList.toggle("hidden");
			});

			// Cerrar dropdown al hacer click fuera
			document.addEventListener("click", (event) => {
				const target = event.target as Node;
				if (!newDropdownButton.contains(target) && !dropdownMenu.contains(target)) {
					dropdownMenu.classList.add("hidden");
				}
			});

			// Manejar selección de idioma
			const languageLinks = dropdownMenu.querySelectorAll("a[data-lang]");
			languageLinks.forEach((link) => {
				link.addEventListener("click", async (e) => {
					e.preventDefault();
					const selectedLang = (e.currentTarget as HTMLElement).getAttribute(
						"data-lang"
					);
					if (selectedLang) {
						// Cerrar dropdown antes de la transición
						dropdownMenu.classList.add("hidden");

						// Ejecutar cambio de idioma con transición de izquierda a derecha
						await languageManager.setLanguageWithTransition(selectedLang as any);
					}
				});
			});
		}

		// Navigation links functionality
		const navLinks = navbar.querySelectorAll(".nav-link");
		navLinks.forEach((link) => {
			link.addEventListener("click", async (e) => {
				const target = link.getAttribute("href");
				const targetSection = link.getAttribute("data-nav-link");

				if (target && targetSection) {
					// Verificar si el elemento existe en la página actual
					const element = document.querySelector(target);

					if (element) {
						// Si existe, hacer scroll suave (estamos en home)
						e.preventDefault();
						element.scrollIntoView({ behavior: "smooth" });

						// Actualizar inmediatamente el estado activo
						setTimeout(() => {
							updateActiveNavLink();
						}, 100);
					} else {
						// Si no existe, estamos en tour - usar transición
						e.preventDefault();

						await executePageTransition(() => {
							// Cambiar el hash para navegar
							window.location.hash = target;
						});
					}
				}
			});
		});

		// Mobile menu functionality
		const mobileButton = navbar.querySelector(
			'[data-collapse-toggle="navbar-language"]'
		);
		const mobileMenu = navbar.querySelector("#navbar-language");

		if (mobileButton && mobileMenu) {
			mobileButton.addEventListener("click", () => {
				mobileMenu.classList.toggle("hidden");
			});
		}
	};

	// Configurar listeners iniciales
	setTimeout(() => {
		setupEventListeners();
	}, 100);

	// Añadir efecto de scroll para el navbar sticky
	const handleScroll = () => {
		const currentScrollY = window.scrollY;

		// Cambiar la apariencia basado en el scroll
		if (currentScrollY > 50) {
			// Navbar translúcido con letras blancas
			navbar.classList.add("bg-black/30", "backdrop-blur-lg", "shadow-xl");
			navbar.classList.remove("bg-white/95", "shadow-lg");

			// Cambiar TODOS los textos a blanco para que se vean sobre fondo translúcido
			const brandText = navbar.querySelector("span");
			const languageButton = navbar.querySelector(
				'[data-dropdown-toggle="language-dropdown-menu"]'
			);
			const mobileButton = navbar.querySelector(
				'[data-collapse-toggle="navbar-language"]'
			);

			// Cambiar brand text a blanco
			if (brandText) {
				brandText.classList.remove(
					"text-gray-800",
					"text-gray-700",
					"text-ocean-800"
				);
				brandText.classList.add("text-white");
			}

			// Cambiar botón de idioma a blanco
			if (languageButton) {
				languageButton.classList.remove(
					"text-ocean-800",
					"text-gray-700",
					"text-gray-800"
				);
				languageButton.classList.add("text-white");
			}

			// Cambiar botón móvil a blanco
			if (mobileButton) {
				mobileButton.classList.remove(
					"text-ocean-800",
					"text-gray-700",
					"text-gray-800"
				);
				mobileButton.classList.add("text-white");
			}

			// Cambiar TODOS los links de navegación a blanco
			const navLinks = navbar.querySelectorAll(".nav-link");
			navLinks.forEach((link) => {
				// Remover cualquier color oscuro y agregar blanco
				link.classList.remove(
					"text-gray-700",
					"text-gray-800",
					"text-ocean-800",
					"md:text-ocean-600"
				);
				link.classList.add("text-white");
				// Cambiar hover a un color más claro
				link.classList.replace("md:hover:text-ocean-600", "md:hover:text-gray-200");
			});

			// Buscar y cambiar cualquier otro texto que pueda estar presente
			const allTextElements = navbar.querySelectorAll("*");
			allTextElements.forEach((element) => {
				// Si tiene algún color de texto oscuro, cambiarlo a blanco
				if (
					element.classList.contains("text-gray-700") ||
					element.classList.contains("text-gray-800") ||
					element.classList.contains("text-ocean-800") ||
					element.classList.contains("text-black")
				) {
					element.classList.remove(
						"text-gray-700",
						"text-gray-800",
						"text-ocean-800",
						"text-black"
					);
					element.classList.add("text-white");
				}
			});

			// Cambiar dropdown a tema oscuro
			const dropdown = navbar.querySelector("#language-dropdown-menu");
			if (dropdown) {
				dropdown.classList.replace("bg-white", "bg-gray-800");
				dropdown.classList.replace("divide-gray-100", "divide-gray-600");
				dropdown.classList.replace("border-gray-200", "border-gray-600");

				// Cambiar links del dropdown a blanco
				const dropdownLinks = dropdown.querySelectorAll("a");
				dropdownLinks.forEach((link) => {
					link.classList.replace("text-gray-700", "text-white");
					link.classList.replace("hover:bg-gray-100", "hover:bg-gray-700");
				});
			}
		} else {
			// Navbar sólido con letras oscuras
			navbar.classList.add("bg-white/95", "shadow-lg");
			navbar.classList.remove("bg-black/30", "backdrop-blur-lg", "shadow-xl");

			// Restaurar TODOS los textos a colores oscuros
			const brandText = navbar.querySelector("span");
			const languageButton = navbar.querySelector(
				'[data-dropdown-toggle="language-dropdown-menu"]'
			);
			const mobileButton = navbar.querySelector(
				'[data-collapse-toggle="navbar-language"]'
			);
			const allTextElements = navbar.querySelectorAll("*");

			// Restaurar brand text a color original
			if (brandText) {
				brandText.classList.remove("text-white");
				brandText.classList.add("text-gray-800");
			}

			// Restaurar botón de idioma a color original
			if (languageButton) {
				languageButton.classList.remove("text-white");
				languageButton.classList.add("text-ocean-800");
			}

			// Restaurar botón móvil a color original
			if (mobileButton) {
				mobileButton.classList.remove("text-white");
				mobileButton.classList.add("text-ocean-800");
			}

			// Restaurar TODOS los links de navegación a color original
			const navLinks = navbar.querySelectorAll(".nav-link");
			navLinks.forEach((link) => {
				// Remover TODOS los colores blancos y estilos translúcidos
				link.classList.remove(
					"text-white",
					"text-white/80",
					"bg-white/20",
					"md:bg-white/10",
					"border-b-2",
					"border-white/80"
				);

				// Si no es un link activo, ponerlo gris
				if (!link.classList.contains("bg-ocean-600")) {
					link.classList.add("text-gray-700");
				}

				// Restaurar hover original
				link.classList.replace("md:hover:text-gray-200", "md:hover:text-ocean-600");
			});

			// Restaurar cualquier otro texto blanco a color original
			allTextElements.forEach((element) => {
				if (
					element.classList.contains("text-white") ||
					element.classList.contains("text-white/80")
				) {
					// Remover todos los colores blancos
					element.classList.remove("text-white", "text-white/80");

					// Solo agregar color si no es un elemento activo
					if (!element.classList.contains("bg-ocean-600")) {
						// Determinar el color original apropiado
						if (element === brandText) {
							element.classList.add("text-gray-800");
						} else if (element === languageButton || element === mobileButton) {
							element.classList.add("text-ocean-800");
						} else {
							element.classList.add("text-gray-700");
						}
					}
				}
			});

			// Restaurar dropdown a tema claro
			const dropdown = navbar.querySelector("#language-dropdown-menu");
			if (dropdown) {
				dropdown.classList.replace("bg-gray-800", "bg-white");
				dropdown.classList.replace("divide-gray-600", "divide-gray-100");
				dropdown.classList.replace("border-gray-600", "border-gray-200");

				// Restaurar links del dropdown a color original
				const dropdownLinks = dropdown.querySelectorAll("a");
				dropdownLinks.forEach((link) => {
					link.classList.replace("text-white", "text-gray-700");
					link.classList.replace("hover:bg-gray-700", "hover:bg-gray-100");
				});
			}
		}
	};

	// Combinar scroll handler con active link update
	const combinedScrollHandler = () => {
		handleScroll();
		updateActiveNavLink();
	};

	// Añadir event listener para scroll
	window.addEventListener("scroll", combinedScrollHandler, { passive: true });

	// Ejecutar una vez al cargar para establecer el estado inicial
	setTimeout(updateActiveNavLink, 100);

	// Limpiar event listener cuando sea necesario (opcional)
	const cleanupScroll = () => {
		window.removeEventListener("scroll", combinedScrollHandler);
	};

	// Agregar método de cleanup al navbar
	(navbar as any).cleanup = cleanupScroll;
	return navbar;
}
