import {Action} from '@ngrx/store';

const SUCCESS = (action: Action) => {
    return `${action.type}_SUCCESS`;
};

const FAILURE = (action: Action) => {
  return `${action.type}_FAILURE`;
};
