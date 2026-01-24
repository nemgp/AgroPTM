import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Realizations } from './components/Realizations';
import { products, categoriesKeys } from './data/products';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);

  const filteredProducts = selectedCategoryKey
    ? products.filter(p => p.categoryKey === selectedCategoryKey)
    : products;

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">

        {/* Hero / About Section */}
        <section className="about-section" id="about">
          <div className="container">
            <h1>{t('about.title')}</h1>
            <p>{t('about.text')}</p>
          </div>
        </section>

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

        <Realizations />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
