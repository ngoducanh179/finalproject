import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  auth: { isAuthenticated, role, user },
  logout,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => { 
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }
  const onClick = () => {
    closeMenu();
    logout();
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      {
                        !isAuthenticated &&
                        <Link to="/login/center" onClick={closeMenu}>Trở thành Chủ phòng Gym</Link>
                      }
                    </li>
                  </ul>

                  
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-left"
                    >
                      <li>
                        {
                          !isAuthenticated && 
                          <Link to="/login/customer" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Đăng Nhập</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'customer' &&
                          <Link to="/" onClick={closeMenu}><strong>Trang Chủ</strong></Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'customer' &&
                          <Link to="/posts" onClick={closeMenu}>Cộng Đồng</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'customer' &&
                          <Link to="/profiles" onClick={closeMenu}>Tomfiter</Link>
                        }
                      </li>
                      
                      <li>
                        {
                          isAuthenticated && role === 'customer' &&
                          <Link to="/centers" onClick={closeMenu}> Phòng Tập</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'customer' &&
                          <Link to="/login/customer" onClick={closeMenu}><i class="fas fa-user"></i> {user && user.name}</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'customer' &&
                          <Link to="/login/customer" onClick={onClick} ><i class="fas fa-sign-out-alt"></i> Logout</Link>
                        }
                      </li>
                    </ul>}

                    {/* center */}

                    {!hideSignin &&
                    <ul
                      className="list-reset header-nav-left"
                    >
                      {/* <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/" onClick={closeMenu}><strong>Trang Chủ</strong></Link>
                        }
                      </li> */}
                      <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/posts" onClick={closeMenu}>Cộng Đồng</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/profiles" onClick={closeMenu}>Tomfiter</Link>
                        }
                      </li>
                      
                      <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/centers" onClick={closeMenu}> Phòng Tập</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/confirm" onClick={closeMenu} ><i class="fab fa-first-order"></i> Order</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/login/customer" onClick={closeMenu}><i class="fas fa-user"></i> {user && user.name}</Link>
                        }
                      </li>
                      <li>
                        {
                          isAuthenticated && role === 'center' &&
                          <Link to="/login/customer" onClick={onClick} ><i class="fas fa-sign-out-alt"></i>Logout</Link>
                        }
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
const mapStateToProps = state => ({
  auth: state.auth,
});

// export default Header;
export default connect(mapStateToProps, { logout })(
  Header
);
