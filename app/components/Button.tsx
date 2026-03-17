
export default function Button({ title, onClick, type, disabled, style }: { title: string; onClick: () => void; type?: "button" | "submit" | "reset"; disabled?: boolean; style?: React.CSSProperties }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
      style={style}
    >
      {title}
    </button>
  );
}