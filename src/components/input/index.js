import React, { useState } from "react";
import  useDebounce  from "./useDebounce";
import './style.css'

export const SearchInput = ({ value, onChange }) => {
    const [displayValue, setDisplayValue] = useState(value)
    const debouncedChange = useDebounce(onChange, 500)

    const handleChange = (event) => {
        setDisplayValue(event.target.value)
        debouncedChange(event.target.value)
    }

    return (
        <input className="input" type='search' value={displayValue} onChange={handleChange} />
    );
}