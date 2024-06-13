import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function DogsList({isUpdate, handleUpdate, dogUpdate}) {
const [dogs, setDogs] = useState([])
const [refresh, setRefresh] = useState(false)
const navigate = useNavigate()
const link = 'http://localhost:3003/api/dogs'

useEffect(() => {
const getDogs = async () => {
try{
 const res = await fetch(link)
 if(!res.ok){
  throw new Error(`Uh that didn't work: ${res.status}`)
 }
 const data = await res.json()
  setDogs(data)
 console.log(data)
} catch (err){
  console.log(err)
}
}
getDogs()
}, [refresh])

const edit = (dog) => {
  navigate('/form')
  handleUpdate(true)
  dogUpdate(dog)

}

const onDelete = async (id) => {
  
  console.log(id)
  try{
    const res = await fetch(`${link}/${id}`, 
      {
        method: "DELETE"
      }); if (!res.ok){ throw new Error(res.status)} setRefresh(!refresh)
  } catch(err){
    console.log(err)
  }
}

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
          {dogs?.map(dog => (
            <li key={dog.id}>
              {`${dog.name}, ${dog.breed}, 
              ${dog.adopted 
              ? 'adopted' : 'NOT adopted'}` 
          }
          <div>
            <button onClick={() => edit(dog)} >Edit</button>
            <button onClick={() => onDelete(dog.id)} >Delete</button>
          </div>
          </li>
          ))}
          
      </ul>
    </div>
  )
}
