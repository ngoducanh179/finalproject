import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CenterItem from './CenterItem';
import { getCenters } from './../../actions/profile';
import './style.css';
import Pagination from "react-js-pagination";


const Centers = ({ getCenters, profile: { centers, loading } }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    getCenters(search);
  }, [getCenters, search]);
  console.log(centers);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <br />
            <br />
            <h1 className='text-primary'>TomFiter</h1>
            <p className='lead'>
              <form className='form1'>
                <input className='input1' type="search" value={search} onChange={e => setSearch(e.target.value)} />
                <i class="fa fa-search" className='fa1'></i>
              </form>
            </p>
            <div className='profiles'>
              {centers && centers.length ? (
                centers.map((center, index) => (
                  index < 11 &&
                  <CenterItem key={center._id} center={center} />
                ))
              ) : (
                  <h4>Không Tìm Thấy Phòng Tập...</h4>
                )}
            </div>
            
          </Fragment>
        )}
        
    </Fragment>
    
    
  );
};

Centers.propTypes = {
    getCenters: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCenters })(Centers);
