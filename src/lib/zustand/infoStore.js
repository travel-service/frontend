import create from 'zustand';
import * as locationAPI from 'lib/api/location';

export const infoStore = create((set) => ({
  getInfo: async (id) => {
    const response = await locationAPI.getLocationInfo(id);
    console.log(response);
    // var info = await axios.get(`http://localhost:4000/locationInfo/${id}`);

    // set({totalInfo: info.data})
  },

  totalInfo: {},
}));
