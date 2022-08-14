import styled from 'styled-components';
import Pagination from 'react-js-pagination';

const PaginationBox = styled.div`
  .pagination {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-left: -25px;
    bottom: 25px;
    font-family: 'Pretendard';
    font-style: normal;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    margin: 0px 10px 0px 10px;
    font-weight: 400;
    font-size: 16px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #b2b5ba;
  }

  ul.pagination li.active a {
    color: #000000;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #000000;
  }
`;

/*
total 전체 item 개수, 
page 현재 페이지, 
setPage 페이지 변경 함수, 
itemCount 페이지당 item 개수, 
pageRange 한번에 보여줄 페이지 개수
*/

const PlanPagination = ({ total, page, setPage, itemCount, pageRange }) => {
  return (
    <PaginationBox>
      <Pagination
        totalItemsCount={total}
        activePage={page}
        onChange={setPage}
        itemsCountPerPage={itemCount}
        pageRangeDisplayed={pageRange}
        prevPageText={
          <img src={process.env.PUBLIC_URL + '/images/left_arrow_ico.png'} />
        }
        nextPageText={
          <img src={process.env.PUBLIC_URL + '/images/right_arrow_ico.png'} />
        }
        hideFirstLastPages={true}
      ></Pagination>
    </PaginationBox>
  );
};

export default PlanPagination;
