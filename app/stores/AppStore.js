const ISCALE = 'app/IslandScale';
const DIRITEN = 'app/diriten'

export default (
  state = {
    islandScale: 1,
    dirinten: 0.8
  },
  action = {}
) => {
  switch (action.type) {
    case ISCALE: {
      return {
        ...state,
        islandScale: action.value
      };
    }
    case DIRITEN: {
      return {
        ...state,
        dirinten: action.value
      }
    }
    default:
      return state;
  }
};


export const setIslandScale = value => ({
  type: ISCALE,
  value
});

export const setDirIten = value => ({
  type: DIRITEN,
  value
})
