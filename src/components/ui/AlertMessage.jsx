const STYLES = {
  error:   'bg-red-50 border-red-200 text-red-700',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  info:    'bg-blue-50 border-blue-200 text-blue-700',
};

export default function AlertMessage({ message, type = 'error' }) {
  if (!message) return null;
  return (
    <div className={`p-3 border rounded-xl text-sm ${STYLES[type]}`}>
      {message}
    </div>
  );
}
