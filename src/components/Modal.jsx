export default function Modal({ message, handleChange }) {
  return (
    <>
      <dialog id="game-over-dialog">
        <h1>{message}</h1>
        <button onClick={handleChange}>Reset</button>
      </dialog>
    </>
  );
}
