import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";
import { Block as BlockType } from "../types/Block";

type Props = {
  block: BlockType;
};

const BoxSummaryContent = styled(Box)({
  background: "rgba(0, 0, 0, 0.12)",
  borderRadius: "2px",
  padding: "8px",
  marginBottom: "4px",
});

const TypographyId = styled(Typography)({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#304FFE",
});

const TypographyContent = styled(Typography)({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  color: colors.text,
});

function padLeadingZeros(num: string, size: number) {
  let numberWithZeros = num + "";
  while (numberWithZeros.length < size) numberWithZeros = "0" + numberWithZeros;
  return numberWithZeros;
}

const Block: React.FC<Props> = ({ block }) => {
   // console.log(block); 
  return (
    <BoxSummaryContent>
      <TypographyId>
        {block.id !== "" ? padLeadingZeros(block.id, 3) : null}
      </TypographyId>
      <TypographyContent>
        {block.attributes.data ? block.attributes.data : null}
      </TypographyContent>
    </BoxSummaryContent>
  );
};

export default Block;