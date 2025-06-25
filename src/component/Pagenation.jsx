import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxShown = 5;
        const half = Math.floor(maxShown / 2);

        let start = Math.max(currentPage - half, 1);
        let end = start + maxShown - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - maxShown + 1, 1);
        }

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div style={{ display: 'flex', gap: '8px', margin: '20px 0', justifyContent: 'center' }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                    <span key={idx} style={{ padding: '0 8px' }}>...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        style={{
                            fontWeight: page === currentPage ? 'bold' : 'normal',
                            padding: '0 8px'
                        }}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
}

export default Pagination;
