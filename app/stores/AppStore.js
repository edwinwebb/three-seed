const TEST = 'app/test';

export default (
  state = {
    test: false
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
    default:
      return state;
  }
};


export const setTest = value => ({
  type: TEST,
  value
});
