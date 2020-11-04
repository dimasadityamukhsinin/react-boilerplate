/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentCountry = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentCountry,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectCovid = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.covidData.covid,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectCurrentCountry,
  makeSelectLoading,
  makeSelectError,
  makeSelectCovid,
  makeSelectLocation,
};
