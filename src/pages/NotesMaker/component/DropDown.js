// components/LessonDropdown.js
import React from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const DropDown = ({menuList,onSelect,selected}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="lesson-label">Select Lesson</InputLabel>
      <Select labelId="lesson-label" label="Select Lesson" sx={{ width: '100%' }}  value={selected}
        onChange={(e)=>onSelect(e.target.value)}>
        {(menuList || []).map(menu =>  <MenuItem key={menu} value={menu}>{menu}</MenuItem>)}
       
       
      </Select>
    </FormControl>
  );
};

export default DropDown;
