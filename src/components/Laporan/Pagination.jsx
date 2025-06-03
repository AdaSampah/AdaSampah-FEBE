import React from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Ikon panah

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName="flex justify-center gap-2 mt-8"
      activeClassName="bg-green-700 text-white rounded-md"
      pageClassName="inline-flex items-center justify-center w-10 h-10 border border-gray-400 rounded-md cursor-pointer hover:bg-green-100 transition-colors duration-200"
      previousClassName="inline-flex items-center justify-center w-10 h-10 border border-gray-400 rounded-md hover:bg-green-100 cursor-pointer"
      nextClassName="inline-flex items-center justify-center w-10 h-10 border border-gray-400 rounded-md hover:bg-green-100 cursor-pointer"
      previousLinkClassName="block w-full h-full flex items-center justify-center"
      nextLinkClassName="block w-full h-full flex items-center justify-center"
      pageLinkClassName="block w-full h-full flex items-center justify-center"
      previousLabel={<FaChevronLeft />}
      nextLabel={<FaChevronRight />}
      breakLabel="..."
      breakClassName="px-2 py-1"
    />
  );
};

export default Pagination;
