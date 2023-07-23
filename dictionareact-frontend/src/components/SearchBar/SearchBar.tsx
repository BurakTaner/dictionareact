import { FormEvent, useEffect, useState } from "react";
import "./searchbar.css"

export default function SearchBar(props: Props) {
  const [word, setWord] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      async function getWords() {
        await props.fetchWords(word);
      }
      getWords();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [word]);

  const changeWord = (event: FormEvent) => {
    const { value } = event.target as HTMLInputElement;
    setWord(value);
  }
  return (
    <section className="search-sec">
      <h1>Search for a word</h1>
      <input type="text" value={word} onChange={changeWord} className="search"/>
    </section>
  );
}

interface Props {
  fetchWords: (word: string) => Promise<void>
}
