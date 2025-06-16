// // src/pages/HomePage.tsx

// import React, { useState, useEffect } from 'react';
// import { ProductType } from '../types/ProductType.types'; // לייבא את ProductType מהקובץ הנכון
// import { DietType } from '../types/DietType.types';   // לייבא את DietType מהקובץ הנכון
// import { productService } from '../services/product.service'; // שירות למוצרים
// import { dietService } from '../services/diet.service';     // שירות לדיאטות
// import ProductSearch from '../components/ProductSearch'; // קומפוננטת חיפוש המוצרים
// import './HomePage1.css';

// const HomePage: React.FC = () => {
//     // מצב (state) עבור רשימת הדיאטות שתוצג בדף הבית
//     const [diets, setDiets] = useState<DietType[]>([]);
//     // מצב עבור המוצר הנבחר מחיפוש, אם קיים
//     const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
//     // מצב לטיפול במצבי טעינה ושגיאות עבור דיאטות
//     const [loadingDiets, setLoadingDiets] = useState(true);
//     const [errorDiets, setErrorDiets] = useState<string | null>(null);
//     // מצב לטיפול במצבי טעינה ושגיאות עבור מוצר נבחר
//     const [loadingProductDetails, setLoadingProductDetails] = useState(false);
//     const [errorProductDetails, setErrorProductDetails] = useState<string | null>(null);

//     // useEffect לשליפת דיאטות כשהקומפוננטה נטענת
//     useEffect(() => {
//         const fetchDiets = async () => {
//             try {
//                 setLoadingDiets(true);
//                 // שימוש ב-dietService.getAllDiets כדי להביא את כל הדיאטות
//                 // ניתן גם להוסיף לוגיקה לבחור רק מספר דיאטות להצגה בדף הבית אם הרשימה ארוכה
//                 const fetchedDiets = await dietService.getAllDiets();
//                 // לדוגמה, להציג רק 3 דיאטות ראשונות:
//                 setDiets(fetchedDiets.slice(0, 3)); 
//             } catch (error) {
//                 console.error("Error fetching diets:", error);
//                 setErrorDiets("Failed to load diets. Please try again later.");
//             } finally {
//                 setLoadingDiets(false);
//             }
//         };

//         fetchDiets();
//     }, []); // רץ פעם אחת בלבד בטעינת הקומפוננטה

//     // פונקציה לטיפול בבחירת מוצר מ-ProductSearch
//     const handleProductSelect = async (product: { id: number; name: string }) => {
//         setSelectedProduct(null); // איפוס מוצר קודם
//         setErrorProductDetails(null); // איפוס שגיאות קודמות
//         setLoadingProductDetails(true); // התחל טעינה

//         try {
//             // קבלת הפרטים המלאים של המוצר באמצעות ה-ID שלו
//             const fullProductDetails = await productService.getProductDetailsById(product.id);
//             if (fullProductDetails) {
//                 setSelectedProduct(fullProductDetails);
//             } else {
//                 setErrorProductDetails("Product details not found.");
//             }
//         } catch (error) {
//             console.error(`Error fetching full product details for ID ${product.id}:`, error);
//             setErrorProductDetails("Failed to load product details.");
//         } finally {
//             setLoadingProductDetails(false); // סיים טעינה
//         }
//     };

//     return (
//         <div className="home-page container mx-auto p-4">
//             {/* סקשן "ברוכים הבאים" */}
//             <section className="hero-section text-center my-8 p-6 bg-green-100 rounded-lg shadow-md">
//                 <h1 className="text-4xl font-bold text-green-800 mb-4">ברוכים הבאים לעולם התזונה שלך!</h1>
//                 <p className="text-lg text-gray-700 mb-6">
//                     מצא את הדיאטה המושלמת עבורך וגלה מידע תזונתי על כל מוצר.
//                 </p>
//                 <div className="space-x-4">
//                     <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300">
//                         הירשם 
//                     </button>
//                     <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-400 transition duration-300">
//                         התחבר
//                     </button>
//                 </div>
//             </section>

//             {/* סקשן חיפוש מוצרים */}
//             <section className="product-search-section my-8 p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">חפש מידע על מוצרים</h2>
//                 <ProductSearch onSelect={handleProductSelect} /> {/* שילוב ProductSearch */}

