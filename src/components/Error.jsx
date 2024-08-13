/* eslint-disable react/prop-types */

const Error = ({ message }) => {
  return (
    <div
      className='sm:mx-auto sm:w-full sm:max-w-md p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 m-2'
      role='alert'
    >
      <span className='font-medium'>{message}</span>
    </div>
  );
};

export default Error;
