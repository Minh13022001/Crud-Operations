import './index.scss'


interface Props {
    totalPosts: number,
    postsPerPage: number,
    setCurrentPage : (pageNumber: number) => void,
    currentPage: number
}





const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}: Props) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;