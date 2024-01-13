import {useLocation} from 'react-router-dom';
export default function FullScreenImages() {
    const location = useLocation();
    const images = location.state.images;
    return (
      <div>
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt="car" />
            </div>
          ))}
      </div>
    );
  }
