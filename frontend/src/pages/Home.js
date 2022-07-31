import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import AddWorkoutForm from "../components/AddWorkoutForm"
import EditWorkoutForm from "../components/EditWorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <AddWorkoutForm />
            </td>
          </tr>
          <tr>
            <td>
              <EditWorkoutForm />
            </td>
          </tr>
        </tbody>
      </table>
      {/*<AddWorkoutForm />*/}
    </div>
  )
}

export default Home