import React from 'react';
import { MdSearch } from 'react-icons/md';
import '../componentscss/NoDataFound.css';
export default function NoDataFound() {
  return (
    <div className="noDataFound">
      <div className="noDataChildren">
        <h1>No Todo available, Create todo using add icon</h1>
        <MdSearch fontSize="100" />
      </div>
    </div>
  );
}
