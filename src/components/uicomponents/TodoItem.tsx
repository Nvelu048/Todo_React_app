import React from 'react';
import { MdDateRange, MdEdit, MdDelete } from 'react-icons/md';
import '../componentscss/TodoItem.css';
interface P {
  title?: string;
  id?: string;
  description?: string;
  status?: string;
  label?: string;
  priority?: string;
  startDate?: number;
  endDate?: number;
  onDelete?: any;
  onEdit?: () => void;
}
export default function TodoItem(props: P) {
  return (
    <div className="todoContainer">
      <label className="title">{props.title}</label>
      <label className="description">{props.description}</label>
      <div className="dateContainer">
        <label>
          <span style={{ fontWeight: 'bold' }}>
            <MdDateRange />
          </span>
          : {new Date(props.startDate!).toISOString().split('T')[0]}{' '}
          <span style={{ fontWeight: 'bold' }}>~</span>
          {new Date(props.endDate!).toISOString().split('T')[0]}
        </label>
      </div>
      <div className="todoDetails">
        <label>
          <span className="title">Status</span> {props.status}
        </label>
        <label>
          <span className="title">Priority</span> {props.priority}
        </label>
        <label>
          <span className="title">Label</span> {props.label}
        </label>
      </div>
      <div className="actionContainer">
        <div className="btn" title="Edit" onClick={props.onEdit}>
          <MdEdit />
        </div>
        <div className="btn" title="Delete" onClick={props.onDelete}>
          <MdDelete />
        </div>
      </div>
    </div>
  );
}

TodoItem.defaultProps = {
  title: 'Sample Todo',
  description: 'Todo describing essentials of Todo',
  status: 'New',
  priority: 'Low',
  label: 'Shopping',
  startDate: 1587859200000,
  endDate: 1587859200000,
};
