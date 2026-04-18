import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toasts } = useStore();
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span className="toast-dot" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
