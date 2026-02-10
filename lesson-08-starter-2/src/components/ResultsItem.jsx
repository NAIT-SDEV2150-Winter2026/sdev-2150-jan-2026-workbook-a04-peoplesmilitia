// src/components/ResultsItem.jsx
export function ResultsItem({ title, category, summary, location, isVirtual, isSelected, children }) {
    
  const itemStyles = isSelected
    ? "w-full text-left bg-blue-600 text-white px-4 py-3" 
    : "w-full text-left px-4 py-3 text-gray-900 hover:bg-gray-50";

  const subTextStyles = isSelected ? "text-blue-100" : "text-gray-500";

  return (
    <li className={itemStyles}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {children} 
          <small className={`text-xs ${subTextStyles}`}>{category}</small>
        </div>
      </div>
      <p className={`mt-1 text-xs ${subTextStyles}`}>{summary}</p>
      
      {isVirtual && (
        <span className={`mt-1 block text-[10px] font-bold uppercase ${isSelected ? 'text-blue-200' : 'text-blue-600'}`}>
          💻 Virtual Available
        </span>
      )}

      <small className={`mt-1 block text-xs ${subTextStyles}`}>{location}</small>
    </li>
  );
}