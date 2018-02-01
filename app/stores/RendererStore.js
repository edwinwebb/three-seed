const RESIZE = 'renderer/resize';

export default (
  state = {
    width: 0,
    height: 0,
    resolution: 1
  },
  action = {}
) => {
  switch (action.type) {
    case RESIZE: {
      return {
        ...state,
        width: action.value.width,
        height: action.value.height,
        resolution: action.value.resolution
      };
    }
    default:
      return state;
  }
};

export const setRendererSize = value => ({
  type: RESIZE,
  value
});
