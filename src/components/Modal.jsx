export default function Modal({ message, handleChange }) {
  return (
    <>
      <dialog id="gameOverDialog">
        <h1>{message}</h1>
        <button onClick={handleChange}>Reset</button>
      </dialog>
    </>
  );
}
