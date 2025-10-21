// Demo de transición de idioma con Barba.js
import { languageManager } from "../utils/language";

export function TransitionDemo(): HTMLElement {
	const demo = document.createElement("div");
	demo.className =
		"fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border";
	demo.style.display = "block"; // Visible para pruebas

	demo.innerHTML = `
		<div class="text-sm font-bold mb-2">✨ Demo Transición</div>
		<div class="space-y-2">
			<button id="slide-btn" class="block w-full px-3 py-2 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
				🚀 Transición L→R (1.7s)
			</button>
		</div>
		<div class="mt-2 text-xs text-gray-500 leading-relaxed">
			• Overlay con logo Sacred<br>
			• Preparado para navegación<br>
			• Cambio de idioma suave
		</div>
	`;

	// Event listener para la transición de izquierda a derecha
	setTimeout(() => {
		const slideBtn = demo.querySelector("#slide-btn");

		slideBtn?.addEventListener("click", async () => {
			const currentLang = languageManager.getCurrentLanguage();
			const nextLang = currentLang === "en" ? "es" : "en";

			await languageManager.setLanguageWithTransition(nextLang);
		});
	}, 100);

	return demo;
}
