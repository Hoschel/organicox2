import { useState, useRef, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faTruck, faStar, faShoppingCart, faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons'
import Home from './components/Home'
import Shop from './components/Shop'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart'
import { CartProvider, useCart } from './context/CartContext'

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const { cartCount, toggleCart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.toLowerCase()
    if (query.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const products = [
      { id: 1, name: 'Organik Badem', category: 'Kuruyemiş & Tohumlar' },
      { id: 2, name: 'Kuru Kayısı', category: 'Kuru Meyveler' },
      { id: 3, name: 'Ham Bal', category: 'Doğal Tatlandırıcılar' },
      { id: 4, name: 'Karışık Kuruyemiş', category: 'Organik Atıştırmalıklar' },
      { id: 5, name: 'Organik Chia Tohumu', category: 'Kuruyemiş & Tohumlar'},
      { id: 6, name: 'Hindistan Cevizi Yağı', category: 'Organik Yağlar' }
    ]

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )

    setSearchResults(filtered)
    setShowResults(true)
  }

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`} ref={navRef}>
      <div className="logo">
        <Link to="/"><h1>Organico</h1></Link>
      </div>
      <button className="mobile-nav-toggle" onClick={toggleNav} aria-label="Toggle navigation menu">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearch(e)
            }}
            onFocus={() => setShowResults(true)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={handleSearch}
          />
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(product => (
                <Link
                  key={product.id}
                  to={`/shop?product=${product.name}`}
                  onClick={() => {
                    setShowResults(false)
                    setSearchQuery('')
                  }}
                >
                  <div className="search-result-item">
                    <span>{product.name}</span>
                    <span className="category">{product.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/" onClick={() => setIsNavOpen(false)}>Ana Sayfa</Link>
        <Link to="/shop" onClick={() => setIsNavOpen(false)}>Mağaza</Link>
        <Link to="/about" onClick={() => setIsNavOpen(false)}>Hakkımızda</Link>
        <Link to="/contact" onClick={() => setIsNavOpen(false)}>İletişim</Link>
        <div className="cart-icon-container" onClick={(e) => { e.preventDefault(); toggleCart(); setIsNavOpen(false); }}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Organico</h3>
          <p>Doğal ve organik ürünlerin güvenilir adresi. Sağlıklı yaşam için doğru seçim.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Hızlı Linkler</h4>
          <Link to="/">Ana Sayfa</Link>
          <Link to="/shop">Mağaza</Link>
          <Link to="/about">Hakkımızda</Link>
          <Link to="/contact">İletişim</Link>
        </div>
        <div className="footer-section">
          <h4>Kategoriler</h4>
          <Link to="/shop?category=dried-fruits">Kuru Meyveler</Link>
          <Link to="/shop?category=nuts-seeds">Kuruyemiş & Tohumlar</Link>
          <Link to="/shop?category=natural-sweeteners">Doğal Tatlandırıcılar</Link>
          <Link to="/shop?category=organic-snacks">Organik Atıştırmalıklar</Link>
        </div>
        <div className="footer-section">
          <h4>İletişim</h4>
          <p>Adres: İstanbul, Türkiye</p>
          <p>Telefon: +90 (212) 555 0123</p>
          <p>E-posta: info@organico.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Organico. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Cart />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
