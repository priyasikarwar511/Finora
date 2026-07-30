import React from 'react';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

const Loading = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div
      style={{
        width: '80vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        overflow: 'hidden',
      }}
    >
      <RingLoader color={'#fff'} css={override} size={100} loading={true} />
      <p style={{ color: '#fff', marginTop: '20px' }}>Loading...</p>
    </div>
  );
};

export default Loading;
