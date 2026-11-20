import { useStore } from '../store/store-context'

// Bölge her zaman sayfada durur; böylece ekran okuyucular da yeni mesajı duyurur.
export default function Toast() {
  const { toast } = useStore()
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && <p className="toast" key={toast.id}>{toast.message}</p>}
    </div>
  )
}
