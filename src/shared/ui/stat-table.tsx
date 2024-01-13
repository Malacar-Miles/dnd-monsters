import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const NO_tableData = "unknown";

export type StatTableData = {
  tableHeader: string | React.ReactNode;
  tableData: Array<[string, string | number | undefined]>;
};

const StatTable = ({ data }: { data: StatTableData }) => {
  const { tableHeader, tableData } = data;
  return (
    <>
      <Typography variant="h3" textAlign="center">
        {tableHeader}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="Monster stats">
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={item[0] + "/" + index}>
                <TableCell align="left">{item[0]}</TableCell>
                <TableCell align="right">{item[1] ?? NO_tableData}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StatTable;
