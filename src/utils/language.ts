// Sistema de gestión de idiomas
import { en } from './en';
import { es } from './es';

// Tipos para las traducciones
export type Language = 'en' | 'es';
export type Translations = typeof en;

// Objeto con todas las traducciones
export const translations: Record<Language, Translations> = {
  en,
  es,
};

// Idioma por defecto
export const DEFAULT_LANGUAGE: Language = 'en';

// Clase para manejar el sistema de idiomas
export class LanguageManager {
  private static instance: LanguageManager;
  private currentLanguage: Language = DEFAULT_LANGUAGE;
  private listeners: Array<(language: Language) => void> = [];

  private constructor() {
    // Cargar idioma guardado o usar el del navegador
    this.loadSavedLanguage();
  }

  public static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  // Obtener el idioma actual
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  // Cambiar idioma
  public setLanguage(language: Language): void {
    if (language !== this.currentLanguage) {
      this.currentLanguage = language;
      this.saveLanguage(language);
      this.notifyListeners();
    }
  }

  // Cambiar idioma con transición de izquierda a derecha
  public async setLanguageWithTransition(language: Language): Promise<void> {
    if (language === this.currentLanguage) return;

    // Importar transiciones dinámicamente para evitar problemas de dependencias
    const { pageTransitions } = await import('./transitions');

    // Ejecutar el cambio de idioma con la transición seleccionada
    const changeCallback = () => {
      this.currentLanguage = language;
      this.saveLanguage(language);
      this.notifyListeners();
    };

    // Usar transición de izquierda a derecha
    await pageTransitions.setLanguageWithTransition(language, changeCallback);
  }

  // Obtener traducciones del idioma actual
  public getTranslations(): Translations {
    return translations[this.currentLanguage];
  }

  // Método para obtener traducciones con tipado seguro
  public t(key: string): string {
    const keys = key.split('.');
    let value: any = this.getTranslations();

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }

  // Suscribirse a cambios de idioma
  public subscribe(callback: (language: Language) => void): void {
    this.listeners.push(callback);
  }

  // Cancelar suscripción
  public unsubscribe(callback: (language: Language) => void): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Notificar a todos los listeners
  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.currentLanguage));
  }

  // Guardar idioma en localStorage
  private saveLanguage(language: Language): void {
    try {
      localStorage.setItem('sacred-project-language', language);
    } catch (error) {
      console.warn('Could not save language to localStorage:', error);
    }
  }

  // Cargar idioma guardado
  private loadSavedLanguage(): void {
    try {
      const saved = localStorage.getItem('sacred-project-language') as Language;
      if (saved && saved in translations) {
        this.currentLanguage = saved;
      } else {
        // Detectar idioma del navegador
        const browserLang = navigator.language.split('-')[0] as Language;
        if (browserLang in translations) {
          this.currentLanguage = browserLang;
        }
      }
    } catch (error) {
      console.warn('Could not load language from localStorage:', error);
    }
  }

  // Obtener lista de idiomas disponibles
  public getAvailableLanguages(): Array<{
    code: Language;
    name: string;
    nativeName: string;
  }> {
    return [
      { code: 'en', name: 'English', nativeName: 'English (US)' },
      { code: 'es', name: 'Spanish', nativeName: 'Español (ES)' },
    ];
  }
}

// Exportar instancia singleton
export const languageManager = LanguageManager.getInstance();

// Función helper para obtener texto traducido
export const t = (path: string): string => languageManager.t(path);
