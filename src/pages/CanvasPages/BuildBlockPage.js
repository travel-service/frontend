import React from 'react';
import CanvasTemplate from 'components/Canvas/common/CanvasTemplate';
import CanvasForm from 'components/Canvas/common/CanvasForm';
import PageTemplate from 'components/common/PageTemplate';

const BuildBlockPage = () => {
  return (
    <PageTemplate>
      <CanvasForm type="build" />
    </PageTemplate>
  );
};

export default BuildBlockPage;
