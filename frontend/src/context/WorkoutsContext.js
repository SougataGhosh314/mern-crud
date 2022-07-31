import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      let setWorkouts = action.payload
      if (setWorkouts) {
        setWorkouts.sort((a,b) => a.title.localeCompare(b.title));
      }
      return { 
        workouts: setWorkouts
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [...state.workouts, action.payload]
      }
    case 'UPDATE_WORKOUT':
      let updatedWorkouts = state.workouts
      updatedWorkouts = updatedWorkouts.filter(workout => action.payload._id !== workout._id)
      updatedWorkouts.push(action.payload)
      if (updatedWorkouts) {
        updatedWorkouts.sort((a,b) => a.title.localeCompare(b.title));
      }
      return {
        workouts: updatedWorkouts
      }
    case 'DELETE_WORKOUT':
      return { 
        workouts: state.workouts.filter(w => w._id !== action.payload._id) 
      }
    case "SELECT_WORKOUT":
      return {
        ...state,
        currentWorkout: action.payload
      }
    case "UPDATE_SELECTED":
      return {
        ...state,
        currentWorkout: action.payload
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null,
    currentWorkout: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}