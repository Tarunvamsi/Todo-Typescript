import DateTime from "./DateTime";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-stone-900 to-sky-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-purple-600 via-pink-600 to-blue-600">
            ToDo Task Manager
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-white"><DateTime /></h2>
          <button className=" text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
