import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-2xl w-full">
        <Image
          src="/girl.avif"
          alt="This is a render of me"
          className="rounded-full mx-auto"
          width={150}
          height={150}
        />
        <h2 className="text-2xl font-bold mt-4">Princess Hemen</h2>
        <p className="mt-4 text-gray-600">
          I am undergraduate student of Computer Science at Covenant University, Ota. I am an aspiring full stack software developer. I love soccer, music, and reading when not coding. Proudly Nigerian 🇳🇬
        </p>
      </div>
    </div>
  );
}
