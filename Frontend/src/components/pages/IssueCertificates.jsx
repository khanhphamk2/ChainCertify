import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Textarea,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";

const IssueCertificates = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [gasFee, setGasFee] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [curInst, setCurInst] = useState("uit");
  const certificateTypes = [
    {
      institution: "uit",
      name: "UIT - University Of Information Technology",
      types: [
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctoral Degree",
        "Professional Degrees",
      ],
    },
    {
      institution: "iig",
      name: "IIG Vietnam",
      types: [
        "TOEIC Listening & Reading",
        "TOEIC Speaking & Writing",
        "TOEIC Bridge",
      ],
    },
  ];

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSelectInstitution = (event) => {
    setCurInst(event);
  };

  const openModal = () => {
    if (isChecked) {
      if (gasFee === 0) {
        setIsLoading(true); // Hiển thị spinner

        setTimeout(() => {
          setIsLoading(false); // Ẩn spinner
          setGasFee(
            selectedFile
              ? ((selectedFile.size / (1024 * 1024)) * 0.01).toFixed(5)
              : 0
          );
          setShowModal(true);
        }, 3000);
      } else {
        setShowModal(true);
      }
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const closeModal = () => setShowModal(false);

  const handleConfirm = () => {
    setIsConfirmLoading(true);
    setTimeout(() => {
      setIsConfirmLoading(false);
      window.location.href = "/pending";
    }, 2000);
  };

  return (
    <div className="flex-col w-full">
      <div className="flex flex-col text-center py-10 pb-1">
        <Typography variant="h1">Issue new certificate !</Typography>
        <Typography variant="lead">
          Send your certificates to issuer to verify and commit it to
          blockchain.
        </Typography>
      </div>
      <div className="mb-7">
        <div className="flex justify-center gap-10">
          <Card
            className="h-auto w-[30%] mt-10 overflow-hidden p-8"
            color="white"
          >
            <div>
              <Typography variant="h4" color="blue-gray">
                Certificate Information
              </Typography>
              <Typography color="gray" className="font-normal">
                Fulfill all information below
              </Typography>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              <Input
                label="Owner Name"
                icon={<i className="fas fa-user text-xs" />}
              />
              <Select label="Institution" onChange={handleSelectInstitution}>
                {certificateTypes.map((item, index) => (
                  <Option value={item.institution}>{item.name}</Option>
                ))}
              </Select>
              <Select label="Certificate Type">
                {certificateTypes
                  .find((item) => item.institution === curInst)
                  ?.types.map((type, index) => (
                    <Option key={index} value={type}>
                      {type}
                    </Option>
                  ))}
              </Select>
              <Textarea label="Purpose" />
            </div>
          </Card>
          <Card
            className="h-auto w-[30%] mt-10 overflow-hidden p-8"
            color="white"
          >
            <div>
              <Typography variant="h4" color="blue-gray">
                Certificate Upload
              </Typography>
              <Typography color="gray" className="font-normal">
                Choose a pdf file from your device
              </Typography>
            </div>
            <div
              className="flex flex-col items-center justify-center h-full border-dashed border-2 border-blue-gray-300 p-4 mt-4 rounded-lg cursor-pointer"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "application/pdf"; // Optionally set accepted file types
                input.onchange = handleUploadFile;
                input.click();
              }}
            >
              <i
                className={`fas fa-${
                  selectedFile ? "check" : "file-upload"
                } text-3xl text-blue-gray-400 mb-2`}
              />
              <Typography color="gray" className="font-medium">
                {selectedFile ? selectedFile.name : "Upload file"}
              </Typography>
            </div>
          </Card>
        </div>
        <div className="mt-5 w-full flex justify-center relative">
          <Card className="p-2 w-[63%] flex flex-row justify-between">
            <Checkbox
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  I agree with the
                  <Typography
                    as="a"
                    href="#"
                    color="blue"
                    className="font-medium transition-colors hover:text-blue-700"
                  >
                    &nbsp;terms and conditions
                  </Typography>
                  .
                </Typography>
              }
              onClick={() => setIsChecked(true)}
            />
            <div
              className={`fixed inset-0 flex items-start justify-end m-5 ${
                showAlert ? "z-50" : "z-0"
              } transition-opacity duration-300 ${
                showAlert
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Alert
                open={showAlert}
                color="red"
                onClose={() => setShowAlert(false)}
                className="w-[50%]"
                icon={<i className="fas fa-exclamation-triangle text-xs" />}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
              >
                You have to agree with our terms and conditions.
              </Alert>
            </div>
            <Button color="blue" className="m-2" onClick={openModal}>
              {isLoading ? <Spinner className="h-4 w-4" /> : "Execute"}
            </Button>
          </Card>
        </div>
      </div>
      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Your attention is required!</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center mb-3">
            <i className="fab fa-ethereum text-[60px] text-blue-gray-800 mr-2"></i>
            <Typography color="black" variant="h5" className="py-3">
              Your certificate file costs{" "}
              <span className="text-red-500">{gasFee} ETH</span> to store !
            </Typography>
            <p className="text-gray-600">
              This cost depends on your file size, current gas fee and another
              conditions. If you confirm to issue this certificate, the cost
              will be deducted directly from your wallet.
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleConfirm}>
            {isConfirmLoading ? <Spinner className="h-4 w-4" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default IssueCertificates;
