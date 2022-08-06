// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';


// const url =
//   "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"

// export default function Test() {

//   pdfjs.GlobalWorkerOptions.workerSrc =
//     `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pdf,setpdf]= useState();
//   // const fetchTours = async () => {
//   //   try {
//   //     const response = await fetch(url)
//   //     const tours = await response.json()
//   //     setpdf(tours);
//   //   } catch (error) {
//   //     // setLoading(false)
//   //     console.log(error)
//   //   }
//   // }
//   // useEffect(() => {
//   //   fetchTours()
//   // }, [])
//   // // if (loading) {
//   // //   return (
//   // //     <main>
//   // //       <Loading />
//   // //     </main>
//   // //   )
// }

//   /*To Prevent right click on screen*/
//   document.addEventListener("contextmenu", (event) => {
//     event.preventDefault();
//   });

//   /*When document gets loaded successfully*/
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   function changePage(offset) {
//     setPageNumber(prevPageNumber => prevPageNumber + offset);
//   }

//   function previousPage() {
//     changePage(-1);
//   }

//   function nextPage() {
//     changePage(1);
//   }

//   return (
//     <>
//       <div className="main">
//         <Document
//           file={url}
//           onLoadSuccess={onDocumentLoadSuccess}
//         >
//           <Page pageNumber={pageNumber} />
//         </Document>
//         <div>
//           <div className="pagec">
//             Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
//           </div>
//           <div className="buttonc">
//             <button
//               type="button"
//               disabled={pageNumber <= 1}
//              onClick={previousPage}
//               className="Pre"

//             >
//               Previous
//             </button>
//             <button
//               type="button"
//               disabled={pageNumber >= numPages}
//               onClick={nextPage}

//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
  
import React, { useState,useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import signCSS from './sign.module.css';
  
  
const url = 
"http://127.0.0.1:8080/jalex%40gmail.com_e-sign33.pdf"
  
export default function Test() {
 
      
  pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf,setpdf]= useState();

  // const fetchPdf = async () => {
  //   try {
  //     const response = await fetch(url)
  //     const pdf = await response.json()
  //     setpdf(pdf);
  //   } catch (error) {
  //     // setLoading(false)
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   fetchPdf()
  // }, [])

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
    
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  
  function previousPage() {
    changePage(-1);
  }
  
  function nextPage() {
    changePage(1);
  } 
  return (
   
    <div className={signCSS.main}>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <div className="pagec">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </div>
        <div className="buttonc">
        </div>
      </div>
      </div>
    
  );
}