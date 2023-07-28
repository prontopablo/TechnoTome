/* HomePage.js */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import BurgerMenu from './BurgerMenu';
import DropdownContent from './DropdownContent';
import './HomePage.css';
import logo from './images/TechnoTomeLogo.png';

const ModelLoader = ({ url, onModelLoad }) => {
  const gltf = useLoader(GLTFLoader, url);

  useFrame((state, delta) => {
    gltf.scene.rotation.y += 0.05 * delta; // Rotation speed
  });

  useEffect(() => {
    onModelLoad(gltf.scene);
  }, [gltf.scene, onModelLoad]);

  return null;
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
    description: "Set off by the bullet of a would-be assassin, the godlike telekinetic fury of the superhuman child Akira has once again demolished in seconds that which took decades and untold billions to build.",
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
  const [currentModel, setCurrentModel] = useState(null);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setBurgerMenuOpen((prevState) => !prevState);
  };

  const handleDropdownClose = () => {
    setBurgerMenuOpen(false);
  };

  const handlePreviousBook = () => {
    setCurrentBookIndex((prevIndex) => (prevIndex === 0 ? booksData.length - 1 : prevIndex - 1));
  };

  const handleNextBook = () => {
    setCurrentBookIndex((prevIndex) => (prevIndex === booksData.length - 1 ? 0 : prevIndex + 1));
  };

  const handleModelLoad = (model) => {
    setCurrentModel(model);
  };

  return (
    <div className="home-page">
      <a href="/" className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClick={handleBurgerMenuClick} />
      {/* Render the DropdownContent outside the normal component hierarchy using React Portals */}
      {isBurgerMenuOpen && (
        <>
          {ReactDOM.createPortal(
            <DropdownContent isOpen={isBurgerMenuOpen} onCloseDropdown={handleDropdownClose} />,
            document.body
          )}
        </>
      )}
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
            {currentModel && <primitive object={currentModel} receiveShadow castShadow />}
            {currentBook && (
              <ModelLoader url={currentBook.modelUrl} onModelLoad={handleModelLoad} />
            )}
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
