import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore, planStore } from 'lib/store/planStore';
import { Link } from 'react-router-dom';
import PageTemplate from 'components/common/PageTemplate';

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

// 여행 보관함
// React 컴포넌트 상태 라이브러리 구조(api 요청 관련)
// 1. container(컴포넌트말구!) 에서 redux or zustand 상태 라이브러리를 접근한다.
// 2. 상태 라이브러리에서 lib/api/... 에 지정된 axios api 함수를 사용한다.
// 3. 상태 라이브러리에서 데이터가 생성, 수정, 삭제가 되고, container로 변경된 값을 탐지한다.
// 4. container에서 각 component 로 상태를 뿌려 재렌더링이 된다.

const DirectoryPage = () => {
  const { getPlan } = useStore();
  const { plans, getAllPlans } = planStore();

  useEffect(() => {
    getAllPlans();
  }, [getAllPlans]);

  const onClick = (id) => {
    getPlan(id);
  };

  return (
    <PageTemplate>
      <Container>
        {plans && (
          <div>
            {plans.mainDirectory.map((plan, idx) => (
              <div key={plan.planId}>
                <div>이름: {plan.name}</div>
                <div>기간: {plan.periods}</div>
                <Link
                  to={process.env.PUBLIC_URL + '/canvas/setting'}
                  onClick={() => onClick(plan.planId)}
                >
                  수정하러가기
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </PageTemplate>
  );
};

export default DirectoryPage;
