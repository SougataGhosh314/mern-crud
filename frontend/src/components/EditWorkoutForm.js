import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const EditWorkoutForm = () => {
  const { currentWorkout, dispatch } = useWorkoutsContext()

  // console.log("currentWorkout: " + JSON.stringify(currentWorkout))
  const stateFromContext = currentWorkout ? currentWorkout : {title: "", load: "", reps: ""}
  // console.log("stateFromContext: " + JSON.stringify(stateFromContext))

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const updatedWorkout = {title, load, reps}

    const response = await fetch('/api/workouts/' + currentWorkout._id, {
      method: 'PATCH',
      body: JSON.stringify(currentWorkout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      dispatch({type: 'SELECT_WORKOUT', payload: null})
      dispatch({type: 'UPDATE_WORKOUT', payload: stateFromContext})
    }

  }

  return (
    <form className="create"
          onSubmit={handleSubmit}
    >
      <h3>Edit a Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text"
        onChange={(e) => dispatch({type: 'UPDATE_SELECTED', payload: {...stateFromContext, title: e.target.value}})}
        value={stateFromContext.title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => dispatch({type: 'UPDATE_SELECTED', payload: {...stateFromContext, load: e.target.value}})}
        value={stateFromContext.load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => dispatch({type: 'UPDATE_SELECTED', payload: {...stateFromContext, reps: e.target.value}})}
        value={stateFromContext.reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Edit Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EditWorkoutForm