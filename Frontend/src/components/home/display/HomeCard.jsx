import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

function HomeCard(props) {
  return (
    <div className="flex justify-center">
      <Card className="mt-6 w-3/4">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.title}
          </Typography>
          <Typography>{props.description}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <NavLink to={`/${props.plug}`}>
            <Button>{props.button}</Button>
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomeCard;
