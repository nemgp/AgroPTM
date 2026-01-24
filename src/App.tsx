import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Realizations } from './components/Realizations';
import { About } from './components/About';
import { Hero } from './components/Hero';
import { products, categoriesKeys } from './data/products';
import './App.css';

function App() {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);

  const filteredProducts = selectedCategoryKey
    ? products.filter(p => p.categoryKey === selectedCategoryKey)
    : products;

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">

        {/* Hero Section - Homepage */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Products Catalog Section */}
        <div className="catalog-container container" id="products">
          <div className="catalog-layout">
            <aside className="catalog-sidebar">
              <Sidebar
                categoriesKeys={categoriesKeys}
                selectedCategoryKey={selectedCategoryKey}
                onSelectCategoryKey={setSelectedCategoryKey}
              />
            </aside>

            <section className="catalog-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          </div>
        </div>

        {/* Contact Section - Anchor for navigation */}
        <div id="contact">
          <Realizations />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
