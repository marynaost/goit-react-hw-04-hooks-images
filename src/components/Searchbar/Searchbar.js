import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleNameChange = e => {
    setName(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      return toast.error('Enter the name');
    }
    onSubmit(name);
    setName('');
  };
  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <ImSearch />
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={name}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
