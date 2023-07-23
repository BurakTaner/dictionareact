export default function Error(props:Props) {
  return (
    <ol className="errors">{props.errors.map((err, i) => <li className="error" key={i}>{err}</li>)}</ol>
  );
}
interface Props {
  errors:string[]
}
