import React, { useEffect, useState } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import SelectedArea from 'components/Canvas/BlockSelect/SelectedArea';
import axios from 'axios';
import { sysLocStore, useStore } from '../../lib/store';

const Block = () => {
  // const [globalLocations, setGlobalLocations] = useState(null);

  const { sysCateLoc, getSysLoc } = sysLocStore();
  const { selCateLoc, userPlan, getPlan, postPlan } = useStore();

  useEffect(() => {
    //userPlan.id ? getPlan(userPlan.id) : postPlan(''); // 0518 새 플랜용 plan post 위치 고민..
    getSysLoc();
    console.log(sysCateLoc);
    console.log(selCateLoc);
  }, []);

  return (
    <>
      {sysCateLoc && <SelectArea location={sysCateLoc} selLocs={selCateLoc} />}
    </>
  );
};

export default Block;
