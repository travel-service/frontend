import React, { useEffect } from 'react';
import { useStore } from 'lib/zustand/planStore';
import { buildStore } from 'lib/zustand/CanvasBuildStore';
import { DragDropContext } from 'react-beautiful-dnd';
import PlanDays from 'components/Canvas/BuildTab/Dnd/PlanDays';

const TravelCheckForm = () => {
  const { getPlanDays, userTravelDay } = useStore();
  const { splitTime, setViewTime } = buildStore();
  const { travelDay } = userTravelDay;

  useEffect(() => {
    getPlanDays();
  }, []);

  return (
    <DragDropContext style={{ overflow: 'auto' }}>
      <PlanDays
        data={{
          travelDay,
          splitTime,
          setViewTime,
          check: true,
        }}
      />
    </DragDropContext>
  );
};

export default TravelCheckForm;
