import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  background-color: ${props => props.backgroundColor};
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: #00c553;
`;
