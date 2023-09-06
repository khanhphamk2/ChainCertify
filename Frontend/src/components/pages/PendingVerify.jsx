import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

const PendingVerify = () => {
  return (
    <div className="flex-col w-full h-full">
      <div className="flex flex-col text-center py-20 pb-1">
        <i class="text-9xl fa-solid fa-clock mb-2"></i>
        <Typography variant="h1">
          Your request is pending verification !
        </Typography>
        <Typography variant="lead">
          The verification process may take approximately 1 to 2 hours.
          <br />
          Please wait until the certificate is confirmed and fully stored on the
          blockchain.
        </Typography>
      </div>
    </div>
  );
};

export default PendingVerify;
