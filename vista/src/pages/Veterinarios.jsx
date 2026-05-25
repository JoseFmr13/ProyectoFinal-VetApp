import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5041/api/Veterinario'

function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [form, setForm] = useState({ nombre: '', especialidad: '', telefono: '' })
  const [editando, setEditando] = useState(null)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const res = await axios.get(API)
    setVeterinarios(res.data)
  }

  const guardar = async () => {
    if (!form.nombre.trim() || !form.especialidad.trim() || !form.telefono.trim()) {
      alert('Por favor completa todos los campos')
      return
    }
    if (editando) {
      await axios.put(`${API}/${editando}`, form)
      setEditando(null)
    } else {
      await axios.post(API, form)
    }
    setForm({ nombre: '', especialidad: '', telefono: '' })
    cargar()
  }

  const editar = (v) => {
    setForm({ nombre: v.nombre, especialidad: v.especialidad, telefono: v.telefono })
    setEditando(v.id)
  }

  const eliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este veterinario?')) return
    await axios.delete(`${API}/${id}`)
    cargar()
  }

  const veterinariosFiltrados = veterinarios.filter(v =>
    v.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <h2>Veterinarios</h2>

      <div style={styles.form}>
        <input style={styles.input} placeholder="Nombre" value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input style={styles.input} placeholder="Especialidad" value={form.especialidad}
          onChange={e => setForm({ ...form, especialidad: e.target.value })} />
        <input style={styles.input} placeholder="Teléfono" value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })} />
        <button style={styles.btn} onClick={guardar}>
          {editando ? 'Actualizar' : 'Agregar'}
        </button>
        {editando && (
          <button style={styles.btnCancelar} onClick={() => { setEditando(null); setForm({ nombre: '', especialidad: '', telefono: '' }) }}>
            Cancelar
          </button>
        )}
      </div>

      <input
        style={{ ...styles.input, marginBottom: '16px', width: '300px' }}
        placeholder="Buscar por nombre o especialidad..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {veterinariosFiltrados.length === 0 ? (
        <p style={styles.sinRegistros}>No se encontraron veterinarios</p>
      ) : (
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {veterinariosFiltrados.map(v => (
              <tr key={v.id}>
                <td>{v.nombre}</td>
                <td>{v.especialidad}</td>
                <td>{v.telefono}</td>
                <td>
                  <button style={styles.btnEditar} onClick={() => editar(v)}>Editar</button>
                  <button style={styles.btnEliminar} onClick={() => eliminar(v.id)}>Eliminar</button>
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
  form: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  input: { padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
  btn: { padding: '8px 16px', backgroundColor: '#2c7be5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnCancelar: { padding: '8px 16px', backgroundColor: '#aaa', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnEditar: { padding: '6px 12px', backgroundColor: '#f0a500', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '6px' },
  btnEliminar: { padding: '6px 12px', backgroundColor: '#e53935', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  tabla: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  sinRegistros: { color: '#888', textAlign: 'center', marginTop: '20px', fontSize: '16px' }
}

export default Veterinarios