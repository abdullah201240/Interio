import React from 'react';
import { useGetAllHeroSections } from './api/heroSectionApi'; // Import the custom hook
import { API_BASE_URL_IMAGE } from '../config';
import '../assets/css/slider.css';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

interface HeroSectionData {
    image: string;
    description: React.ReactNode;
}

export default function HeroSection() {
    // Use the custom hook to fetch data
    const { data: heroSections = [], isLoading, error } = useGetAllHeroSections();

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>;;
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>;

    return (
        <div>
            <div style={{ background: '#F1F1F1' }}>
                <div className="carousel-container">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {heroSections.map((_: any, index: number) => (
                                <li
                                    key={index}
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                ></li>
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {heroSections.map((section: HeroSectionData, index: number) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img className="d-block w-100" src={`${API_BASE_URL_IMAGE}/${section.image}`} alt={`Slide ${index + 1}`} />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p>{section.description}</p>
                                        <div className="carousel-button-container">
                                            <Link to='/about-us'  className="btn btn-primary">See More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
}
