function NewList({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row text-white gap-4 text-lg mb-2 bg-gray-500/50 h-18 rounded-xl w-64 p-4 cursor-pointer hover:bg-gray-500/60 transition-colors duration-300 ease-in-out shadow-lg hover:scale-105"
    >
      <svg viewBox="0 0 448 512" fill="white" height="24px" width="24px">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
      </svg>
      New List
    </div>
  );
}

export default NewList;
