// pages/_error.js
import React from 'react';

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  // Если getInitialProps сломался, покажем generic
  if (!hasGetInitialPropsRun && err) {
    console.error(err);
    return <p>Произошла внутренняя ошибка сервера (500)</p>;
  }
  return (
    <p>
      {statusCode
        ? `Ошибка ${statusCode}: что-то пошло не так на сервере.`
        : 'Ошибка на клиенте. Пожалуйста, попробуй ещё раз.'}
    </p>
  );
}

Error.getInitialProps = async ({ res, err, hasGetInitialPropsRun }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, hasGetInitialPropsRun: true, err };
};

export default Error;
