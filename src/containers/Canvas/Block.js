import React, { useEffect, useState } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import SelectedArea from 'components/Canvas/BlockSelect/SelectedArea';
import axios from 'axios';
import {sysLocStore, useStore} from '../../lib/store';

const Block = () => {
  // const [globalLocations, setGlobalLocations] = useState(null);

  const { sysCateLoc, sysCateLocCoords, getSysLoc, getSysLocCoords } = sysLocStore();
  const { selCateLoc } = useStore();

  useEffect(() => {
    getSysLoc();
    getSysLocCoords();
    console.log(sysCateLoc);
    console.log(selCateLoc);
    console.log(sysCateLocCoords);
  }, []);
  

  return (
    <>
      {sysCateLoc && <SelectArea location={sysCateLoc} selLocs={selCateLoc} coords={sysCateLocCoords} />}
    </>

  );
};

export default Block;
