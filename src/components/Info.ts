import { languageManager, t } from "../utils/language.ts";

// Componente Info
export function Info(): HTMLElement {
	const info = document.createElement("section");
	info.className = "center-component";

	const renderContent = () => {
		const translations = languageManager.getTranslations();
		const features = (translations.info as any).features as Array<{
			title: string;
			description: string;
		}>;

		const featuresHTML = features
			.map(
				(feature, index) => `
			<div class="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
				<div class="flex items-center mb-4">
					<div class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
						${index + 1}
					</div>
					<h3 class="text-xl font-semibold text-ocean-800">${feature.title}</h3>
				</div>
				<p class="text-gray-600 leading-relaxed">${feature.description}</p>
			</div>
		`
			)
			.join("");

		info.innerHTML = `
		<div>
		  <h2 class="text-3xl font-bold text-ocean-800 mb-4 text-center">${t(
					"info.title"
				)}</h2>
		  <p class="text-gray-600 text-lg leading-relaxed mb-12 text-center max-w-4xl mx-auto">
			${t("info.description")}
		  </p>
		  
		  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			${featuresHTML}
		  </div>
		</div>
	  `;
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(renderContent);

	return info;
}
