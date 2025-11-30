import React from 'react';
import dayjs from 'dayjs';
import { navLinks, navIcons } from '#constants';

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Portfolio</p>
        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map((item) => (
            <li key={item.id}>
              <img src={item.img} alt={`icon-${item.id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  )
}

export default Navbar