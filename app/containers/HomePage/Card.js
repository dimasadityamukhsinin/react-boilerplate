import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 #4185f5ff;
  transition: 0.3s;
  width: 50%;
  background-color: #4185f5ff;
  &: hover {
    box-shadow: 0 8px 16px 0 #4185f5ff;
  }
`;

export const Container = styled.div`
  padding: 16px;
  > span,
  h1 {
    margin: 0;
    color: white;
    margin-bottom: 15px;
  }
`;

export const Divider = styled.hr`
  border-top: 0.1px;
  border-color: white;
  margin-bottom: 20px;
`;

export const ConRingkas = styled.div`
  padding: 0px 16px 16px 16px;
`;

export const Ringkas = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > span {
    font-size: 13px;
    color: white;
  }
`;
