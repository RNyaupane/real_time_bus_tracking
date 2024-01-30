class LocalStorageManager {
    // Method to get a value from localStorage
    static getValue(key) {
      try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
      } catch (error) {
        console.error(`Error getting value for key ${key}:`, error);
        return null;
      }
    }
  
    // Method to set a value in localStorage
    static setValue(key, value) {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error setting value for key ${key}:`, error);
      }
    }
  
    // Method to remove a key-value pair from localStorage
    static removeKey(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing key ${key} from localStorage:`, error);
      }
    }
  }

  export {LocalStorageManager};
  