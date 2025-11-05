export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : defaultValue;
};

export const saveToStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};
