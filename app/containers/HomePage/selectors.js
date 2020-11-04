/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCountry = () =>
  createSelector(
    selectHome,
    homeState => homeState.country,
  );

export { selectHome, makeSelectCountry };
