import { Labels } from './Labels';
import { Status } from './Status';
import { Priority } from './Priority';
export interface KeyValue {
  name: string;
  value: string;
}
function getIndex(
  object: Array<KeyValue>,
  data: string,
  checkValue: boolean = false
) {
  return object
    .map((keyValue) => (checkValue ? keyValue.name : keyValue.value))
    .indexOf(data);
}
export { Labels, Status, Priority, getIndex };
