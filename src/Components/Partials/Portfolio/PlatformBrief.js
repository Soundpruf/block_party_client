import React, { Component } from 'react'
import { Header, Image, Table, Segment, Message, Icon } from 'semantic-ui-react'


export default class PlatformBrief extends Component {
    render() {
        return (
            <div>
                <Segment textAlign='center' >
                    <Message
                        textAlign='center'
                        icon='money'
                        header='Current Platform Exchange Rate'
                        content=' USD: $0.50 | BTC: 0.00000005136 | ETH: 0.0230'
                    />
                </Segment>
                <div style={{clear: 'both'}}>

                    <Segment id="IndustryData" padded compact floated='left'>
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
                                            <Image src='/images/dwp.jpeg' rounded size='medium' />
                                            <Header.Content>
                                                Dandylion WarPaint
                             <Header.Subheader>Sex Rock, Sad Core</Header.Subheader>
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
                    <Segment id="payOutData" padded compact floated='left'>
                        <Table basic='very' celled collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Your Profits</Table.HeaderCell>
                                    <Table.HeaderCell>Next Payout</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        ^10%
                                    </Table.Cell>
                                    <Table.Cell>
                                        April 24th
                                    </Table.Cell>
                                </Table.Row>

                            </Table.Body>
                        </Table>
                    </Segment>
                </div>

            </div>

        )
    }
}