import { useState } from "react";
import { useFoodDataRemove } from "../../hooks/useFoodDataRemove"
import "./card.css"
import { CreateModalEdit } from "../form/form-edit"

interface CardProps{
    id?: number,
    price: number,
    title : string,
    image : string

}

export function Card({id, price, title, image} : CardProps){

    const [isModalOpen, setIsModalOpen]= useState(false);
    const remove = useFoodDataRemove();

    const handleRemove = (id: number | undefined) => {
        remove.mutate(id);
    };

    const handleOpenModalEdit = () =>{
        setIsModalOpen(prev => !prev);
      }

    return(
        <div className="card">
            
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor: </b>{price}</p>

            <div>

                {isModalOpen && <CreateModalEdit closeModal={handleOpenModalEdit} id={id}/>}
                <button onClick={handleOpenModalEdit}>Editar</button>
                <button onClick={() => handleRemove(id)}>Remover</button>
                
            </div>
            
        </div>
    )
}