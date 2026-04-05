// Página: Política de Privacidad
import { executePageTransition } from '../utils/transitions';

export function PrivacyPage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'privacy-page min-h-screen bg-[#faf9f6]';

  page.innerHTML = `
    <!-- Hero -->
    <section class="relative bg-gradient-to-b from-[#1a2e1a] to-[#2c4a2c] py-24 px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <p class="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-4">Sacred Routes Expeditions</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white font-serif mb-4">Política de Privacidad</h1>
        <p class="text-white/70 text-lg">Última actualización: Enero 2025</p>
      </div>
    </section>

    <!-- Contenido -->
    <section class="py-16 px-4">
      <div class="max-w-3xl mx-auto space-y-10 text-[#3d2e24]">

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">1. Responsable del Tratamiento</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            <strong>Sacred Routes Expeditions</strong>, con domicilio en Playa del Carmen, Quintana Roo, México, es la empresa responsable del tratamiento de los datos personales que usted nos proporcione a través de nuestro sitio web, formulario de contacto, redes sociales o cualquier otro medio de comunicación.
          </p>
          <p class="text-[#5c4a3d] leading-relaxed mt-4">
            Correo de contacto: <a href="mailto:aventuras@sacredroutes.com" class="text-emerald-600 underline">aventuras@sacredroutes.com</a>
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">2. Datos que Recopilamos</h2>
          <p class="text-[#5c4a3d] leading-relaxed mb-4">Podemos recopilar los siguientes datos personales:</p>
          <ul class="space-y-3 text-[#5c4a3d]">
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Datos de identificación:</strong> nombre completo.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Datos de contacto:</strong> correo electrónico y número de teléfono/WhatsApp.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Datos de reserva:</strong> tour de interés, número de personas, fechas deseadas y preferencias especiales.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo, páginas visitadas (a través de cookies analíticas, si las hubiera).</span></li>
          </ul>
          <p class="text-[#5c4a3d] text-sm italic mt-4">No recopilamos datos de tarjetas de crédito directamente en nuestro sitio.</p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">3. Finalidad del Tratamiento</h2>
          <p class="text-[#5c4a3d] leading-relaxed mb-4">Sus datos personales son utilizados exclusivamente para:</p>
          <ul class="space-y-3 text-[#5c4a3d]">
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Gestionar y confirmar reservas de tours y servicios.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Enviar información relevante sobre su experiencia (itinerarios, recomendaciones, cambios).</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Responder consultas y solicitudes de información.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Mejorar nuestros servicios mediante el análisis de preferencias (de forma anonimizada).</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Enviar, previa aceptación expresa, boletines informativos u ofertas especiales.</span></li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">4. Base Legal del Tratamiento</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            El tratamiento de sus datos se realiza con base en la <strong>ejecución de un contrato</strong> (al realizar una reserva), el <strong>consentimiento expreso</strong> otorgado al enviar el formulario de contacto, y el <strong>interés legítimo</strong> de Sacred Routes Expeditions en la gestión eficiente de sus operaciones, siempre dentro del marco de la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> de los Estados Unidos Mexicanos.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">5. Compartición de Datos con Terceros</h2>
          <p class="text-[#5c4a3d] leading-relaxed mb-4">
            <strong>No vendemos, alquilamos ni cedemos</strong> sus datos personales a terceros con fines comerciales. Únicamente podemos compartir información con:
          </p>
          <ul class="space-y-3 text-[#5c4a3d]">
            <li class="flex gap-3"><span class="text-amber-500 font-bold mt-0.5">→</span><span><strong>Proveedores de servicios:</strong> operadores de sitios arqueológicos o cenotes que requieran datos para el acceso.</span></li>
            <li class="flex gap-3"><span class="text-amber-500 font-bold mt-0.5">→</span><span><strong>Herramientas tecnológicas:</strong> servicios de correo electrónico o plataformas de gestión de reservas, bajo acuerdos de confidencialidad.</span></li>
            <li class="flex gap-3"><span class="text-amber-500 font-bold mt-0.5">→</span><span><strong>Autoridades competentes:</strong> cuando así lo exija la ley mexicana.</span></li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">6. Conservación de Datos</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Sus datos serán conservados durante el tiempo necesario para gestionar la relación contractual y, posteriormente, durante el periodo que exija la legislación fiscal y mercantil aplicable (generalmente <strong>5 años</strong>). Transcurrido dicho plazo, procederemos a la eliminación segura de los mismos.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">7. Sus Derechos (ARCO)</h2>
          <p class="text-[#5c4a3d] leading-relaxed mb-4">De acuerdo con la LFPDPPP, usted tiene derecho a:</p>
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p class="font-bold text-[#2c5228] mb-1">🔍 Acceso</p>
              <p class="text-sm text-[#5c4a3d]">Conocer qué datos personales tenemos sobre usted y cómo los usamos.</p>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p class="font-bold text-[#2c5228] mb-1">✏️ Rectificación</p>
              <p class="text-sm text-[#5c4a3d]">Solicitar la corrección de datos inexactos o incompletos.</p>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p class="font-bold text-[#2c5228] mb-1">🗑️ Cancelación</p>
              <p class="text-sm text-[#5c4a3d]">Pedir la eliminación de sus datos cuando ya no sean necesarios.</p>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p class="font-bold text-[#2c5228] mb-1">🚫 Oposición</p>
              <p class="text-sm text-[#5c4a3d]">Oponerse al tratamiento de sus datos para fines específicos.</p>
            </div>
          </div>
          <p class="text-[#5c4a3d] text-sm mt-4">Para ejercer cualquiera de estos derechos, escríbanos a <a href="mailto:aventuras@sacredroutes.com" class="text-emerald-600 underline">aventuras@sacredroutes.com</a> con el asunto "Derechos ARCO".</p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">8. Cookies</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Nuestro sitio web puede utilizar cookies técnicas necesarias para el correcto funcionamiento de la plataforma. En caso de utilizar cookies analíticas o de rendimiento, le informaremos a través de un aviso de cookies en su primera visita. Puede configurar su navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del sitio.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">9. Seguridad de los Datos</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Implementamos medidas técnicas y organizativas razonables para proteger sus datos personales contra el acceso no autorizado, la pérdida accidental, la alteración o la divulgación. Sin embargo, ninguna transmisión de datos por internet puede garantizarse como absolutamente segura, por lo que le pedimos actuar con precaución al compartir información sensible.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">10. Modificaciones a esta Política</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Sacred Routes Expeditions se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta misma página con la fecha de actualización correspondiente. Le recomendamos revisar periódicamente este documento.
          </p>
        </div>

        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 text-center">
          <p class="text-[#2c5228] font-semibold mb-2">¿Preguntas sobre tu privacidad?</p>
          <p class="text-[#5c4a3d] mb-6">Tu tranquilidad es nuestra prioridad. Contáctanos y te responderemos en menos de 24 horas.</p>
          <a href="mailto:aventuras@sacredroutes.com"
             class="inline-flex items-center gap-2 bg-[#2c5228] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3a6b35] transition-colors">
            aventuras@sacredroutes.com
          </a>
        </div>

      </div>
    </section>
  `;

  setTimeout(() => {
    const backBtn = page.querySelector('#back-home-privacy');
    if (backBtn) {
      backBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await executePageTransition(() => { window.location.hash = '#home'; });
      });
    }
  }, 100);

  return page;
}
