import AppDispatcher from '../dispatcher/AppDispatcher';

{% if(o.actions.length) { %}}
import {
{% for(var i = 0; i < o.actions.length; i++) { %}
  {%= o.actions[i] %}
{% } %}} from '../constants/AppConstants';
{% } %}
export default {

  {% if(o.actions.length) {
  for(var i = 0; i < o.actions.length; i++) { %}

  {%= o.actions[i].toLowerCase() %}(data) {
    AppDispatcher.dispatch({
      actionType: {%= o.actions[i] %},
      data: data
    });
  }
  {% }
  } %}

}
