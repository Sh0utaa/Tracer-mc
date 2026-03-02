import type { SessionResults, TotalResults } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ResultsTable({
  results,
  totalResults,
}: {
  results: SessionResults;
  totalResults: TotalResults;
}) {
  return (
    <div className="max-h-[400px] w-full overflow-x-auto overflow-y-auto">
      <Table id="resultsTable" className="min-w-[800px]">
        <TableHeader className="sticky top-0 bg-slate-900 text-white">
          <TableRow>
            <TableHead className="w-[120px]">Group Name</TableHead>
            <TableHead className="text-center">
              e<sup>+</sup>+&#957;
            </TableHead>
            <TableHead className="text-center">
              e<sup>-</sup>+&#957;
            </TableHead>
            <TableHead className="text-center">
              &#956;<sup>+</sup>+&#957;
            </TableHead>
            <TableHead className="text-center">
              &#956;<sup>-</sup>+&#957;
            </TableHead>
            <TableHead className="text-center">Background</TableHead>
            <TableHead className="text-center">WW</TableHead>
            <TableHead className="text-right">Δφ Angle</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.entries(results).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="text-center">{key}</TableCell>
              <TableCell className="text-center">{value.positron}</TableCell>
              <TableCell className="text-center">{value.electron}</TableCell>
              <TableCell className="text-center">{value.antimuon}</TableCell>
              <TableCell className="text-center">{value.muon}</TableCell>
              <TableCell className="text-center">{value.background}</TableCell>
              <TableCell className="text-center">{value.WW}</TableCell>
              <TableCell className="text-end">{value.angles.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="sticky bottom-0 bg-slate-900 text-white">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-center">{totalResults.positron}</TableCell>
            <TableCell className="text-center">{totalResults.electron}</TableCell>
            <TableCell className="text-center">{totalResults.antimuon}</TableCell>
            <TableCell className="text-center">{totalResults.muon}</TableCell>
            <TableCell className="text-center">{totalResults.background}</TableCell>
            <TableCell className="text-center">{totalResults.WW}</TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
