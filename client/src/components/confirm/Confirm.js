import React, { Fragment, useEffect } from 'react'
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ConfirmItem from './ConfirmItem';
import { getCurrentProfile } from './../../actions/profile';

function Confirm({ profile: { profile }, getCurrentProfile }) {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return (
        <Fragment>
            {profile === null ? (
                <Spinner />
            ) : (
                <Fragment>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1 className='text-primary'>Xác Nhận Order</h1>
                    <Fragment >
                        <div className="container">
                            <div className="team-single">
                                <div className="row">
                                    <div className='profile-grid my-1'>
                                        <div className='profile-exp p-2'>
                                            {profile.customerUsed.length ? (
                                            <Fragment>
                                                {profile.customerUsed && profile.customerUsed.map((his, index) => (
                                                    index < 11 && <ConfirmItem
                                                        key={index}
                                                        his={his}
                                                        centerId={profile._id}
                                                    />
                                                ))}
                                            </Fragment>
                                        ) : (
                                            <h4>Không Tìm Thấy ...</h4>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                </Fragment>
            )}
        </Fragment>
    )
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile})(Confirm);
