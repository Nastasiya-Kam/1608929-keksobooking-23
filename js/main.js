import './generation-similar.js';
import {checkMapInitialization, enablePage} from './form.js';

// Функция enablePage() будет "перенесена" в checkMapInitialization
// checkMapInitialization будет проверять инициализацию карты:
//   - если инициализирована, то страница разблокирована,
//   - если нет - заблокирована.
enablePage();
checkMapInitialization();
