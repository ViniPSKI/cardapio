import { useEffect, useState } from "react"
import { FoodData } from "../../interface/FoodData";
import { useFoodDataId } from '../../hooks/useFoodDataId';
import "./form-edit.css"
import { useFoodDataEdit } from "../../hooks/useFoodDataEdit";

interface InputProps{
    label: string,
    value : string | number,
    updateValue(value: any): void,

}

const Input = ({label,value, updateValue}: InputProps) =>{
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)} />
        </>
    )
}

interface ModalProps {
    closeModal(): void,
    id: number
}

export function CreateModalEdit({closeModal, id}: ModalProps){

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const {mutate, isSuccess} = useFoodDataEdit();
    const { data }  = useFoodDataId(id);

    const submit = () => {
        const foodData: FoodData = {
            title,
            price, 
            image
        };
        const idEditar = id;
        mutate({id: idEditar, data: foodData});
    }

    useEffect(()=>{
        if(!isSuccess) return
        closeModal()
    }, [isSuccess]);

    useEffect(() => {
        if (data) {
            setTitle(data[0].title);
            setPrice(data[0].price);
            setImage(data[0].image);
        }
    }, [data]);

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Editar o Produto</h2>
                <form className="input-container">
                    <Input label="Nome" value={title} updateValue={setTitle} />
                    <Input label="Preço" value={price} updateValue={setPrice} />
                    <Input label="Imagem" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">Editar Produto</button>
                <button onClick={closeModal} className="btn-secondary">Cancelar Edição</button>
            </div>
        </div>
    )
}