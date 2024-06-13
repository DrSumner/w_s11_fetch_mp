import React, {useState} from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateDog, setUpdateDog] = useState({ name: '', breed: '', adopted: false })
  const handleUpdate = (boolean) => {setIsUpdate(boolean)}
  const dogUpdate = (dog) => {
    setUpdateDog({
       name: dog.name, breed: dog.breed, adopted: dog.adopted, id: dog.id 
    })
  }

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
        isUpdate={isUpdate} 
        handleUpdate={handleUpdate}
        dogUpdate={dogUpdate}
        />} />
        <Route path="/form" element={<DogForm 
        isUpdate={isUpdate} 
        handleUpdate={handleUpdate}
        updateDog={updateDog}
        setUpdateDog={setUpdateDog}
        />} />
      </Routes>
    </div>
  )
}
