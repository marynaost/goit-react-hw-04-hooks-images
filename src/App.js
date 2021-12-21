import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import './App.css';
import API from './services/apiService';
import Seachbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    error: null,
    showModal: false,
    src: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevName = prevState.query;
    const nextName = query;
    const prevPage = prevState.page;
    const nextPage = page;
    if (prevName !== nextName || prevPage !== nextPage) {
      this.onFetchImage();
    }
  }

  handleForSubmit = query => {
    this.setState({ query, images: [], page: 1, status: 'pending' });
  };

  onFetchImage = () => {
    const { query, page, images } = this.state;

    API.fetchImage(query, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return toast.warn(`We haven't images with the name ${query} `, {
            autoClose: 3000,
          });
        }
        this.setState({
          images: [...images, ...hits],
          status: 'resolved',
          page,
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handleButtonClick = () => {
    this.handleScroll();
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  handleScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 260,
        behavior: 'smooth',
      });
    }, 500);
  };

  handleModalOpen = e => {
    this.setState({
      src: e.target.dataset.src,
      alt: e.target.alt,
      showModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { status, images, error, src, alt, showModal } = this.state;

    return (
      <div className="App">
        <Seachbar onSubmit={this.handleForSubmit} />
        {status === 'pending' && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={80}
            width={80}
            timeout={3000}
          />
        )}
        {status === 'rejected' && <p> {error.message} </p>}
        {status === 'resolved' && (
          <>
            <ImageGallery hits={images} onClick={this.handleModalOpen} />
            <Button onClick={this.handleButtonClick} />
            {showModal && (
              <Modal onClose={this.onCloseModal} src={src} alt={alt} />
            )}
          </>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
