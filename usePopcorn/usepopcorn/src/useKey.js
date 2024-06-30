import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return function () {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
}
