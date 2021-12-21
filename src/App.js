import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import './App.css';
import API from './services/apiService';
import Seachbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  const handleForSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setStatus('pending');
  };

  useEffect(() => {
    if (!query) {
      setImages([]);
      return;
    }
    API.fetchImage(query, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return toast.warn(`We haven't images with the name ${query} `, {
            autoClose: 3000,
          });
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setStatus('resolved');
        setPage(page);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, query]);

  const handleButtonClick = () => {
    handleScroll();
    setPage(prevPage => prevPage + 1);
  };

  const handleScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 260,
        behavior: 'smooth',
      });
    }, 500);
  };

  const handleModalOpen = e => {
    setSrc(e.target.dataset.src);
    setAlt(e.target.alt);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Seachbar onSubmit={handleForSubmit} />
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
          <ImageGallery hits={images} onClick={handleModalOpen} />
          <Button onClick={handleButtonClick} />
          {showModal && <Modal onClose={onCloseModal} src={src} alt={alt} />}
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
