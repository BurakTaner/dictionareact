import { useState } from "react";
import "./dictionary.css";
import InformationModal from "../Modals/InformationModal";

interface Props {
  words: Word[];
  deleteWord: (name: string) => Promise<void>
  updateModalOpen: (name: string) => Promise<void>
}

export default function Dictionary(props: Props) {
  const [toggleInformation, setToggleInformation] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word>({ name: "", description: [""] });

  const toggleModal = async (name: string): Promise<void> => {
    const word: Word | undefined = props.words.find(word => word.name === name);
    if (!word) {
      const response = await fetch(`http://localhost:3000/getWord/${name}`, {
        method: "GET",
        mode: "cors"
      });
      if (response.status === 200)
        setSelectedWord(await response.json());
    }
    else {
      setSelectedWord(word);
    }
    setToggleInformation(true);
  }

  const setToggle = () => setToggleInformation(false);

  return (
    <section className="word-sec">
      <ul className="words">
        {
          props.words.map((word, i) =>
            <li key={i}>
              <h2>{word.name}</h2>
              {/* TODO: Display all descriptions, not just once */}
              <article className="description-art">{word.description[0]}</article>
              <div className="tools">
                <i className="fa-solid fa-trash-can" onClick={() => props.deleteWord(word.name)}></i>
                <i className="fa-solid fa-magnifying-glass" onClick={() => toggleModal(word.name)}></i>
                <i className="fa-solid fa-pencil" onClick={() => props.updateModalOpen(word.name)}></i>
              </div>
            </li>
          )
        }
      </ul>
      {toggleInformation && <InformationModal word={selectedWord} setToggle={setToggle} />}
    </section>
  );
}

interface Word {
  name: string;
  description: string[];
}
