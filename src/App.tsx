import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Realizations } from './components/Realizations';
import { products, categories } from './data/products';
import './App.css'; // We'll create this next

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">

        {/* Hero / About Section */}
        <section className="about-section" id="about">
          <div className="container">
            <h1>L'ingénierie au service de votre rendement.</h1>
            <p>
              AgroPTM est spécialisé dans la fabrication de machines motorisées robustes (essence/diesel).
              Nous mécanisons la transformation agroalimentaire pour réduire la pénibilité et augmenter la productivité des exploitants.
            </p>
          </div>
        </section>

        <div className="catalog-container container" id="products">
          <div className="catalog-layout">
            <aside className="catalog-sidebar">
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </aside>

            <section className="catalog-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          </div>
        </div>

        <Realizations />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
