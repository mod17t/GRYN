export default function InputField({ label, icon: Icon, error, className = '', ...props }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
        )}
        <input
          className={[
            'w-full py-3 border-2 rounded-xl text-gray-700 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
            'transition-all disabled:bg-gray-100 disabled:cursor-not-allowed',
            Icon ? 'pl-11 pr-4' : 'px-4',
            error ? 'border-red-400' : 'border-gray-200',
          ].join(' ')}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
