import { useState, useEffect } from 'react';
import styles from '../styles/Pruduct.module.css';
import Head from 'next/head';
import Button from './Button';

function ProductList({
  products,
  handleNextPage,
  handlePrevPage,
  page,
  setPage,
  handleInput,
}) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
      </Head>
      <div className={styles['product-container']}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.product}>
              <img
                src={product.image}
                alt={product.title}
                className={styles['product-image']}
              />
              <h2 className={styles['product-title']}>
                {product.title}{' '}
                <span className="badge badge-secondary">New</span>
              </h2>
              <p className={styles['product-details']}>{product.description}</p>
            </div>
          ))
        ) : (
          <button
            onClick={() => setPage(1)}
            className={styles['back-to-first-page']}
          >
            Вернуться на 1ю страницу
          </button>
        )}
        {products.length > 0 && (
          <div className={styles.pagination}>
            <a>
              <Button color="success" size="lg" block onClick={handlePrevPage}>
                Предыдущая страница
              </Button>
            </a>
            <input type="number" value={page} onChange={handleInput} />
            <Button color="danger" onClick={handleNextPage}>
              Следующая страница
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/products?_page=${page}&_limit=3`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [page]);

  const handleInput = (e) => {
    if (Number(e.target.value) === 0) {
      return 1;
    } else {
      setPage(Number(e.target.value));
    }
  };
  const handlePrevPage = () => {
    if (page === 1) {
      return;
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <ProductList
      products={products}
      page={page}
      setPage={setPage}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handleInput={handleInput}
    />
  );
}

export default Products;
