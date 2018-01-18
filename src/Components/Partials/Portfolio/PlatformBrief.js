import React, { Component } from 'react'
import { Header, Image, Table, Segment, Message, Icon } from 'semantic-ui-react'


export default class PlatformBrief extends Component {
    render() {
        return (
            <div>
                <Segment.Group horizontal>
                    <Segment textAlign='center' id="IndustryData">
                        <Table basic='very' celled collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Top Industry Growers</Table.HeaderCell>
                                    <Table.HeaderCell>Your Listening Data</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Image src='/assets/images/avatar/small/lena.png' rounded size='mini' />
                                            <Header.Content>
                                                Drake
                                    <Header.Subheader>Hip Hop</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        22 Minutes streamed
                        </Table.Cell>
                                </Table.Row>

                            </Table.Body>
                        </Table>
                    </Segment>
                    <Segment textAlign='center' >
                        <Message
                            textAlign='center'
                            icon='money'
                            header='Current Platform Exchange Rate'
                            content=' USD: $0.50 | BTC: 0.00000005136 | ETH: 0.0230'
                        />
                    </Segment>
                </Segment.Group>


            </div>

        )
    }
}