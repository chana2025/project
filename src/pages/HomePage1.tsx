import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../types/ProductType.types'; 
import { DietType } from '../types/DietType.types';
import { productService } from '../services/product.service';
import { dietService } from '../services/diet.service';
import ProductSearch from '../components/ProductSearch';
import './HomePage1.css';

const HomePage1: React.FC = () => {
  const [diets, setDiets] = useState<DietType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [loadingProductDetails, setLoadingProductDetails] = useState(false);
  const [errorProductDetails, setErrorProductDetails] = useState<string | null>(null);
  const [loadingDiets, setLoadingDiets] = useState(true);
  const [errorDiets, setErrorDiets] = useState<string | null>(null);
  const [loadingExcelDownload, setLoadingExcelDownload] = useState(false);
  const [errorExcelDownload, setErrorExcelDownload] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        setLoadingDiets(true);
        const fetchedDiets = await dietService.getAllDiets();
        setDiets(fetchedDiets);
      } catch (error) {
        console.error("Error fetching diets:", error);
        setErrorDiets("שגיאה בטעינת דיאטות. אנא נסה שוב מאוחר יותר.");
      } finally {
        setLoadingDiets(false);
      }
    };
    fetchDiets();
  }, []);

  const handleProductSelect = async (prod: { id: number; name: string }) => {
    setSelectedProduct(null);
    setErrorProductDetails(null);
    setLoadingProductDetails(true);
    try {
      const details = await productService.getProductDetailsById(prod.id);
      if (details) {
        setSelectedProduct(details);
      } else {
        setErrorProductDetails("פרטי המוצר לא נמצאו עבור ID זה.");
      }
    } catch (error) {
      console.error(`Error fetching full product details for ID ${prod.id}:`, error);
      setErrorProductDetails("שגיאה בטעינת פרטי מוצר. אנא נסה שוב.");
    } finally {
      setLoadingProductDetails(false);
    }
  };

  const handleDownloadExcel = async () => {
    setErrorExcelDownload(null);
    setLoadingExcelDownload(true);
    try {
      await productService.downloadProductsExcel();
      alert("קובץ האקסל הורד בהצלחה!");
    } catch (error) {
      console.error("שגיאה בהורדת קובץ אקסל:", error);
      setErrorExcelDownload("שגיאה בהורדת קובץ אקסל. נסה שוב מאוחר יותר.");
      alert("שגיאה בהורדת קובץ אקסל. אנא בדוק את הקונסול לפרטים נוספים.");
    } finally {
      setLoadingExcelDownload(false);
    }
  };

  return (
    <div className="home-page">
      <header className="main-header">
        <div className="container">
          <Link to="/" className="logo">תזונת העתיד שלי</Link>
          <div className="header-right-group">
            <div className="header-search">
              <ProductSearch onSelect={handleProductSelect} />
              <button
                className="excel-download-button"
                onClick={handleDownloadExcel}
                disabled={loadingExcelDownload}
              >
                {loadingExcelDownload ? "מוריד..." : "הורד מוצרים לאקסל"}
              </button>
              {errorExcelDownload && <p className="error">{errorExcelDownload}</p>}
            </div>
            <nav className="nav-links">
              <Link to="/auth/sign-up">הרשמה</Link>
              <Link to="/auth/login">התחברות</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>התחילו ברגל ימין – בריאות ואיזון</h2>
          <p>התאימו תזונה מקצועית וגלו מידע תזונתי בקלות ובנוחות.</p>
        </div>
      </section>

      <section className="product-search-section container">
        <h3>תוצאות חיפוש מוצר</h3>
        {loadingProductDetails && <p className="loading">טוען...</p>}
        {errorProductDetails && <p className="error">{errorProductDetails}</p>}
        {selectedProduct && (
          <div className="product-details">
            <h4>{selectedProduct.name}</h4>
            <ul>
              <li>קלוריות: {selectedProduct.calories} קק"ל</li>
              <li>חלבון: {selectedProduct.protein} גרם</li>
              <li>שומן: {selectedProduct.fat} גרם</li>
              <li>פחמימות: {selectedProduct.carbohydrates} גרם</li>
              <li>מקור: {selectedProduct.sourceApi || 'לא ידוע'}</li>
            </ul>
          </div>
        )}
      </section>

      <section className="diets-section container">
        <h3>דיאטות מומלצות</h3>
        {loadingDiets && <p className="loading">טוען דיאטות...</p>}
        {errorDiets && <p className="error">{errorDiets}</p>}
        {!loadingDiets && !errorDiets && diets.length === 0 && (
          <p className="text-gray-600">לא נמצאו דיאטות להצגה כרגע.</p>
        )}
        <div className="diet-cards">
          {diets.map(d => (
            <div key={d.id} className="diet-card">
              <h4>{d.dietName}</h4>
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" alt="diet" className="diet-image" />
              <p>{d.specialComments?.slice(0, 90)}...</p>
              <p>קלוריות ליום: {d.calories}</p>
              <p>פחמימות ליום: {d.carbohydrates}</p>
              <p>שומן ליום: {d.fat}</p>
              <p>חלבון ליום: {d.protein}</p>
              <Link to={`/diets/${d.id}`}>
                <button>לפרטים</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="main-footer">
        <div className="container">
          <p>© 2025 | זכות היוצרים שמורה לתזונה בעתיד</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage1;
