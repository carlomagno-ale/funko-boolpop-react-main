import { useEffect, useRef, useState } from "react";


export default function CarouselUi({ content, page, setPage, dataLength }) {
    const scrollRef = useRef(0)
    const { current } = scrollRef;

    function scroll(direction) {
        const scrollAmount = 1000;

        if (direction === 'right') {
            if (scrollRef?.current) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
                // alla fine dello scroll
                if (Math.abs(scrollLeft + clientWidth - scrollWidth) < 5) {
                    // cambia pagina avanti
                    if (page < dataLength) {
                        setPage(page + 1);
                    } else {
                        setPage(1);
                    }
                    // resetta lo scroll
                    scrollRef.current.scrollLeft = 0;
                } else {
                    scrollRef.current.scrollLeft += scrollAmount;
                }
            }
        } else if (direction === 'left') {
            if (scrollRef?.current) {
                // Se siamo all'inizio dello scroll
                if (scrollRef.current.scrollLeft === 0) {
                    // Cambia pagina indietro
                    if (page > 1) {
                        setPage(page - 1);
                    } else {
                        setPage(dataLength);
                    }
                    // Porta lo scroll alla fine
                    scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
                } else {
                    scrollRef.current.scrollLeft -= scrollAmount;
                }
            }
        }
    }

    return (
        <>
            <div className="item_list w-100">
                <div className="container-fluid d-flex justify-content-between w-100 position-relative">
                    <button className="caro_btn" onClick={() => scroll('left')}><i className="bi bi-caret-left arrow-caro"></i></button>
                    <div ref={scrollRef} className="lists_scroll d-flex p-5">
                        {content}
                    </div >
                    <button className="caro_btn"
                        onClick={() => scroll('right')}>
                        <i className="bi bi-caret-right arrow-caro"></i></button>
                </div>
            </div >

        </>
    )
}