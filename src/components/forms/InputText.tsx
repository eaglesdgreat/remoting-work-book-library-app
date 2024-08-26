interface IProps {
  type: string;
  name: string | number;
  onChange: () => void;
  required: boolean;
}

export function App(props: IProps) {
  return (
    <div>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
