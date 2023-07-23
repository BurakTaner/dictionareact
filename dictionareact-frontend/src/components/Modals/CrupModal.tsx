import { FormEvent, useState } from "react";
import "./crupModal.css"
import Error from "../Error/Error";

interface Props {
  word: Word | undefined;
  errors: string[];
  createWord: (word:Word) => Promise<void>
  updateWord: (word:Word) => Promise<void>
  closeModal: () => void
}

export default function CreateModal(props: Props) {
  const [dictionaryWord, setDictionaryWord] = useState<Word>({
    name: props.word?.name || "",
    description: props.word?.description ||[""]
  });

  // TODO: Fix this 
  // useEffect(() => {
  //   const close = (e:MouseEvent) => {
  //     if(e.target !== document.querySelector(".modal-create"))
  //     props.closeModal();
  //   }
  //   document.addEventListener("click", close);
  //   return () => document.removeEventListener("click", close);
  // }, []);

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setDictionaryWord(prevDictionaryWord => (
      { ...prevDictionaryWord, [name]: name === "description" ? [value] : value})
    );

  }

  const createSubmit = () => {
    if(!props.word?.name)
    props.createWord(dictionaryWord);
    else
    props.updateWord(dictionaryWord);
  }

  const methodName = props.word?.name ? "Update": "Create";
  return (
    <section className="modal">
      <div className="modal-body">
      <i className="fa-solid fa-xmark close" onClick={props.closeModal}></i>
        <h3>{methodName}</h3>
        {props.errors.length > 0 && <Error errors={props.errors}/>}
        <form onSubmit={createSubmit}>
          <div className="inp-div">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={handleChange} value={dictionaryWord.name} name="name"/>
          </div>
          <div className="inp-div">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={dictionaryWord.description} onChange={handleChange} name="description"/>
          </div>
          <button>{methodName}</button>
        </form>
      </div>
    </section>
  );
}

interface Word {
  name:string;
  description:string[];
}
