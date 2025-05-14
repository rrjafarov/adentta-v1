"use client"
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <ReactPaginate
      // Buton metinleri
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      
      pageCount={10}
      
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      
      onPageChange={handlePageClick}
      
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item-pervious"
      previousLinkClassName="page-link-pervious"
      nextClassName="page-item-next"
      nextLinkClassName="page-link-next"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  );
}

export default Pagination;
