import { Link as RouterLink } from 'react-router-dom';
import classNames from "classnames";

function Link({ to, children, className }) {
  const classes = classNames("", className);

  return (
    <RouterLink className={classes} to={to}>
      {children}
    </RouterLink>
  );
}

export default Link;
