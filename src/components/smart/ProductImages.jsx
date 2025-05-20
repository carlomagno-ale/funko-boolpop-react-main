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

                                <li key={dot.item_number}>
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