import React, { useState, useEffect } from "react";
import {
  Backpack,
  Browser,
  Cat,
  File,
  Folder,
  Ghost,
  CreditCard,
} from "react-kawaii";
import styled from "styled-components";
import { theme, media } from "../../styles";

const { colors } = theme;

const SelectKawaii = ({ name, size = 100, color, mood = "excited" }) => {
  switch (name) {
    case "backpack":
      return <Backpack size={size} color={color} mood={mood} />;
    case "browser":
      return <Browser size={size} color={color} mood={mood} />;
    case "cat":
      return <Cat size={size} color={color} mood={mood} />;
    case "file":
      return <File size={size} color={color} mood={mood} />;
    case "folder":
      return <Folder size={size} color={color} mood={mood} />;
    case "ghost":
      return <Ghost size={size} color={color} mood={mood} />;
    case "creditcard":
      return <CreditCard size={size} color={color} mood={mood} />;
    default:
      return <Browser size={size} color={color} mood={mood} />;
  }
};

const KawaiiContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const KawaiiMessage = styled.h3`
  color: ${colors.darkBlue};
  ${media.tabletL`
  font-size:15px;
  `}
`;

const Kawaii = ({
  name,
  size,
  mood,
  message = "Please wait for a moment....",
}) => {
  const [color, setColor] = useState({ color: "#83D1FB", index: 0 });

  useEffect(() => {
    const colors = ["#83D1FB", "#FFD882", "#E0E4E8", "#FDA7DC", "#A6E191"];
    const intervalRef = setInterval(() => {
      if (color.index === colors.length - 1) {
        setColor({ color: colors[0], index: 0 });
      } else {
        setColor({ color: colors[color.index + 1], index: color.index + 1 });
      }
    }, 700);
    return () => clearInterval(intervalRef);
  }, [color.index]);
  return (
    <KawaiiContainer>
      <SelectKawaii name={name} size={size} color={color.color} mood={mood} />
      <KawaiiMessage>{message}</KawaiiMessage>
    </KawaiiContainer>
  );
};

export default Kawaii;
