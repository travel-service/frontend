import create from 'zustand';

const useStore = create ((set) => (
    {
      test: [],
      onAdd: (loc) => set(state => ({ test: [...state.test,loc] }))
    }
))

export default useStore;