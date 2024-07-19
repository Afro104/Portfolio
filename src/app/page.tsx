'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons/faFile";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const options = {
  standardFontDataUrl: '/standard_fonts/',
};

const style = {
  position: 'absolute',
  top: '29rem',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35rem',
  height: '56rem',
  bgcolor: 'transparent',
  zIndex : 0
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const resumePDF = '../resume2024.pdf';

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    console.log(numPages);
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      changePage(-1);
    }
  };

  const nextPage = () => {
    if (pageNumber < (numPages || 1)) {
      changePage(1);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await fetch(resumePDF);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'RogelioResume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="box z-40">
        <div className="inner">
          <span>Rogelio Rodriguez's</span>
        </div>
        <div className="inner">
          <span>Portfolio</span>
        </div>
      </div>
      <div className="z-50">
        <ul>
          <li>
            <a className="linkedIn" href="https://www.linkedin.com/in/rogelio-rodriguez-676552182/" target="_blank" rel="noopener noreferrer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
          <li>
            <a className="resume" onClick={handleOpen}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <FontAwesomeIcon icon={faFile} />
            </a>
          </li>
          <li>
            <a className="github" href="https://github.com/Afro104" target="_blank" rel="noopener noreferrer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
        </ul>
      </div>

      <div className="stars z-0">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <Modal 
        className='overflow-x-scroll overflow-x-hidden scrollbar'
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          onClick: (event) => event.stopPropagation(), // Prevent modal from closing on backdrop click
        }}
      >
        <Box sx={style}>
          <div className="wrapper">
            {[...Array(15)].map((_, index) => (
              <div key={index}>
                <span className="dot"></span>
              </div>
            ))}
          </div>
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'transparent',
              padding: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="shadow">Resume</div>
            </Typography>
            <Document options={options} file={resumePDF} onLoadSuccess={onDocumentLoadSuccess}>
              <Page scale={1} height={680} pageNumber={pageNumber} />
            </Document>
            <div className='flex'>
              <button className='BtnPrevious' onClick={previousPage} disabled={pageNumber <= 1}></button>
              <button className='BtnNext' onClick={nextPage} disabled={pageNumber >= numPages!}></button>
            </div>
          </Box>
          <div className='FooterButtons'>
            <button className='BtnClose' onClick={handleClose}></button>
            <button className='BtnDownload' onClick={downloadPDF}></button>
          </div>
        </Box>
      </Modal>
    </main>
  );
}