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

  if (!cita) return <p>Cargando...</p>

  return (
    <div style={styles.container}>
      <h2>📋 Detalle de Cita</h2>
      <div style={styles.card}>
        <p><strong>📅 Fecha:</strong> {cita.fecha.slice(0, 10)}</p>
        <p><strong>📝 Motivo:</strong> {cita.motivo}</p>
        <p><strong>👨‍⚕️ Veterinario:</strong> {cita.veterinario?.nombre}</p>
        <p><strong>🔬 Especialidad:</strong> {cita.veterinario?.especialidad}</p>
        <p><strong>📞 Teléfono:</strong> {cita.veterinario?.telefono}</p>
        <hr />
        <p><strong>🐶 Mascota:</strong> {cita.mascota?.nombre}</p>
        <p><strong>🐾 Especie:</strong> {cita.mascota?.especie}</p>
        <p><strong>🦴 Raza:</strong> {cita.mascota?.raza}</p>
        <p><strong>👤 Dueño:</strong> {cita.mascota?.nombreDueno}</p>
      </div>
      <Link style={styles.btn} to="/citas">← Volver a Citas</Link>
    </div>
  )
}

const styles = {
  container: { maxWidth: '500px', margin: '0 auto' },
  card: { backgroundColor: '#f0f4ff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  btn: { padding: '10px 20px', backgroundColor: '#2c7be5', color: 'white', borderRadius: '6px', textDecoration: 'none' }
}

export default DetalleCita