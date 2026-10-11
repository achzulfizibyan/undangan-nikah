import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelopeOpenText, FaMusic, FaPause, FaImages, FaMap, FaHeart, FaCheck, FaTimes, FaComments, FaPaperPlane, FaGift, FaCopy } from 'react-icons/fa';
import './App.css';
import hermanImg from './assets/herman.png';
import ziziImg from './assets/zizi.png';

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

  const [wishesList, setWishesList] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook_herman');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [guestData, setGuestData] = useState({
    name: '',
    attendance: 'Hadir',
    message: ''
  });

  const [submittedAlert, setSubmittedAlert] = useState(false);
  const [likedWishes, setLikedWishes] = useState({});
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedAlert, setCopiedAlert] = useState(null);
  const [showGiftCards, setShowGiftCards] = useState(false);

  const handleCopyAccount = (number, bankName) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedBank(bankName);
      setCopiedAlert(bankName);
      setTimeout(() => setCopiedBank(null), 3000);
      setTimeout(() => setCopiedAlert(null), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleToggleLike = (id) => {
    setLikedWishes((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  const handleGuestbookSubmit = (e) => {
    e.preventDefault();
    if (!guestData.name.trim() || !guestData.message.trim()) {
      alert('Mohon isi nama dan ucapan Anda.');
      return;
    }

    const newWish = {
      id: Date.now(),
      name: guestData.name.trim(),
      status: guestData.attendance,
      message: guestData.message.trim(),
      time: 'Baru saja',
      likes: 0
    };

    const updated = [newWish, ...wishesList];
    setWishesList(updated);
    try {
      localStorage.setItem('wedding_guestbook_herman', JSON.stringify(updated));
    } catch (err) {}

    setGuestData({
      name: '',
      attendance: 'Hadir',
      message: ''
    });

    setSubmittedAlert(true);
    setTimeout(() => setSubmittedAlert(false), 4000);
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
        
        {/* Floating Hearts Animation (Simbol Hati Melayang) */}
        <div className="floating-hearts">
          <div className="floating-heart h1"><FaHeart /></div>
          <div className="floating-heart h2"><FaHeart /></div>
          <div className="floating-heart h3"><FaHeart /></div>
          <div className="floating-heart h4"><FaHeart /></div>
          <div className="floating-heart h5"><FaHeart /></div>
          <div className="floating-heart h6"><FaHeart /></div>
          <div className="floating-heart h7"><FaHeart /></div>
          <div className="floating-heart h8"><FaHeart /></div>
          <div className="floating-heart h9"><FaHeart /></div>
          <div className="floating-heart h10"><FaHeart /></div>
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
                  <img src={hermanImg} alt="Groom" />
                </div>
              </div>
              <div className="profile-info">
                <div className="short-line"></div>
                <h2 className="profile-name">HERMAN SUGIANTO, S.H. M.Pd</h2>
                <p className="profile-relation">PUTRA PERTAMA DARI</p>
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
                <p className="profile-relation">PUTRI KEDUA DARI</p>
                <p className="profile-parents">Bapak Busari &amp; Ibu Sutiama</p>
              </div>
              <div className="profile-image-wrapper">
                <div className="hexagon-img">
                  <img src={ziziImg} alt="Bride" />
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
              <h2 className="section-title script-text gold-accent" style={{fontSize: '3.5rem', marginBottom: '1rem'}}>Save The Date</h2>
              
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
                    src="https://maps.google.com/maps?q=-6.8912565,115.3164412&hl=id&z=17&output=embed" 
                    width="100%" 
                    height="350" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=-6.8912565,115.3164412" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>
                  <FaMap style={{marginRight: '8px'}} /> Buka Google Maps
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Wedding Gift Section (Tanda Kasih) */}
        <motion.section 
          className="section-gift section-padding bg-darker"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <div className="gift-header-box">
              <FaGift className="gold-accent gift-icon-main" />
              <h2 className="gift-heading-title script-text gold-accent">Kasih Angpao</h2>
              <p className="gift-heading-sub">KIRIM HADIAH / WEDDING GIFT</p>
              <p className="gift-heading-desc italic">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberikan kado secara cashless melalui:
              </p>
            </div>

            {/* Tombol Icon Gift untuk Menampilkan Nomor Rekening */}
            <div className="gift-action-wrap">
              <button 
                type="button" 
                className={`btn-gift-toggle ${showGiftCards ? 'active' : ''}`}
                onClick={() => setShowGiftCards(!showGiftCards)}
                aria-expanded={showGiftCards}
              >
                <span className="btn-gift-icon-circle">
                  <FaGift />
                </span>
                <span className="btn-gift-text">
                  {showGiftCards ? 'Sembunyikan Nomor Rekening' : 'Kirim Hadiah / Angpao'}
                </span>
              </button>
            </div>

            <AnimatePresence>
              {showGiftCards && (
                <motion.div 
                  className="gift-cards-grid"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Rekening BCA */}
                  <div className="bank-card bank-bca">
                    <div className="bank-card-pattern"></div>
                    <div className="bank-card-top">
                      <span className="bank-logo-text">BCA</span>
                      <div className="bank-chip"></div>
                    </div>
                    <div className="bank-card-body">
                      <span className="bank-account-label">Nomor Rekening</span>
                      <p className="bank-account-number">4980392177</p>
                      <p className="bank-account-holder">a.n Herman Sugianto</p>
                    </div>
                    <button 
                      type="button" 
                      className={`btn-copy-bank ${copiedBank === 'BCA' ? 'copied' : ''}`}
                      onClick={() => handleCopyAccount('4980392177', 'BCA')}
                    >
                      {copiedBank === 'BCA' ? (
                        <>
                          <FaCheck /> No. Rekening Tersalin
                        </>
                      ) : (
                        <>
                          <FaCopy /> Salin No. Rekening
                        </>
                      )}
                    </button>
                  </div>

                  {/* Rekening BANK JATIM */}
                  <div className="bank-card bank-jatim">
                    <div className="bank-card-pattern"></div>
                    <div className="bank-card-top">
                      <span className="bank-logo-text">BANK JATIM</span>
                      <div className="bank-chip"></div>
                    </div>
                    <div className="bank-card-body">
                      <span className="bank-account-label">Nomor Rekening</span>
                      <p className="bank-account-number">0136077279</p>
                      <p className="bank-account-holder">a.n Nur Aziziyah</p>
                    </div>
                    <button 
                      type="button" 
                      className={`btn-copy-bank ${copiedBank === 'JATIM' ? 'copied' : ''}`}
                      onClick={() => handleCopyAccount('0136077279', 'BANK JATIM')}
                    >
                      {copiedBank === 'JATIM' ? (
                        <>
                          <FaCheck /> No. Rekening Tersalin
                        </>
                      ) : (
                        <>
                          <FaCopy /> Salin No. Rekening
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {copiedAlert && (
              <div className="copy-toast">
                <FaCheck /> Nomor rekening {copiedAlert} berhasil disalin!
              </div>
            )}
          </div>
        </motion.section>

        {/* Buku Tamu dan Ucapan Section */}
        <motion.section 
          className="section-guestbook section-padding"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <div className="container text-center">
            <div className="guestbook-header-box">
              <h2 className="guestbook-heading-title script-text gold-accent">Buku Tamu &amp; Ucapan</h2>
              <p className="guestbook-heading-sub">KONFIRMASI KEHADIRAN &amp; DOA RESTU</p>
              <p className="guestbook-heading-desc italic">
                Kehadiran dan doa restu Anda adalah kebahagiaan terbesar bagi kami
              </p>
            </div>
            
            <div className="guestbook-card-container">
              {submittedAlert && (
                <div className="submit-alert-success">
                  <FaCheck style={{ marginRight: '6px' }} />
                  Terima kasih! Ucapan Anda telah ditambahkan di bawah.
                </div>
              )}

              <form className="guestbook-form" onSubmit={handleGuestbookSubmit}>
                {/* 1. Input Nama */}
                <div className="form-field">
                  <label htmlFor="guest-name">Nama Tamu</label>
                  <input 
                    id="guest-name"
                    type="text" 
                    className="guestbook-input" 
                    placeholder="Tuliskan nama Anda..." 
                    value={guestData.name}
                    onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                    required
                  />
                </div>
                
                {/* 2. Tombol Hadir atau Tidak */}
                <div className="form-field">
                  <label>Konfirmasi Kehadiran</label>
                  <div className="attendance-buttons">
                    <button
                      type="button"
                      className={`btn-attendance ${guestData.attendance === 'Hadir' ? 'active hadir' : ''}`}
                      onClick={() => setGuestData({ ...guestData, attendance: 'Hadir' })}
                    >
                      <FaCheck /> Hadir
                    </button>
                    <button
                      type="button"
                      className={`btn-attendance ${guestData.attendance === 'Tidak Hadir' ? 'active tidak-hadir' : ''}`}
                      onClick={() => setGuestData({ ...guestData, attendance: 'Tidak Hadir' })}
                    >
                      <FaTimes /> Tidak Bisa Hadir
                    </button>
                  </div>
                </div>

                {/* 3. Text Area Ucapan */}
                <div className="form-field">
                  <label htmlFor="guest-message">Ucapan & Doa</label>
                  <textarea 
                    id="guest-message"
                    className="guestbook-textarea" 
                    placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..." 
                    rows="3"
                    value={guestData.message}
                    onChange={(e) => setGuestData({ ...guestData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                
                {/* 4. Tombol Kirim */}
                <button type="submit" className="btn-guestbook-submit">
                  <FaPaperPlane />
                  KIRIM UCAPAN
                </button>
              </form>

              {/* 5. Daftar Komentar / Ucapan ala Sosial Media (Tepat di bawah tombol) */}
              <div className="social-comments-section">
                <div className="social-comments-header">
                  <div className="comments-count-title">
                    <FaComments className="gold-accent" />
                    <span>{wishesList.length} Komentar & Ucapan</span>
                  </div>
                </div>

                <div className="social-comments-list">
                  {wishesList.length === 0 ? (
                    <div className="empty-comments-state">
                      <p>Belum ada ucapan. Jadilah yang pertama memberikan ucapan & doa restu!</p>
                    </div>
                  ) : (
                    wishesList.map((wish) => (
                      <div key={wish.id} className="social-comment-item">
                        <div className="social-comment-avatar">
                          {wish.name ? wish.name.charAt(0).toUpperCase() : 'T'}
                        </div>
                        <div className="social-comment-content">
                          <div className="social-comment-bubble">
                            <div className="social-comment-user-row">
                              <span className="social-comment-username">{wish.name}</span>
                              <span className={`social-attendance-tag ${wish.status === 'Hadir' ? 'tag-hadir' : 'tag-absen'}`}>
                                {wish.status === 'Hadir' ? '✓ Hadir' : '✕ Tidak Hadir'}
                              </span>
                            </div>
                            <p className="social-comment-text">{wish.message}</p>
                          </div>
                          <div className="social-comment-meta">
                            <span className="social-comment-time">{wish.time}</span>
                            <button 
                              type="button" 
                              className={`social-like-btn ${likedWishes[wish.id] ? 'is-liked' : ''}`}
                              onClick={() => handleToggleLike(wish.id)}
                            >
                              <FaHeart className={likedWishes[wish.id] ? 'heart-liked' : ''} />
                              <span>{(wish.likes || 0) + (likedWishes[wish.id] ? 1 : 0)} Suka</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
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
              <p>Keluarga Bapak Matli & Ibu Mainna</p>
              <p>Keluarga Bapak Busari & Ibu Sutiama</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;
