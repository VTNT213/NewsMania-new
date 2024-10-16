import React, { useState } from 'react';
import Newsitem from './Newsitem';
import './News.css';


const dummyData = Array.from({ length: 100 }, (_, i) => ({
    title: `News Title ${i + 1}`,
    description: `This is the description for News ${i + 1}`,
    imageUrl: '',
    newsUrl: '#',
    author: `Author ${i + 1}`,
    date: new Date()
}));

const pageSize = 6;  //Number of items per page

export default function PaginationGrid() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(dummyData.length / pageSize);

    const currentData = dummyData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        let pages = [];

        // Previous Button
        pages.push(
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} key="prev">
                <button 
                    className={`btn ${currentPage === 1 ? 'btn-secondary' : 'btn-warning'} mx-2`} 
                    onClick={() => changePage(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    &larr; Previous
                </button>
            </li>
        );

        // First Page and dots if necessary
        if (currentPage > 2) {
            pages.push(
                <li className="page-item" key={1}>
                    <button className="btn btn-outline-secondary mx-2" onClick={() => changePage(1)}>
                        1
                    </button>
                </li>
            );
            if (currentPage > 3) {
                pages.push(
                    <li className="page-item disabled" key="dots-left">
                        <span className="page-link">...</span>
                    </li>
                );
            }
        }

        // Middle buttons (previous, current, next)
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, totalPages); i++) {
            pages.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                    <button className={`btn ${i === currentPage ? 'btn-warning' : 'btn-outline-secondary'} mx-2`} onClick={() => changePage(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push(
                    <li className="page-item disabled" key="dots-right">
                        <span className="page-link">...</span>
                    </li>
                );
            }
            pages.push(
                <li className="page-item" key={totalPages}>
                    <button className="btn btn-outline-secondary mx-2" onClick={() => changePage(totalPages)}>
                        {totalPages}
                    </button>
                </li>
            );
        }
        
        pages.push(
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} key="next">
                <button 
                    className={`btn ${currentPage === totalPages ? 'btn-secondary' : 'btn-warning'} mx-2`} 
                    onClick={() => changePage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    Next &rarr;
                </button>
            </li>
        );

        return pages;
    };

    return (
        <div className="container">
            <div className="row">
                {currentData.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <Newsitem
                            title={item.title}
                            description={item.description}
                            imageUrl={item.imageUrl}
                            newsUrl={item.newsUrl}
                            author={item.author}
                            date={item.date}
                        />
                    </div>
                ))}
            </div>

            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {renderPagination()}
                </ul>
            </nav>
        </div>
    );
}
