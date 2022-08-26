import React from 'react';
import banner from '../../assets/img/banner.png';

const index = () => {
  return (
    <div style={{ width: '50%' }}>
      <img
        // src="https://i.picsum.photos/id/807/536/354.jpg?hmac=kkWC8rAK1uphdPT88-ZzXPy808J739fsntRMFw-FCK0"
        src={banner}
        alt="banner"
        loading="lazy"
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default index;
