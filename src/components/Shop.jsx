import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { useSearchParams } from 'react-router-dom'

function Shop() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([
    {
      id: 5,
      name: 'Organik Chia Tohumu',
      price: 89.90,
      category: 'nuts-seeds',
      image: '/images/products/chia.jpg',
    },
    {
      id: 6,
      name: 'Organik Hindistan Cevizi Yağı',
      price: 159.90,
      category: 'organic-oils',
      image: '/images/products/coconut-oil.jpg',
    },
    {
      id: 1,
      name: 'Organik Kuru Üzüm',
      price: 49.90,
      category: 'dried-fruits',
      image: '/images/products/raisins.jpg'
    },
    {
      id: 2,
      name: 'Çiğ Badem',
      price: 129.90,
      category: 'nuts-seeds',
      image: '/images/products/almonds.jpg'
    },
    {
      id: 3,
      name: 'Organik Bal',
      price: 189.90,
      category: 'natural-sweeteners',
      image: '/images/products/honey.jpg'
    },
    {
      id: 4,
      name: 'Granola Karışımı',
      price: 79.90,
      category: 'organic-snacks',
      image: '/images/products/granola.jpg'
    }
  ])

  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortOrder, setSortOrder] = useState('name-asc')
  const [showFilters, setShowFilters] = useState(false)


  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'dried-fruits', name: 'Kuru Meyveler' },
    { id: 'nuts-seeds', name: 'Kuruyemiş & Tohumlar' },
    { id: 'natural-sweeteners', name: 'Doğal Tatlandırıcılar' },
    { id: 'organic-snacks', name: 'Organik Atıştırmalıklar' }
  ]

  const sortOptions = [
    { id: 'name-asc', name: 'İsim (A-Z)' },
    { id: 'name-desc', name: 'İsim (Z-A)' },
    { id: 'price-asc', name: 'Fiyat (Düşükten Yükseğe)' },
    { id: 'price-desc', name: 'Fiyat (Yüksekten Düşüğe)' }
  ]

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const filteredProducts = products
    .filter(product => {
      return selectedCategory === 'all' || product.category === selectedCategory
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })

  const handleClickOutside = (event) => {
    if (!event.target.closest('.shop-filters')) {
      setShowFilters(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <main className="shop-page">
      <section className="shop-header">
        <h1>Organik Ürünler</h1>
        <div className="shop-controls">

          <div className="shop-filters">
            <button 
              className={`filter-btn ${showFilters ? 'active' : ''}`} 
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filter-dropdown"
            >
              <FontAwesomeIcon icon={faFilter} /> Filtrele
            </button>
            <div 
              id="filter-dropdown"
              className={`filter-dropdown ${showFilters ? 'active' : ''}`}
              aria-hidden={!showFilters}
            >
              <div className="filter-section">
                <h4>Kategoriler</h4>
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="filter-section">
                <h4>Sıralama</h4>
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    className={`sort-btn ${sortOrder === option.id ? 'active' : ''}`}
                    onClick={() => setSortOrder(option.id)}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price.toFixed(2)} TL</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}


export default Shop