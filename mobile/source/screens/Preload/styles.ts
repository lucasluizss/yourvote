import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  background-color: ${props => props.backgroundColor};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #536dfe;
  margin-bottom: 30px
`;
