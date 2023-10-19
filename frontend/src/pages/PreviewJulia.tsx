export default function PreviewJulia(props: {
  png: string | null;
}): JSX.Element {
  const png = props.png;

  return (
    <div className="julia">{png && <img alt="julia_set" src={png} />}</div>
  );
}
