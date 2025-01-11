export default function Card({ name, id, imageUrl, handleChange }) {
  return (
    <div className="pokemon-card" key={id} onClick={handleChange}>
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
    </div>
  );
}
