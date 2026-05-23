import { Routes, Route, Link } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Veterinarios from './pages/Veterinarios'
import Mascotas from './pages/Mascotas'
import Citas from './pages/Citas'
import DetalleCita from './pages/DetalleCita'

function App() {
  return (
    <>
      <nav style={styles.nav}>
        <span style={styles.logo}>VetApp</span>
        <Link style={styles.link} to="/">Inicio</Link>
        <Link style={styles.link} to="/veterinarios">Veterinarios</Link>
        <Link style={styles.link} to="/mascotas">Mascotas</Link>
        <Link style={styles.link} to="/citas">Citas</Link>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/veterinarios" element={<Veterinarios />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/citas/:id" element={<DetalleCita />} />
        </Routes>
      </div>
    </>
  )
}

const styles = {
  nav: {
    backgroundColor: '#2c7be5',
    padding: '14px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  logo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '22px',
    marginRight: 'auto',
    letterSpacing: '1px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '6px 14px',
    borderRadius: '6px',
    transition: 'background 0.2s'
  },
  container: {
    padding: '32px',
    maxWidth: '1100px',
    margin: '0 auto'
  }
}