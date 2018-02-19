const ISCALE = 'app/IslandScale';
const DIRITEN = 'app/diriten';
const LIGHTCOLOR = 'app/lightcolor';

export default (
  state = {
    islandScale: 1,
    dirinten: 1.15,
    lightcolor: '#FEFEFE'
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
    case LIGHTCOLOR: {
      return {
        ...state,
        lightcolor: action.value
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

export const setLightColor = value => ({
  type: LIGHTCOLOR,
  value
})
