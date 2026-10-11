import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelopeOpenText, FaMusic, FaPause, FaImages, FaMap, FaHeart } from 'react-icons/fa';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [rsvpData, setRsvpData] = useState({
    name: '',
    status: ''
  });

  React.useEffect(() => {
    const targetDate = new Date("2026-10-29T07:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.status) {
      alert('Mohon isi nama dan konfirmasi kehadiran Anda.');
      return;
    }
    
    const phoneNumber = '6282335137684';
    const message = `Halo, saya ${rsvpData.name} ingin mengkonfirmasi kehadiran pada acara pernikahan Herman & Zizi.\n\nStatus: ${rsvpData.status}\n\nTerima kasih.`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const [wishesData, setWishesData] = useState({
    name: '',
    message: ''
  });

  const handleWishesSubmit = (e) => {
    e.preventDefault();
    if (!wishesData.name || !wishesData.message) {
      alert('Mohon isi nama dan ucapan Anda.');
      return;
    }

    const phoneNumber = '6282335137684';
    const message = `Halo, saya ${wishesData.name} ingin memberikan ucapan & doa untuk pernikahan Herman & Zizi:\n\n"${wishesData.message}"\n\n*(Tolong lampirkan foto Anda di chat ini)*\n\nTerima kasih.`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    window.scrollTo(0, 0);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play prevented:", err));
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(err => console.log("Audio play prevented:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      {/* Background Music (Siapkan file music.mp3 di folder public) */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Cover Screen */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="cover-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100vh', transition: { duration: 1, ease: 'easeInOut' } }}
          >
            <div className="cover-background" style={{ backgroundImage: "url('/cover.jpg')" }}></div>
            <div className="cover-overlay"></div>
            <div className="cover-content text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p className="cover-subtitle">Undangan Resepsi Pernikahan</p>
                <h1 className="cover-names script-text">Herman & Zizi</h1>
                
                <div className="cover-guest-box glass-card-sm">
                  <p style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Kepada Yth. Bapak/Ibu/Saudara/i</p>
                  <strong style={{fontSize: '1.2rem', fontFamily: 'var(--font-serif)'}}>Tamu Undangan</strong>
                  <p style={{fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-text-light)'}}>- di Tempat</p>
                </div>

                <button className="btn-open" onClick={handleOpenInvitation}>
                  <FaEnvelopeOpenText style={{marginRight: '8px'}} /> Buka Undangan
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'is-open' : ''}`}>
        
        {/* Floating Particles Animation */}
        <div className="floating-particles">
          <div className="particle p1"></div>
          <div className="particle p2"></div>
          <div className="particle p3"></div>
          <div className="particle p4"></div>
          <div className="particle p5"></div>
          <div className="particle p6"></div>
          <div className="particle p7"></div>
          <div className="particle p8"></div>
        </div>

        {/* Floating Music Button */}
        {isOpen && (
          <button className={`btn-music ${isPlaying ? 'spin' : ''}`} onClick={toggleMusic}>
            {isPlaying ? <FaMusic /> : <FaPause />}
          </button>
        )}

        {/* Hero Section */}
        <motion.section 
          className="section-hero section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <div className="scroll-paper-card">
              <p className="subtitle-sm">HARI TERBAIK DAN ACARA TERBAIK</p>
              <h2 className="title-sm">HERMAN & ZIZI</h2>
              <p className="subtitle-sm">AKAN MENIKAH</p>
              
              <p className="opening-italic">
                Dengan memohon rahmat Allah SWT, kami bermaksud menyelenggarakan acara resepsi pernikahan putra dan putri kami:
              </p>
              
              <div className="couple-names-elegant">
                <h1 className="name-script">Herman Sugianto</h1>
                <div className="ampersand-script">&</div>
                <h1 className="name-script">Nur Aziziyah</h1>
              </div>
              
              <div className="date-elegant-block">
                <div className="date-side date-left">
                  <span>KAMIS</span>
                </div>
                <div className="date-center">
                  <span className="big-date">29</span>
                </div>
                <div className="date-side date-right">
                  <span>PUKUL</span>
                  <span>07.00 - SELESAI</span>
                </div>
              </div>
              
              <p className="full-date-elegant">29 OKTOBER 2026</p>
              
              <p className="location-elegant">
                DEPAN MASJID DATOK KARAY, DUSUN TENGGINA DESA GELAMAN
              </p>
            </div>
          </div>
        </motion.section>

        {/* Couple Identity Section */}
        <motion.section 
          className="section-couple section-padding bg-darker"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="container">
            {/* Groom */}
            <motion.div className="profile-card groom-card" variants={fadeUp}>
              <div className="profile-image-wrapper">
                <div className="hexagon-img">
                  <img src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=500&auto=format&fit=crop" alt="Groom" />
                </div>
              </div>
              <div className="profile-info">
                <div className="short-line"></div>
                <h2 className="profile-name">HERMAN SUGIANTO, S.H. M.Pd</h2>
                <p className="profile-relation">PUTRA KEDUA DARI</p>
                <p className="profile-parents">Bapak Matli & Ibu Mainna</p>
              </div>
            </motion.div>
            
            <motion.div className="quote-container" variants={fadeUp}>
              <p className="profile-quote script-text">
                "Cinta adalah kekuatan yang diam-diam mengikat dua hati, membentuk ikatan yang lebih kuat dari jarak dan waktu."
              </p>
            </motion.div>

            {/* Bride */}
            <motion.div className="profile-card bride-card" variants={fadeUp}>
              <div className="profile-info align-right">
                <div className="short-line right"></div>
                <h2 className="profile-name">NUR AZIZIYAH, S.Pd</h2>
                <p className="profile-relation">PUTRI PERTAMA DARI</p>
                <p className="profile-parents">Bapak Busari &amp; Ibu Sutiama</p>
              </div>
              <div className="profile-image-wrapper">
                <div className="hexagon-img">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop" alt="Bride" />
                </div>
              </div>
            </motion.div>

            <motion.div className="quote-container" variants={fadeUp}>
              <p className="profile-quote script-text">
                "Apa pun jiwa kami terbuat, jiwanya dan jiwaku adalah sama."
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Countdown Section */}
        <motion.section 
          className="section-countdown section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <h2 className="countdown-title">MENUJU HARI BAHAGIA</h2>
            <p className="countdown-date">29 OKTOBER 2026</p>
            
            <div className="countdown-wrapper">
              <div className="countdown-item">
                <span className="countdown-number">{timeLeft.days}</span>
                <span className="countdown-label">HARI</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">JAM</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">MENIT</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">DETIK</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section 
          className="section-gallery section-padding bg-darker"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container text-center">
            <h2 className="section-title script-text gold-accent" style={{fontSize: '3rem', marginBottom: '0.5rem'}}>Galeri Kami</h2>
            <p className="subtitle" style={{marginBottom: '3rem'}}>Momen bahagia kami</p>
            
            <div className="gallery-grid">
              <motion.div className="gallery-item" variants={fadeUp}>
                <img src="/gallery1.jpg" alt="Gallery 1" />
              </motion.div>
              <motion.div className="gallery-item" variants={fadeUp}>
                <img src="/gallery2.jpg" alt="Gallery 2" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Event Details & Location Section */}
        <motion.section 
          className="section-details section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <div className="container">
            <div className="glass-card text-center" style={{padding: '3rem 1.5rem'}}>
              <h2 className="section-title script-text gold-accent" style={{fontSize: '3.5rem', marginBottom: '1rem'}}>Ingat Tanggalnya</h2>
              
              <div className="date-time-box">
                <div className="date-time-item">
                  <div className="icon-wrapper"><FaCalendarAlt /></div>
                  <strong style={{fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginTop: '1rem'}}>Kamis</strong>
                  <p style={{fontSize: '1.2rem', color: 'var(--color-primary)'}}>29 Oktober 2026</p>
                </div>
                
                <div className="date-time-item">
                  <div className="icon-wrapper"><FaMapMarkerAlt /></div>
                  <strong style={{fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginTop: '1rem'}}>07.00 - Selesai</strong>
                  <p style={{fontSize: '1rem', marginTop: '0.5rem'}}>Kediaman Mempelai Pria<br/>Depan Masjid Datok Karay<br/>Dsn Tenggina Desa Gelaman</p>
                </div>
              </div>

              {/* Maps Location */}
              <div className="location-box" style={{marginTop: '3rem'}}>
                <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.5rem'}}>Lokasi Acara</h3>
                <div className="map-container" style={{borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.0820067635!2d114.077221!3d-7.06453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd9e43df3d5bc61%3A0x600115cd1db98b7!2sGelaman%2C%20Arjasa%2C%20Sumenep%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <a href="https://maps.app.goo.gl/dummyLink" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>
                  <FaMap style={{marginRight: '8px'}} /> Buka Google Maps
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RSVP Section */}
        <motion.section 
          className="section-rsvp section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <div className="rsvp-header">
              <span className="rsvp-please script-text">Please</span>
              <h2 className="rsvp-title">RSVP</h2>
              <img src="/cupid.png" alt="" className="rsvp-decor" style={{display: 'none'}} />
            </div>
            
            <p className="rsvp-subtitle">MOHON KONFIRMASI KEHADIRAN ANDA</p>
            <p className="rsvp-desc italic">
              Kehadiran dan doa restu Anda adalah kebahagiaan terbesar bagi kami
            </p>
            
            <form className="rsvp-form" onSubmit={handleRSVPSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nama lengkap" 
                  value={rsvpData.name}
                  onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group text-left">
                <p className="form-label">Konfirmasi kehadiran</p>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="status" 
                    value="Iya, saya akan datang"
                    checked={rsvpData.status === 'Iya, saya akan datang'}
                    onChange={(e) => setRsvpData({...rsvpData, status: e.target.value})}
                    required
                  />
                  <span className="radio-custom"></span>
                  Bisa hadir
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="status" 
                    value="Maaf, Sepertinya tidak bisa"
                    checked={rsvpData.status === 'Maaf, Sepertinya tidak bisa'}
                    onChange={(e) => setRsvpData({...rsvpData, status: e.target.value})}
                  />
                  <span className="radio-custom"></span>
                    Tidak bisa hadir
                </label>
              </div>
              
              <button type="submit" className="btn-submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M12 21V11M12 11L8.5 14.5M12 11L15.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 21V9.5C19 8.39543 18.1046 7.5 17 7.5H16M5 21V9.5C5 8.39543 5.89543 7.5 7 7.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 7.5V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                KIRIM RESPON
              </button>
            </form>
          </div>
        </motion.section>

        {/* Hosts Section */}
        <motion.section 
          className="section-hosts section-padding bg-darker"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <p className="closing-text">
              Merupakan suatu kehormatan dan kebahagian bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a Restu.
            </p>
            <p className="closing-greeting gold-accent" style={{marginTop: '1.5rem', fontStyle: 'italic', fontSize: '1.2rem'}}>Wassalamu'alaikum Wr. Wb.</p>
            
            <div className="divider"></div>

            <h3 className="host-title" style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1.5rem'}}>Kami Yang Berbahagia</h3>
            <div className="happy-family">
              <p>Kel. Bapak Matli & Ibu Mainna</p>
              <p>Kel. Bapak Busari & Ibu Sutiama</p>
            </div>
          </div>
        </motion.section>

        {/* Wishes Section */}
        <motion.section 
          className="section-wishes section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <div className="rsvp-header">
              <h2 className="rsvp-title">Ucapan & Doa</h2>
            </div>
            
            <p className="rsvp-subtitle">KIRIMKAN DOA RESTU ANDA</p>
            <p className="rsvp-desc italic">
              Doa tulus Anda sangat berarti bagi perjalanan baru kami
            </p>
            
            <form className="rsvp-form" onSubmit={handleWishesSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nama Anda" 
                  value={wishesData.name}
                  onChange={(e) => setWishesData({...wishesData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <p className="form-label text-left" style={{marginBottom: '0.5rem', fontSize: '1rem', color: '#888'}}>Lampirkan Foto (Opsional)</p>
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*"
                  style={{padding: '0.5rem 0', fontSize: '0.9rem'}}
                />
                <p style={{fontSize: '0.8rem', color: '#A0A0A0', textAlign: 'left', marginTop: '0.5rem', fontStyle: 'italic'}}>
                  *Foto tidak dapat terkirim otomatis lewat web, mohon kirimkan ulang foto Anda di chat WhatsApp setelah menekan tombol kirim.
                </p>
              </div>

              <div className="form-group">
                <textarea 
                  className="form-control" 
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..." 
                  rows="4"
                  value={wishesData.message}
                  onChange={(e) => setWishesData({...wishesData, message: e.target.value})}
                  required
                  style={{resize: 'vertical'}}
                ></textarea>
              </div>
              
              <button type="submit" className="btn-submit" style={{background: '#D18E9B'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path d="M12 21V11M12 11L8.5 14.5M12 11L15.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 21V9.5C19 8.39543 18.1046 7.5 17 7.5H16M5 21V9.5C5 8.39543 5.89543 7.5 7 7.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 7.5V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                KIRIM UCAPAN
              </button>
            </form>
          </div>
        </motion.section>

        {/* Quote Section */}
        <motion.section 
          className="section-quote section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{paddingBottom: '8rem'}}
        >
          <div className="container text-center">
            <div className="glass-card">
              <FaHeart className="icon-heart gold-accent" style={{fontSize: '1.5rem', marginBottom: '1rem'}} />
              <p className="quote" style={{fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--color-text)'}}>
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar dapat tanda-tanda bagi kaum yang berfikir."
              </p>
              <p className="quote-source gold-accent" style={{marginTop: '1.5rem', fontWeight: '600'}}>(QS. Ar-Rum: 21)</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;
