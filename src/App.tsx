import './App.css'
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal';
import { useFoodDataRemoveAll } from './hooks/useFoodDataRemoveAll';

function App() {
  const { data }  = useFoodData();
  const [isModalOpen, setIsModalOpen]= useState(false);
  const remove = useFoodDataRemoveAll();

  const handleOpenModal = () =>{
    setIsModalOpen(prev => !prev);
  }

  const removeAll = () =>{
    remove.mutate();
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData =>
           <Card 
           id={foodData.id}
           price={foodData.price} 
           title={foodData.title} 
           image={foodData.image} 
           />
           )}  
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal} className="bt-novo">Novo</button>
      <button onClick={() => removeAll} className="bt-removerTodos">Remover todos</button> 
    </div>
  )
}

export default App
