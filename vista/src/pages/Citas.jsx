import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5041/api/Cita'
const API_VETS = 'http://localhost:5041/api/Veterinario'
const API_MASCOTAS = 'http://localhost:5041/api/Mascota'

function Citas() {
  const [citas, setCitas] = useState([])
  const [veterinarios, setVeterinarios] = useState([])
  const [mascotas, setMascotas] = useState([])
  const [form, setForm] = useState({ fecha: '', motivo: '', veterinarioId: '', mascotaId: '' })
  const [editando, setEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [busquedaVet, setBusquedaVet] = useState('')
  const [busquedaMascota, setBusquedaMascota] = useState('')
  const [vetSeleccionado, setVetSeleccionado] = useState(null)
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const [c, v, m] = await Promise.all([
      axios.get(API),
      axios.get(API_VETS),
      axios.get(API_MASCOTAS)
    ])
    setCitas(c.data)
    setVeterinarios(v.data)
    setMascotas(m.data)
  }

  const guardar = async () => {
    if (!form.fecha || !form.motivo || !form.veterinarioId || !form.mascotaId) {
      alert('Por favor completa todos los campos')
      return
    }
    if (editando) {
      await axios.put(`${API}/${editando}`, form)
      setEditando(null)
    } else {
      await axios.post(API, form)
    }
    setForm({ fecha: '', motivo: '', veterinarioId: '', mascotaId: '' })
    setBusquedaVet('')
    setBusquedaMascota('')
    setVetSeleccionado(null)
    setMascotaSeleccionada(null)
    cargar()
  }

  const editar = (c) => {
    const vet = veterinarios.find(v => v.id === c.veterinarioId)
    const mascota = mascotas.find(m => m.id === c.mascotaId)
    setForm({ fecha: c.fecha.slice(0, 10), motivo: c.motivo, veterinarioId: c.veterinarioId, mascotaId: c.mascotaId })
    setBusquedaVet(vet?.nombre || '')
    setBusquedaMascota(mascota?.nombre || '')
    setVetSeleccionado(vet)
    setMascotaSeleccionada(mascota)
    setEditando(c.id)
  }

  const eliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  const vetsFiltrados = veterinarios.filter(v =>
    v.nombre.toLowerCase().includes(busquedaVet.toLowerCase()) && busquedaVet !== ''
  )

  const mascotasFiltradas = mascotas.filter(m =>
    m.nombre.toLowerCase().includes(busquedaMascota.toLowerCase()) && busquedaMascota !== ''
  )

  const citasFiltradas = citas.filter(c =>
    c.motivo.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.veterinario?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.mascota?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const seleccionarVet = (v) => {
    setVetSeleccionado(v)
    setForm({ ...form, veterinarioId: v.id })
    setBusquedaVet(v.nombre)
  }

  const seleccionarMascota = (m) => {
    setMascotaSeleccionada(m)
    setForm({ ...form, mascotaId: m.id })
    setBusquedaMascota(m.nombre)
  }

  return (
    <div>
      <h2>Citas</h2>

      <div style={styles.form}>
        <input style={styles.input} type="date" value={form.fecha}
          onChange={e => setForm({ ...form, fecha: e.target.value })} />

        <input style={styles.input} placeholder="Motivo" value={form.motivo}
          onChange={e => setForm({ ...form, motivo: e.target.value })} />

        <div style={styles.buscadorContainer}>
          <input
            style={styles.input}
            placeholder="Buscar veterinario..."
            value={busquedaVet}
            onChange={e => {
              setBusquedaVet(e.target.value)
              setVetSeleccionado(null)
              setForm({ ...form, veterinarioId: '' })
            }}
          />
          {vetsFiltrados.length > 0 && !vetSeleccionado && (
            <div style={styles.dropdown}>
              {vetsFiltrados.map(v => (
                <div key={v.id} style={styles.dropdownItem} onClick={() => seleccionarVet(v)}>
                  {v.nombre} — {v.especialidad}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.buscadorContainer}>
          <input
            style={styles.input}
            placeholder="Buscar mascota..."
            value={busquedaMascota}
            onChange={e => {
              setBusquedaMascota(e.target.value)
              setMascotaSeleccionada(null)
              setForm({ ...form, mascotaId: '' })
            }}
          />
          {mascotasFiltradas.length > 0 && !mascotaSeleccionada && (
            <div style={styles.dropdown}>
              {mascotasFiltradas.map(m => (
                <div key={m.id} style={styles.dropdownItem} onClick={() => seleccionarMascota(m)}>
                  {m.nombre} — {m.especie}
                </div>
              ))}
            </div>
          )}
        </div>

        <button style={styles.btn} onClick={guardar}>
          {editando ? 'Actualizar' : 'Agregar'}
        </button>
        {editando && (
          <button style={styles.btnCancelar} onClick={() => {
            setEditando(null)
            setForm({ fecha: '', motivo: '', veterinarioId: '', mascotaId: '' })
            setBusquedaVet('')
            setBusquedaMascota('')
            setVetSeleccionado(null)
            setMascotaSeleccionada(null)
          }}>
            Cancelar
          </button>
        )}
      </div>

      <input
        style={{ ...styles.input, marginBottom: '16px', width: '300px' }}
        placeholder="Buscar por motivo, veterinario o mascota..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {citasFiltradas.length === 0 ? (
        <p style={styles.sinRegistros}>No se encontraron citas</p>
      ) : (
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Motivo</th>
              <th>Veterinario</th>
              <th>Mascota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map(c => (
              <tr key={c.id}>
                <td>{c.fecha.slice(0, 10)}</td>
                <td>{c.motivo}</td>
                <td>{c.veterinario?.nombre}</td>
                <td>{c.mascota?.nombre}</td>
                <td>
                  <Link style={styles.btnVer} to={`/citas/${c.id}`}>Ver</Link>
                  <button style={styles.btnEditar} onClick={() => editar(c)}>Editar</button>
                  <button style={styles.btnEliminar} onClick={() => eliminar(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'flex-start' },
  input: { padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
  btn: { padding: '8px 16px', backgroundColor: '#2c7be5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnCancelar: { padding: '8px 16px', backgroundColor: '#aaa', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnVer: { padding: '6px 12px', backgroundColor: '#2c7be5', color: 'white', borderRadius: '6px', marginRight: '6px', textDecoration: 'none' },
  btnEditar: { padding: '6px 12px', backgroundColor: '#f0a500', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '6px' },
  btnEliminar: { padding: '6px 12px', backgroundColor: '#e53935', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  tabla: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  sinRegistros: { color: '#888', textAlign: 'center', marginTop: '20px', fontSize: '16px' },
  buscadorContainer: { position: 'relative' },
  dropdown: { position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '6px', zIndex: 100, minWidth: '220px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  dropdownItem: { padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '14px' }
}

export default Citas