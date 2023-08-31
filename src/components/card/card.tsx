import { useFoodDataRemove } from "../../hooks/useFoodDataRemove"
import "./card.css"

interface CardProps{
    id?: number,
    price: number,
    title : string,
    image : string

}

export function Card({id, price, title, image} : CardProps){

    const remove = useFoodDataRemove();

    const handleRemove = (id: number | undefined) => {
        remove.mutate(id);
    };

    return(
        <div className="card">
            
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor: </b>{price}</p>

            <div>

                <button>Editar</button>
                <button onClick={() => handleRemove(id)}>Remover</button>
                
            </div>
            
        </div>
    )
}