import { useEffect, useState } from 'react'
import { products } from '../data/products'
import { StoreContext } from './store-context'

const readStorage = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Gizli sekme gibi depolamanın kapalı olduğu durumlarda sessizce devam et.
  }
}

export function StoreProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStorage('aurelia:favorites'))
  const [cart, setCart] = useState(() => readStorage('aurelia:cart'))
  const [toast, setToast] = useState(null)

  useEffect(() => writeStorage('aurelia:favorites', favorites), [favorites])
  useEffect(() => writeStorage('aurelia:cart', cart), [cart])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = (message) => setToast({ id: Date.now(), message })

  const toggleFavorite = (product) => {
    const isFavorite = favorites.includes(product.id)
    setFavorites((current) => (isFavorite ? current.filter((id) => id !== product.id) : [...current, product.id]))
    notify(isFavorite ? `${product.name} favorilerinizden çıkarıldı.` : `${product.name} favorilerinize eklendi.`)
  }

  const addToCart = (product, size = null) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.size === size)
      if (existing) return current.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item))
      return [...current, { id: product.id, size, quantity: 1 }]
    })
    notify(`${product.name} sepetinize eklendi.`)
  }

  const updateQuantity = (id, size, quantity) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => !(item.id === id && item.size === size))
        : current.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item)),
    )
  }

  // Sepette artık var olmayan ürünler varsa (ör. listeden kaldırıldıysa) onları atla.
  const cartItems = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

  const value = { favorites, toggleFavorite, cartItems, cartCount, cartTotal, addToCart, updateQuantity, toast, notify }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
