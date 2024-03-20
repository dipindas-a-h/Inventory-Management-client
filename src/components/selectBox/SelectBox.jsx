import React from 'react';
import { Select } from 'antd';
// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };
const onSearch = (value) => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>

  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const CustomSelect = ({options,onChange,value}) => (

    <div className="custom-select">
  <Select
  allowClear
  style={{ width:'18vw',height:'44px'}}
    showSearch
    placeholder="Select a product"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    value={value}
    filterOption={filterOption}
    options={options}
    // options={[
    //   {
    //     value: 'jack',
    //     label: 'Jack',
    //   },
    //   {
    //     value: 'lucy',
    //     label: 'Lucy',
    //   },
    //   {
    //     value: 'tom',
    //     label: 'Tom',
    //   },
    // ]}
  />
  </div>
);
export default CustomSelect;