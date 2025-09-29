import { useState } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
    >

     <div className="relative inline-block group">
  <button className="px-4 py-2 bg-blue-600 text-white rounded">Menu</button>

  <div className="absolute left-0 mt-1 w-48 bg-white shadow rounded border invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150">
    <ul>
      <li className="px-4 py-2 hover:bg-gray-100">One</li>
      <li className="px-4 py-2 hover:bg-gray-100">Two</li>
    </ul>
  </div>
</div>

    </div>
  );
}