//                 {/* תצוגת פרטי המוצר הנבחר */}
//                 {loadingProductDetails && <p className="text-blue-600 mt-4">טוען פרטי מוצר...</p>}
//                 {errorProductDetails && <p className="text-red-600 mt-4">{errorProductDetails}</p>}
//                 {selectedProduct && (
//                     <div className="selected-product-details mt-6 p-4 border rounded-lg bg-gray-50">
//                         <h3 className="text-xl font-bold mb-2">{selectedProduct.Name}</h3>
//                         <p><strong>קלוריות:</strong> {selectedProduct.Calories} קק"ל</p>
//                         <p><strong>חלבון:</strong> {selectedProduct.Protein} גרם</p>
//                         <p><strong>שומן:</strong> {selectedProduct.Fat} גרם</p>
//                         <p><strong>פחמימות:</strong> {selectedProduct.Carbohydrates} גרם</p>
//                         {/* הוסף שדות נוספים לפי הצורך מ-ProductType */}
//                     </div>
//                 )}
//             </section>

//             {/* סקשן דיאטות פופולריות */}
//             <section className="popular-diets-section my-8 p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">דיאטות מומלצות</h2>
//                 {loadingDiets && <p className="text-blue-600">טוען דיאטות...</p>}
//                 {errorDiets && <p className="text-red-600">{errorDiets}</p>}
//                 {!loadingDiets && !errorDiets && diets.length === 0 && (
//                     <p className="text-gray-600">לא נמצאו דיאטות להצגה כרגע.</p>
//                 )}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {diets.map((diet) => (
//                         <div key={diet.Id} className="diet-card border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
//                             <h3 className="text-xl font-bold text-green-700 mb-2">{diet.NameDiet}</h3>
//                             <p className="text-gray-600 text-sm mb-2">{diet.SpecialComments.substring(0, 100)}...</p>
//                             <p className="text-gray-700"><strong>קלוריות מומלצות:</strong> {diet.NumCalories}</p>
//                             <p className="text-gray-700"><strong>מספר ארוחות:</strong> {diet.NumMeal}</p>
//                             {/* ניתן להוסיף כפתור "קרא עוד" שינווט לעמוד פרטי הדיאטה */}
//                             <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
//                                 קרא עוד
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage;



// src/pages/HomePage.tsx







// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // ✅ הוספת Link
// import { ProductType } from '../types/ProductType.types';
// import { DietType } from '../types/DietType.types';
// import { productService } from '../services/product.service';
// import { dietService } from '../services/diet.service';
// import ProductSearch from '../components/ProductSearch';
// import './HomePage1.css';

// const HomePage1: React.FC = () => {
//     const [diets, setDiets] = useState<DietType[]>([]);
//     const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
//     const [loadingDiets, setLoadingDiets] = useState(true);
//     const [errorDiets, setErrorDiets] = useState<string | null>(null);
//     const [loadingProductDetails, setLoadingProductDetails] = useState(false);
//     const [errorProductDetails, setErrorProductDetails] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchDiets = async () => {
//             try {
//                 setLoadingDiets(true);
//                 const fetchedDiets = await dietService.getAllDiets();
//                 setDiets(fetchedDiets.slice(0, 3));
//             } catch (error) {
//                 console.error("Error fetching diets:", error);
//                 setErrorDiets("Failed to load diets. Please try again later.");
//             } finally {
//                 setLoadingDiets(false);
//             }
//         };

//         fetchDiets();
//     }, []);

//     const handleProductSelect = async (product: { id: number; name: string }) => {
//         setSelectedProduct(null);
//         setErrorProductDetails(null);
//         setLoadingProductDetails(true);

//         try {
//             const fullProductDetails = await productService.getProductDetailsById(product.id);
//             if (fullProductDetails) {
//                 setSelectedProduct(fullProductDetails);
//             } else {
//                 setErrorProductDetails("Product details not found.");
//             }
//         } catch (error) {
//             console.error(`Error fetching full product details for ID ${product.id}:`, error);
//             setErrorProductDetails("Failed to load product details.");
//         } finally {
//             setLoadingProductDetails(false);
//         }
//     };

//     return (
//         <div className="home-page container mx-auto p-4">
//             {/* סקשן "ברוכים הבאים" */}
//             <section className="hero-section text-center my-8 p-6 bg-green-100 rounded-lg shadow-md">
//                 <h1 className="text-4xl font-bold text-green-800 mb-4">ברוכים הבאים לעולם התזונה שלך!</h1>
//                 <p className="text-lg text-gray-700 mb-6">
//                     מצא את הדיאטה המושלמת עבורך וגלה מידע תזונתי על כל מוצר.
//                 </p>
//                 <div className="space-x-4">
                  
//                     <Link to="/auth/sign-up">
//                         <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300">
//                             הירשם
//                         </button>
//                     </Link>
//                     <Link to="/auth/login">
//                         <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-400 transition duration-300">
//                             התחבר
//                         </button>
//                     </Link>
//                 </div>
//             </section>

