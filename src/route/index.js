// routes.js
import Home from '../components/Experience.jsx';
import Playground from '../components/WorldScene';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/playground',
    component: Playground,
  },
  // Add more routes as needed
];

export default routes;