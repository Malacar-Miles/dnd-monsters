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

export type StatTableProps = {
  tableHeader: string | React.ReactNode;
  tableData: Array<[string, string | number | undefined]>;
};

const StatTable = (props: StatTableProps) => {
  const { tableHeader, tableData } = props;
  return (
    <>
      <Typography variant="h3" textAlign="center">
        {tableHeader}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "20rem" }} aria-label="Monster stats">
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
