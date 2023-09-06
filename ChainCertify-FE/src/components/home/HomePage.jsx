import React from "react";
import HomeCard from "./display/HomeCard";
import { Typography } from "@material-tailwind/react";

const introduction = [
  {
    id: 0,
    title: "Get Certificates",
    description:
      "Fetch all your certificates stored in blockchain and spend amount of gas",
    button: "Get",
    plug: "get",
  },
  {
    id: 1,
    title: "Issue Certificates",
    description:
      "Send your certificates to issuer to verify and commit it to blockchain",
    button: "Issue",
    plug: "issue",
  },
  {
    id: 2,
    title: "Revoke Certificates",
    description:
      "Send revocation request to issuer to verify and execute revocation process",
    button: "Revoke",
    plug: "revoke",
  },
  {
    id: 3,
    title: "Share Certificates",
    description:
      "Share your certificates with another user. They can view and check your information.",
    button: "Share",
    plug: "share",
  },
];

function Home() {
  return (
    <div className="mt-10">
      <div className="flex flex-col text-center pb-9">
        <Typography variant="h1">Hello, User !</Typography>
        <Typography variant="lead">
          Welcome back to your blockchain-certified achievements.
          <br />
          Your journey, secured on the blockchain, awaits your exploration.
        </Typography>
      </div>
      <div className="flex justify-evenly">
        {introduction.map((instance) => (
          <HomeCard
            title={instance.title}
            description={instance.description}
            button={instance.button}
            plug={instance.plug}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
