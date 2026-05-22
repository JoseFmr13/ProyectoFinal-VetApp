import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Bienvenido a VetApp</h1>
      <p style={styles.subtitle}>Sistema de gestión de citas veterinarias</p>

      <div style={styles.cards}>
        <Link to="/veterinarios" style={styles.card}>
          <h2 style={styles.cardTitulo}>Veterinarios</h2>
          <p>Gestiona el catálogo de veterinarios</p>
        </Link>
        <Link to="/mascotas" style={styles.card}>
          <h2 style={styles.cardTitulo}>Mascotas</h2>
          <p>Registra y administra mascotas</p>
        </Link>
        <Link to="/citas" style={styles.card}>
          <h2 style={styles.cardTitulo}>Citas</h2>
          <p>Agenda y consulta citas médicas</p>
        </Link>
      </div>
    </div>
  )
}

const styles = {
  container: { textAlign: 'center', marginTop: '40px' },
  titulo: { fontSize: '32px', color: '#2c7be5' },
  subtitle: { color: '#666', fontSize: '18px' },
  cards: { display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '40px', flexWrap: 'wrap' },
  card: { backgroundColor: '#f0f4ff', borderRadius: '12px', padding: '24px', width: '200px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textDecoration: 'none', color: '#333', cursor: 'pointer' },
  cardTitulo: { color: '#2c7be5' }
}

export default Inicio