import React, { useState,useEffect} from 'react'
import Navbar from "../components/Navbar";
import MovieLogo from "../assets/hometitle.png"
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import "../HomePage/Home.css";
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState('url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Of5Y6MR1gKWHux7lQLmLWojGDdGDNOYY6Q&usqp=CAU)'); 

  const imageUrls = [
    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGWTWDk4qBL8IUsKw5KyUAvMFiWJSpOs_CA&usqp=CAU)',
    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTPZO3mxegqks4fDLsvJeOtRAjpCUfQLoc2Q&usqp=CAU)',
    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEFP6-Ey0HlRa_QUK2-gVSitf3wx3-sfvLA&usqp=CAU)',
    // Add more image URLs as needed
  ];
  const selectRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  // Function to change the background image
  const changeBackgroundImage = () => {
    const newImageUrl = selectRandomImageUrl();
    setBackgroundImage(newImageUrl);
  };

  // useEffect hook to change background image every 5 seconds (for demonstration)
  useEffect(() => {
    const interval = setInterval(() => {
      changeBackgroundImage();
    }, 2000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []); // Run once on component mount

    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () =>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
};
  return (
    <div className='home'>
      <Navbar isScrolled={isScrolled} />
      <div  style={{ backgroundImage, minHeight: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', transition: 'background-image 0.5s' }}>
      <div className='container'>
          <div className='logo'>
            <img src={MovieLogo} alt="movie logo"/>
          </div>
          <div className='buttons flex'>
            <button onClick={ ()=>navigate('/player')} className='flex j-center a-center'><FaPlay />Play</button>
            <button className='flex j-center a-center'><AiOutlineInfoCircle/>More Info</button>
          </div>
        </div>
      </div>
    </div>
  )
}
