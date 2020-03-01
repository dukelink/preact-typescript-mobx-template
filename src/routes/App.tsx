import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { route, Route, Router, RouterOnChangeArgs } from 'preact-router';

import Auth from 'routes/auth';
import Home from 'routes/home';
import { AuthStoreContext } from 'stores';

const App: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const publicRoutes = ['/register', '/login'];

    const handleChange = (e: RouterOnChangeArgs): void => {
        if (!publicRoutes.includes(e.url) && !authStore.isAuthenticated) {
            route('/login');
        }
    };

    return (
        <div id="app">
            <Router onChange={handleChange}>
                <Route path="/" component={Home} />
                <Route path="/login" component={Auth} />
                <Route path="/register" component={Auth} />
            </Router>
        </div>
    );
};

export default App;
