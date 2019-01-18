import {css} from '@emotion/core';

export const titleStyles = {
  fontSize: '24px',
  fontWeight: 'normal',
  margin: '0 0 12px 0',
  color: '#666'
};

export const loadingStyles = {
  color: '#8080ff'
};

export const tableStyles = css`
  width: 100%;
  border-collapse: collapse;

  tr {
    cursor: pointer;
  }

  tr:first-child {
    font-weight: bold;
  }

  tr:not(:first-child):hover td {
    color: #777;
  }

  tr:not(:first-child) td {
    padding: 7px 0;
  }

  tr:not(:first-child) td:nth-child(2) {
    width: 25%;
  }

  tr:not(:first-child) td:last-child {
    position: relative;
    width: 20%;
  }

  td:first-child span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    max-width: 200px;
  }

  .average {
    position: relative;
    left: 50%;
  }

  .offset_bar__wrapper {
    position: relative;
    width: 50%;
    height: 16px;
  }

  .offset_bar__wrapper.-pos {
    left: 50%;
    text-align: left;
  }

  .offset_bar__wrapper.-neg {
    text-align: right;
  }

  .offset_bar {
    display: inline-block;
    max-width: 100%;
    height: 100%;
  }

  .offset_bar__wrapper.-pos .offset_bar {
    background-color: #21e679;
  }

  .offset_bar__wrapper.-neg .offset_bar {
    background-color: #ff5f8b;
  }

  .offset_num {
    font-size: 11px;
    white-space: nowrap;
    display: none;
    position: absolute;
    top: -12px;
    color: #7d7d7d;
  }

  .offset_bar__wrapper.-pos .offset_num {
    left: 0;
  }

  .offset_bar__wrapper.-neg .offset_num {
    right: 0;
  }

  tr:not(:first-child):hover .offset_num {
    display: block;
  }
`;
