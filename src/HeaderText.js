import styled from 'styled-components';

const fontSize = (size) => {
  switch(size) {
    case 'large':
      return '4rem';
    case 'small':
      return '4rem';
    default:
      return '4rem';
  }
}

export default styled.h1`
  color: white !important;
  text-align: center;
  font-size: ${props => fontSize(props.fSize)} !important;
`

