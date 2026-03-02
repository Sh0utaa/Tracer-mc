import { Button } from "../ui/button";

interface DownloadResultsButtonProps {
  tableID: string; // ID of the table to export
  fileName: string; // Desired filename for the export
}

export default function DownloadResultsButton({ tableID, fileName }: DownloadResultsButtonProps) {
  const exportTableToExcel = () => {
    const dataType = "application/vnd.ms-excel";
    const tableSelect = document.getElementById(tableID);

    if (!tableSelect) {
      console.error("Table not found");
      return;
    }

    const tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(["\ufeff", tableHTML], { type: dataType });
      navigator.msSaveOrOpenBlob(blob, `${fileName}.xls`);
    } else {
      downloadLink.href = `data:${dataType}, ${tableHTML}`;
      downloadLink.download = `${fileName}.xls`;
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  };

  return (
    <Button onClick={exportTableToExcel} className="w-[50%] sm:w-[150px]">
      <p>.XLS export</p>
    </Button>
  );
}
