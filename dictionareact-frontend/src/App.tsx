import { useState } from 'react'
import './app.css'
import SearchBar from './components/SearchBar/SearchBar'
import Dictionary from './components/Dictionary/Dictionary';
import CrupModal from './components/Modals/CrupModal';

export default function App() {
  const wordsArr: Word[] = [];
  const [words, setWords] = useState(wordsArr);
  const [toggleModal, setToggleModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedWord, setSelectedWord] = useState<Word>({ name: "", description: [""] });

  const fetchDictionary = async (name: string) => {
    if (name) {
      const response = await fetch(`http://localhost:3000/getWords/${name}`, {
        method: "GET",
        mode: "cors"
      });
      if (response.status === 200)
        setWords(await response.json());
    }
    else
      setWords([]);

  };

  const toggleCrupModal = () => setToggleModal(prevStatus => !prevStatus);

  const createWord = async (word: Word) => {
    const response = await fetch("http://localhost:3000/createWord", {
      method: "POST",
      body: JSON.stringify(word),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 201) {
      setWords(prevWords => [...prevWords, word]);
      setErrors([]);
      setToggleModal(false);
    }
    else
      setErrors(await response.json());
  }

  const deleteWord = async (name: string) => {
    const response = await fetch("http://localhost:3000/deleteWord", {
      method: "POST",
      body: JSON.stringify({ name }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 204)
      setWords(prevWords => prevWords.filter(a => a.name !== name));
  }

  const updateWord = async (updatedWord: Word) => {
    const response = await fetch("http://localhost:3000/updateWord", {
      method: "POST",
      body: JSON.stringify(updatedWord),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status === 204)
      setWords(prevWords => {
        prevWords = prevWords.map(word => {
          if (word.name === updatedWord.name) {
            word = { ...updatedWord }
            return word;
          }
          return word;
        });
        return prevWords;
      });
  }

  const updateModalOpen = async (name: string) => {
    const word = words.find(w => w.name === name);
    if (word) {
      setSelectedWord(word);
      setToggleModal(true);
    }
    else {
      const response = await fetch(`http://localhost:3000/getWord/${name}`, 
        {
          method: "GET",
          mode: "cors"
        }
      );
      setSelectedWord(await response.json());
    }
  }

  return (
    <>
      <button className="create-btn" onClick={toggleCrupModal}>Create</button>
      <SearchBar fetchWords={fetchDictionary} />
      <Dictionary words={words} deleteWord={deleteWord} updateModalOpen={updateModalOpen} />
      {toggleModal && <CrupModal
        createWord={createWord}
        errors={errors}
        closeModal={toggleCrupModal}
        updateWord={updateWord}
        word={selectedWord}
      />
      }
    </>
  )
}

interface Word {
  name: string;
  description: string[];
}
