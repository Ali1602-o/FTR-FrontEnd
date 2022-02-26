import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { MapContainer, TileLayer, Marker,Popup, CircleMarker } from 'react-leaflet';
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
class Map extends React.Component {

  state = {
    statistics: [],
    global: {},
    loading: true,
    color:'green',
    waterLevelData: [],
    waterFlowData: []
  }

  componentDidMount() {
   
      fetch("https://api.thingspeak.com/channels/1602992/fields/1.json?api_key=XWR0IS30KYXH9ZZ8&results=1")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                waterLevelData: json
            });
      })

    
      fetch("https://api.thingspeak.com/channels/1602993/fields/2.json?api_key=ON520M6JZRPI7LUA&results=1")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                waterFlowData: json,
                loading: false
            });
      })
      
  }

  componentWillUnmount() {
    this.setState({
      statistics: [],
      global: {},
      waterLevelData: [],
      waterFlowData: [],
      loading: true
    })
  }

  colorHandle(){

  }
  render() {
    return (
      <>
        <div className="content">
            <Row>
              <Col md="12">
                <Card className="card-map">
                  <CardHeader>Monitoring from the Map</CardHeader>
                  <CardBody>
                  {this.state.loading ? <h1>Please wait...</h1> :
                    <MapContainer className="map" center={[29.911627, -9.613112]} zoom={20} scrollWheelZoom={false}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      opacity={20}
                      />
                      <CircleMarker color={this.state.color} radius="20"center={[29.911627, -9.613112]}/>

                      <Marker position={[29.911627, -9.613112]}>
                          <Popup>
                          {this.state.waterLevelData.feeds.map((item) => ( 
                            <div><strong>Water Level (m) : </strong> { item.field1} </div>
                          ))}
                          {this.state.waterFlowData.feeds.map((item) => ( 
                            <div>
                                <strong>Speed (L/min) : </strong> { item.field2} 
                            </div>
                          ))}
                          </Popup>
                      </Marker>
                  </MapContainer>}
                  </CardBody>
                </Card>
              </Col>
            </Row>
        </div>
      </>
    );
  }
}

export default Map;
