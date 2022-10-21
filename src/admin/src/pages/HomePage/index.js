/*
 * HomePage
 *
 */

import React, { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { LoadingIndicatorPage, useGuidedTour } from '@strapi/helper-plugin';
import { Layout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import Logo from '../../assets/images/homepage-logo.png';
import { useModels } from '../../hooks';
import isGuidedTourCompleted from '../../components/GuidedTour/utils/isGuidedTourCompleted';
import GuidedTourHomepage from '../../components/GuidedTour/Homepage';
import SocialLinks from './SocialLinks';
import HomeHeader from './HomeHeader';
import ContentBlocks from './ContentBlocks';
const firebase = require("firebase");

const config = {
    firebase: {
        apiKey: "AIzaSyDrZpLnEWCzbAB2iXM1uizR8J9Z8iP414c",
        authDomain: "amigao-fcm.firebaseapp.com",
        projectId: "amigao-fcm",
        storageBucket: "amigao-fcm.appspot.com",
        messagingSenderId: "139473613556",
        appId: "1:139473613556:web:84143a5ba3fc3381bea4a1",
        measurementId: "G-DW9N8LQLDQ"
    },
};
firebase.initializeApp(config);

const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  img {
    width: ${150 / 16}rem;
  }
`;

const HomePage = () => {
  // // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useModels();
  const { guidedTourState, isGuidedTourVisible, isSkipped } = useGuidedTour();

  const showGuidedTour =
    !isGuidedTourCompleted(guidedTourState) && isGuidedTourVisible && !isSkipped;

  const { push } = useHistory();
  const handleClick = e => {
    e.preventDefault();

    push('/plugins/content-type-builder/content-types/create-content-type');
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = contentTypes => contentTypes.filter(c => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 || filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  return (
    <Layout>
      <FormattedMessage id="HomePage.helmet.title" defaultMessage="Homepage">
        {title => <Helmet title={title[0]} />}
      </FormattedMessage>
      <Main>
        <LogoContainer>
          <img alt="" aria-hidden src={Logo} />
        </LogoContainer>
        <Box padding={10}>
          <Grid>
            <GridItem col={12} s={12}>
              <HomeHeader
                onCreateCT={handleClick}
                hasCreatedContentType={hasAlreadyCreatedContentTypes}
              />
              <ContentBlocks />
            </GridItem>
          </Grid>
          {/* <Grid gap={6}>
            <GridItem col={8} s={12}>
              {showGuidedTour ? <GuidedTourHomepage /> : <ContentBlocks />}
            </GridItem>
            <GridItem col={4} s={12}>
              <SocialLinks />
            </GridItem>
          </Grid> */}
        </Box>
      </Main>
    </Layout>
  );
};

export default memo(HomePage);
