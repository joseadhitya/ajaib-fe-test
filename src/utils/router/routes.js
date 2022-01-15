import Home from '../../views/Home/Home';
import Example from '../../views/Example/Example';

const routes = [
    {
        path: '/',
        name: 'Home',
        element: Home,
        children: [
            {
                path: '/example',
                name: 'Example Page',
                element: Example,
            },
        ],
    },
];

export default routes;
