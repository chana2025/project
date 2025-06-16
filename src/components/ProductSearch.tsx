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

import React, { useState, useEffect } from 'react';
import { productService } from '../services/product.service'; // **שינוי 1: ייבוא productService**
import { ProductType } from '../types/ProductType.types'; // **שינוי 2: ייבוא ProductType מהטיפוסים שלך**

// הגדרת ממשק ProductSearchItem, שהוא גרסה קלה של ProductType עבור תוצאות החיפוש
interface ProductSearchItem {
    id: number;
    name: string;
}

interface Props {
    onSelect: (product: ProductSearchItem) => void;
}

const ProductSearch: React.FC<Props> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ProductSearchItem[]>([]); // **שינוי 3: שימוש ב-ProductSearchItem**
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false); // **שינוי 4: מצב טעינה**

    useEffect(() => {
        const fetchData = async () => {
            if (query.length < 2) {
                setResults([]);
                setLoading(false); // וודא שהטעינה כבויה
                return;
            }

            setLoading(true); // התחל טעינה
            try {
                // **שינוי 5: שימוש ב-productService.searchProducts**
                // זה יפנה ל-Backend שלך (שמחפש ב-DB המקומי)
                const fetchedProducts: ProductType[] = await productService.searchProducts(query);
                
                // ממפים את התוצאות מה-ProductType המלא ל-ProductSearchItem הפשוט
                setResults(fetchedProducts.map(p => ({ id: p.Id, name: p.Name })));
                
            } catch (error) {
                console.error("Error fetching products:", error);
                setResults([]); // במקרה של שגיאה, נאפס תוצאות
            } finally {
                setLoading(false); // סיים טעינה
            }
        };

        const timeout = setTimeout(fetchData, 300); // מניעת בקשות מיותרות (debounce)
        return () => clearTimeout(timeout);
    }, [query]);

    // **שינוי 6: לוגיקה לסגירת הדרופדאון בלחיצה מחוץ לרכיב**
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

    return (
        // **שינוי 7: הוספת class למאגר הראשי לצורך handleClickOutside**
        <div className="relative product-search-container w-72">
            <input
                type="text"
                className="border p-2 w-full rounded"
                placeholder="חפש מוצר..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true); // תמיד הצג את הדרופדאון כשהמשתמש מקליד
                }}
                onFocus={() => setShowDropdown(results.length > 0)} // הצג אם כבר יש תוצאות קודמות
            />
            
            {/* **שינוי 8: הצגת אינדיקטור טעינה** */}
            {loading && (
                <div className="absolute bg-white border w-full z-10 mt-1 p-2 text-gray-500 rounded shadow-lg">
                    טוען...
                </div>
            )}

            {/* **שינוי 9: תצוגת רשימת התוצאות (רק אם יש תוצאות ולא במצב טעינה)** */}
            {showDropdown && results.length > 0 && !loading && (
                <ul className="absolute bg-white border w-full z-10 max-h-40 overflow-y-auto mt-1 rounded shadow-lg">
                    {results.map((product) => (
                        <li
                            key={product.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
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
            
            {/* **שינוי 10: הודעה כשאף תוצאה לא נמצאה** */}
            {showDropdown && !loading && results.length === 0 && query.length >= 2 && (
                <div className="absolute bg-white border w-full z-10 mt-1 p-2 text-gray-500 rounded shadow-lg">
                    לא נמצאו תוצאות.
                </div>
            )}
        </div>
    );
};

export default ProductSearch;