import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="koleksiyon" element={<Shop />} />
        <Route path="koleksiyon/:category" element={<Shop />} />
        <Route path="urun/:slug" element={<ProductPage />} />
        <Route path="favoriler" element={<Favorites />} />
        <Route path="sepet" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
