

import Table from '../components/Table';
import Input from '../components/Input';

const registry = {
  table: Table,
  input: Input
}

const componentRegistyReducer = (
  components: any = registry,
  action: any
): any => {
  return components
}

export default componentRegistyReducer;