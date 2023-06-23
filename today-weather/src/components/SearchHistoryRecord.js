import React from 'react';
import { Td, Tr } from "react-super-responsive-table";
import Button from "./Button";
import Text from './Text';

export default function SearchHistoryRecord(props) {
    return (
        <Tr>
            <Td><Text subTitle value={props.city} /></Td>
            <Td style={{ textAlign: "right" }}><Text timing value={props.timing} /></Td>
            <Td style={{ width: 1, paddingLeft: 8, paddingRight: 8 }}>
                <Button isRowItem type={'search'} onClick={props.onSearch} />
            </Td>
            <Td style={{ width: 1 }}>
                <Button isRowItem onClick={props.onDelete} />
            </Td>
        </Tr>
    );
}