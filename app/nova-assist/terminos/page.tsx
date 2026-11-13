import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { additionalPlanExclusions, planPolicies } from "@/data/nova-assist";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Términos de servicios residenciales | Nova Assist",
    description:
      "Conoce el alcance, uso, límites y exclusiones de los servicios residenciales Plan Familia y Total Home de Nova Assist.",
    path: "/nova-assist/terminos",
  }),
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: "Uso residencial",
    content: "Plan Familia y Total Home son para uso residencial y familiar. No cubren empresas, servidores, infraestructura empresarial, desarrollo, proyectos ni administración de TI corporativa. Para esas necesidades, consulta IT OnDemand.",
  },
  {
    title: "Dispositivos y usuarios",
    content: `Plan Familia cubre hasta ${planPolicies.family.maxDevices} dispositivos registrados y ${planPolicies.family.maxUsers} usuarios residentes. Total Home cubre hasta ${planPolicies.totalHome.maxDevices} dispositivos registrados y ${planPolicies.totalHome.maxUsers} usuarios residentes. Se permiten hasta ${planPolicies.policies.deviceSubstitutionsPerMonth} sustituciones de dispositivos al mes, coordinadas y sin extender artificialmente la cobertura.`,
  },
  {
    title: "Horas y visitas",
    content: `Plan Familia incluye ${planPolicies.family.remoteHours} horas de soporte remoto al mes, en sesiones de hasta ${planPolicies.family.remoteSessionMinutes} minutos, y ${planPolicies.family.visitsPerMonth} visita mensual de hasta ${planPolicies.family.visitMinutes} minutos. Total Home incluye ${planPolicies.totalHome.remoteHours} horas remotas al mes, en sesiones de hasta ${planPolicies.totalHome.remoteSessionMinutes} minutos, y ${planPolicies.totalHome.visitsPerMonth} visitas mensuales de hasta ${planPolicies.totalHome.visitMinutes} minutos cada una. Las horas y visitas no utilizadas no se acumulan entre períodos, no son transferibles y no generan crédito ni dinero.`,
  },
  {
    title: "Respuesta y atención",
    content: `El objetivo de primera respuesta es de hasta ${planPolicies.family.responseTargetBusinessHours} horas laborales en Plan Familia y hasta ${planPolicies.totalHome.responseTargetBusinessHours} horas laborales en Total Home. Primera respuesta significa recibir, clasificar e iniciar la coordinación del caso; no significa resolución dentro de ese tiempo. Total Home ofrece atención prioritaria. El técnico principal está sujeto a disponibilidad. Estos planes no ofrecen atención 24/7.`,
  },
  {
    title: "Soporte remoto y respaldos",
    content: "El soporte remoto requiere autorización, se realiza mediante herramientas aprobadas y se limita al incidente autorizado; no implica acceso permanente. La configuración y revisión básica de respaldos no garantiza que toda la información pueda recuperarse. Las cuentas, suscripciones y el almacenamiento en la nube corresponden al cliente salvo confirmación expresa por escrito.",
  },
  {
    title: "Software y hardware",
    content: `No se incluyen hardware (${additionalPlanExclusions.hardware.join(", ")}), licencias ni suscripciones (${additionalPlanExclusions.licenses.join(", ")}). Cualquier opción o costo se comunica antes de realizar trabajo adicional.`,
  },
  {
    title: "Servicios especializados y terceros",
    content: `No se incluyen ${additionalPlanExclusions.specialistWork.join(", ")}. Nova Assist puede ayudar a diagnosticar asuntos relacionados con fabricantes, proveedores de Internet, plataformas de juegos y otros servicios de terceros, pero no controla su disponibilidad, funcionamiento ni infraestructura.`,
  },
  {
    title: "Trabajo fuera del alcance",
    content: "Si se detecta una necesidad adicional, Nova Assist la explica, presenta las opciones y comunica cualquier costo antes de comenzar. El trabajo adicional facturable requiere la autorización del cliente.",
  },
  {
    title: "Citas y cobertura",
    content: `La cancelación o reprogramación con ${planPolicies.policies.cancellationNoticeHours} horas o más de anticipación no consume una visita incluida. Con menos anticipación, la visita puede considerarse utilizada. Si el cliente no está disponible, el tiempo de espera máximo es de ${planPolicies.policies.clientWaitMinutes} minutos y la visita puede considerarse consumida. Las circunstancias excepcionales se revisan caso por caso. La zona, disponibilidad y cualquier costo aplicable se confirman antes de coordinar; no se presume cobertura nacional.`,
  },
  {
    title: "Privacidad y seguridad",
    content: "El acceso del técnico se limita a la información necesaria para el servicio autorizado. No compartas contraseñas bancarias, PIN, códigos MFA ni datos completos de tarjetas. El técnico no debe guardar credenciales, copiar archivos sin autorización, revisar información personal ajena al servicio ni compartir información obtenida durante la intervención. Consulta la política de privacidad de Nova Assist.",
  },
  {
    title: "Contratación y cancelación del plan",
    content: "El precio, período de suscripción, forma de pago, renovación y condiciones de cancelación del plan deben confirmarse en la propuesta o acuerdo vigente antes de contratar. No se presume una permanencia mínima, renovación automática ni penalidad que no se haya acordado expresamente.",
  },
];

export default function NovaAssistTermsPage() {
  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <Container className="max-w-4xl">
        <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <span aria-current="page">Términos</span></nav>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Alcance de servicio</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">Términos de servicios residenciales</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-text-muted">Este resumen explica los límites de los servicios residenciales. El alcance y las condiciones particulares se confirman antes de contratar o autorizar cualquier trabajo adicional.</p>
        </div>
        <div className="mt-8 space-y-3">
          {sections.map((section) => <section key={section.title} className="rounded-2xl border border-white/10 bg-[#0b1730]/55 p-5 sm:p-6"><h2 className="font-display text-lg font-semibold text-white">{section.title}</h2><p className="mt-2 text-sm leading-7 text-text-muted">{section.content}</p></section>)}
        </div>
        <div className="mt-8 rounded-2xl border border-orange-200/20 bg-orange-300/5 p-5">
          <h2 className="font-semibold text-white">Política de uso de planes</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
            <li>· Las horas no se acumulan, transfieren ni canjean por dinero o crédito.</li>
            <li>· Las visitas no utilizadas no se trasladan a otro período.</li>
            <li>· La rotación de dispositivos no extiende artificialmente los límites del plan.</li>
            <li>· Cualquier trabajo adicional facturable requiere tu autorización.</li>
          </ul>
        </div>
        <p className="mt-6 text-xs leading-5 text-text-subtle">Para consultar alcance o disponibilidad, <Link className="text-orange-100 underline underline-offset-4" href="/nova-assist/solicitar">solicita ayuda</Link>. Para el tratamiento de datos, consulta la <Link className="text-orange-100 underline underline-offset-4" href="/nova-assist/privacidad">política de privacidad</Link>.</p>
      </Container>
    </SectionWrapper>
  );
}
