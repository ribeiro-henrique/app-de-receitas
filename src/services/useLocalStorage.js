import { useState } from 'react';

// Copyleft https://usehooks.com/useLocalStorage
export function useLocalStorage(key, initialValue) {
  // State para armazenar o valor
  // Passa a função de estado inicial para useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState(() => {
    // Se o window não estiver definido (por exemplo, em um ambiente de servidor), retorna o valor inicial
    /* if (typeof window === 'undefined') {
      return initialValue;
    } */
    try {
      // Obtém do armazenamento local pelo chave
      const item = window.localStorage.getItem(key);
      // Analisa o JSON armazenado ou, se não houver, retorna o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro, também retorna o valor inicial
      console.log(error);
      return initialValue;
    }
  });

  // Retorna uma versão encapsulada da função setter do useState que ...
  // ... persiste o novo valor no armazenamento local.
  const setValue = (value) => {
    try {
      // Permite que o valor seja uma função para termos a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva o estado
      setStoredValue(valueToStore);
      // Salva no armazenamento local
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Uma implementação mais avançada lidaria com o caso de erro
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
