import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5041/api/Mascota'

function Mascotas() {
  const [mascotas, setMascotas] = useState([])
  const [form, setForm] = useState({ nombre: '', especie: '', raza: '', nombreDueno: '' })
  const [editando, setEditando] = useState(null)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const res = await axios.get(API)
    setMascotas(res.data)
  }

  const guardar = async () => {
  if (!form.nombre.trim() || !form.especie.trim() || !form.raza.trim() || !form.nombreDueno.trim()) {
    alert('Por favor completa todos los campos')
    return
  }
  if (editando) {
    await axios.put(`${API}/${editando}`, form)
    setEditando(null)
  } else {
    await axios.post(API, form)
  }
  setForm({ nombre: '', especie: '', raza: '', nombreDueno: '' })
  cargar()
}

  const editar = (m) => {
    setForm({ nombre: m.nombre, especie: m.especie, raza: m.raza, nombreDueno: m.nombreDueno })
    setEditando(m.id)
  }

const eliminar = async (id) => {
  if (!window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) return
  await axios.delete(`${API}/${id}`)
  cargar()
}

  return (
    <div>
      <h2>Mascotas</h2>

      <div style={styles.form}>
        <input style={styles.input} placeholder="Nombre" value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input style={styles.input} placeholder="Especie" value={form.especie}
          onChange={e => setForm({ ...form, especie: e.target.value })} />
        <input style={styles.input} placeholder="Raza" value={form.raza}
          onChange={e => setForm({ ...form, raza: e.target.value })} />
        <input style={styles.input} placeholder="Nombre del dueño" value={form.nombreDueno}
          onChange={e => setForm({ ...form, nombreDueno: e.target.value })} />
        <button style={styles.btn} onClick={guardar}>
          {editando ? 'Actualizar' : 'Agregar'}
        </button>
        {editando && (
          <button style={styles.btnCancelar} onClick={() => { setEditando(null); setForm({ nombre: '', especie: '', raza: '', nombreDueno: '' }) }}>
            Cancelar
          </button>
        )}
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Dueño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map(m => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.especie}</td>
              <td>{m.raza}</td>
              <td>{m.nombreDueno}</td>
              <td>
                <button style={styles.btnEditar} onClick={() => editar(m)}>Editar</button>
                <button style={styles.btnEliminar} onClick={() => eliminar(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  tabla: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' }
}

export default Mascotas
