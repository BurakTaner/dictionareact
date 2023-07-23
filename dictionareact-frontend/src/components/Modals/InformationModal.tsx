import "./informationModal.css";

interface Props {
  word: Word;
  setToggle: () => void
}

export default function InformationModal(props: Props) {
  return (
    <section className="modal">
      <div className="modal-body inf-div">
        <i className="fa-solid fa-xmark close" onClick={props.setToggle}></i>
        <h3>{props.word.name}</h3>
        <ul className="inf-descriptions">
          {props.word.description.map((des, i) => <li key={i} className="inf-description">{i + 1}. {des}</li>)}
        </ul>
      </div>
    </section>
  );
}

interface Word {
  name: string;
  description: string[];
}
