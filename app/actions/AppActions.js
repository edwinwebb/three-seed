'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  RESIZE
} from '../constants/AppConstants';

export default {

  resize(data) {
    AppDispatcher.dispatch({
      actionType: RESIZE,
      data: data
    });
  }

}
