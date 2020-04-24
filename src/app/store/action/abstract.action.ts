export enum APIAction {
  LOAD_ALL = 'load',
  LOAD_BY_ID = 'load by id',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

/**
 * Appends REQUEST async action type
 */

export const REQUEST = actionType => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 */

export const SUCCESS = actionType => `${actionType}_FULFILLED`;

/**
 * Appends FAILURE async action type
 */

export const FAILURE = actionType => `${actionType}_REJECTED`;
