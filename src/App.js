import React from 'react';
import axios from 'axios';
import HeaderText from "./HeaderText";
import styled, { keyframes } from 'styled-components';
import { Segment, Card, Icon, Grid, } from 'semantic-ui-react';

class App extends React.Component {
  state = { repos: [] }

  componentDidMount() {
    // API rate limits and hot reloading do not mix
    this.getRepos()  
  }

  getRepos = () => {
    axios.get('https://api.github.com/users/[thedevbloke]/repos?sort=created')
      .then( res => this.setState({ repos: res.data }) )
  }

  render() {
    return (
      <AppContainer>
        <StyledButton onClick={this.getRepos}>Get Repos</StyledButton>
        <HeaderText fSize="large">
          My Portfolio
        </HeaderText>
        <Segment as={Transparent}>
          <HeaderText>My Projects</HeaderText>
          <Grid>
            <Grid.Row>
              { this.state.repos.map( r =>
                  <Grid.Column key={r.id} width={4}>
                    <StyledCard>
                      <Card.Content>
                        <Card.Header>
                          <Truncated>
                            { r.full_name }
                          </Truncated>
                        </Card.Header>
                        <Card.Meta>
                          { r.description }
                        </Card.Meta>
                        { r.stargazers_count > 0 &&
                          <Star>
                            <Icon name="star" />
                          </Star>
                        }
                      </Card.Content>
                      <Card.Content extra>
                        <ButtonLink href={r.html_url} target="_blank" rel="noopener norefferer">
                          View
                        </ButtonLink>
                      </Card.Content>
                    </StyledCard>
                  </Grid.Column>
                )
              }
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <HeaderText>Contact</HeaderText>
        </Segment>
      </AppContainer>
    )
  }
}

const StyledButton = styled.div`
  display: flex;
  background: #312d2d;
  color: white;
  padding: 15px 25px;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: #606060;
    transition: background 0.2s ease;
  }
`;

const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg } !important;
  background-color: ${ props => props.theme.bg };
`

const rotate360 = keyframes`
  from {
    tranform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`;

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCard = styled(Card)`
  height: 200px;
`

const Transparent = styled.div`
  background: transparent !important;
`;

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, blue);
`;

export default App;
