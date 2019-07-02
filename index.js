import { AppRegistry } from 'react-360';
// 3.) register the Keyboard in your AppRegistry
import { registerKeyboard } from 'react-360-keyboard';
import SearchPanel from './SearchPanel';
import ProfilePanel from './ProfilePanel';
import InfoPanel from './InfoPanel';
import * as Store from './Store';
Store.initialize();

AppRegistry.registerComponent('SearchPanel', () => SearchPanel);
AppRegistry.registerComponent('ProfilePanel', () => ProfilePanel);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
AppRegistry.registerComponent(...registerKeyboard);
