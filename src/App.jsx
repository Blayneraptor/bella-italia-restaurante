import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import {
  FaUtensils,
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { PizzaAnimation } from "./components/PizzaAnimation";
import { ImageModal } from "./components/ImageModal";
import { buttonClasses } from "./buttonStyles";
import "./App.css";
import { useResetAnimation } from "./hooks/useResetAnimation";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animations
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to reset pizza animation
  const resetPizzaAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Control scroll state for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle escape key for all modals to prevent the "Unchecked runtime.lastError" issue
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        // Only process if any modal is open
        if (isModalOpen || isFullMenuOpen || isGalleryOpen) {
          // Use requestAnimationFrame to ensure clean event handling
          requestAnimationFrame(() => {
            if (isModalOpen) setIsModalOpen(false);
            if (isFullMenuOpen) setIsFullMenuOpen(false);
            if (isGalleryOpen) setIsGalleryOpen(false);
          });
        }
      }
    };
    
    // Use capture phase to ensure our handler runs first
    window.addEventListener("keydown", handleEscapeKey, true);
    return () => window.removeEventListener("keydown", handleEscapeKey, true);
  }, [isModalOpen, isFullMenuOpen, isGalleryOpen]);

  // Animation controls for scroll animations
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  // Imágenes para el carrusel de la galería
  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Pasta casera con salsa de tomate y albahaca",
      caption: "Pasta fresca con tomate y albahaca",
    },
    {
      src: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Pizza tradicional italiana recién horneada",
      caption: "Pizza Napolitana tradicional",
    },
    {
      src: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Tiramisu casero con café y cacao",
      caption: "Tiramisu casero",
    },
    {
      src: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Bruschetta con tomate y albahaca",
      caption: "Bruschetta clásica",
    },
    {
      src: "https://images.pexels.com/photos/2103949/pexels-photo-2103949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Risotto cremoso con champiñones",
      caption: "Risotto ai Funghi",
    },
    {
      src: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Espaguetis a la carbonara",
      caption: "Spaghetti alla Carbonara",
    },
    {
      src: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Gnocchi caseros con salsa de queso",
      caption: "Gnocchi caseros",
    },
    {
      src: "https://images.pexels.com/photos/2233730/pexels-photo-2233730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Ravioles rellenos de espinaca y ricotta",
      caption: "Ravioli di spinaci e ricotta",
    },
    {
      src: "https://images.pexels.com/photos/1579926/pexels-photo-1579926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Selección de aperitivos italianos",
      caption: "Antipasto italiano",
    },
    {
      src: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Lasagna tradicional recién horneada",
      caption: "Lasagna alla Bolognese",
    },
    {
      src: "https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Ambiente acogedor en cocina italiana",
      caption: "El corazón de nuestra cocina",
    },
    {
      src: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Espacio de interior del restaurante",
      caption: "Ambiente elegante y acogedor",
    },
    {
      src: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Interior del restaurante con decoración rústica",
      caption: "Atmósfera única y acogedora",
    },
    {
      src: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Vista exterior del restaurante italiano",
      caption: "Nuestra casa desde 1985",
    },
    {
      src: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Chef preparando comida fresca",
      caption: "El arte de la cocina italiana",
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Header/Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link
            to="home"
            smooth={true}
            duration={100}
            className="cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <FaUtensils
                className={`${
                  isScrolled ? "text-primary" : "text-white"
                } text-2xl`}
              />
              <span
                className={`text-2xl font-cursive font-bold ${
                  isScrolled ? "text-dark" : "text-white"
                }`}
              >
                Bella Italia
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "home", label: "Inicio" },
              { id: "about", label: "Nosotros" },
              { id: "menu", label: "Menú" },
              { id: "gallery", label: "Galería" },
              { id: "contact", label: "Contacto" },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  role="button"
                  tabIndex={0}
                  className={`navbar-link block px-5 py-3 rounded-md hover:text-primary hover:bg-opacity-20 hover:bg-primary transition-all duration-300 active:scale-95 cursor-pointer select-none ${
                    isScrolled ? "text-dark" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={100}
                className={`${buttonClasses.base} ${
                  isScrolled ? buttonClasses.primary : "bg-white text-primary"
                } px-6 py-2 rounded-lg hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
              >
                Reserva
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                isScrolled ? "text-dark" : "text-white"
              } focus:outline-none`}
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4"
          >
            <div className="container-custom flex flex-col space-y-4">
              {[
                { id: "home", label: "Inicio" },
                { id: "about", label: "Nosotros" },
                { id: "menu", label: "Menú" },
                { id: "gallery", label: "Galería" },
                { id: "contact", label: "Contacto" },
              ].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={100}
                    role="button"
                    className="navbar-link py-3 px-4 block rounded-md hover:bg-light active:scale-95 cursor-pointer select-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  className={`${buttonClasses.base} ${buttonClasses.primary} self-start inline-block px-6 py-2 rounded-lg hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
                  onClick={() => setIsMenuOpen(false)} // Añadimos esta línea para cerrar el menú
                >
                  Reserva
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="bg-[url('https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center h-full w-full">
            <div className="absolute inset-0 bg-dark bg-opacity-60"></div>
          </div>
        </div>

        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-cursive mb-6 text-white drop-shadow-lg">
              Auténtica Cocina Italiana
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed text-gray-100">
              Sabores tradicionales con un toque moderno en el corazón de la
              ciudad
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="menu"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  className={`${buttonClasses.base} ${buttonClasses.primary}`}
                >
                  Nuestro Menú
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  className={`${buttonClasses.base} bg-white text-dark hover:bg-opacity-90`}
                >
                  Reservar Mesa
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-80}
            duration={100}
            className="animate-bounce flex items-center justify-center w-12 h-12 rounded-full bg-white text-primary cursor-pointer shadow-lg hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <span className="text-primary font-medium text-lg">
                Nuestra Historia
              </span>
              <h2 className="section-title mt-2 font-serif">
                Tradición Italiana desde 1985
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed text-lg">
                Fundado por la familia Rossi hace más de tres décadas,{" "}
                <span className="font-semibold text-dark">Bella Italia</span> ha
                sido un referente de la auténtica cocina italiana en la ciudad.
                Nuestras recetas han pasado de generación en generación,
                conservando los sabores tradicionales que caracterizan nuestra
                gastronomía.
              </p>
              <p className="mb-8 text-gray-600 leading-relaxed text-lg">
                Utilizamos ingredientes frescos y de temporada, muchos de ellos
                importados directamente de Italia, para garantizar la
                autenticidad de cada plato. Nuestro chef ejecutivo,{" "}
                <span className="italic font-medium">Marco Bianchi</span>,
                combina técnicas tradicionales con toques modernos para crear
                una experiencia gastronómica única.
              </p>
              <div className="flex gap-8 mt-10">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-serif text-3xl font-bold text-primary">
                    35+
                  </h3>
                  <p className="text-gray-500 font-medium">Años de Tradición</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-serif text-3xl font-bold text-primary">
                    50+
                  </h3>
                  <p className="text-gray-500 font-medium">Platos Únicos</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-serif text-3xl font-bold text-primary">
                    20+
                  </h3>
                  <p className="text-gray-500 font-medium">
                    Vinos Seleccionados
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 relative"
            >
              {/* Pizza animada 3D e interactiva con ingredientes cayendo */}
              <PizzaAnimation key={animationKey} soundEnabled={false} />
              <div className="absolute top-10 -right-5 -z-10 w-full h-full bg-accent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-medium text-lg inline-block mb-2"
            >
              Nuestros Platos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="section-title mx-auto font-serif after:mx-auto after:left-0 after:right-0"
            >
              Menú Seleccionado
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-xl mx-auto text-lg mt-6 leading-relaxed"
            >
              Descubre nuestra selección de platos tradicionales italianos
              elaborados con ingredientes frescos y de la mejor calidad.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Pizza Margherita",
                desc: "Tomate, mozzarella, albahaca fresca y aceite de oliva",
                price: "12.95",
                img: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: "Pasta Carbonara",
                desc: "Espaguetis, huevo, panceta, pecorino romano y pimienta negra",
                price: "14.50",
                img: "https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: "Risotto ai Funghi",
                desc: "Arroz arborio, setas silvestres, caldo de verduras y parmesano",
                price: "16.95",
                img: "https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: "Lasagna Classica",
                desc: "Capas de pasta, ragú boloñesa, bechamel y queso rallado",
                price: "15.75",
                img: "https://images.pexels.com/photos/5949903/pexels-photo-5949903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: "Tiramisu",
                desc: "Bizcochos de soletilla, café, mascarpone y cacao en polvo",
                price: "8.50",
                img: "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: "Carpaccio di Manzo",
                desc: "Finas láminas de ternera, rúcula, parmesano y aceite de trufa",
                price: "17.25",
                img: "https://images.pexels.com/photos/20807274/pexels-photo-20807274/free-photo-of-comida-plato-italiano-restaurante.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Use requestAnimationFrame to defer state updates
                  requestAnimationFrame(() => {
                    setModalImage(item.img);
                    setModalAlt(item.name);
                    setIsModalOpen(true);
                  });
                }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white opacity-0 group-hover:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-serif text-xl font-bold">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold text-lg">
                      €{item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button
                onClick={() => setIsFullMenuOpen(true)}
                className={`${buttonClasses.base} ${buttonClasses.outline} text-lg px-8 py-3 hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
              >
                Ver Menú Completo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery/Showcase Section */}
      <section className="py-16 overflow-hidden bg-gray-50" id="gallery">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-medium text-lg inline-block mb-2"
            >
              Nuestra Galería
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="section-title mx-auto font-serif after:mx-auto after:left-0 after:right-0"
            >
              Momentos Especiales
            </motion.h2>
          </div>

          <div className="relative h-[85vh] md:h-[75vh] mb-16">
            <div className="devices-wrapper relative w-full h-full">
              {/* Primera fila de imágenes - más grandes y superpuestas */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-[2%] left-[3%] w-[30%] z-10 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-72 object-cover"
                  src="https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Interior del restaurante"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute top-[5%] left-[27%] w-[25%] z-20 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-60 object-cover"
                  src="https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Plato de pasta"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute top-[3%] left-[48%] w-[22%] z-30 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-64 object-cover"
                  src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Espaguetis con mariscos"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-[6%] right-[3%] w-[26%] z-10 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-68 object-cover"
                  src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Chef preparando comida"
                  loading="lazy"
                />
              </motion.div>

              {/* Segunda fila de imágenes - overlapping */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute top-[32%] left-[7%] w-[24%] z-40 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-64 object-cover"
                  src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Cocina italiana"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute top-[28%] left-[25%] w-[34%] z-30 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-80 object-cover"
                  src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Interior elegante"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute top-[35%] right-[8%] w-[28%] z-20 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-72 object-cover"
                  src="https://images.pexels.com/photos/6605902/pexels-photo-6605902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Bruschetta"
                  loading="lazy"
                />
              </motion.div>

              {/* Tercera fila de imágenes - con mayor solapamiento */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-[3%] left-[5%] w-[26%] z-20 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-68 object-cover"
                  src="https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Vino italiano"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute bottom-[5%] left-[25%] w-[30%] z-40 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-76 object-cover"
                  src="https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Mesa preparada para cena"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-[8%] right-[7%] w-[32%] z-30 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-72 object-cover"
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Pasta fresca"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-[30%] left-[53%] w-[24%] z-20 transform transition-all duration-500"
              >
                <img
                  className="shadow-xl rounded-lg w-full h-60 object-cover"
                  src="https://images.pexels.com/photos/4946517/pexels-photo-4946517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Tiramisu casero"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                Ambiente{" "}
                <span className="font-cursive text-primary">único</span> <br />
                para momentos especiales
              </h2>
              <p className="mt-4 font-serif text-xl text-gray-600 leading-relaxed">
                Espacios diseñados para crear recuerdos inolvidables en un
                entorno acogedor y elegante
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  className={`${buttonClasses.base} ${buttonClasses.primary} px-8 py-3 text-lg hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
                >
                  Reserva Ahora
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className={`${buttonClasses.base} ${buttonClasses.outline} px-8 py-3 text-lg inline-flex items-center gap-2 hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
                >
                  Ver Galería <span className="text-lg">→</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Contáctanos</span>
            <h2 className="section-title mx-auto font-serif after:mx-auto after:left-0 after:right-0">
              Reserva Tu Mesa
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Reserva una mesa en nuestro restaurante y disfruta de una
              experiencia gastronómica inolvidable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
  <label
    htmlFor="time"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Hora
  </label>
  <select
    id="time"
    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
  >
    <option value="">Selecciona un horario</option>
    {/* Horario de comida - 12:00 a 16:00 */}
    <optgroup label="Comida">
      {Array.from({ length: 17 }, (_, i) => {
        const hour = Math.floor(i / 4) + 12;
        const minute = (i % 4) * 15;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        return (
          <option key={`lunch-${i}`} value={timeString}>
            {timeString}
          </option>
        );
      })}
    </optgroup>
    {/* Horario de cena - 20:00 a 23:30 */}
    <optgroup label="Cena">
      {Array.from({ length: 15 }, (_, i) => {
        const hour = Math.floor(i / 4) + 20;
        const minute = (i % 4) * 15;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        return (
          <option key={`dinner-${i}`} value={timeString}>
            {timeString}
          </option>
        );
      })}
    </optgroup>
  </select>
</div>
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Número de Personas
                  </label>
                  <select
                    id="guests"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecciona</option>
                    <option value="1">1 Persona</option>
                    <option value="2">2 Personas</option>
                    <option value="3-4">3-4 Personas</option>
                    <option value="5-6">5-6 Personas</option>
                    <option value="7+">7+ Personas</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje (Opcional)
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Información adicional sobre tu reserva"
                  ></textarea>
                </div>
                <div>
                  <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={100}
                    className={`${buttonClasses.base} ${buttonClasses.primary} px-8 py-3 text-lg hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
                  >
                    Reserva Ahora
                  </Link>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-light p-8 rounded-lg h-full">
                <h3 className="font-serif text-2xl mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Dirección</h4>
                      <p className="text-gray-600">
                        Calle Italia 123, Ciudad, CP 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaPhone className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Teléfono</h4>
                      <p className="text-gray-600">+34 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Email</h4>
                      <p className="text-gray-600">info@bellaitalia.com</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium text-lg mb-3">Horario</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lunes - Viernes</span>
                        <span>12:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sábado</span>
                        <span>12:00 - 00:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domingo</span>
                        <span>13:00 - 22:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaUtensils className="text-primary text-2xl" />
                <span className="text-2xl font-cursive font-bold">
                  Bella Italia
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Auténtica cocina italiana con los mejores ingredientes y recetas
                tradicionales.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white bg-opacity-10 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="bg-white bg-opacity-10 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="bg-white bg-opacity-10 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {[
                  { name: "Inicio", id: "home" },
                  { name: "Sobre Nosotros", id: "about" },
                  { name: "Menú", id: "menu" },
                  { name: "Galería", id: "gallery" },
                  { name: "Contacto", id: "contact" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.id}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={100}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 cursor-pointer select-none"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-6">Contáctanos</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                  <span className="text-gray-400">
                    Calle Italia 123, Ciudad, CP 12345
                  </span>
                </li>
                <li className="flex items-start">
                  <FaPhone className="text-primary mt-1 mr-3" />
                  <span className="text-gray-400">+34 123 456 789</span>
                </li>
                <li className="flex items-start">
                  <FaEnvelope className="text-primary mt-1 mr-3" />
                  <span className="text-gray-400">info@bellaitalia.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-6">Horario</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Lunes - Viernes</span>
                  <span>12:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sábado</span>
                  <span>12:00 - 00:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Domingo</span>
                  <span>13:00 - 22:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Bella Italia. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal del Menú Completo */}
      {isFullMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => {
            // Cerrar el modal al hacer clic fuera de él
            if (e.target === e.currentTarget) {
              e.preventDefault();
              e.stopPropagation();
              // Use requestAnimationFrame to defer state update until after event handling is complete
              requestAnimationFrame(() => {
                setIsFullMenuOpen(false);
              });
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Botón para cerrar */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                requestAnimationFrame(() => {
                  setIsFullMenuOpen(false);
                });
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Header del Modal */}
            <div className="border-b border-gray-200 pb-4 pt-5 px-6 md:px-8">
              <div className="flex items-center gap-2 mb-2">
                <FaUtensils className="text-primary text-xl" />
                <h3 className="text-2xl font-cursive font-bold">
                  Bella Italia
                </h3>
              </div>
              <h2 className="text-3xl font-serif font-bold">Menú Completo</h2>
            </div>

            {/* Contenido del Menú */}
            <div className="p-6 md:p-8">
              {/* Categorías */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Entrantes */}
                <div className="mb-8">
                  <h3 className="text-xl font-serif font-bold mb-4 pb-2 border-b border-gray-200 text-primary">
                    Entrantes
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Bruschetta",
                        desc: "Pan tostado con tomate, albahaca y aceite de oliva",
                        price: "7.50",
                      },
                      {
                        name: "Calamari Fritti",
                        desc: "Calamares fritos con salsa de limón",
                        price: "9.95",
                      },
                      {
                        name: "Carpaccio di Manzo",
                        desc: "Finas láminas de ternera con rúcula y parmesano",
                        price: "12.50",
                      },
                      {
                        name: "Insalata Caprese",
                        desc: "Tomate, mozzarella fresca y albahaca",
                        price: "8.95",
                      },
                      {
                        name: "Antipasto Misto",
                        desc: "Selección de embutidos y quesos italianos",
                        price: "14.50",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <span className="text-primary font-medium ml-4">
                          €{item.price}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Pastas */}
                <div className="mb-8">
                  <h3 className="text-xl font-serif font-bold mb-4 pb-2 border-b border-gray-200 text-primary">
                    Pastas
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Spaghetti alla Carbonara",
                        desc: "Espaguetis con huevo, panceta y queso pecorino",
                        price: "13.50",
                      },
                      {
                        name: "Pappardelle al Ragù",
                        desc: "Pappardelle con ragú de ternera a fuego lento",
                        price: "14.95",
                      },
                      {
                        name: "Ravioli di Ricotta",
                        desc: "Raviolis rellenos de ricotta y espinacas",
                        price: "13.95",
                      },
                      {
                        name: "Linguine allo Scoglio",
                        desc: "Linguini con mariscos variados",
                        price: "18.50",
                      },
                      {
                        name: "Lasagna alla Bolognese",
                        desc: "Lasaña tradicional con bechamel y ragú",
                        price: "15.50",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="flex justify-between"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <span className="text-primary font-medium ml-4">
                          €{item.price}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Pizzas */}
                <div className="mb-8">
                  <h3 className="text-xl font-serif font-bold mb-4 pb-2 border-b border-gray-200 text-primary">
                    Pizzas
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Margherita",
                        desc: "Tomate, mozzarella y albahaca",
                        price: "10.95",
                      },
                      {
                        name: "Diavola",
                        desc: "Tomate, mozzarella y salami picante",
                        price: "12.95",
                      },
                      {
                        name: "Quattro Formaggi",
                        desc: "Mozzarella, gorgonzola, parmesano y fontina",
                        price: "13.95",
                      },
                      {
                        name: "Prosciutto e Funghi",
                        desc: "Tomate, mozzarella, jamón y champiñones",
                        price: "14.50",
                      },
                      {
                        name: "Capricciosa",
                        desc: "Tomate, mozzarella, champiñones, alcachofas, aceitunas y jamón",
                        price: "15.95",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex justify-between"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <span className="text-primary font-medium ml-4">
                          €{item.price}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Postres */}
                <div className="mb-8">
                  <h3 className="text-xl font-serif font-bold mb-4 pb-2 border-b border-gray-200 text-primary">
                    Postres
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Tiramisù",
                        desc: "El clásico postre italiano con café y mascarpone",
                        price: "7.50",
                      },
                      {
                        name: "Panna Cotta",
                        desc: "Crema cocida con coulis de frutos rojos",
                        price: "6.95",
                      },
                      {
                        name: "Cannoli Siciliani",
                        desc: "Cannoli rellenos de ricotta y pistachos",
                        price: "7.50",
                      },
                      {
                        name: "Gelato Artigianale",
                        desc: "Selección de helados italianos (3 bolas)",
                        price: "6.50",
                      },
                      {
                        name: "Affogato",
                        desc: "Helado de vainilla con café espresso",
                        price: "5.95",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                        className="flex justify-between"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <span className="text-primary font-medium ml-4">
                          €{item.price}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bebidas */}
              <div className="mt-8">
                <h3 className="text-xl font-serif font-bold mb-4 pb-2 border-b border-gray-200 text-primary">
                  Bebidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vinos */}
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700">Vinos</h4>
                    <ul className="space-y-2">
                      {[
                        { name: "Chianti Classico", price: "28.00" },
                        { name: "Barolo", price: "45.00" },
                        { name: "Pinot Grigio", price: "24.00" },
                        { name: "Prosecco", price: "26.00" },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 + index * 0.05 }}
                          className="flex justify-between text-sm"
                        >
                          <span>{item.name}</span>
                          <span className="text-primary">€{item.price}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Otras bebidas */}
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700">
                      Otras Bebidas
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { name: "Agua mineral", price: "2.50" },
                        { name: "Refrescos", price: "3.00" },
                        { name: "Cerveza italiana", price: "4.50" },
                        { name: "Café espresso", price: "2.00" },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 + index * 0.05 }}
                          className="flex justify-between text-sm"
                        >
                          <span>{item.name}</span>
                          <span className="text-primary">€{item.price}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer del modal */}
            <div className="border-t border-gray-200 p-6 md:p-8 text-center">
              <p className="text-gray-600 mb-4">
                Si tiene alguna alergia o restricción alimentaria, por favor
                infórmenos.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullMenuOpen(false)}
                className={`${buttonClasses.base} ${buttonClasses.primary} px-8 py-2 mx-auto hover:ring-2 hover:ring-primary hover:ring-opacity-50`}
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal de la Galería de Imágenes */}
      {isGalleryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => {
            // Cerrar el modal al hacer clic fuera de él
            if (e.target === e.currentTarget) {
              // Prevent default and stop propagation to prevent "runtime.lastError"
              e.preventDefault();
              e.stopPropagation();
              // Use requestAnimationFrame to defer state update until after event handling is complete
              requestAnimationFrame(() => {
                setIsGalleryOpen(false);
              });
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-dark bg-opacity-80 rounded-xl"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {/* Botón para cerrar */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Use requestAnimationFrame to defer state update
                requestAnimationFrame(() => {
                  setIsGalleryOpen(false);
                });
              }}
              className="absolute top-4 right-4 z-50 text-white hover:text-primary transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Contenido del carrusel */}
            <div className="relative h-[80vh]">
              {/* Imagen actual */}
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center p-4"
              >
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={galleryImages[currentImage].src}
                    alt={galleryImages[currentImage].alt}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  />
                  <div className="absolute bottom-4 left-0 right-0 bg-black bg-opacity-60 text-white p-3 mx-auto max-w-lg text-center rounded-lg">
                    <p className="font-cursive text-xl">
                      {galleryImages[currentImage].caption}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navegación */}
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrentImage((prevImage) =>
                      prevImage === 0 ? galleryImages.length - 1 : prevImage - 1
                    )
                  }
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full shadow-lg transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrentImage((prevImage) =>
                      prevImage === galleryImages.length - 1 ? 0 : prevImage + 1
                    )
                  }
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full shadow-lg transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Indicadores de imagen */}
              <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImage
                        ? "bg-primary scale-125"
                        : "bg-white bg-opacity-50"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Image Modal for menu items */}
      <ImageModal
        isOpen={isModalOpen}
        image={modalImage}
        alt={modalAlt}
        onClose={(e) => {
          // If event object is passed, handle it properly
          if (e) {
            e.preventDefault?.();
            e.stopPropagation?.();
          }
          // Use requestAnimationFrame to defer state update
          requestAnimationFrame(() => {
            setIsModalOpen(false);
          });
        }}
      />
    </div>
  );
}

export default App;
