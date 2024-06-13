import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm({isUpdate, handleUpdate, updateDog, setUpdateDog}) {
  const [values, setValues] = useState(updateDog)
  const [breeds, setBreeds] = useState([])
  const link = 'http://localhost:3003/api/dogs'
  const navigate = useNavigate()
  
  useEffect(() => {
    const getBreeds = async () =>{
      try{

        const res = await fetch('http://localhost:3003/api/dogs/breeds')
        if(!res.ok){
          throw new Error(`Uh that didn't work: ${res.status}`)
         }
         const data = await res.json()
          setBreeds(data)
         console.log(data)
      }catch(err){
        console.log(err)
      }
    }
    getBreeds()
    
  }, [])

const onSubmit = async (event) => {
    event.preventDefault()
    if(isUpdate) {
      try {
      const res = await fetch(`${link}/${values.id}`, {
        method:"PUT",
        headers:{
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          breed: values.breed,
          adopted: values.adopted
        })
      }); if(!res.ok){ throw new Error(res.status)} onReset(); navigate('/')
    } catch(err){
      console.log(err)
    }}
    else 
    try {
      const res = await fetch(link, {
        method: "POST",
        headers:{
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          breed: values.breed,
          adopted: values.adopted
        })
      }); if(!res.ok){ throw new Error(res.status)} onReset(); navigate('/')
    } catch(err){
      console.log(err)
    }
  }
  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    }); console.log(updateDog)
  }
  const onReset = () => {
    handleUpdate(false)
    setValues(initialForm)
    setUpdateDog(initialForm)
  }
  return (
    <div>
      <h2>
      { !isUpdate? 'Create Dog' : 'Update Dog'}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {/* Populate this dropdown using data obtained from the API */}
          {breeds.map( (breed, id) => (
            <option key={id} value={breed}>{breed}</option>
          ))}
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            { !isUpdate? 'Create Dog' : 'Update Dog'}
          </button>
          <button aria-label="Reset form" onClick={onReset} >Reset</button>
        </div>
      </form>
    </div>
  )
}
