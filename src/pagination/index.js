import React from "react";
import '../App.css'
import '../index.css'
const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2


// limit: Items per page, total: total itens, offset: skip items 
export const Pagination = ({ limit, total, offset, setOffset }) => {
    const currentPage = offset ? (offset / limit) + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(currentPage - MAX_LEFT, 1);

    function onPageChange(page) {
        setOffset((page - 1) * limit)
    }

    return (
        <ul className="pagination">
            <li>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='beforeAfter'>
                    Anterior
                </button>
            </li>
            {Array.from({ length: Math.min(MAX_ITEMS, pages) }).map((_, index) => index + first)
                .map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={ page === currentPage ? 'pagination--item--active' : null}
                            id='btnList'>
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pages}
                    className='beforeAfter'>
                    Próxima
                </button>
            </li>
        </ul>
    );

} 