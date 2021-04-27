import React from 'react';

const Footer = () => {
  return (
    <div className='footer-container'>
      © {new Date().getFullYear()} Copyright : Made with ❤ React & Firebase by{' '}
      <a
        aria-label='website'
        href='https://www.linkedin.com/in/shubhamkhunt'
      >
        Shubham Khunt
      </a>
    </div>
  );
};

export default Footer;
