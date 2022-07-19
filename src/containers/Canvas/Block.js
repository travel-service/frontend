import React, { useEffect, useState } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import SelectedArea from 'components/Canvas/BlockSelect/SelectedArea';
import axios from 'axios';
import { sysLocStore, useStore } from '../../lib/zustand/planStore';

const Block = () => {
  // const [globalLocations, setGlobalLocations] = useState(null);

  const { sysCateLoc, getSysLoc } = sysLocStore();
  const { selCateLoc, category } = useStore();

  useEffect(() => {
    getSysLoc();
    console.log(category);
    // console.log(sysCateLoc);
    // console.log(selCateLoc);
  }, []);

  return (
    <>
      {sysCateLoc && (
        <SelectArea
          location={sysCateLoc}
          selLocs={selCateLoc}
          category={category}
        />
      )}
    </>
  );
};

export default Block;
