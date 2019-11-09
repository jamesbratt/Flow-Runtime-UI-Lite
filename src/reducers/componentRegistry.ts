import Table from '../components/themes/material-ui/Table';
import Input from '../components/themes/material-ui/Input';
import Navigation from '../components/themes/material-ui/Navigation';

const registry = {
  table: Table,
  input: Input,
  navigation: Navigation,
}

const componentRegistyReducer = (
  components: any = registry,
  action: any
): any => {
  return components
}

export default componentRegistyReducer;