import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { currentWorkout, dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

    const handleSelect = (selectedWorkout) => {
        dispatch({type: 'SELECT_WORKOUT', payload: selectedWorkout})
    }

  let classNameForDiv = "workout-details";
  if (currentWorkout && currentWorkout._id === workout._id) {
      classNameForDiv += " selected"
  }

  return (
    <div
        className={classNameForDiv}
        onClick={() => handleSelect(workout)} >
      <h4>{workout.title && workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load && workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps && workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails