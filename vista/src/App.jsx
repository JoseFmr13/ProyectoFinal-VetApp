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
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  logo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    marginRight: 'auto'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  container: {
    padding: '24px'
  }
}

export default App