import React from 'react';
import { Input } from "antd";


const MyInput = ({search,debouncedSetSearch}) => {
    return (
        <Input
            placeholder="Basic usage"
            onChange={(e) => {
                debouncedSetSearch(e.target.value)
            }}
        />
    );
};
export default MyInput;