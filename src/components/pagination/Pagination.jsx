import React from 'react';

export const Pagination = ({ pagInfo, setPagInfo }) => {

  const goToPreviousPage = () => {
    if (pagInfo.prevRequest) {
      console.log(pagInfo.prevRequest);
      const newPag = { ...pagInfo, currentPage: pagInfo.currentPage - 1 };
      setPagInfo(newPag);
    }
  }

  const goToNextPage = () => {
    if (pagInfo.nextRequest) {
      const newPag = { ...pagInfo, currentPage: pagInfo.currentPage + 1 };
      setPagInfo(newPag);
    }
  }

  const goToPage = (pageNumber) => {
    const newPag = { ...pagInfo, currentPage: pageNumber };
    setPagInfo(newPag);
  }

  return (
    <div className='app__pagination'>
      <button className='btn' onClick={goToPreviousPage}>Prev</button>

      {(pagInfo.currentPage > 2) &&
        <button className='btn btn--short' onClick={() => goToPage(pagInfo.currentPage - 2)}>{pagInfo.currentPage - 2}</button>}

      {(pagInfo.currentPage > 1) &&
        <button className='btn btn--short' onClick={() => goToPage(pagInfo.currentPage - 1)}>{pagInfo.currentPage - 1}</button>}

      <button className='btn btn--active btn--short' onClick={() => goToNextPage(pagInfo.currentPage)}>{pagInfo.currentPage}</button>

      {(pagInfo.currentPage < pagInfo.pageNumbers) &&
        <button className='btn btn--short' onClick={() => goToPage(pagInfo.currentPage + 1)}>{pagInfo.currentPage + 1}</button>}

      {(pagInfo.currentPage < pagInfo.pageNumbers - 1) &&
        <button className='btn btn--short' onClick={() => goToPage(pagInfo.currentPage + 2)}>{pagInfo.currentPage + 2}</button>}

      <button className='btn' onClick={goToNextPage}>Next</button>
      <button className='btn' onClick={() => goToPage(pagInfo.pageNumbers)}>Last</button>
    </div>
  );
}
