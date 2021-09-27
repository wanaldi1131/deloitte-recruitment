import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({component: Component, ...rest}) => {
	const isAuthenticated = useSelector((state) => state.user_id) != null ? true : false;

	return (
		<Route
			{...rest}
			render={(props) => isAuthenticated ? (<Component {...props} />) : (<Redirect to={{pathname: "/"}}/>)}
			// render={(props) => <Component {...props} />}
		/>
	);
};
