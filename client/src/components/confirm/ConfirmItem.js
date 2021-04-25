import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {updateOrder, getCurrentProfile} from '../../actions/profile'
const ConfirmItem = ({
    centerId,
    his: { kindOfSport, from, to, status, userId, price, _id },
    updateOrder,
    getCurrentProfile
}) => {
    const onClick = (e) => {
        updateOrder(centerId, _id, {status: e.target.name});
        getCurrentProfile()
    }
    return (
        <Fragment>
            { kindOfSport &&
                <div>
                    <h3 className='text-primary'>{userId.name}</h3>
                    <p > sport: {kindOfSport}</p>
                    <p>
                        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
                        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
                    </p>
                    <p>Price: {price}</p>
                    <p>
                        <strong>Trạng Thái: </strong> {status}
                    </p>
                    {status === 'pending' && <button className='btn button-primary' onClick={e => onClick(e)} name='confirm'>Xác Nhận</button>}

                    {status === 'pending' && <button className='btn btn-danger' onClick={e => onClick(e)} name='reject'>Từ Chối</button>}
                </div>
            }
        </Fragment>
    );
};

export default connect(null, { getCurrentProfile, updateOrder })(
    ConfirmItem
  );