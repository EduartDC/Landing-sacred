// Componente Contact
import { languageManager, t } from "../utils/language.ts";

export function Contact(): HTMLElement {
	const contact = document.createElement("section");
	contact.className = "center-component center-component-last";
	contact.id = "contact";

	const renderContent = () => {
		contact.innerHTML = `
    <div>
      <h2 class="text-4xl font-bold text-gray-800 mb-6 text-center">${t(
							"contact.title"
						)}</h2>
      <p class="text-gray-600 text-xl leading-relaxed mb-6 text-center max-w-4xl mx-auto">
        ${t("contact.subtitle")}
      </p>
      
      <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-12 border border-emerald-100 shadow-lg">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
            🌟
          </div>
          <p class="text-gray-700 text-lg leading-relaxed mb-6 max-w-3xl mx-auto italic">
            "${t("contact.description")}"
          </p>
          <div class="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-emerald-200">
            <p class="text-emerald-700 font-semibold text-lg">
              ${t("contact.callToAction")}
            </p>
          </div>
        </div>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="space-y-8">
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                📧
              </div>
              <div>
                <h3 class="text-gray-800 font-bold text-lg">${t(
																	"contact.info.email"
																)}</h3>
                <p class="text-emerald-600 font-semibold text-lg">aventuras@sacredroutes.com</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">${t(
													"contact.info.emailDescription"
												)}</p>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                📱
              </div>
              <div>
                <h3 class="text-gray-800 font-bold text-lg">${t(
																	"contact.info.phone"
																)} / WhatsApp</h3>
                <p class="text-blue-600 font-semibold text-lg">+52 984 123 4567</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">${t(
													"contact.info.phoneDescription"
												)}</p>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                📍
              </div>
              <div>
                <h3 class="text-gray-800 font-bold text-lg">${t(
																	"contact.info.address"
																)}</h3>
                <p class="text-purple-600 font-semibold">${t(
																	"contact.info.addressCity"
																)}</p>
                <p class="text-gray-600 text-sm">${t(
																	"contact.info.addressRegion"
																)}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">${t(
													"contact.info.addressDescription"
												)}</p>
          </div>
          
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-lg">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                ⏰
              </div>
              <div>
                <h3 class="text-gray-800 font-bold text-lg">${t(
																	"contact.info.hours"
																)}</h3>
                <p class="text-amber-700 font-semibold">${t(
																	"contact.info.hoursSchedule"
																)}</p>
                <p class="text-gray-600 text-sm">${t(
																	"contact.info.hoursTime"
																)}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">${t(
													"contact.info.hoursDescription"
												)}</p>
          </div>
        </div>
        
        <form name="contact" method="POST" data-netlify="true" class="contact-form space-y-6">
          <input type="hidden" name="form-name" value="contact" />
          
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
              ✨
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">${t(
													"contact.formHeader.title"
												)}</h3>
            <p class="text-gray-600 leading-relaxed">${t(
													"contact.formHeader.description"
												)}</p>
          </div>
          
          <div class="form-group">
            <label for="contact-name" class="block text-gray-800 font-semibold mb-3 text-lg">${t(
													"contact.form.name"
												)} *</label>
            <input type="text" id="contact-name" name="name" required 
                   placeholder="${t("contact.form.placeholders.name")}"
                   class="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg">
            <span class="error-message text-red-500 text-sm font-medium hidden block mt-2"></span>
          </div>
          
          <div class="form-group">
            <label for="contact-email" class="block text-gray-800 font-semibold mb-3 text-lg">${t(
													"contact.form.email"
												)} *</label>
            <input type="email" id="contact-email" name="email" required 
                   placeholder="${t("contact.form.placeholders.email")}"
                   class="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg">
            <span class="error-message text-red-500 text-sm font-medium hidden block mt-2"></span>
          </div>
          
          <div class="form-group">
            <label for="contact-phone" class="block text-gray-800 font-semibold mb-3 text-lg">${t(
													"contact.form.phone"
												)}</label>
            <input type="tel" id="contact-phone" name="phone" 
                   placeholder="${t("contact.form.placeholders.phone")}"
                   maxlength="10"
                   class="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg">
            <span class="error-message text-red-500 text-sm font-medium hidden block mt-2"></span>
          </div>
          
          <div class="form-group">
            <label for="contact-message" class="block text-gray-800 font-semibold mb-3 text-lg">${t(
													"contact.form.message"
												)} *</label>
            <textarea id="contact-message" name="message" rows="5" required 
                      placeholder="${t("contact.form.placeholders.message")}"
                      class="w-full px-5 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-lg leading-relaxed"></textarea>
            <div class="flex justify-between items-center mt-3">
              <span class="error-message text-red-500 text-sm font-medium hidden"></span>
              <span class="word-count text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">0 ${t(
															"contact.wordCount"
														)}</span>
            </div>
          </div>          <button type="submit" class="submit-btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-lg shadow-lg">
            ${t("contact.form.send")}
          </button>
          
          <!-- Success Message -->
          <div class="success-message hidden bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-800 px-6 py-4 rounded-xl text-center font-semibold text-lg shadow-lg">
            ${t("contact.form.success")}
          </div>
        </form>
      </div>
    </div>
  `;

		setupFormValidation(contact);
	};

	// Renderizar contenido inicial
	renderContent();

	// Suscribirse a cambios de idioma
	languageManager.subscribe(renderContent);

	setupContactStyles();
	return contact;
}

