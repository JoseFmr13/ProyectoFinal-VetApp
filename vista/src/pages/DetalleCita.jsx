import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5041/api/Cita'

function DetalleCita() {
  const { id } = useParams()
  const [cita, setCita] = useState(null)

  useEffect(() => {
    axios.get(`${API}/${id}`).then(res => setCita(res.data))
  }, [id])

  if (!cita) return <p style={{ padding: '24px' }}>Cargando...</p>

  return (
    <div style={styles.container}>
      <h2>Detalle de Cita</h2>

      <div style={styles.card}>
        <div style={styles.seccion}>
          <h3 style={styles.seccionTitulo}>Informacion de la Cita</h3>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Fecha</span>
            <span>{cita.fecha.slice(0, 10)}</span>
          </div>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Motivo</span>
            <span>{cita.motivo}</span>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.seccion}>
          <h3 style={styles.seccionTitulo}>Veterinario</h3>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Nombre</span>
            <span>{cita.veterinario?.nombre}</span>
          </div>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Especialidad</span>
            <span>{cita.veterinario?.especialidad}</span>
          </div>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Telefono</span>
            <span>{cita.veterinario?.telefono}</span>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.seccion}>
          <h3 style={styles.seccionTitulo}>Mascota</h3>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Nombre</span>
            <span>{cita.mascota?.nombre}</span>
          </div>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Especie</span>
            <span>{cita.mascota?.especie}</span>
          </div>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Raza</span>
            <span>{cita.mascota?.raza}</span>
          </div>
          <div style={styles.fila}>
            <span style={styles.etiqueta}>Dueno</span>
            <span>{cita.mascota?.nombreDueno}</span>
          </div>
        </div>
      </div>

      <Link style={styles.btn} to="/citas">Volver a Citas</Link>
    </div>
  )
}

const styles = {
  container: { maxWidth: '560px', margin: '0 auto' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  seccion: { marginBottom: '8px' },
  seccionTitulo: { color: '#2c7be5', marginBottom: '12px', fontSize: '16px' },
  fila: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  etiqueta: { fontWeight: 'bold', color: '#666' },
  divider: { border: 'none', borderTop: '2px solid #f0f4ff', margin: '16px 0' },
  btn: { display: 'inline-block', padding: '10px 20px', backgroundColor: '#2c7be5', color: 'white', borderRadius: '6px', textDecoration: 'none' }
}

export default DetalleCita