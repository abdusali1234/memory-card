export default function Modal({ message, handleChange }) {
  return (
    <>
      <dialog id="game-over-dialog">
        <div>
          <h1>{message}</h1>
          <button onClick={handleChange}>Reset</button>
        </div>
      </dialog>
    </>
  );
}
