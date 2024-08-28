export default function Product() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Check Out My GitHub</h2>
          <p className="text-gray-600 mb-4">Click the button below to view my GitHub profile and see my projects.</p>
          <a
            href="https://github.com/PrincessHemen"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Visit My GitHub
          </a>
        </div>
      </div>
    );
  }
  