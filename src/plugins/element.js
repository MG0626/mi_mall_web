import Vue from 'vue';
import {
  Button,
  Card,
  Carousel,
  CarouselItem,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Image,
  Input,
  RadioButton,
  RadioGroup,
  Row,
  Message,
  Alert,
  Checkbox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Card);
Vue.use(Image);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
Vue.use(Checkbox);

Vue.prototype.$message = Message;


