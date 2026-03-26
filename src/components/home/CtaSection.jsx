import { Link }       from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="bg-emerald-700 py-16 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Prêt à faire la différence ?
        </h2>
        <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers de personnes qui agissent pour réduire leur empreinte carbone.
        </p>
        <Link
          to="/calculateur"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-emerald-700 font-semibold hover:bg-emerald-50 transition"
        >
          Calculer mon empreinte carbone <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
