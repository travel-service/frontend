import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  background: yellow;
  bottom: 2.52%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-right: 20px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #9ba39c;
  color: white;
  font-size: 1rem;
  &:hover {
    background: #d0dbd3;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    background: lightgrey;
    cursor: revert;
    transform: revert;
  }
  &[aria-current] {
    background: #727e75;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const PlanPagination = ({ total, page, setPage }) => {
  const numPages = Math.ceil(total / 12);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
};

export default PlanPagination;
