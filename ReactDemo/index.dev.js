/**
 * 入口
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ui from './ui';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ui);
AppRegistry.registerComponent("@shopee-rn/main/HOME", () => ui);