//             {/* סקשן חיפוש מוצרים */}
//             <section className="product-search-section my-8 p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">חפש מידע על מוצרים</h2>
//                 <ProductSearch onSelect={handleProductSelect} />

//                 {loadingProductDetails && <p className="text-blue-600 mt-4">טוען פרטי מוצר...</p>}
//                 {errorProductDetails && <p className="text-red-600 mt-4">{errorProductDetails}</p>}
//                 {selectedProduct && (
//                     <div className="selected-product-details mt-6 p-4 border rounded-lg bg-gray-50">
//                         <h3 className="text-xl font-bold mb-2">{selectedProduct.Name}</h3>
//                         <p><strong>קלוריות:</strong> {selectedProduct.Calories} קק"ל</p>
//                         <p><strong>חלבון:</strong> {selectedProduct.Protein} גרם</p>
//                         <p><strong>שומן:</strong> {selectedProduct.Fat} גרם</p>
//                         <p><strong>פחמימות:</strong> {selectedProduct.Carbohydrates} גרם</p>
//                     </div>
//                 )}
//             </section>

//             {/* סקשן דיאטות פופולריות */}
//             <section className="popular-diets-section my-8 p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">דיאטות מומלצות</h2>
//                 {loadingDiets && <p className="text-blue-600">טוען דיאטות...</p>}
//                 {errorDiets && <p className="text-red-600">{errorDiets}</p>}
//                 {!loadingDiets && !errorDiets && diets.length === 0 && (
//                     <p className="text-gray-600">לא נמצאו דיאטות להצגה כרגע.</p>
//                 )}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {diets.map((diet) => (
//                         <div key={diet.Id} className="diet-card border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
//                             <h3 className="text-xl font-bold text-green-700 mb-2">{diet.NameDiet}</h3>
//                             <p className="text-gray-600 text-sm mb-2">{diet.SpecialComments.substring(0, 100)}...</p>
//                             <p className="text-gray-700"><strong>קלוריות מומלצות:</strong> {diet.NumCalories}</p>
//                             <p className="text-gray-700"><strong>מספר ארוחות:</strong> {diet.NumMeal}</p>
//                             <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
//                                 קרא עוד
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage1;
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

  useEffect(() => {
    dietService.getAllDiets()
      .then(fetched => setDiets(fetched.slice(0, 3)))
      .catch(() => setErrorDiets("שגיאה בטעינת דיאטות"))
      .finally(() => setLoadingDiets(false));
  }, []);

  const handleProductSelect = async (prod: { id: number }) => {
    setSelectedProduct(null);
    setErrorProductDetails(null);
    setLoadingProductDetails(true);
    try {
      const det = await productService.getProductDetailsById(prod.id);
      det ? setSelectedProduct(det) : setErrorProductDetails("מוצר לא נמצא");
    } catch {
      setErrorProductDetails("שגיאה בטעינת פרטי מוצר");
    } finally {
      setLoadingProductDetails(false);
    }
  };

  return (
    <div className="home-page">
      <header className="main-header">
        <div className="container">
          <div className="logo">תזונת העתיד שלי</div>
          <div className="header-search">
            <ProductSearch onSelect={handleProductSelect}  />
          </div>
          <nav className="nav-links">
            <Link to="/auth/sign-up" className="nav-button">הרשמה</Link>
            <Link to="/auth/login" className="nav-button">התחברות</Link>
          </nav>
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
            <h4>{selectedProduct.Name}</h4>
            <ul>
              <li>קלוריות: {selectedProduct.Calories}</li>
              <li>חלבון: {selectedProduct.Protein} גרם</li>
              <li>שומן: {selectedProduct.Fat} גרם</li>
              <li>פחמימות: {selectedProduct.Carbohydrates} גרם</li>
            </ul>
          </div>
        )}
      </section>

      <section className="diets-section container">
        <h3>דיאטות מומלצות</h3>
        {loadingDiets && <p className="loading">טוען דיאטות...</p>}
        {errorDiets && <p className="error">{errorDiets}</p>}
        <div className="diet-cards">
          {diets.map(d => (
            <div key={d.Id} className="diet-card">
              <h4>{d.NameDiet}</h4>
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" alt="diet" className="diet-image" />
              <p>{d.SpecialComments?.slice(0, 90)}...</p>
              <p>קלוריות ליום: {d.NumCalories}</p>
              <p>מספר ארוחות: {d.NumMeal}</p>
              <Link to={`/diets/${d.Id}`}>
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
