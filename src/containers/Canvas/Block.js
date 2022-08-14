import React, { useEffect } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import { sysLocStore, useStore } from '../../lib/zustand/planStore';

const Block = () => {
  const { sysCateLoc, sysCateLocCoords, getSysLoc, getSysLocCoords } =
    sysLocStore();
  const { selCateLoc } = useStore();

  useEffect(() => {
    getSysLoc();
    getSysLocCoords();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {sysCateLoc && (
        <SelectArea
          location={sysCateLoc}
          selLocs={selCateLoc}
          coords={sysCateLocCoords}
        />
      )}
    </>
  );
};

export default Block;
