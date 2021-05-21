import React from 'react';

const GithubRibbon = () => {
  return (
    <a
      href='https://github.com/shubhamkhunt04/notes-keeper'
      className='github-ribbon'
    >
      <img
        loading='lazy'
        width='149'
        height='149'
        src='https://github.blog/wp-content/uploads/2008/12/forkme_left_white_ffffff.png?resize=149%2C149'
        class='attachment-full size-full'
        alt='Fork me on GitHub'
        data-recalc-dims='1'
      />{' '}
    </a>
  );
};

export default GithubRibbon;
