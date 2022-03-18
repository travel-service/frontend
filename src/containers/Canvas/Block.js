import React, { useEffect, useState } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea'
import SelectedArea from 'components/Canvas/BlockSelect/SelectedArea';
import Modal from '../../components/modal/modal';
import axios from 'axios';

const Block = () => {
  const [globalLocations, setGlobalLocations] = useState(null);

  useEffect(() => {
    const getData = async() => {
      const globalLocationsResult = await axios.get(
        'http://localhost:4000/locations',
      );
      setGlobalLocations(globalLocationsResult.data)
    };
    getData();
  }, []);

  return (
    
    <>
      {globalLocations && <SelectArea location={globalLocations} />}
    </>

  );
};

export default Block;