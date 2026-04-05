// Página: Términos y Condiciones
import { executePageTransition } from '../utils/transitions';

export function TermsPage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'terms-page min-h-screen bg-[#faf9f6]';

  page.innerHTML = `
    <!-- Hero -->
    <section class="relative bg-gradient-to-b from-[#1a2e1a] to-[#2c4a2c] py-24 px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <p class="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-4">Sacred Routes Expeditions</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white font-serif mb-4">Términos y Condiciones</h1>
        <p class="text-white/70 text-lg">Última actualización: Enero 2025</p>
      </div>
    </section>

    <!-- Contenido -->
    <section class="py-16 px-4">
      <div class="max-w-3xl mx-auto space-y-10 text-[#3d2e24]">

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">1. Aceptación de los Términos</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Al reservar cualquier tour o servicio ofrecido por <strong>Sacred Routes Expeditions</strong>, el cliente acepta en su totalidad los presentes Términos y Condiciones. Si no está de acuerdo con alguna de las cláusulas aquí establecidas, le pedimos abstenerse de realizar la contratación de nuestros servicios.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">2. Descripción del Servicio</h2>
          <p class="text-[#5c4a3d] leading-relaxed mb-4">
            Sacred Routes Expeditions ofrece tours privados y experiencias de ecoturismo en la Riviera Maya, incluyendo visitas a cenotes, zonas arqueológicas, selvas y comunidades locales. Todos nuestros servicios incluyen transporte privado, guía certificado y el equipamiento indicado en cada programa.
          </p>
          <p class="text-[#5c4a3d] leading-relaxed">
            Las características específicas de cada tour (duración, lugares incluidos, alimentación) están detalladas en la descripción individual de cada programa disponible en nuestro sitio web.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">3. Reservas y Pagos</h2>
          <ul class="space-y-3 text-[#5c4a3d]">
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Para confirmar una reserva se requiere un <strong>depósito del 30%</strong> del costo total del tour.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>El saldo restante deberá liquidarse <strong>al menos 48 horas antes</strong> de la fecha del tour, o en efectivo el día del servicio según se acuerde.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Aceptamos pagos vía transferencia bancaria, tarjeta de crédito/débito y efectivo (USD o MXN).</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Los precios publicados están sujetos a cambios sin previo aviso hasta que la reserva esté confirmada con el depósito correspondiente.</span></li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">4. Política de Cancelación</h2>
          <div class="space-y-4 text-[#5c4a3d]">
            <div class="flex gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span class="text-2xl">🌿</span>
              <div><strong class="text-[#2c5228]">Más de 72 horas antes:</strong> Reembolso completo del depósito o crédito para reagendar sin costo adicional.</div>
            </div>
            <div class="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <span class="text-2xl">⏱</span>
              <div><strong class="text-amber-700">Entre 24 y 72 horas antes:</strong> Se retiene el 50% del depósito como cargo por cancelación.</div>
            </div>
            <div class="flex gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
              <span class="text-2xl">⚠️</span>
              <div><strong class="text-red-700">Menos de 24 horas o no-show:</strong> Se pierde el 100% del depósito. No hay reembolso.</div>
            </div>
            <p class="text-sm italic pt-2">Las cancelaciones por causas de fuerza mayor (fenómenos meteorológicos extremos, cierre de sitios arqueológicos por autoridad competente) se tratarán de forma individualizada ofreciendo reagendamiento sin costo.</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">5. Responsabilidades del Cliente</h2>
          <ul class="space-y-3 text-[#5c4a3d]">
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Asistir puntualmente al punto de encuentro acordado. Los tours parten a la hora establecida.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Informar previamente sobre condiciones médicas relevantes, alergias o necesidades especiales.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Seguir en todo momento las indicaciones del guía, especialmente en cenotes y zonas arqueológicas.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Respetar las normativas de los sitios visitados: no tocar vestigios arqueológicos, no arrojar basura, no alterar el ecosistema.</span></li>
            <li class="flex gap-3"><span class="text-emerald-600 font-bold mt-0.5">✓</span><span>Traer documentos de identidad vigentes cuando sean requeridos para el acceso a ciertas zonas.</span></li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">6. Seguridad y Exención de Responsabilidad</h2>
          <p class="text-[#5c4a3d] leading-relaxed mb-4">
            Sacred Routes Expeditions hace todo lo posible por garantizar la seguridad de sus clientes mediante equipos certificados, guías capacitados y seguimiento de protocolos de seguridad en cada actividad. Sin embargo, algunas actividades (nado en cenotes, senderismo en selva) conllevan riesgos inherentes que el cliente asume de forma consciente al participar.
          </p>
          <p class="text-[#5c4a3d] leading-relaxed">
            Sacred Routes Expeditions no se hace responsable de accidentes derivados del incumplimiento de las instrucciones del guía, ni de objetos personales extraviados o dañados durante el tour.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">7. Modificaciones al Itinerario</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Sacred Routes Expeditions se reserva el derecho de modificar, sustituir o cancelar cualquier componente del itinerario por razones de seguridad, condiciones climáticas adversas, indicaciones de autoridades locales o causas de fuerza mayor. En estos casos, se ofrecerá una alternativa de igual o mayor valor, o un crédito para una fecha futura.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">8. Propiedad Intelectual</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Todo el contenido del sitio web de Sacred Routes Expeditions —incluyendo textos, imágenes, videos, logotipos y diseños— es propiedad exclusiva de la empresa y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción, distribución o uso comercial sin autorización escrita previa.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold mb-4 text-[#2c5228] font-serif">9. Legislación Aplicable</h2>
          <p class="text-[#5c4a3d] leading-relaxed">
            Los presentes Términos y Condiciones se rigen por las leyes de los <strong>Estados Unidos Mexicanos</strong>. Cualquier controversia derivada de su interpretación o aplicación se someterá a la jurisdicción de los tribunales competentes de <strong>Playa del Carmen, Quintana Roo</strong>, renunciando las partes a cualquier otro fuero que pudiera corresponderles.
          </p>
        </div>

        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 text-center">
          <p class="text-[#2c5228] font-semibold mb-2">¿Tienes dudas sobre nuestros términos?</p>
          <p class="text-[#5c4a3d] mb-6">Estamos disponibles para aclarar cualquier punto antes de que realices tu reserva.</p>
          <a href="https://wa.me/5219841234567?text=Hola%2C%20tengo%20una%20consulta%20sobre%20sus%20t%C3%A9rminos%20y%20condiciones."
             target="_blank"
             class="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#20bd5a] transition-colors">
            Contáctanos por WhatsApp
          </a>
        </div>

      </div>
    </section>
  `;

  // Botón de regreso
  setTimeout(() => {
    const backBtn = page.querySelector('#back-home-terms');
    if (backBtn) {
      backBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await executePageTransition(() => { window.location.hash = '#home'; });
      });
    }
  }, 100);

  return page;
}
