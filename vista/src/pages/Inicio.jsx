import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5041/api'

function Inicio() {
  const [totales, setTotales] = useState({ veterinarios: 0, mascotas: 0, citas: 0 })

  useEffect(() => {
    const cargarTotales = async () => {
      const [v, m, c] = await Promise.all([
        axios.get(`${API}/Veterinario/total`),
        axios.get(`${API}/Mascota/total`),
        axios.get(`${API}/Cita/total`)
      ])
      setTotales({ veterinarios: v.data.total, mascotas: m.data.total, citas: c.data.total })
    }
    cargarTotales()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Bienvenido a VetApp</h1>
      <p style={styles.subtitle}>Sistema de gestión de citas veterinarias</p>

      <div style={styles.cards}>
        <Link to="/veterinarios" style={styles.card}>
          <h2 style={styles.cardTitulo}>Veterinarios</h2>
          <p style={styles.cardNumero}>{totales.veterinarios}</p>
          <p style={styles.cardTexto}>registrados</p>
        </Link>
        <Link to="/mascotas" style={styles.card}>
          <h2 style={styles.cardTitulo}>Mascotas</h2>
          <p style={styles.cardNumero}>{totales.mascotas}</p>
          <p style={styles.cardTexto}>registradas</p>
        </Link>
        <Link to="/citas" style={styles.card}>
          <h2 style={styles.cardTitulo}>Citas</h2>
          <p style={styles.cardNumero}>{totales.citas}</p>
          <p style={styles.cardTexto}>agendadas</p>
        </Link>
      </div>
    </div>
  )
}

const styles = {
  container: { textAlign: 'center', marginTop: '60px' },
  titulo: { fontSize: '32px', color: '#2c7be5', marginBottom: '10px' },
  subtitle: { color: '#666', fontSize: '18px', marginBottom: '40px' },
  cards: { display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '32px 40px', width: '200px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textDecoration: 'none', color: '#333', transition: 'transform 0.2s' },
  cardTitulo: { color: '#2c7be5', marginBottom: '12px', fontSize: '18px' },
  cardNumero: { fontSize: '48px', fontWeight: 'bold', color: '#2c7be5' },
  cardTexto: { color: '#888', fontSize: '14px', marginTop: '4px' }
}

export default Inicio