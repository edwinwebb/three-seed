const TEST = 'app/test';
const DIRITEN = 'app/diriten'

export default (
  state = {
    test: 1,
    dirinten: 0.32
  },
  action = {}
) => {
  switch (action.type) {
    case TEST: {
      return {
        ...state,
        test: action.value
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


export const setTest = value => ({
  type: TEST,
  value
});

export const setDirIten = value => ({
  type: DIRITEN,
  value
})
