/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_COVID } from 'containers/App/constants';
import { covidLoaded, covidLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectCountry } from 'containers/HomePage/selectors';

/**
 * Covid19 request/response handler
 */
export function* getCovid() {
  // Select country from store
  const country = yield select(makeSelectCountry());
  const requestURL = `https://covid19.mathdro.id/api/countries/${country}`;

  try {
    // Call our request helper (see 'utils/request')
    const covid = yield call(request, requestURL);
    yield put(covidLoaded(covid, country));
  } catch (err) {
    yield put(covidLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* covidData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_COVID, getCovid);
}
