/* HomePage.js */
import React, { useState} from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import './HomePage.css';

const ModelViewer = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);

  useFrame((state, delta) => {
    gltf.scene.rotation.y += 0.05 * delta; // Rotation speed
  });

  return <primitive object={gltf.scene} receiveShadow castShadow />;
};

const booksData = [
  {
    title: 'Neuromancer',
    description: "William Gibson's Neuromancer is one of the earliest works of cyberpunk. It is set on Earth in the near future and its plot involves mercenary and cyber-hacking characters who must work (or rebel) under the control of megacorporations and artificial intelligence.",
    modelUrl: "/assets/neuromancer.glb",
  },
  {
    title: 'Burning Chrome',
    description: "Burning Chrome tells the story of two freelance hackers—Automatic Jack, the narrator and a hardware specialist; and Bobby Quine, a software expert. Bobby becomes infatuated with a girl named Rikki and wants to become wealthy in order to impress her.",
    modelUrl: "/assets/burning_chrome.glb",
  },
  {
    title: 'Akira Vol. 4',
    description: "Akira is a Japanese cyberpunk manga series written and illustrated by Katsuhiro Otomo. Set in a post-apocalyptic Neo-Tokyo, the work uses conventions of the cyberpunk genre to detail a saga of turmoil.",
    modelUrl: "/assets/akira.glb",
  },
  {
    title: 'Three Other Mystery Books',
    description: "With this subscription, you will also receive three other mystery books. These books will be selected by our team of experts and will be a surprise each month!",
    modelUrl: "/assets/sci-fi_books.glb",
  },
];

const HomePage = () => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const currentBook = booksData[currentBookIndex];

  const handlePreviousBook = () => {
    setCurrentBookIndex((prevIndex) => (prevIndex === 0 ? booksData.length - 1 : prevIndex - 1));
  };

  const handleNextBook = () => {
    setCurrentBookIndex((prevIndex) => (prevIndex === booksData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="home-page">
      <div className="book-container">
        {/* Arrow button for Previous */}
        <button className="arrow-button" onClick={handlePreviousBook}>
          &larr;
        </button>
        <div className="model-viewer-container">
          <Canvas
            camera={{ position: [0, 30, 40], fov: 40 }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <ModelViewer url={currentBook.modelUrl} />
            <OrbitControls target={[0, 15, 0]} />
          </Canvas>
        </div>
        <div className="book-info">
          <h1>{currentBook.title}</h1>
          <p>{currentBook.description}</p>
        </div>
        {/* Arrow button for Next */}
        <button className="arrow-button" onClick={handleNextBook}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
