const VARIANTS = {
  primary:   'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  danger:    'bg-red-600 hover:bg-red-700 text-white',
  ghost:     'border border-emerald-600 text-emerald-600 hover:bg-emerald-50',
};

export default function Button({ children, variant = 'primary', isLoading = false, className = '', ...props }) {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Chargement...
        </>
      ) : children}
    </button>
  );
}
