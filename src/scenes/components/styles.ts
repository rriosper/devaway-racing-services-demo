import styled, { css } from '@xstyled/styled-components';
import { th, up } from '@xstyled/system';
import { Link } from 'react-router-dom';

export const Title = styled.div`
  > h1 {
    color: primary;
  }
`;

export const ChampionshipTitle = styled.p`
  font-size: 3;
  padding-top: md;
  padding-bottom: md;
  margin:0;
  font-weight: bold;
`;

export const ChanpionshipLink = styled(Link)`
  font-size: 3;
  color: text;
  padding-top: md;
  padding-bottom: md;
  text-decoration: none;
  display: block;
  display: flex;
  gap: ${th('space.sm')};
  align-items: center;
  max-height: 55px;
  font-weight: bold;
`;

export const RacersLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: md;
  grid-gap: md;
  position: relative;

  ${up(
    'lg',
    css`
      grid-template-columns: repeat(2, 1fr);
    `,
  )}

  > div:first-child {
    position: relative;
    ::before {
      content: "#1";
      text-shadow: 0px 1px 2px #333;
      font-size: 5;
      color: gold;
      position: absolute;
      top: -14px;
      left: -14px;
    }
  }

  > div:nth-child(2) {
    position: relative;
    ::before {
      content: "#2";
      text-shadow: 0px 1px 2px #333;
      font-size: 5;
      color: silver;
      position: absolute;
      top: -14px;
      left: -14px;
    }
  }

  > div:nth-child(3) {
    position: relative;
    ::before {
      content: "#3";
      text-shadow: 0px 1px 2px #333;
      font-size: 5;
      color: bronze;
      position: absolute;
      top: -14px;
      left: -14px;
    }
  }
`;

export const ViewRacerButton = styled.button`
  width: 100%;
  padding: md;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  border: none;
  border-top: thin;
  border-color: foregroundBorder;
  transition: fast;
  font-weight: bold;

  :hover {
    background-color: primary;
    color: white;
  }
`;
