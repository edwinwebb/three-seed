const TEST = 'app/test';

export default (
  state = {
    test: 1
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
