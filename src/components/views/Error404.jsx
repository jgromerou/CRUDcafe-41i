import error from '../../assets/error404.jpg';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <section className="mainSection text-center">
      <div id="Error404" className="mb-3">
        <img src={error} alt="error 404" />
      </div>
      <div>
        <Link className="btn btn-primary mb-4" to={'/'}>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default Error404;
