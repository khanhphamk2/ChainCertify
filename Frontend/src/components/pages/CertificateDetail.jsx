import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CertificateDetail = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="m-7">
      <div className="flex flex-col self-center">
        <Typography variant="h3">TOEIC Certificates - 2018</Typography>
        <p>Address: 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c</p>
      </div>
      <div>
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="shadow-lg rounded-md"
        >
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => (
              <Page pageNumber={page} renderTextLayer={false} className="m-4" />
            ))}
        </Document>
      </div>
    </div>
  );
};

export default CertificateDetail;
