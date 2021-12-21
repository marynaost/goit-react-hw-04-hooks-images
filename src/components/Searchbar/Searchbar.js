import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

class Seachbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim() === '') {
      return toast.error('Enter the name');
    }
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <ImSearch />
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            value={this.state.name}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Seachbar;
