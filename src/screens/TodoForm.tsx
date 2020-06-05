import React, { useState } from 'react';
import { Input, Select } from '../components';
import Textarea from '../components/uicomponents/Textarea';
import { Labels, Status, Priority, getIndex } from '../util';
import { Todo } from '../util/Todo';
interface P {
  onSubmit: any;
  isEditMode: boolean;
  onUpdate: (_id: string, todoData: Partial<Todo>) => void;
  todoData?: Todo;
  onCancel: () => void;
}
export default function TodoForm(props: P) {
  const [title, setTitle] = useState(
    props.isEditMode ? props.todoData!.title : ''
  );
  const [description, setDescription] = useState(
    props.isEditMode ? props.todoData!.description : ''
  );
  const [startDate, setStartDate] = useState(
    props.isEditMode ? getDate(props.todoData!.startDate) : getDate()
  );
  const [endDate, setEndDate] = useState(
    props.isEditMode ? getDate(props.todoData!.endDate) : getDate()
  );
  const [statusIndex, setStatusIndex] = useState(
    props.isEditMode ? getIndex(Status, props.todoData!.status, true) : 0
  );
  const [labelIndex, setLabelIndex] = useState(
    props.isEditMode ? getIndex(Labels, props.todoData!.label, true) : 0
  );
  const [priorityIndex, setPriorityIndex] = useState(
    props.isEditMode ? getIndex(Priority, props.todoData!.priority, true) : 0
  );

  function resetFormValues() {
    setTitle('');
    setDescription('');
    setStartDate(getDate());
    setEndDate(getDate());
    setStatusIndex(0);
    setLabelIndex(0);
    setPriorityIndex(0);
  }
  function getDate(date?: number) {
    let currentDate = date ? new Date(date) : new Date();
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(currentDate);
    return `${year}-${month}-${day}`;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let todoData: Partial<Todo> = {
      title: title,
      description: description,
      status: Status[statusIndex].value,
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      label: Labels[labelIndex].value,
      priority: Priority[priorityIndex].value,
    };
    if (props.isEditMode) {
      props.onUpdate(props.todoData!._id!, todoData);
    } else {
      props.onSubmit(todoData);
    }
  }
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={onSubmit}
    >
      <Input
        disabled={props.isEditMode}
        type="text"
        id="title"
        label="Title"
        value={title}
        onChange={(event) => {
          event.preventDefault();
          console.log(event);
          setTitle(event.target.value);
        }}
        required={true}
      />
      <Textarea
        id="description"
        label="Description"
        value={description}
        onChange={(event) => {
          event.preventDefault();
          setDescription(event.target.value);
        }}
        required={true}
      />
      <Select
        label="Status"
        id="status"
        selectedIndex={statusIndex}
        onSelect={(index) => setStatusIndex(index)}
        optionData={Status}
      />
      <Select
        label="Priority"
        id="priority"
        selectedIndex={priorityIndex}
        onSelect={(index) => setPriorityIndex(index)}
        optionData={Priority}
      />
      <Select
        label="Label"
        id="label"
        selectedIndex={labelIndex}
        onSelect={(index) => setLabelIndex(index)}
        optionData={Labels}
      />
      <Input
        type="date"
        id="startDate"
        label="Start Date"
        value={startDate}
        onChange={(event) => {
          event.preventDefault();
          setStartDate(event.target.value);
        }}
        required={true}
      />
      <Input
        type="date"
        id="endDate"
        label="End Date"
        value={endDate}
        onChange={(event) => {
          event.preventDefault();
          setEndDate(event.target.value);
        }}
        required={true}
      />
      <div className="saveResetContainer">
        <Input
          type="reset"
          value="Clear"
          onClick={() => {
            resetFormValues();
            return true;
          }}
        />
        <Input type="button" value="Cancel" onClick={props.onCancel} />
        <Input type="submit" value="Save" />
      </div>
    </form>
  );
}
