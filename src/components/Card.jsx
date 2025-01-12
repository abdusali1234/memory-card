export default function Card({ name, id, imageUrl, handleChange }) {
  return (
    <div className="pokemon-card" key={id} onClick={handleChange}>
      <span>{name}</span>
      <img src={imageUrl} alt={name} />
    </div>
  );
}