function setupContactStyles() {
	if (!document.querySelector("#contact-styles")) {
		const style = document.createElement("style");
		style.id = "contact-styles";
		style.textContent = `
			/* Estilos del formulario de contacto */
			.contact-form {
				backdrop-filter: blur(15px);
				background: rgba(255, 255, 255, 0.9);
				border: 1px solid rgba(255, 255, 255, 0.3);
				border-radius: 1rem;
				padding: 2rem;
				box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
			}

			.form-group {
				position: relative;
			}

			.form-group input,
			.form-group textarea {
				transition: all 0.3s ease;
				background: white;
				border: 2px solid #d1d5db;
				color: #1f2937;
			}

			.form-group input:focus,
			.form-group textarea:focus {
				border-color: #3b82f6;
				background: white;
				box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
				transform: translateY(-1px);
			}

			.form-group.error input,
			.form-group.error textarea {
				border-color: #ef4444;
				background: #fef2f2;
				animation: shake 0.5s ease-in-out;
			}

			@keyframes shake {
				0%, 100% { transform: translateX(0); }
				25% { transform: translateX(-5px); }
				75% { transform: translateX(5px); }
			}

			.error-message {
				margin-top: 0.5rem;
				font-weight: 500;
				animation: fadeIn 0.3s ease-in-out;
			}

			@keyframes fadeIn {
				from { opacity: 0; transform: translateY(-10px); }
				to { opacity: 1; transform: translateY(0); }
			}

			.submit-btn {
				background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
				border: none;
				position: relative;
				overflow: hidden;
				box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.4);
				transition: all 0.3s ease;
			}

			.submit-btn:hover:not(:disabled) {
				transform: translateY(-2px);
				box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.6);
				background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
			}

			.submit-btn:active:not(:disabled) {
				transform: translateY(0);
			}

			.submit-btn:disabled {
				background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
				cursor: not-allowed;
				transform: none;
				box-shadow: none;
			}

			.submit-btn::before {
				content: '';
				position: absolute;
				top: 0;
				left: -100%;
				width: 100%;
				height: 100%;
				background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
				transition: left 0.5s;
			}

			.submit-btn:hover:not(:disabled)::before {
				left: 100%;
			}

			.success-message {
				background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
				border: 2px solid #10b981;
				border-radius: 0.75rem;
				box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.3);
				animation: slideIn 0.5s ease-out;
			}

			@keyframes slideIn {
				from { opacity: 0; transform: translateY(20px); }
				to { opacity: 1; transform: translateY(0); }
			}

			.word-count {
				font-size: 0.875rem;
				font-weight: 500;
				transition: color 0.3s ease;
			}

			/* Efectos hover en iconos de contacto */
			.contact-form ~ .space-y-6 > div {
				transition: all 0.3s ease;
				padding: 1rem;
				border-radius: 0.75rem;
				cursor: pointer;
			}

			.contact-form ~ .space-y-6 > div:hover {
				background: rgba(255, 255, 255, 0.1);
				transform: translateY(-2px);
				backdrop-filter: blur(10px);
			}

			/* Animaciones de entrada */
			.form-group {
				animation: slideInUp 0.6s ease-out;
				animation-fill-mode: both;
			}

			.form-group:nth-child(1) { animation-delay: 0.1s; }
			.form-group:nth-child(2) { animation-delay: 0.2s; }
			.form-group:nth-child(3) { animation-delay: 0.3s; }
			.form-group:nth-child(4) { animation-delay: 0.4s; }

			@keyframes slideInUp {
				from {
					opacity: 0;
					transform: translateY(30px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			/* Responsive */
			@media (max-width: 768px) {
				.contact-form {
					padding: 1.5rem;
				}
			}

			/* Mejoras para campos con focus */
			.form-group label {
				transition: all 0.3s ease;
				position: relative;
			}

			.form-group input:focus + span,
			.form-group textarea:focus + span {
				color: #3b82f6;
			}

			/* Loader para el botón */
			.submit-btn.loading::after {
				content: '';
				width: 20px;
				height: 20px;
				border: 2px solid transparent;
				border-top: 2px solid white;
				border-radius: 50%;
				display: inline-block;
				margin-left: 10px;
				animation: spin 1s linear infinite;
			}

			@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			}
		`;
		document.head.appendChild(style);
	}
}

