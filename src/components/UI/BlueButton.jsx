const BlueButton = ({ text, ...props }) => (
  <button
    {...props}
    className='disabled:opacity-50  disabled:cursor-not-allowed mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
  >
    {text}
  </button>
);

export default BlueButton;
