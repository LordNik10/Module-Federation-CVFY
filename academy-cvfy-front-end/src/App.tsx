import React from 'react';
import Routes from 'common/components/Routes';
import ProviderWrapper from 'common/components/ProviderWrapper';
import Layout from 'common/components/Layout';
import './style/html-tag.scss';

function App() {
  return (
    <ProviderWrapper>
      <Layout>
        <Routes />
      </Layout>
    </ProviderWrapper>
  );
}

export default App;