function setupFormValidation(container: HTMLElement) {
	const form = container.querySelector(".contact-form") as HTMLFormElement;
	const nameInput = form.querySelector("#contact-name") as HTMLInputElement;
	const emailInput = form.querySelector("#contact-email") as HTMLInputElement;
	const phoneInput = form.querySelector("#contact-phone") as HTMLInputElement;
	const messageTextarea = form.querySelector(
		"#contact-message"
	) as HTMLTextAreaElement;
	const submitBtn = form.querySelector(".submit-btn") as HTMLButtonElement;
	const wordCount = form.querySelector(".word-count") as HTMLSpanElement;
	const successMessage = form.querySelector(".success-message") as HTMLElement;

	// Validaciones
	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePhone = (phone: string): boolean => {
		if (!phone) return true; // Campo opcional
		const phoneRegex = /^\d{10}$/;
		return phoneRegex.test(phone);
	};

	const countWords = (text: string): number => {
		return text
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
	};

	const showError = (input: HTMLElement, message: string) => {
		const formGroup = input.closest(".form-group");
		const errorSpan = formGroup?.querySelector(".error-message");
		if (formGroup && errorSpan) {
			formGroup.classList.add("error");
			errorSpan.textContent = message;
			errorSpan.classList.remove("hidden");
			input.classList.add("border-red-400");
		}
	};

	const clearError = (input: HTMLElement) => {
		const formGroup = input.closest(".form-group");
		const errorSpan = formGroup?.querySelector(".error-message");
		if (formGroup && errorSpan) {
			formGroup.classList.remove("error");
			errorSpan.classList.add("hidden");
			input.classList.remove("border-red-400");
		}
	};

	// Event listeners para validación en tiempo real
	nameInput.addEventListener("blur", () => {
		if (!nameInput.value.trim()) {
			showError(nameInput, t("contact.form.errors.name"));
		} else {
			clearError(nameInput);
		}
	});

	emailInput.addEventListener("blur", () => {
		if (!emailInput.value.trim()) {
			showError(emailInput, t("contact.form.errors.email"));
		} else if (!validateEmail(emailInput.value)) {
			showError(emailInput, t("contact.form.errors.emailInvalid"));
		} else {
			clearError(emailInput);
		}
	});

	phoneInput.addEventListener("input", () => {
		// Solo permitir números
		phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
	});

	phoneInput.addEventListener("blur", () => {
		if (phoneInput.value && !validatePhone(phoneInput.value)) {
			if (phoneInput.value.length !== 10) {
				showError(phoneInput, t("contact.form.errors.phone"));
			} else if (!/^\d+$/.test(phoneInput.value)) {
				showError(phoneInput, t("contact.form.errors.phoneInvalid"));
			}
		} else {
			clearError(phoneInput);
		}
	});

	// Contador de palabras y validación del mensaje
	messageTextarea.addEventListener("input", () => {
		const words = countWords(messageTextarea.value);
		wordCount.textContent = `${words} ${t("contact.wordCount")}`;

		if (words < 10 && messageTextarea.value.trim()) {
			wordCount.classList.add("text-red-500");
			wordCount.classList.remove("text-gray-600");
		} else if (words > 200) {
			wordCount.classList.add("text-red-500");
			wordCount.classList.remove("text-gray-600");
		} else {
			wordCount.classList.remove("text-red-500");
			wordCount.classList.add("text-gray-600");
		}
	});

	messageTextarea.addEventListener("blur", () => {
		const words = countWords(messageTextarea.value);
		if (!messageTextarea.value.trim()) {
			showError(messageTextarea, t("contact.form.errors.message"));
		} else if (words < 10) {
			showError(messageTextarea, t("contact.form.errors.messageMin"));
		} else if (words > 200) {
			showError(messageTextarea, t("contact.form.errors.messageMax"));
		} else {
			clearError(messageTextarea);
		}
	});

	// Submit del formulario
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		let hasErrors = false;

		// Validar nombre
		if (!nameInput.value.trim()) {
			showError(nameInput, t("contact.form.errors.name"));
			hasErrors = true;
		}

		// Validar email
		if (!emailInput.value.trim()) {
			showError(emailInput, t("contact.form.errors.email"));
			hasErrors = true;
		} else if (!validateEmail(emailInput.value)) {
			showError(emailInput, t("contact.form.errors.emailInvalid"));
			hasErrors = true;
		}

		// Validar teléfono (opcional)
		if (phoneInput.value && !validatePhone(phoneInput.value)) {
			if (phoneInput.value.length !== 10) {
				showError(phoneInput, t("contact.form.errors.phone"));
			} else {
				showError(phoneInput, t("contact.form.errors.phoneInvalid"));
			}
			hasErrors = true;
		}

		// Validar mensaje
		const words = countWords(messageTextarea.value);
		if (!messageTextarea.value.trim()) {
			showError(messageTextarea, t("contact.form.errors.message"));
			hasErrors = true;
		} else if (words < 10) {
			showError(messageTextarea, t("contact.form.errors.messageMin"));
			hasErrors = true;
		} else if (words > 200) {
			showError(messageTextarea, t("contact.form.errors.messageMax"));
			hasErrors = true;
		}

		if (!hasErrors) {
			// Enviar formulario con estado de carga
			submitBtn.disabled = true;
			submitBtn.classList.add("loading");
			const originalText = submitBtn.textContent;
			submitBtn.textContent = t("contact.sending");

			// Crear FormData para Netlify
			const formData = new FormData(form);

			fetch("/", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams(formData as any).toString(),
			})
				.then(() => {
					// Mostrar mensaje de éxito con animación
					form.style.display = "none";
					successMessage.classList.remove("hidden");

					// Reset después de 5 segundos
					setTimeout(() => {
						form.reset();
						form.style.display = "block";
						successMessage.classList.add("hidden");
						submitBtn.disabled = false;
						submitBtn.classList.remove("loading");
						submitBtn.textContent = originalText || t("contact.form.send");
						wordCount.textContent = `0 ${t("contact.wordCount")}`;
						wordCount.classList.remove("text-red-400");
						wordCount.classList.add("text-gray-600");

						// Limpiar errores con animación
						form.querySelectorAll(".error-message").forEach((error) => {
							error.classList.add("hidden");
						});
						form.querySelectorAll("input, textarea").forEach((input) => {
							input.classList.remove("border-red-400");
						});
						form.querySelectorAll(".form-group").forEach((group) => {
							group.classList.remove("error");
						});
					}, 5000);
				})
				.catch((error) => {
					console.error("Error:", error);
					submitBtn.disabled = false;
					submitBtn.classList.remove("loading");
					submitBtn.textContent = originalText || t("contact.form.send");

					// Mostrar error más amigable
					const errorDiv = document.createElement("div");
					errorDiv.className =
						"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mt-4";
					errorDiv.textContent = t("contact.errorSending");
					form.appendChild(errorDiv);

					setTimeout(() => {
						errorDiv.remove();
					}, 5000);
				});
		}
	});
}
