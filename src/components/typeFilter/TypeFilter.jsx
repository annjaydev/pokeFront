import React from 'react';
import { InputLabel, Select, MenuItem, Input } from '@material-ui/core';
import './index.scss';

export const TypeFilter = ({ collection, filter, setFilter, filterByTypes }) => {

  const typeNames = Object.keys(collection);

  const handleChange = (e) => {
    const newFilter = {...filter, filterType: e.target.value}
    setFilter(newFilter);
    filterByTypes();
  };

  return (
    <div className='type-filter' >
      <InputLabel>Types</InputLabel>
        <Select
          multiple
          value={filter.filterType}
          onChange={(e) => handleChange(e)}
          input={<Input />}
        >
          {typeNames.map((type) => (
            <MenuItem value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
    </div>
  );
}
