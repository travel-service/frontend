import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore, planStore } from 'lib/zustand/planStore';
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
      {console.log(plans)}
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
