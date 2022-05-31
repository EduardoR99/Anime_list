import { useRef } from "react"

// Função para evitar sobrecarregar a chamada da API
export default function useDebounce(fn, delay) {
    const timeoutRef = useRef(null);

    function debouncedFn(...args){
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
            fn(...args);
        }, delay)
        
    }

    return debouncedFn;
}