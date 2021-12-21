import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';

function ImageGalleryItem({ src, largeImageURL, tags, onClick }) {
  return (
    <li className={s.item} onClick={onClick}>
      <img src={src} alt={tags} data-src={largeImageURL} className={s.image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
