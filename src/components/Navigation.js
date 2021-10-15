import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navigation({userObj}) {
  return (
    <nav>
      <ul className="naviUl">
        <li>
          <Link className="homeLink" to="/home">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link className="profileLink" to="/profile">
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span className="displayName">
              {userObj.displayName===null? ("...") : (userObj.displayName + "'s Profile")}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
