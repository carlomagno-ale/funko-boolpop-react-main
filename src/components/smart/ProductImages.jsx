import ProductImagesUi from "../dumb/ProductImages.ui"
import { useState, useEffect } from "react";

export default function ProductImages({ images }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)

    }, [])

    return (
        <>
            <div className="position-relative h-100">
                <ProductImagesUi images={images} index={currentIndex} />

                <div className="dots_product_container">
                    <div className="dots_product">
                        <ul className="list-unstyled">
                            {images.map((dot, i) => (

                                <li key={dot.id}>
                                    {i == currentIndex ? (
                                        <>
                                            <button className="dot_btn" onMouseEnter={() => setCurrentIndex(i)}>
                                                <i className="bi bi-circle-fill"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="dot_btn" onMouseEnter={() => setCurrentIndex(i)}>
                                                <i className="bi bi-circle"></i>
                                            </button>
                                        </>
                                    )}
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}



/* SENZA PALLINI DA SISTEMARE 



import ProductImagesUi from "../dumb/ProductImages.ui"
import { useState } from "react";

export default function ProductImages({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funzione per andare all'immagine successiva
    const handleMouseEnter = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // (Opzionale) Torna all'immagine iniziale quando il mouse esce
    const handleMouseLeave = () => {
        setCurrentIndex(0);
    };

    return (
        <div className="position-relative h-100">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ height: "100%" }}
            >
                <ProductImagesUi images={images} index={currentIndex} />
            </div>
        </div>
    );
}

*/