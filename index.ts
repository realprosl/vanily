import { Counter } from "./components/counter/counter";
import { Column,  render } from "./vanily/core";



const App = () => 
    Column({},
        Counter(0),
        Counter(100)
    );// Column


render(App());
