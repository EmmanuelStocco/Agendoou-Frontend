import { useState } from 'react';

const colorOptions = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FFFF33', // Yellow
  '#FF33FF', // Purple
  '#33FFFF', // Cyan
  '#FF5733', // Orange
  '#FFFF00', // Gold
];
type ColorPickerProps = {
  handleSelectColorFather: (color: string) => void;
};
export function ColorPicker({ handleSelectColorFather }: ColorPickerProps) {
  const [themeColor, setThemeColor] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectColor = (color: string) => {
    setThemeColor(color);
    setIsCustom(false);
    setIsOpen(false); 
    handleSelectColorFather(color);
  };

  const handleInputColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCustom) {
      setThemeColor(customColor);
    }
    alert(`Cor selecionada: ${themeColor}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-medium mb-2">Escolha a cor do tema</label>
        
        <div className="mb-4 relative">
          {/* Simulando um select */}
          <div
            className="w-full border p-2 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {themeColor ? (
              <div style={{ backgroundColor: themeColor, width: '100%', height: '20px' }}></div>
            ) : (
              <span>Selecione uma cor</span>
            )}
          </div>

          {isOpen && (
            <div className="absolute w-full mt-2 border bg-white rounded shadow-lg">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSelectColor(color)}
                >
                  {color}
                </div>
              ))}
              <div
                className="p-2 cursor-pointer border-t"
                onClick={() => setIsCustom(true)}
              >
                Outro (Digite sua cor)
              </div>
            </div>
          )}
        </div>

        {isCustom && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Digite o código hex (ex: #FF5733)"
              value={customColor}
              onChange={handleInputColor}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {/* <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Confirmar Cor
        </button> */}
      </form>

      {/* Mostrar a cor selecionada */}
      {themeColor && (
        <div className="mt-4">
          <p>Cor selecionada: <span style={{ color: themeColor }}>{themeColor}</span></p>
        </div>
      )}
    </div>
  );
}
