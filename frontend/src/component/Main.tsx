import {Box} from "@mui/material";

// eslint-disable-next-line react/prop-types
// @ts-ignore
export default function Main ({ children, ml=16, mr=16 }) {
  return (
    <Box sx={{ mt: 12, ml, mr }}>
      { children }
    </Box>
  )
}
