import React, { Fragment } from 'react';
// import spinner from './spinner.gif';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";


export default () => {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  return (
    <Fragment>
      <GridLoader color={'#B8E986'} css={override} loading={true}  size={50} />
    </Fragment>
  );
};
