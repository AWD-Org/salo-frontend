export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          © 2024 SaloSaaS. Todos los derechos reservados.
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-primary transition-colors">
            Términos de Servicio
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Política de Privacidad
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}
