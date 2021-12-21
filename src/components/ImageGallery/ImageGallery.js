import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import s from './ImageGallery.module.scss';

function ImageGallery({ hits, onClick }) {
  return (
    <ul className={s.gallery}>
      {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
