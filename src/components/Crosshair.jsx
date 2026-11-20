import { useEffect, useState } from 'react'

// Hizalama aracı (cetvel): fareyi takip eden, ekranın bir ucundan öbür ucuna yatay ve dikey çizgi.
// Müşteriler görmesin diye normalde kapalıdır.
// Açmak için: adresin sonuna ?cetvel ekle (sekme açık kaldıkça açık kalır) ya da Shift+X.
const STORAGE_KEY = 'aurelia:cetvel'

const readFlag = () => {
  try {
    if (new URLSearchParams(window.location.search).has('cetvel')) sessionStorage.setItem(STORAGE_KEY, '1')
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function Crosshair() {
  const [active, setActive] = useState(readFlag)
  const [pos, setPos] = useState(null)

  useEffect(() => {
    const onKey = (event) => {
      const typing = event.target.closest?.('input, textarea, select, [contenteditable="true"]')
      if (typing || !event.shiftKey || event.key.toLowerCase() !== 'x') return
      setActive((on) => {
        try {
          sessionStorage.setItem(STORAGE_KEY, on ? '0' : '1')
        } catch {
          // depolama kapalıysa yalnızca bu sayfada açılıp kapanır
        }
        return !on
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!active) return
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY })
    const onLeave = () => setPos(null)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [active])

  if (!active) return null

  // Etiket ekranın kenarına çarpınca imlecin diğer tarafına geçer.
  const labelLeft = pos && (pos.x + 150 > window.innerWidth ? pos.x - 140 : pos.x + 12)
  const labelTop = pos && (pos.y + 40 > window.innerHeight ? pos.y - 34 : pos.y + 12)

  return (
    <div className="crosshair" aria-hidden="true">
      {/* Sabit orta çizgi (mavi): sayfayı yukarıdan aşağıya tam ortadan ikiye böler */}
      <div className="crosshair-center" />
      <div className="crosshair-center-label">orta</div>
      {/* Fareyi takip eden artı (kırmızı) */}
      {pos && (
        <>
          <div className="crosshair-h" style={{ top: pos.y }} />
          <div className="crosshair-v" style={{ left: pos.x }} />
          <div className="crosshair-label" style={{ left: labelLeft, top: labelTop }}>
            x {Math.round(pos.x)} · y {Math.round(pos.y + window.scrollY)}
          </div>
        </>
      )}
    </div>
  )
}
