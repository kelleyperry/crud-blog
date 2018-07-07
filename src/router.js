import React from 'react';
import { Route, Link, IndexRoute } from 'react-router-dom';

import Layout from './Layout';
import Posts from './Posts';

<Route path="/">
	<IndexRoute component={Layout} />
	<Route path="/posts" component={Posts} />
</Route>;
