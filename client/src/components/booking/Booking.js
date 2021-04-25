import React, { Fragment, useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getPriceSports, updateBooking } from './../../actions/profile';
import Spinner from './../layout/Spinner';

function Booking(
  { match,
    getPriceSports,
    updateBooking,
    profile: { price, loading },
    auth: { user },
    history
  }
) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endPrice, setEndPrice] = useState(null);
  const [note, setNote] = useState('');
  const [from, setFrom] =useState();
  const [to, setTo] =useState();

  useEffect(() => {
    getPriceSports(match.params.centerId);
    if (startDate && endDate) {
      const start = moment(startDate, "YYYY-MM-DD hh:mm:ss")
      const end = moment(endDate, "YYYY-MM-DD hh:mm:ss")
      const equa = end.diff(start, 'hours');
      if (price && price.sports) {
        const finalPrice = price.sports[match.params.sport];
        if (finalPrice['permonth'] !== 0 && equa > 750) {
          const moneyMinus = (equa - 750) * finalPrice['perhour'];
          setEndPrice(moneyMinus)

        } else if (finalPrice['perhour'] !== 0) {
          const moneyMinus = equa * finalPrice['perhour'];
          setEndPrice(moneyMinus)
        }
      }
    }
  }, [startDate, endDate])
  const onSubmit = (e) => {
    e.preventDefault();
    if (user) {
      updateBooking(user._id, match.params.centerId, match.params.sport, {note: note, price: endPrice, from: startDate, to: endDate}, history)
    }
  }
  return loading && price === null ? (
    <Spinner />
  ) : (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Fragment>
        <h1 className=' text-primary'>Đặt Lịch Tập Của Bạn</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Hãy Đặt Lịch Tập Với TomFit
      </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <Fragment>
            <div className='form-group social-input'>
              <i class="fas fa-calendar-alt fa-2x pink-2"></i>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                // locale="pt-BR"
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                dateFormat="Pp"
              />
            </div>

            <div className='form-group social-input'>
              <i class="fas fa-calendar-alt fa-2x pink-1"></i>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                // locale="pt-BR"
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                dateFormat="Pp"
              />
            </div>

            <div className='form-group social-input'>
              <i class="fas fa-sticky-note fa-2x"></i>
              <input
                type='text'
                placeholder='Note'
                name='note'
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>

            {
              endPrice && (
                <div className='form-group social-input'>
                  <i class="fas fa-dollar-sign fa-2x"></i>
                  {endPrice} VND
                </div>)
            }
          </Fragment>
          <input type='submit' className='btn button-primary my-1' />
          {/* <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link> */}
        </form>
      </Fragment>
    </div>
  )
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getPriceSports, updateBooking })(
  withRouter(Booking)
);

