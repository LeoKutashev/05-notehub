
import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <div className={css.pagination}>
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={(selected) => onPageChange(selected.selected + 1)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName={css.container}
        activeClassName={css.active}
        previousLabel={"←"}
        nextLabel={"→"}
      />
    </div>
  );
};

export default Pagination;
