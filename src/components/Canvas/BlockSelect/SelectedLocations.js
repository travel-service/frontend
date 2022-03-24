import create from 'zustand';

const useStore = create ((set) => (
    {
      selectedLocations: [],
      onAdd: (loc) => set(state => ({ selectedLocations: [...state.selectedLocations,loc] })),
      remove: (locId) => set(state => ({ selectedLocations: state.selectedLocations.filter(loc => loc.id !== locId)}))
    }
))

export default useStore;