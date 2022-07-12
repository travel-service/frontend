import React, { useEffect } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import {sysLocStore, useStore} from '../../lib/store';

const Block = () => {

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
