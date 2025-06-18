// // ProductSearch.tsx
// //check it זה בשביל שלקוח יוכל להכניס למשל חו ויתן לו את האופציות האפשריות למשל חומוס חומוס טחון וכו
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Product {
//   id: number;
//   name: string;
// }

// interface Props {
//   onSelect: (product: Product) => void;
// }

// const ProductSearch: React.FC<Props> = ({ onSelect }) => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<Product[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (query.length < 2) {
//         setResults([]);
//         return;
//       }
//       const res = await axios.get(`/api/products/search?query=${query}`);
//       setResults(res.data);
//     };
//     const timeout = setTimeout(fetchData, 300); // מניעת בקשות מיותרות
//     return () => clearTimeout(timeout);
//   }, [query]);

//   return (
//     <div className="relative w-72">
//       <input
//         type="text"
//         className="border p-2 w-full rounded"
//         placeholder="חפש מוצר..."
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           setShowDropdown(true);
//         }}
//       />
//       {showDropdown && results.length > 0 && (
//         <ul className="absolute bg-white border w-full z-10 max-h-40 overflow-y-auto">
//           {results.map((product) => (
//             <li
//               key={product.id}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 onSelect(product);
//                 setQuery('');
//                 setResults([]);
//                 setShowDropdown(false);
//               }}
//             >
//               {product.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ProductSearch;


// src/components/ProductSearch.tsx





// import React, { useState, useEffect } from 'react';
// import { productService } from '../services/product.service';
// import { ProductType } from '../types/ProductType.types';

// interface ProductSearchItem {
//     id: number;
//     name: string;
// }

// interface Props {
//     onSelect: (product: ProductSearchItem) => void;
// }

// const ProductSearch: React.FC<Props> = ({ onSelect }) => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState<ProductSearchItem[]>([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null); // ✅ הוספת מצב שגיאה

//     useEffect(() => {
//         const fetchData = async () => {
//             if (query.length < 2) {
//                 setResults([]);
//                 setLoading(false);
//                 setError(null); // ✅ איפוס שגיאה
//                 return;
//             }

//             setLoading(true);
//             setError(null); // ✅ איפוס שגיאה לפני בקשה חדשה
//             try {
//                 const fetchedProducts: ProductType[] = await productService.searchProducts(query);
//                 setResults(fetchedProducts.map(p => ({ id: p.productId, name: p.Name })));
//                 // setShowDropdown(true); // ✅ וודא שהדרופדאון נפתח אם יש תוצאות
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//                 setResults([]);
//                 setError("אירעה שגיאה בחיפוש מוצרים. נסה שוב."); // ✅ הצגת הודעת שגיאה למשתמש
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const timeout = setTimeout(fetchData, 300);
//         return () => clearTimeout(timeout);
//     }, [query]);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             const dropdownContainer = document.querySelector('.product-search-container');
//             if (dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
//                 setShowDropdown(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className="relative product-search-container"> {/* ✅ הסרנו w-72 כי זה מטופל ב-CSS הכללי */}
//             <input
//                 type="text"
//                 // ✅ שינוי: נותנים את הקלאס הנכון מה-CSS שלך
//                 className="product-search-input" 
//                 placeholder="חפש מוצר..."
//                 value={query}
//                 onChange={(e) => {
//                     setQuery(e.target.value);
//                     setShowDropdown(true); 
//                 }}
//                 onFocus={() => setShowDropdown(results.length > 0 || query.length >=2)} // ✅ הצג גם אם יש קווארי ואין תוצאות עדיין
//             />
            
//             {/* ✅ הצגת אינדיקטור טעינה */}
//             {loading && (
//                 <div className="absolute bg-white border w-full z-20 mt-1 p-2 text-gray-500 rounded shadow-lg"> {/* ✅ z-index גבוה יותר */}
//                     טוען...
//                 </div>
//             )}

//             {/* ✅ הצגת שגיאה */}
//             {!loading && error && (
//                  <div className="absolute bg-white border w-full z-20 mt-1 p-2 text-red-600 rounded shadow-lg"> {/* ✅ z-index גבוה יותר */}
//                     {error}
//                 </div>
//             )}

//             {/* ✅ תצוגת רשימת התוצאות */}
//             {showDropdown && results.length > 0 && !loading && !error && (
//                 <ul className="absolute bg-white border w-full z-20 max-h-40 overflow-y-auto mt-1 rounded shadow-lg"> {/* ✅ z-index גבוה יותר */}
//                     {results.map((product) => (
//                         <li
//                             key={product.id}
//                             className="p-2 hover:bg-gray-100 cursor-pointer"
//                             onClick={() => {
//                                 onSelect(product);
//                                 setQuery('');
//                                 setResults([]);
//                                 setShowDropdown(false);
//                             }}
//                         >
//                             {product.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}
            
//             {/* ✅ הודעה כשאף תוצאה לא נמצאה */}
//             {showDropdown && !loading && !error && results.length === 0 && query.length >= 2 && (
//                 <div className="absolute bg-white border w-full z-20 mt-1 p-2 text-gray-500 rounded shadow-lg"> {/* ✅ z-index גבוה יותר */}
//                     לא נמצאו תוצאות.
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductSearch;
// import React, { useState, useEffect } from 'react';
// import { productService } from '../services/product.service';
// import { ProductType } from '../types/ProductType.types'; // שימוש ב-ProductType המעודכן

// interface ProductSearchItem {
//     id: number;
//     name: string;
// }

// interface Props {
//     onSelect: (product: ProductSearchItem) => void;
// }

// const ProductSearch: React.FC<Props> = ({ onSelect }) => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState<ProductSearchItem[]>([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (query.length < 2) {
//                 setResults([]);
//                 setLoading(false);
//                 setError(null);
//                 setShowDropdown(false);
//                 return;
//             }

//             setLoading(true);
//             setError(null);
//             try {
//                 // שימוש ב-p.Name (עם N גדולה) - בהתאמה ל-ProductType.types.ts החדש
//                 const fetchedProducts: ProductType[] = await productService.searchProducts(query);
//                 // **התיקון כאן:** וודא שאתה משתמש ב-ProductId וב-Name כפי שהם מוגדרים ב-ProductType.
//                 setResults(fetchedProducts.map(p => ({ id: p.productId, name: p.Name }))); 
//                 setShowDropdown(true);
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//                 setResults([]);
//                 setError("אירעה שגיאה בחיפוש מוצרים. נסה שוב.");
//                 setShowDropdown(true);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const timeout = setTimeout(fetchData, 300);
//         return () => clearTimeout(timeout);
//     }, [query]);

//     useEffect(() => {
//         if (query.length < 2) {
//             setShowDropdown(false);
//             return;
//         }

//         if (loading || error || results.length > 0 || (query.length >= 2 && results.length === 0)) {
//             setShowDropdown(true);
//         } else {
//             setShowDropdown(false); 
//         }
//     }, [loading, error, results, query]);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             const dropdownContainer = document.querySelector('.product-search-container');
//             if (dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
//                 setShowDropdown(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleInputFocus = () => {
//         if (query.length >= 2 || results.length > 0 || loading || error) {
//             setShowDropdown(true);
//         }
//     };

//     return (
//         <div className="product-search-container">
//             <input
//                 type="text"
//                 className="product-search-input" 
//                 placeholder="חפש מוצר..."
//                 value={query}
//                 onChange={(e) => {
//                     setQuery(e.target.value);
//                 }}
//                 onFocus={handleInputFocus}
//             />
            
//             {showDropdown && (loading || error || results.length > 0 || (query.length >= 2 && results.length === 0)) && (
//                 <div className="product-dropdown-content">
//                     {loading && (
//                         <div className="info-message loading-message">
//                             טוען...
//                         </div>
//                     )}

//                     {!loading && error && (
//                        <div className="info-message error-message">
//                             {error}
//                         </div>
//                     )}

//                     {!loading && !error && results.length > 0 && (
//                         <ul>
//                             {results.map((product) => (
//                                 <li
//                                     key={product.id}
//                                     onClick={() => {
//                                         onSelect(product);
//                                         setQuery('');
//                                         setResults([]);
//                                         setShowDropdown(false);
//                                     }}
//                                 >
//                                     {product.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
                    
//                     {showDropdown && !loading && !error && results.length === 0 && query.length >= 2 && (
//                         <div className="info-message no-results-message">
//                             לא נמצאו תוצאות.
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductSearch;



import React, { useState, useEffect } from 'react';
import { productService } from '../services/product.service';
import { ProductType } from '../types/ProductType.types'; 

interface ProductSearchItem {
    id: number;
    name: string;
}

interface Props {
    onSelect: (product: ProductSearchItem) => void;
}

const ProductSearch: React.FC<Props> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ProductSearchItem[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (query.length < 2) {
                setResults([]);
                setLoading(false);
                setError(null);
                setShowDropdown(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                // ✅ תיקון: שימוש ב-p.name (עם n קטנה) וב-p.productId (עם p קטנה)
                const fetchedProducts: ProductType[] = await productService.searchProducts(query);
                setResults(fetchedProducts.map(p => ({ id: p.productId, name: p.name }))); 
                setShowDropdown(true);
            } catch (err) {
                console.error("Error fetching products:", err);
                setResults([]);
                setError("אירעה שגיאה בחיפוש מוצרים. נסה שוב.");
                setShowDropdown(true);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchData, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        if (query.length < 2) {
            setShowDropdown(false);
            return;
        }

        if (loading || error || results.length > 0 || (query.length >= 2 && results.length === 0)) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false); 
        }
    }, [loading, error, results, query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdownContainer = document.querySelector('.product-search-container');
            if (dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        if (query.length >= 2 || results.length > 0 || loading || error) {
            setShowDropdown(true);
        }
    };

    return (
        <div className="product-search-container">
            <input
                type="text"
                className="product-search-input" 
                placeholder="חפש מוצר..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onFocus={handleInputFocus}
            />
            
            {showDropdown && (loading || error || results.length > 0 || (query.length >= 2 && results.length === 0)) && (
                <div className="product-dropdown-content">
                    {loading && (
                        <div className="info-message loading-message">
                            טוען...
                        </div>
                    )}

                    {!loading && error && (
                       <div className="info-message error-message">
                            {error}
                        </div>
                    )}

                    {!loading && !error && results.length > 0 && (
                        <ul>
                            {results.map((product) => (
                                <li
                                    key={product.id}
                                    onClick={() => {
                                        onSelect(product);
                                        setQuery('');
                                        setResults([]);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    {showDropdown && !loading && !error && results.length === 0 && query.length >= 2 && (
                        <div className="info-message no-results-message">
                            לא נמצאו תוצאות.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductSearch;