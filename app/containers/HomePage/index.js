/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectCovid,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import { loadCovid } from '../App/actions';
import { changeCountry } from './actions';
import { makeSelectCountry } from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Flex, Card, Container, Divider, ConRingkas, Ringkas } from './Card';

const key = 'home';

export function HomePage({
  country,
  loading,
  error,
  covid,
  onSubmitForm,
  onChangeCountry,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (country && country.trim().length > 0) onSubmitForm();
  }, []);

  const datacovid = (load, err, cov) => {
    if (load) {
      return (
        <Flex>
          <LoadingIndicator />
        </Flex>
      );
    }

    if (err !== false || cov.error) {
      const ErrorComponent = () => (
        <Flex>
          <p>Negara tidak ditemukan!</p>
        </Flex>
      );
      return <ErrorComponent />;
    }

    if (cov !== false) {
      return (
        <Flex>
          <Card>
            <Container className="container">
              <span>Total kasus</span>
              <h1>
                {(
                  cov.confirmed.value +
                  cov.recovered.value +
                  cov.deaths.value
                ).toLocaleString()}
              </h1>
              <Ringkas>
                <span>Ringkasan kasus</span>
                <span>Total</span>
              </Ringkas>
              <Divider />
              <Ringkas>
                <span>Dikonfirmasi</span>
                <span>{cov.confirmed.value.toLocaleString()}</span>
              </Ringkas>
              <Divider />
              <Ringkas>
                <span>Sembuh</span>
                <span>{cov.recovered.value.toLocaleString()}</span>
              </Ringkas>
              <Divider />
              <Ringkas>
                <span>Meninggal</span>
                <span>{cov.deaths.value.toLocaleString()}</span>
              </Ringkas>
              <Divider />
            </Container>
            <Divider />
            <ConRingkas>
              <Ringkas>
                <span>LAST UPDATE</span>
                <span>{cov.lastUpdate}</span>
              </Ringkas>
            </ConRingkas>
          </Card>
        </Flex>
      );
    }

    return null;
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>Cek Ringkasan Kasus Covid19</H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="country">
              Nama Negara :
              <Input
                id="country"
                type="text"
                placeholder="country"
                value={country}
                onChange={onChangeCountry}
              />
            </label>
          </Form>
        </CenteredSection>
        {datacovid(loading, error, covid)}
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  covid: PropTypes.any,
  onSubmitForm: PropTypes.func,
  country: PropTypes.string,
  onChangeCountry: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  covid: makeSelectCovid(),
  country: makeSelectCountry(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCountry: evt => dispatch(changeCountry(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadCovid());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
