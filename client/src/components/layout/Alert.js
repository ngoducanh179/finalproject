import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
toast.configure();
const Alert = ({ alerts }) =>
  !_.isEmpty(alerts) &&
  alerts.map(alert => (
        alert.alertType === 'danger' ? toast.error(alert.msg) : alert.alertType === 'success' && toast.success(alert.msg)
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};
const mapStateToProps = state => {
  return {
    alerts: state.alert
  };
};

export default connect(mapStateToProps, null)(Alert);
