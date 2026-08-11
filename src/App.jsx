import ScrollProgress from './components/common/ScrollProgress.jsx';
import Nav from './components/Nav/Nav.jsx';
import Hero from './components/Hero/Hero.jsx';
import ImageBand from './components/ImageBand/ImageBand.jsx';
import District from './components/District/District.jsx';
import PlansSection from './components/Plans/PlansSection.jsx';
import GalleryReel from './components/GalleryReel/GalleryReel.jsx';
import CityBand from './components/CityBand/CityBand.jsx';
import MapSection from './components/MapSection/MapSection.jsx';
import CityTicker from './components/CityTicker/CityTicker.jsx';
import AquaparkSection from './components/Aquapark/AquaparkSection.jsx';
import OffersSection from './components/Aquapark/OffersSection.jsx';
import MapBanner from './components/MapBanner/MapBanner.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'clip' }}>
      <ScrollProgress />
      <Nav />
      <Hero />

      <ImageBand
        src="/assets/dvor_2.png"
        alt="Двор первого квартала «Нагории»"
        eyebrow="Первый квартал"
        text="Здесь вместе с жилыми кварталами создают среду для жизни: школы, детские сады, коворкинги, развлекательный центр, аквапарк, парк вдоль реки и пешеходный бульвар. А дворы без машин."
      />

      <District />

      <ImageBand
        src="/assets/genplan-top.jpg"
        alt="Генплан квартала сверху"
        eyebrow="Генплан"
        text="Двадцать два квартала, объединяющие комфорт, природу и всю необходимую инфраструктуру в одном месте."
        height="min(74vh, 660px)"
      />

      <PlansSection />
      <GalleryReel />
      <CityBand />
      <MapSection />
      <CityTicker />
      <AquaparkSection />
      <OffersSection />
      <MapBanner />
      <Footer />
    </div>
  );
}
