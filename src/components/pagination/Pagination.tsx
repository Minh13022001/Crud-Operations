import "./index.scss";

interface Props {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: Props) => {
  const RANGE = 1;
  const pages = [];
  let dotAfter = false;
  let dotBefore = false;

  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true;
      return (
        <span
          key={index}
          className="mx-2 rounded border bg-white px-3 py-2 shadow-sm"
        >
          ...
        </span>
      );
    }
    return null;
  };
  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true;
      return (
        <span
          key={index}
          className="mx-2 rounded border bg-white px-3 py-2 shadow-sm"
        >
          ...
        </span>
      );
    }
    return null;
  };

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return Array(pages.length)
    .fill(0)
    .map((_, index) => {
      const pageNumber = index + 1;

      // Điều kiện để return về ...
      if (
        currentPage <= RANGE * 2 + 1 &&
        pageNumber > currentPage + RANGE &&
        pageNumber < pages.length - RANGE + 1
      ) {
        return renderDotAfter(index);
      } else if (
        currentPage > RANGE * 2 + 1 &&
        currentPage < pages.length - RANGE * 2
      ) {
        if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index);
        } else if (
          pageNumber > currentPage + RANGE &&
          pageNumber < pages.length - RANGE + 1
        ) {
          return renderDotAfter(index);
        }
      } else if (
        currentPage >= pages.length - RANGE * 2 &&
        pageNumber > RANGE &&
        pageNumber < currentPage - RANGE
      ) {
        return renderDotBefore(index);
      }

      return (
        <div className="pagination_button">
          <button
            onClick={() => setCurrentPage(pageNumber)}
            key={index}
            className={pageNumber == currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        </div>
      );
    });
};

export default Pagination;

// const renderPagination = () => {
//     let dotAfter = false
//     let dotBefore = false

//     const renderDotBefore = (index: number) => {
//       if (!dotBefore) {
//         dotBefore = true
//         return (
//           <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
//             ...
//           </span>
//         )
//       }
//       return null
//     }
//     const renderDotAfter = (index: number) => {
//       if (!dotAfter) {
//         dotAfter = true
//         return (
//           <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
//             ...
//           </span>
//         )
//       }
//       return null
//     }
//     return Array(pageSize)
//       .fill(0)
//       .map((_, index) => {
//         const pageNumber = index + 1

//         // Điều kiện để return về ...
//         if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
//           return renderDotAfter(index)
//         } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
//           if (pageNumber < page - RANGE && pageNumber > RANGE) {
//             return renderDotBefore(index)
//           } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
//             return renderDotAfter(index)
//           }
//         } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
//           return renderDotBefore(index)
//         }

//         return (
//           <button
//             onClick={() => setCurrentPage(page)}
//             key={index}
//             className={page == currentPage ? "active" : ""}>

//             {page}
//           </button>
//         )
//       })
//   }

//   return (
//     <div className='pagination'>
//         {pages.map((page, index) => {
//             return (
//                 <button
//                     key={index}
//                     onClick={() => setCurrentPage(page)}
//                     className={page == currentPage ? "active" : ""}>
//                     {page}
//                 </button>
//             );
//         })}
//     </div>
// );
